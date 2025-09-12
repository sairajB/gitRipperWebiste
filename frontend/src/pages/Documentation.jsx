import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  CommandLineIcon,
  CogIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const Documentation = () => {
  const sections = [
    {
      id: "installation",
      title: "Installation",
      icon: RocketLaunchIcon,
      content: [
        {
          subtitle: "Requirements",
          text: "Git-ripper requires Node.js >=16.0.0 due to its use of modern JavaScript features and built-in Node.js modules.",
        },
        {
          subtitle: "Global Installation (Recommended)",
          code: "npm install -g git-ripper",
        },
        {
          subtitle: "On-demand Usage",
          code: "npx git-ripper <github-folder-url>",
        },
      ],
    },
    {
      id: "usage",
      title: "Basic Usage",
      icon: CommandLineIcon,
      content: [
        {
          subtitle: "Basic Command",
          code: "git-ripper https://github.com/username/repository/tree/branch/folder",
        },
        {
          subtitle: "With Custom Output Directory",
          code: "git-ripper https://github.com/username/repository/tree/branch/folder -o ./my-output-folder",
        },
        {
          subtitle: "Creating ZIP Archive",
          code: "git-ripper https://github.com/username/repository/tree/branch/folder --zip",
        },
      ],
    },
    {
      id: "options",
      title: "Command Line Options",
      icon: CogIcon,
      content: [
        {
          subtitle: "Available Options",
          table: [
            ["Option", "Description", "Default"],
            [
              "-o, --output <directory>",
              "Specify output directory",
              "Current directory",
            ],
            [
              "--zip [filename]",
              "Create ZIP archive of downloaded content",
              "-",
            ],
            ["--no-resume", "Disable resume functionality", "-"],
            ["--force-restart", "Ignore existing checkpoints and restart", "-"],
            ["--list-checkpoints", "List all saved download checkpoints", "-"],
            ["-V, --version", "Show version number", "-"],
            ["-h, --help", "Show help", "-"],
          ],
        },
      ],
    },
    {
      id: "resume",
      title: "Resume Downloads",
      icon: QuestionMarkCircleIcon,
      content: [
        {
          subtitle: "Automatic Resume (Default Behavior)",
          text: "Git-ripper automatically saves progress and can resume interrupted downloads. Simply run the same command again.",
        },
        {
          subtitle: "Force Restart",
          code: "git-ripper https://github.com/repo/tree/main/folder --force-restart",
        },
        {
          subtitle: "Disable Resume",
          code: "git-ripper https://github.com/repo/tree/main/folder --no-resume",
        },
        {
          subtitle: "Manage Checkpoints",
          code: "git-ripper --list-checkpoints",
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: ExclamationTriangleIcon,
      content: [
        {
          subtitle: "Rate Limit Exceeded",
          text: "GitHub limits unauthenticated API requests. Wait a few minutes and try again.",
          code: "Error: Request failed with status code 403",
        },
        {
          subtitle: "Invalid URL Format",
          text: "Ensure your URL follows the pattern: https://github.com/owner/repo/tree/branch/folder",
          code: "Error: Invalid GitHub URL format",
        },
        {
          subtitle: "Folder Not Found",
          text: "Verify the folder path exists in the specified branch and repository.",
          code: "Error: Path not found in repository",
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Documentation - Git-ripper</title>
        <meta
          name="description"
          content="Complete documentation for Git-ripper CLI tool. Learn installation, usage, command options, and troubleshooting."
        />
      </Helmet>

      <div className="min-h-screen pt-16">
        {/* Header */}
        <section className="section-padding bg-gradient-to-br from-primary-50/70 to-secondary-50/60 dark:from-secondary-800/60 dark:to-secondary-900/60 backdrop-blur-sm rounded-b-3xl">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <BookOpenIcon className="w-4 h-4" />
                <span>Documentation</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
                Git-ripper <span className="gradient-text">Documentation</span>
              </h1>

              <p className="text-xl text-secondary-600 dark:text-secondary-300">
                Everything you need to know about using Git-ripper to download
                specific folders from GitHub repositories efficiently.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-secondary-50 rounded-xl p-8 mb-16">
                <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                  Table of Contents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center space-x-3 p-4 bg-white rounded-lg hover:shadow-md transition-all duration-200 group">
                        <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-200">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-secondary-900 group-hover:text-primary-600 transition-colors">
                          {section.title}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Documentation Sections */}
              <div className="space-y-16">
                {sections.map((section, sectionIndex) => {
                  const Icon = section.icon;

                  return (
                    <motion.section
                      key={section.id}
                      id={section.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="scroll-mt-24">
                      <div className="flex items-center space-x-3 mb-8">
                        <div className="w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-secondary-900">
                          {section.title}
                        </h2>
                      </div>

                      <div className="space-y-8">
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex} className="card">
                            {item.subtitle && (
                              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                                {item.subtitle}
                              </h3>
                            )}

                            {item.text && (
                              <p className="text-secondary-700 mb-4 leading-relaxed">
                                {item.text}
                              </p>
                            )}

                            {item.code && (
                              <div className="bg-secondary-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                                <div className="text-green-400">
                                  {item.code.includes("$") ? (
                                    <>
                                      <span className="text-primary-400">
                                        $
                                      </span>
                                      <span className="ml-2">
                                        {item.code.replace("$ ", "")}
                                      </span>
                                    </>
                                  ) : item.code.includes("Error:") ? (
                                    <span className="text-red-400">
                                      {item.code}
                                    </span>
                                  ) : (
                                    item.code
                                  )}
                                </div>
                              </div>
                            )}

                            {item.table && (
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                  <thead>
                                    <tr className="bg-secondary-50">
                                      {item.table[0].map(
                                        (header, headerIndex) => (
                                          <th
                                            key={headerIndex}
                                            className="text-left p-4 font-semibold text-secondary-900 border-b border-secondary-200">
                                            {header}
                                          </th>
                                        )
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item.table
                                      .slice(1)
                                      .map((row, rowIndex) => (
                                        <tr
                                          key={rowIndex}
                                          className="border-b border-secondary-100">
                                          {row.map((cell, cellIndex) => (
                                            <td
                                              key={cellIndex}
                                              className="p-4 text-secondary-700">
                                              {cellIndex === 0 ? (
                                                <code className="bg-secondary-100 px-2 py-1 rounded text-sm">
                                                  {cell}
                                                </code>
                                              ) : (
                                                cell
                                              )}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.section>
                  );
                })}
              </div>

              {/* Support Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-16 text-center">
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
                  <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                    Can't find what you're looking for? Check out our examples
                    page or reach out to the community.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <a
                      href="/examples"
                      className="bg-white text-primary-600 hover:bg-primary-50 dark:bg-secondary-900 dark:text-primary-300 dark:hover:bg-secondary-800 font-medium py-3 px-6 rounded-lg transition-all duration-200">
                      View Examples
                    </a>
                    <a
                      href="https://github.com/sairajB/git-ripper/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-all duration-200">
                      Report Issues
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Documentation;
