import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownTrayIcon,
  LinkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const WebInterface = () => {
  const [url, setUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  const exampleUrls = [
    "https://github.com/facebook/react/tree/main/packages/react",
    "https://github.com/microsoft/vscode/tree/main/src/vs/editor",
    "https://github.com/vercel/next.js/tree/canary/examples/with-typescript",
  ];

  const validateGitHubUrl = (url) => {
    const githubPattern =
      /^https?:\/\/(?:www\.)?github\.com\/[^\/]+\/[^\/]+(?:\/(?:tree|blob)\/[^\/]+(?:\/.*)?)?$/;
    return githubPattern.test(url);
  };

  const handleExampleClick = (exampleUrl) => {
    setUrl(exampleUrl);
    setStatus({ type: "", message: "" });
    inputRef.current?.focus();
  };

  const simulateProgress = () => {
    let progress = 0;
    const progressInterval = setInterval(() => {
      if (!isDownloading) {
        clearInterval(progressInterval);
        return;
      }
      progress += Math.random() * 10;
      if (progress > 85) {
        progress = 85;
        clearInterval(progressInterval);
      }
      setProgress(progress);
    }, 500);
  };

  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setStatus({ type: "error", message: "Please enter a GitHub URL" });
      return;
    }

    if (!validateGitHubUrl(url)) {
      setStatus({
        type: "error",
        message: "Please enter a valid GitHub repository folder URL",
      });
      return;
    }

    setIsDownloading(true);
    setStatus({ type: "info", message: "Preparing download..." });
    setProgress(0);

    try {
      simulateProgress();

      const response = await fetch("/api/git-ripper/rip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "github-folder.zip";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) {
          filename = match[1];
        }
      }

      const blob = await response.blob();
      downloadBlob(blob, filename);

      setProgress(100);
      setStatus({
        type: "success",
        message: `Successfully downloaded: ${filename}`,
      });
    } catch (error) {
      console.error("Download error:", error);
      let errorMessage = "An unexpected error occurred";

      if (
        error.message.includes("not found") ||
        error.message.includes("404")
      ) {
        errorMessage =
          "Repository or folder not found. Please check the URL and try again.";
      } else if (error.message.includes("rate limit")) {
        errorMessage =
          "GitHub API rate limit exceeded. Please try again in a few minutes.";
      } else if (
        error.message.includes("403") ||
        error.message.includes("forbidden")
      ) {
        errorMessage =
          "Access denied. The repository may be private or you may not have permission.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setStatus({ type: "error", message: errorMessage });
    } finally {
      setIsDownloading(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    if (status.type === "error") {
      setStatus({ type: "", message: "" });
    }
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-blue-500 dark:to-blue-700 rounded-2xl shadow-lg dark:shadow-blue-500/25">
              <ArrowDownTrayIcon className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
              Git-Ripper Web Interface
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-secondary-600 dark:text-gray-300 max-w-3xl mx-auto">
              Download specific folders from GitHub repositories without cloning
              the entire repo. Simple, fast, and user-friendly.
            </motion.p>
          </div>

          {/* Main Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* URL Input */}
              <div>
                <label
                  htmlFor="githubUrl"
                  className="block text-xs sm:text-sm font-semibold text-secondary-900 dark:text-gray-100 mb-2 sm:mb-3">
                  <LinkIcon className="w-5 h-5 inline-block mr-2" />
                  GitHub Folder URL
                </label>
                <input
                  ref={inputRef}
                  type="url"
                  id="githubUrl"
                  value={url}
                  onChange={handleInputChange}
                  placeholder="github.com/owner/repo/tree/branch/folder"
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 rounded-xl bg-white dark:bg-gray-800 text-secondary-900 dark:text-gray-100 placeholder-secondary-500 dark:placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-blue-400 ${
                    status.type === "error"
                      ? "border-red-300 dark:border-red-600"
                      : "border-secondary-200 dark:border-gray-600"
                  }`}
                  required
                />

                {/* Example URLs */}
                <div className="mt-4 p-3 sm:p-4 bg-secondary-50 dark:bg-gray-800/50 rounded-xl border-l-4 border-primary-500 dark:border-blue-500">
                  <h4 className="text-xs sm:text-sm font-semibold text-secondary-900 dark:text-gray-100 mb-2 sm:mb-3">
                    Example URLs:
                  </h4>
                  <div className="space-y-2">
                    {exampleUrls.map((exampleUrl, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleExampleClick(exampleUrl)}
                        className="block w-full text-left text-xs sm:text-sm font-mono text-primary-600 dark:text-blue-400 hover:text-primary-700 dark:hover:text-blue-300 break-all transition-colors duration-200 leading-relaxed">
                        {exampleUrl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                type="submit"
                disabled={isDownloading}
                className="btn-primary w-full py-3 sm:py-4 text-base sm:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                {isDownloading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Downloading...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    <span>Download Folder</span>
                  </div>
                )}
              </button>
            </form>

            {/* Status Message */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-6 p-3 sm:p-4 rounded-xl border-l-4 break-words ${
                  status.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200"
                    : status.type === "error"
                    ? "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200"
                    : "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200"
                }`}>
                <div className="flex items-center space-x-2">
                  {status.type === "success" && (
                    <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
                  )}
                  {status.type === "error" && (
                    <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="font-medium text-sm sm:text-base break-words">
                    {status.message}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Progress Bar */}
            {progress > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-4">
                <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                  />
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-2 sm:px-0">
            <div className="text-center">
              <div className="feature-icon mx-auto">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-secondary-900 dark:text-gray-100 mb-2">
                Lightning Fast
              </h3>
              <p className="text-sm sm:text-base text-secondary-600 dark:text-gray-300">
                Download only what you need without cloning entire repositories
              </p>
            </div>

            <div className="text-center">
              <div className="feature-icon mx-auto">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-secondary-900 dark:text-gray-100 mb-2">
                Safe & Secure
              </h3>
              <p className="text-sm sm:text-base text-secondary-600 dark:text-gray-300">
                Works with public repositories, your data stays private
              </p>
            </div>

            <div className="text-center">
              <div className="feature-icon mx-auto">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-secondary-900 dark:text-gray-100 mb-2">
                User Friendly
              </h3>
              <p className="text-sm sm:text-base text-secondary-600 dark:text-gray-300">
                No command line needed, just paste the URL and download
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WebInterface;
