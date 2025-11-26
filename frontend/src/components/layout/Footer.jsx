import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CommandLineIcon,
  HeartIcon,
  StarIcon,
  GlobeAltIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Increment visit counter on mount
    const raw = localStorage.getItem("gitRipperVisits");
    const current = raw ? parseInt(raw, 10) : 0;
    const updated = current + 1;
    localStorage.setItem("gitRipperVisits", String(updated));
    setVisitCount(updated);
  }, []);

  const quickLinks = [
    { name: "Documentation", href: "/docs" },
    { name: "Examples", href: "/examples" },
    { name: "Statistics", href: "/stats" },
    { name: "Contact", href: "/contact" },
  ];

  const resources = [
    {
      name: "GitHub Repository",
      href: "https://github.com/sairajB/git-ripper",
    },
    { name: "NPM Package", href: "https://www.npmjs.com/package/git-ripper" },
    {
      name: "Report Issues",
      href: "https://github.com/sairajB/git-ripper/issues",
    },
    {
      name: "License",
      href: "https://github.com/sairajB/git-ripper/blob/main/LICENSE",
    },
  ];

  return (
    <footer className="relative bg-secondary-100 dark:bg-charcoal-950 text-secondary-700 dark:text-gray-300 border-t border-secondary-200 dark:border-charcoal-800 overflow-hidden">
      {/* Ambient glow effect */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 50% 0%, rgba(34, 211, 238, 0.08), transparent)",
        }}
      />

      {/* Top neon border */}
      <div
        className="absolute top-0 left-0 right-0 h-px hidden dark:block"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.3), rgba(168, 85, 247, 0.3), transparent)",
        }}
      />

      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 dark:from-cyan-400 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg dark:shadow-neon">
                <CommandLineIcon className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-secondary-900 dark:text-white tracking-tight">
                Git-ripper
              </span>
            </motion.div>

            <p className="text-secondary-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
              Download specific folders from GitHub repositories without cloning
              the entire codebase. Save bandwidth, time, and disk space with
              selective downloads.
            </p>

            <motion.a
              whileHover={{ scale: 1.02, x: 4 }}
              href="https://github.com/sairajB/git-ripper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-secondary-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 group">
              <StarIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Star on GitHub</span>
            </motion.a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-secondary-900 dark:text-white font-semibold mb-6 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 hover:translate-x-1 block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-secondary-900 dark:text-white font-semibold mb-6 text-lg">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 hover:translate-x-1 block">
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Installation Command */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 bg-white dark:bg-charcoal-900 rounded-2xl border border-secondary-200 dark:border-cyan-500/10 shadow-lg dark:shadow-glass">
          <h4 className="text-secondary-900 dark:text-white font-semibold mb-3">
            Quick Install
          </h4>
          <div className="bg-secondary-100 dark:bg-charcoal-950 p-4 rounded-xl font-mono text-sm border border-secondary-200 dark:border-charcoal-800">
            <span className="text-cyan-600 dark:text-cyan-400">$</span>
            <span className="text-emerald-600 dark:text-emerald-400 ml-2">
              npm install -g git-ripper
            </span>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-secondary-200 dark:border-charcoal-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-secondary-500 dark:text-gray-400 text-sm">
            <span>© {currentYear} Git-ripper. Made with</span>
            <HeartIcon className="w-4 h-4 text-red-500 animate-pulse" />
            <span>by</span>
            <a
              href="https://github.com/sairajB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors font-medium">
              sairajB
            </a>
          </div>

          <div className="flex items-center space-x-6 text-secondary-500 dark:text-gray-400 text-sm">
            <div className="flex items-center space-x-1.5">
              <EyeIcon className="w-4 h-4" />
              <span>{visitCount.toLocaleString()} visits</span>
            </div>
            <span>MIT License</span>
            <div className="flex items-center space-x-1.5">
              <GlobeAltIcon className="w-4 h-4" />
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
