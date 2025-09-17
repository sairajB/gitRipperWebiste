import fetch from "node-fetch";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Downloads a folder from GitHub repository
 * @param {Object} parsedUrl - Parsed GitHub URL object
 * @param {string} outputDir - Output directory path
 * @returns {Promise<Object>} - Download result
 */
export async function downloadFolder(parsedUrl, outputDir) {
  const { owner, repo, branch, folderPath } = parsedUrl;

  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // GitHub API URL for getting repository contents
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${folderPath}${
      branch ? `?ref=${branch}` : ""
    }`;

    console.log(`Fetching: ${apiUrl}`);

    const headers = {
      "User-Agent": "git-ripper-web",
      Accept: "application/vnd.github.v3+json",
    };

    // Add GitHub token if available
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Repository or folder not found");
      } else if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded or access denied");
      }
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    const contents = await response.json();

    if (!Array.isArray(contents)) {
      throw new Error("Expected folder contents, but got a single file");
    }

    let downloadCount = 0;
    const downloadPromises = [];

    for (const item of contents) {
      if (item.type === "file") {
        downloadPromises.push(downloadFile(item, outputDir));
        downloadCount++;
      } else if (item.type === "dir") {
        // Recursively download subdirectories
        const subParsedUrl = {
          owner,
          repo,
          branch,
          folderPath: item.path,
        };
        const subDir = path.join(outputDir, item.name);
        downloadPromises.push(downloadFolder(subParsedUrl, subDir));
      }
    }

    await Promise.all(downloadPromises);

    return {
      success: true,
      downloadCount,
      isEmpty: downloadCount === 0,
    };
  } catch (error) {
    console.error("Download error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Downloads a single file from GitHub
 * @param {Object} fileItem - GitHub API file item
 * @param {string} outputDir - Output directory
 */
async function downloadFile(fileItem, outputDir) {
  const filePath = path.join(outputDir, fileItem.name);

  try {
    const response = await fetch(fileItem.download_url);

    if (!response.ok) {
      throw new Error(
        `Failed to download ${fileItem.name}: ${response.statusText}`
      );
    }

    const fileContent = await response.buffer();
    fs.writeFileSync(filePath, fileContent);

    console.log(`Downloaded: ${fileItem.name}`);
  } catch (error) {
    console.error(`Error downloading ${fileItem.name}:`, error);
    throw error;
  }
}
