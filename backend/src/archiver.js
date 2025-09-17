import fs from "node:fs";
import path from "node:path";
import archiver from "archiver";

/**
 * Creates a ZIP archive from a directory
 * @param {string} sourceDir - Source directory to archive
 * @param {string} outputPath - Output ZIP file path
 * @returns {Promise<void>}
 */
export async function createArchive(sourceDir, outputPath) {
  return new Promise((resolve, reject) => {
    // Create a file to stream archive data to
    const output = fs.createWriteStream(outputPath);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Maximum compression
    });

    // Listen for all archive data to be written
    output.on("close", () => {
      console.log(`Archive created: ${archive.pointer()} total bytes`);
      resolve();
    });

    // Handle warnings (non-blocking errors)
    archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        console.warn("Archive warning:", err);
      } else {
        reject(err);
      }
    });

    // Handle errors
    archive.on("error", (err) => {
      reject(err);
    });

    // Pipe archive data to the file
    archive.pipe(output);

    // Add files from the source directory
    archive.directory(sourceDir, false);

    // Finalize the archive
    archive.finalize();
  });
}
