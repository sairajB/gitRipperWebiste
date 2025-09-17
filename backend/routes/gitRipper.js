import express from "express";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Import git-ripper modules
import { parseGitHubUrl } from "../src/parser.js";
import { downloadFolder } from "../src/downloader.js";
import { createArchive } from "../src/archiver.js";

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

// Temporary file cleanup utility
const cleanupTempFiles = async (tempDir, zipPath = null) => {
  try {
    if (tempDir && fs.existsSync(tempDir)) {
      await fs.promises.rm(tempDir, { recursive: true, force: true });
    }
    if (zipPath && fs.existsSync(zipPath)) {
      await fs.promises.rm(zipPath, { force: true });
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
  let tempDir = null;
  let zipPath = null;

  try {
    console.log(`Processing download request for: ${url}`);

    // Parse the GitHub URL
    const parsedUrl = parseGitHubUrl(url);
    console.log("Parsed URL:", parsedUrl);

    // Create temporary directory for download
    const tempId = `git-ripper-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    tempDir = path.join(os.tmpdir(), tempId);

    // Ensure temp directory exists
    await fs.promises.mkdir(tempDir, { recursive: true });

    // Download the folder
    console.log(`Downloading to temporary directory: ${tempDir}`);
    const downloadResult = await downloadFolder(parsedUrl, tempDir);

    // Check if download was successful
    if (!downloadResult || !downloadResult.success) {
      throw new Error(
        `Download failed: ${downloadResult?.error || "Unknown error"}`
      );
    }

    // Check if any files were downloaded
    const files = await fs.promises.readdir(tempDir, { recursive: true });
    const fileCount = files.filter((file) => {
      const fullPath = path.join(tempDir, file);
      return fs.statSync(fullPath).isFile();
    }).length;

    if (fileCount === 0) {
      throw new Error(
        "No files found to download. The folder may be empty or not exist."
      );
    }

    // Create ZIP archive
    const { owner, repo, folderPath } = parsedUrl;
    const folderName = folderPath ? folderPath.split("/").pop() : repo;
    const zipFileName = `${folderName || repo}-${owner}.zip`;
    zipPath = path.join(os.tmpdir(), `${tempId}-${zipFileName}`);

    console.log(`Creating ZIP archive: ${zipPath}`);
    await createArchive(tempDir, zipPath);

    // Send the ZIP file
    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${zipFileName}"`,
      "Cache-Control": "no-cache",
    });

    // Stream the file and cleanup after sending
    const fileStream = fs.createReadStream(zipPath);
    fileStream.pipe(res);

    fileStream.on("end", async () => {
      console.log(`Download completed for: ${url}`);
      await cleanupTempFiles(tempDir, zipPath);
    });

    fileStream.on("error", async (error) => {
      console.error("Error streaming file:", error);
      await cleanupTempFiles(tempDir, zipPath);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error sending file" });
      }
    });
  } catch (error) {
    console.error("Download error:", error);

    // Cleanup temporary files
    await cleanupTempFiles(tempDir, zipPath);

    // Send appropriate error response
    if (error.message.includes("Invalid GitHub URL")) {
      return res.status(400).json({ error: error.message });
    } else if (
      error.message.includes("not found") ||
      error.message.includes("404")
    ) {
      return res.status(404).json({ error: "Repository or folder not found" });
    } else if (error.message.includes("rate limit")) {
      return res.status(429).json({
        error: "GitHub API rate limit exceeded. Please try again later.",
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
