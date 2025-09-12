import express from "express";
import axios from "axios";

const router = express.Router();

// Get GitHub repository information
router.get("/repo/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const repoResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    const contributorsResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contributors`
    );
    const releasesResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/releases`
    );

    const repoData = repoResponse.data;

    res.json({
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      issues: repoData.open_issues_count,
      watchers: repoData.watchers_count,
      language: repoData.language,
      languages: repoData.language ? [repoData.language] : [],
      license: repoData.license,
      created: repoData.created_at,
      updated: repoData.updated_at,
      pushed: repoData.pushed_at,
      size: repoData.size,
      defaultBranch: repoData.default_branch,
      topics: repoData.topics || [],
      homepage: repoData.homepage,
      contributors: contributorsResponse.data.slice(0, 10), // Top 10 contributors
      releases: releasesResponse.data.slice(0, 5), // Latest 5 releases
      clone_url: repoData.clone_url,
      ssh_url: repoData.ssh_url,
      html_url: repoData.html_url,
    });
  } catch (error) {
    console.error("Error fetching GitHub repo info:", error.message);
    res.status(500).json({
      error: "Failed to fetch GitHub repository information",
      message: error.message,
    });
  }
});

// Get repository languages
router.get("/repo/:owner/:repo/languages", async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const languagesResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/languages`
    );

    const languages = languagesResponse.data;
    const total = Object.values(languages).reduce(
      (sum, bytes) => sum + bytes,
      0
    );

    const languagePercentages = Object.entries(languages)
      .map(([language, bytes]) => ({
        language,
        bytes,
        percentage: ((bytes / total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.bytes - a.bytes);

    res.json({
      languages: languagePercentages,
      total,
    });
  } catch (error) {
    console.error("Error fetching languages:", error.message);
    res.status(500).json({
      error: "Failed to fetch repository languages",
      message: error.message,
    });
  }
});

// Get commit activity
router.get("/repo/:owner/:repo/activity", async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const activityResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`
    );

    res.json({
      activity: activityResponse.data,
    });
  } catch (error) {
    console.error("Error fetching commit activity:", error.message);
    res.status(500).json({
      error: "Failed to fetch commit activity",
      message: error.message,
    });
  }
});

export default router;
