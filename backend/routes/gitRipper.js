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
import { downloadFolder } from "git-ripper/src/downloader.js";
import { createArchive } from "git-ripper/src/archiver.js";

const router = express.Router();

// Store active download progress for SSE clients
const activeDownloads = new Map();

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
const cleanupTempFiles = async (zipPath, tempDir = null) => {
  try {
    if (zipPath && fs.existsSync(zipPath)) {
      await fs.promises.rm(zipPath, { force: true });
    }
    if (tempDir && fs.existsSync(tempDir)) {
      await fs.promises.rm(tempDir, { recursive: true, force: true });
    }
  } catch (error) {
    console.error("Error cleaning up temporary files:", error);
  }
};

// Update progress for a download session
const updateProgress = (downloadId, progress) => {
  const session = activeDownloads.get(downloadId);
  if (session) {
    session.progress = { ...session.progress, ...progress };
    // Notify all SSE clients
    session.clients.forEach((res) => {
      res.write(`data: ${JSON.stringify(session.progress)}\n\n`);
    });
  }
};

// SSE endpoint for real-time progress updates
router.get("/progress/:downloadId", (req, res) => {
  const { downloadId } = req.params;

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Create session if doesn't exist
  if (!activeDownloads.has(downloadId)) {
    activeDownloads.set(downloadId, {
      clients: [],
      progress: { status: "waiting", percent: 0 },
    });
  }

  const session = activeDownloads.get(downloadId);
  session.clients.push(res);

  // Send current progress immediately
  res.write(`data: ${JSON.stringify(session.progress)}\n\n`);

  // Cleanup on disconnect
  req.on("close", () => {
    const idx = session.clients.indexOf(res);
    if (idx !== -1) session.clients.splice(idx, 1);
    // Remove session if no clients
    if (session.clients.length === 0) {
      setTimeout(() => {
        if (activeDownloads.get(downloadId)?.clients.length === 0) {
          activeDownloads.delete(downloadId);
        }
      }, 30000); // Keep session for 30s after last client disconnects
    }
  });
});

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

  const { url, downloadId } = req.body;
  let zipPath = null;
  let tempDir = null;

  // Helper to send progress updates
  const sendProgress = (data) => {
    if (downloadId) {
      updateProgress(downloadId, data);
    }
  };

  try {
    console.log(`Processing download request for: ${url}`);
    sendProgress({
      status: "parsing",
      percent: 5,
      message: "Parsing GitHub URL...",
    });

    // Parse the GitHub URL using git-ripper's parser
    const parsedUrl = parseGitHubUrl(url);
    console.log("Parsed URL:", parsedUrl);

    // Generate unique temp directory for this download
    const tempId = `git-ripper-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 11)}`;
    tempDir = path.join(os.tmpdir(), tempId);

    // Create temp directory
    await fs.promises.mkdir(tempDir, { recursive: true });

    // Generate ZIP filename
    const { owner, repo, folderPath } = parsedUrl;
    const folderName = folderPath ? folderPath.split("/").pop() : repo;
    const zipFileName = `${folderName || repo}-${owner}.zip`;
    zipPath = path.join(os.tmpdir(), `${tempId}-${zipFileName}`);

    sendProgress({
      status: "fetching",
      percent: 10,
      message: `Fetching repository structure for ${owner}/${repo}...`,
    });

    console.log(`Using git-ripper package to download...`);

    // Download the folder using git-ripper
    sendProgress({
      status: "downloading",
      percent: 20,
      message: "Downloading files...",
    });

    const downloadResult = await downloadFolder(parsedUrl, tempDir);

    if (!downloadResult || !downloadResult.success) {
      throw new Error(downloadResult?.error || "Download failed");
    }

    // Check if any files were downloaded
    if (downloadResult.isEmpty || downloadResult.filesDownloaded === 0) {
      throw new Error("No files found in the specified folder");
    }

    sendProgress({
      status: "archiving",
      percent: 80,
      message: `Creating ZIP archive (${downloadResult.filesDownloaded} files)...`,
      filesDownloaded: downloadResult.filesDownloaded,
    });

    console.log(`Creating ZIP archive: ${zipPath}`);

    // Create the archive
    await createArchive(tempDir, zipPath);

    console.log(`Archive created at: ${zipPath}`);

    // Verify the ZIP file exists and has content
    if (!fs.existsSync(zipPath)) {
      throw new Error("Archive creation failed - file not found");
    }

    const stats = await fs.promises.stat(zipPath);
    if (stats.size === 0) {
      throw new Error("Archive creation failed - empty file");
    }

    sendProgress({
      status: "complete",
      percent: 100,
      message: "Download ready!",
      fileSize: stats.size,
      filesDownloaded: downloadResult.filesDownloaded,
    });

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
      await cleanupTempFiles(zipPath, tempDir);
      // Clean up progress session after a delay
      if (downloadId) {
        setTimeout(() => activeDownloads.delete(downloadId), 5000);
      }
    });

    fileStream.on("error", async (error) => {
      console.error("Error streaming file:", error);
      await cleanupTempFiles(zipPath, tempDir);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error sending file" });
      }
    });
  } catch (error) {
    console.error("Download error:", error);

    // Send error progress
    sendProgress({
      status: "error",
      percent: 0,
      message: error.message,
    });

    // Cleanup temporary files
    await cleanupTempFiles(zipPath, tempDir);

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
