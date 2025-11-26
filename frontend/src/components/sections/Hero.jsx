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
    <section className="relative min-h-[85vh] bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-charcoal-950 dark:via-charcoal-950 dark:to-charcoal-900 overflow-hidden transition-colors duration-500 pt-24 pb-16">
      {/* Light mode pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-40 dark:opacity-0 transition-opacity duration-500"></div>

      {/* Dark mode ambient effects */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 211, 238, 0.15), transparent 50%),
            radial-gradient(ellipse 60% 40% at 0% 50%, rgba(168, 85, 247, 0.1), transparent 50%),
            radial-gradient(ellipse 50% 30% at 100% 50%, rgba(59, 130, 246, 0.1), transparent 50%),
            radial-gradient(ellipse 40% 40% at 50% 100%, rgba(34, 211, 238, 0.08), transparent 50%)
          `,
        }}
      />

      {/* Grid pattern overlay for dark mode */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden dark:block opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2322d3ee' stroke-opacity='0.04'%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated floating orbs */}
      <motion.div
        animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 dark:from-cyan-400/30 dark:to-cyan-500/20 rounded-full blur-xl dark:shadow-neon/20"
      />
      <motion.div
        animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-40 right-[15%] w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-500/20 dark:from-purple-400/30 dark:to-purple-500/20 rounded-full blur-xl dark:shadow-neon-purple/20"
      />
      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-40 left-[20%] w-16 h-16 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 dark:from-blue-400/30 dark:to-indigo-500/20 rounded-full blur-xl"
      />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-cyan-500/10 text-primary-700 dark:text-cyan-300 px-5 py-2.5 rounded-full text-sm font-medium mb-6 border border-primary-200 dark:border-cyan-500/20 shadow-md dark:shadow-neon/10 backdrop-blur-sm">
            <CommandLineIcon className="w-4 h-4" />
            <span>CLI Tool for Selective Downloads</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="text-5xl md:text-7xl font-extrabold text-secondary-900 dark:text-white mb-6 leading-tight tracking-tight">
            Download GitHub
            <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Folders Instantly
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-secondary-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Skip the entire repository clone. Get exactly what you need with
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">
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
            className="mb-8">
            <div className="glass-strong rounded-2xl p-6 max-w-2xl mx-auto dark:border-cyan-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-cyan-600 dark:text-cyan-400 text-sm font-medium uppercase tracking-wider">
                  Installation
                </span>
                <CopyToClipboard
                  text="npm install -g git-ripper"
                  onCopy={() => handleCopy("install")}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-secondary-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors text-sm font-medium">
                    {copiedCommand === "install" ? "Copied!" : "Copy"}
                  </motion.button>
                </CopyToClipboard>
              </div>
              <div className="font-mono text-left bg-secondary-900 dark:bg-charcoal-950 rounded-xl p-4 border border-secondary-800 dark:border-cyan-500/10">
                <span className="text-cyan-400">$</span>
                <span className="text-emerald-400 ml-2">
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
            className="mb-12">
            <div className="glass-strong rounded-2xl p-6 max-w-4xl mx-auto dark:border-purple-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-purple-600 dark:text-purple-400 text-sm font-medium uppercase tracking-wider">
                  Usage
                </span>
                <CopyToClipboard
                  text="git-ripper https://github.com/facebook/react/tree/main/packages/react-dom"
                  onCopy={() => handleCopy("usage")}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-secondary-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors text-sm font-medium">
                    {copiedCommand === "usage" ? "Copied!" : "Copy"}
                  </motion.button>
                </CopyToClipboard>
              </div>
              <div className="font-mono text-left bg-secondary-900 dark:bg-charcoal-950 rounded-xl p-4 border border-secondary-800 dark:border-purple-500/10 text-sm md:text-base">
                <div className="mb-2">
                  <span className="text-cyan-400">$</span>
                  <span className="text-emerald-400 ml-2">git-ripper</span>
                  <span className="text-amber-400 ml-2 break-all">
                    https://github.com/facebook/react/tree/main/packages/react-dom
                  </span>
                </div>
                <div className="text-gray-500 dark:text-gray-500 text-xs">
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
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <motion.a
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              href="#features"
              className="btn-primary flex items-center space-x-2 px-8 py-4 text-base">
              <PlayIcon className="w-5 h-5" />
              <span>Get Started</span>
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}>
              <Link
                to="/docs"
                className="btn-secondary flex items-center space-x-2 px-8 py-4 text-base">
                <DocumentTextIcon className="w-5 h-5" />
                <span>Documentation</span>
              </Link>
            </motion.div>
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
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 dark:bg-cyan-500/10 text-primary-600 dark:text-cyan-400 rounded-2xl mb-3 border border-primary-200 dark:border-cyan-500/20 shadow-lg dark:shadow-neon/10 group-hover:shadow-xl dark:group-hover:shadow-neon/20 transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="text-3xl font-bold text-secondary-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-secondary-600 dark:text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
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
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDownIcon className="w-6 h-6 text-secondary-400 dark:text-cyan-400/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
