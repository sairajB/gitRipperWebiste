import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CommandLineIcon,
  HeartIcon,
  StarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <CommandLineIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Git-ripper</span>
            </div>

            <p className="text-secondary-400 mb-6 max-w-md">
              Download specific folders from GitHub repositories without cloning
              the entire codebase. Save bandwidth, time, and disk space with
              selective downloads.
            </p>

            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/sairajB/git-ripper"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-secondary-400 hover:text-primary-400 transition-colors">
                <StarIcon className="w-5 h-5" />
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-400 hover:text-primary-400 transition-colors">
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Installation Command */}
        <div className="mt-12 p-6 bg-secondary-800 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Quick Install</h4>
          <div className="bg-secondary-900 p-4 rounded-lg font-mono text-sm">
            <span className="text-primary-400">$</span>
            <span className="text-green-400 ml-2">
              npm install -g git-ripper
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-700 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 text-secondary-400 mb-4 md:mb-0">
            <span>© {currentYear} Git-ripper. Made with</span>
            <HeartIcon className="w-4 h-4 text-red-500" />
            <span>by</span>
            <a
              href="https://github.com/sairajB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors">
              sairajB
            </a>
          </div>

          <div className="flex items-center space-x-4 text-secondary-400">
            <span className="text-sm">MIT License</span>
            <div className="flex items-center space-x-1">
              <GlobeAltIcon className="w-4 h-4" />
              <span className="text-sm">Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
