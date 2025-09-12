import express from "express";
import axios from "axios";

const router = express.Router();

// Get NPM package statistics
router.get("/stats/:packageName", async (req, res) => {
  try {
    const { packageName } = req.params;
    const npmResponse = await axios.get(
      `https://api.npmjs.org/downloads/range/last-year/${packageName}`
    );
    const packageInfo = await axios.get(
      `https://registry.npmjs.org/${packageName}`
    );

    const downloads = npmResponse.data.downloads;
    const totalDownloads = downloads.reduce(
      (sum, day) => sum + day.downloads,
      0
    );

    // Calculate weekly downloads (last 7 days)
    const weeklyDownloads = downloads
      .slice(-7)
      .reduce((sum, day) => sum + day.downloads, 0);

    // Calculate monthly downloads (last 30 days)
    const monthlyDownloads = downloads
      .slice(-30)
      .reduce((sum, day) => sum + day.downloads, 0);

    const packageData = packageInfo.data;
    const latestVersion = packageData["dist-tags"].latest;
    const versionInfo = packageData.versions[latestVersion];

    res.json({
      name: packageData.name,
      description: packageData.description,
      version: latestVersion,
      totalDownloads,
      weeklyDownloads,
      monthlyDownloads,
      downloads: downloads,
      license: versionInfo.license,
      author: versionInfo.author,
      keywords: versionInfo.keywords || [],
      repository: versionInfo.repository,
      homepage: versionInfo.homepage,
      bugs: versionInfo.bugs,
      created: packageData.time.created,
      modified: packageData.time.modified,
      dependencies: Object.keys(versionInfo.dependencies || {}),
      maintainers: packageData.maintainers,
    });
  } catch (error) {
    console.error("Error fetching NPM stats:", error.message);
    res.status(500).json({
      error: "Failed to fetch NPM statistics",
      message: error.message,
    });
  }
});

// Get download trend data
router.get("/trend/:packageName", async (req, res) => {
  try {
    const { packageName } = req.params;
    const { period = "last-month" } = req.query;

    const npmResponse = await axios.get(
      `https://api.npmjs.org/downloads/range/${period}/${packageName}`
    );

    res.json({
      package: packageName,
      period,
      downloads: npmResponse.data.downloads,
    });
  } catch (error) {
    console.error("Error fetching download trend:", error.message);
    res.status(500).json({
      error: "Failed to fetch download trend",
      message: error.message,
    });
  }
});

export default router;
