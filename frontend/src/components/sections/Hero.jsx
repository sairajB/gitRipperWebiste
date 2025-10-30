import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlayIcon,
  DocumentTextIcon,
  CommandLineIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import StatsService from "../../services/statsService";

const Hero = () => {
  const [copiedCommand, setCopiedCommand] = useState("");
  const [stats, setStats] = useState([
    { label: "Total Downloads", value: "Loading...", icon: ArrowDownIcon },
    { label: "GitHub Stars", value: "Loading...", icon: CheckCircleIcon },
    { label: "Weekly Downloads", value: "Loading...", icon: ClockIcon },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await StatsService.getCombinedStats();
        setStats([
          {
            label: "Total Downloads",
            value: data.formatted.totalDownloads,
            icon: ArrowDownIcon,
          },
          {
            label: "GitHub Stars",
            value: data.formatted.githubStars,
            icon: CheckCircleIcon,
          },
          {
            label: "Weekly Downloads",
            value: data.formatted.weeklyDownloads,
            icon: ClockIcon,
          },
        ]);
      } catch (error) {
        console.error("Error loading stats:", error);
        // Keep fallback values if API fails
        setStats([
          { label: "Total Downloads", value: "3.0K", icon: ArrowDownIcon },
          { label: "GitHub Stars", value: "6", icon: CheckCircleIcon },
          { label: "Weekly Downloads", value: "120", icon: ClockIcon },
        ]);
      }
    };

    fetchStats();
  }, []);

  const handleCopy = (command) => {
    setCopiedCommand(command);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedCommand(""), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-500 pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-40 dark:opacity-20"></div>

      {/* Enhanced dark mode overlays */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(circle at 25% 30%, rgba(96,165,250,0.4), transparent 50%), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.3), transparent 55%), radial-gradient(circle at 60% 10%, rgba(251,191,36,0.15), transparent 40%)",
        }}></div>

      {/* Animated gradient mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden dark:block opacity-30"
        style={{
          background:
            "conic-gradient(from 230.29deg at 51.63% 52.16%, rgba(96,165,250,0.2) 0deg, rgba(59,130,246,0.15) 67.5deg, rgba(251,191,36,0.1) 198.75deg, rgba(96,165,250,0.2) 251.25deg, rgba(96,165,250,0.2) 301.88deg, rgba(96,165,250,0.2) 360deg)",
        }}></div>

      {/* Enhanced floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary-200 to-primary-300 dark:from-blue-500/30 dark:to-blue-600/40 rounded-full animate-float opacity-60 dark:opacity-80 blur-sm dark:shadow-2xl dark:shadow-blue-500/30"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-accent-200 to-accent-300 dark:from-yellow-400/30 dark:to-yellow-500/40 rounded-full animate-float opacity-60 dark:opacity-80 blur-sm dark:shadow-2xl dark:shadow-yellow-400/30"
        style={{ animationDelay: "2s" }}></div>
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-secondary-200 to-secondary-300 dark:from-purple-500/30 dark:to-purple-600/40 rounded-full animate-float opacity-60 dark:opacity-80 blur-sm dark:shadow-2xl dark:shadow-purple-500/30"
        style={{ animationDelay: "4s" }}></div>

      <div className="container-custom section-padding relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-blue-500/20 text-primary-700 dark:text-blue-300 px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-primary-200 dark:border-blue-500/30 shadow-md dark:shadow-lg dark:shadow-blue-500/20 backdrop-blur-sm">
            <CommandLineIcon className="w-4 h-4" />
            <span>CLI Tool for Selective Downloads</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="text-5xl md:text-7xl font-extrabold text-secondary-900 dark:text-secondary-100 mb-6 text-shadow leading-tight tracking-tight">
            Download GitHub
            <span className="block bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-300 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Folders Instantly
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Skip the entire repository clone. Get exactly what you need with
            <span className="font-semibold text-primary-600">
              {" "}
              Git-ripper
            </span>{" "}
            – the smart way to download specific folders from any GitHub
            repository.
          </motion.p>

          {/* Installation Command */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8 hidden md:block">
            <div className="glass rounded-xl p-6 max-w-2xl mx-auto shadow-2xl dark:shadow-black/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-sm font-medium">
                  INSTALLATION
                </span>
                <CopyToClipboard
                  text="npm install -g git-ripper"
                  onCopy={() => handleCopy("install")}>
                  <button className="text-gray-400 hover:text-white transition-colors text-sm">
                    {copiedCommand === "install" ? "Copied!" : "Copy"}
                  </button>
                </CopyToClipboard>
              </div>
              <div className="font-mono text-left">
                <span className="text-emerald-400">$</span>
                <span className="text-green-400 ml-2">
                  npm install -g git-ripper
                </span>
              </div>
            </div>
          </motion.div>

          {/* Usage Example */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12 hidden md:block">
            <div className="glass-strong rounded-xl p-6 max-w-4xl mx-auto shadow-2xl dark:shadow-black/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-sm font-medium">
                  USAGE
                </span>
                <CopyToClipboard
                  text="git-ripper https://github.com/facebook/react/tree/main/packages/react-dom"
                  onCopy={() => handleCopy("usage")}>
                  <button className="text-gray-400 hover:text-white transition-colors text-sm">
                    {copiedCommand === "usage" ? "Copied!" : "Copy"}
                  </button>
                </CopyToClipboard>
              </div>
              <div className="font-mono text-left text-sm md:text-base">
                <div className="mb-2">
                  <span className="text-emerald-400">$</span>
                  <span className="text-green-400 ml-2">git-ripper</span>
                  <span className="text-yellow-400 ml-2">
                    https://github.com/facebook/react/tree/main/packages/react-dom
                  </span>
                </div>
                <div className="text-gray-400 text-xs">
                  ✓ Downloading react-dom package... (45 files, 2.3MB)
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <a
              href="#features"
              className="btn-primary flex items-center space-x-2">
              <PlayIcon className="w-5 h-5" />
              <span>Get Started</span>
            </a>

            <Link
              to="/docs"
              className="btn-secondary flex items-center space-x-2">
              <DocumentTextIcon className="w-5 h-5" />
              <span>Documentation</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-blue-500/20 text-primary-600 dark:text-blue-400 rounded-lg mb-2 border border-primary-200 dark:border-blue-500/30 dark:shadow-lg dark:shadow-blue-500/10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-secondary-900 dark:text-gray-100">
                    {stat.value}
                  </div>
                  <div className="text-secondary-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <ArrowDownIcon className="w-6 h-6 text-secondary-400 dark:text-gray-400" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
