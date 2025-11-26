import express from "express";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Use the official git-ripper npm package
// This provides: resume capability, progress tracking, file integrity verification,
// optimized concurrent downloads, and built-in archiving
import { parseGitHubUrl } from "git-ripper/src/parser.js";
import { downloadAndArchive } from "git-ripper/src/archiver.js";

const router = express.Router();

// Specific rate limiting for git-ripper downloads
const gitRipperLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 downloads per 15 minutes
  message: {
    error: "Too many download requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all git-ripper routes
router.use(gitRipperLimiter);

// Validation middleware for GitHub URLs
const validateGitHubUrl = [
  body("url")
    .isURL()
    .withMessage("Please provide a valid URL")
    .matches(/^https?:\/\/(?:www\.)?github\.com\//)
    .withMessage("URL must be a GitHub repository URL")
    .isLength({ max: 500 })
    .withMessage("URL is too long"),
];

// Cleanup utility for temporary files
const cleanupTempFiles = async (zipPath) => {
  try {
    if (zipPath && fs.existsSync(zipPath)) {
      await fs.promises.rm(zipPath, { force: true });
    }
    // Also cleanup any temp directories created by git-ripper
    const tempDir = path.dirname(zipPath);
    const downloadDir = zipPath.replace(".zip", "");
    if (fs.existsSync(downloadDir)) {
      await fs.promises.rm(downloadDir, { recursive: true, force: true });
    }
  } catch (error) {
    console.error("Error cleaning up temporary files:", error);
  }
};

// Main endpoint for downloading GitHub folders
router.post("/rip", validateGitHubUrl, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Invalid request data",
      details: errors.array(),
    });
  }

  const { url } = req.body;
  let zipPath = null;

  try {
    console.log(`Processing download request for: ${url}`);

    // Parse the GitHub URL using git-ripper's parser
    const parsedUrl = parseGitHubUrl(url);
    console.log("Parsed URL:", parsedUrl);

    // Generate unique temp directory for this download
    const tempId = `git-ripper-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 11)}`;
    const tempDir = path.join(os.tmpdir(), tempId);

    // Generate ZIP filename
    const { owner, repo, folderPath } = parsedUrl;
    const folderName = folderPath ? folderPath.split("/").pop() : repo;
    const zipFileName = `${folderName || repo}-${owner}.zip`;

    console.log(`Using git-ripper package to download and archive...`);

    // Use git-ripper's downloadAndArchive function
    // This handles: downloading, resume capability, progress tracking,
    // file integrity verification, and ZIP creation in one optimized operation
    zipPath = await downloadAndArchive(parsedUrl, tempDir, zipFileName);

    console.log(`Archive created at: ${zipPath}`);

    // Verify the ZIP file exists and has content
    if (!fs.existsSync(zipPath)) {
      throw new Error("Archive creation failed - file not found");
    }

    const stats = await fs.promises.stat(zipPath);
    if (stats.size === 0) {
      throw new Error("Archive creation failed - empty file");
    }

    // Send the ZIP file
    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${zipFileName}"`,
      "Content-Length": stats.size,
      "Cache-Control": "no-cache",
    });

    // Stream the file and cleanup after sending
    const fileStream = fs.createReadStream(zipPath);
    fileStream.pipe(res);

    fileStream.on("end", async () => {
      console.log(`Download completed for: ${url}`);
      await cleanupTempFiles(zipPath);
    });

    fileStream.on("error", async (error) => {
      console.error("Error streaming file:", error);
      await cleanupTempFiles(zipPath);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error sending file" });
      }
    });
  } catch (error) {
    console.error("Download error:", error);

    // Cleanup temporary files
    if (zipPath) {
      await cleanupTempFiles(zipPath);
    }

    // Send appropriate error response based on error type
    const errorMessage = error.message.toLowerCase();

    if (
      errorMessage.includes("invalid github url") ||
      errorMessage.includes("invalid url")
    ) {
      return res.status(400).json({ error: error.message });
    } else if (
      errorMessage.includes("not found") ||
      errorMessage.includes("404") ||
      errorMessage.includes("path not found")
    ) {
      return res.status(404).json({ error: "Repository or folder not found" });
    } else if (
      errorMessage.includes("rate limit") ||
      errorMessage.includes("403") ||
      errorMessage.includes("forbidden")
    ) {
      return res.status(429).json({
        error: "GitHub API rate limit exceeded. Please try again later.",
      });
    } else if (errorMessage.includes("no files")) {
      return res.status(404).json({
        error:
          "No files found in the specified folder. The folder may be empty.",
      });
    } else {
      return res.status(500).json({ error: "Internal server error occurred" });
    }
  }
});

// Health check endpoint specifically for git-ripper service
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "git-ripper-web",
    timestamp: new Date().toISOString(),
  });
});

export default router;
