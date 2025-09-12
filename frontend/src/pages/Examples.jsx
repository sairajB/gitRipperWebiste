import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  CodeBracketIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  FolderIcon,
  ArchiveBoxIcon,
  CogIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const Examples = () => {
  const [copiedCommand, setCopiedCommand] = useState("");

  const handleCopy = (command, id) => {
    setCopiedCommand(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedCommand(""), 2000);
  };

  const categories = [
    {
      title: "Popular Repositories",
      icon: RocketLaunchIcon,
      examples: [
        {
          title: "React DOM Package",
          description: "Download the React DOM package source code",
          command:
            "git-ripper https://github.com/facebook/react/tree/main/packages/react-dom",
          size: "2.3 MB",
          files: "45 files",
        },
        {
          title: "VS Code Build Configuration",
          description: "Get VS Code build scripts and configuration files",
          command:
            "git-ripper https://github.com/microsoft/vscode/tree/main/build",
          size: "8.7 MB",
          files: "127 files",
        },
        {
          title: "Node.js Documentation",
          description: "Download Node.js documentation and guides",
          command: "git-ripper https://github.com/nodejs/node/tree/main/doc",
          size: "12.4 MB",
          files: "89 files",
        },
        {
          title: "Tailwind CSS Components",
          description: "Extract Tailwind CSS component source files",
          command:
            "git-ripper https://github.com/tailwindlabs/tailwindcss/tree/master/src/components",
          size: "1.2 MB",
          files: "34 files",
        },
      ],
    },
    {
      title: "Custom Output & ZIP",
      icon: ArchiveBoxIcon,
      examples: [
        {
          title: "Custom Output Directory",
          description: "Save downloaded content to a specific folder",
          command:
            "git-ripper https://github.com/vercel/next.js/tree/canary/examples/blog -o ./nextjs-blog-example",
          size: "156 KB",
          files: "12 files",
        },
        {
          title: "Create ZIP Archive",
          description: "Download and automatically create a ZIP file",
          command:
            "git-ripper https://github.com/mui/material-ui/tree/master/packages/mui-icons-material/lib --zip",
          size: "45.2 MB",
          files: "2,134 files",
        },
        {
          title: "Custom ZIP Name",
          description: "Create a ZIP with your preferred filename",
          command:
            'git-ripper https://github.com/webpack/webpack/tree/main/examples --zip="webpack-examples.zip"',
          size: "3.4 MB",
          files: "78 files",
        },
        {
          title: "Output + ZIP Combined",
          description: "Specify output directory and create ZIP",
          command:
            "git-ripper https://github.com/prisma/prisma/tree/main/packages/client -o ./prisma-client --zip",
          size: "892 KB",
          files: "156 files",
        },
      ],
    },
    {
      title: "Resume & Management",
      icon: CogIcon,
      examples: [
        {
          title: "Force Restart Download",
          description: "Ignore existing checkpoints and start fresh",
          command:
            "git-ripper https://github.com/tensorflow/tensorflow/tree/master/tensorflow/python --force-restart",
          size: "234 MB",
          files: "1,456 files",
        },
        {
          title: "Disable Resume Feature",
          description: "Use traditional behavior without resume capability",
          command:
            "git-ripper https://github.com/elastic/elasticsearch/tree/master/docs --no-resume",
          size: "67 MB",
          files: "789 files",
        },
        {
          title: "List Saved Checkpoints",
          description: "View all your saved download progress",
          command: "git-ripper --list-checkpoints",
          size: "-",
          files: "-",
        },
        {
          title: "Resume Interrupted Download",
          description: "Simply run the same command to resume",
          command:
            "git-ripper https://github.com/kubernetes/kubernetes/tree/master/pkg",
          size: "125 MB",
          files: "2,341 files",
        },
      ],
    },
    {
      title: "UI Libraries & Frameworks",
      icon: FolderIcon,
      examples: [
        {
          title: "Bootstrap Source Files",
          description: "Download Bootstrap SCSS source files",
          command:
            "git-ripper https://github.com/twbs/bootstrap/tree/main/scss",
          size: "456 KB",
          files: "67 files",
        },
        {
          title: "Ant Design Components",
          description: "Get Ant Design component source code",
          command:
            "git-ripper https://github.com/ant-design/ant-design/tree/master/components",
          size: "12.8 MB",
          files: "234 files",
        },
        {
          title: "Chakra UI Theme",
          description: "Download Chakra UI theme configuration",
          command:
            "git-ripper https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme",
          size: "234 KB",
          files: "45 files",
        },
        {
          title: "Vue.js Examples",
          description: "Extract Vue.js example applications",
          command: "git-ripper https://github.com/vuejs/vue/tree/dev/examples",
          size: "789 KB",
          files: "89 files",
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Examples - Git-ripper</title>
        <meta
          name="description"
          content="Real-world examples of using Git-ripper to download specific folders from popular GitHub repositories."
        />
      </Helmet>

      <div className="min-h-screen bg-white pt-16">
        {/* Header */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <CodeBracketIcon className="w-4 h-4" />
                <span>Real Examples</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
                Git-ripper <span className="gradient-text">Examples</span>
              </h1>

              <p className="text-xl text-secondary-600">
                Discover how to use Git-ripper with real-world examples from
                popular repositories. Copy and run these commands to start
                downloading specific folders instantly.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Examples */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto space-y-16">
              {categories.map((category, categoryIndex) => {
                const Icon = category.icon;

                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}>
                    {/* Category Header */}
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-3xl font-bold text-secondary-900">
                        {category.title}
                      </h2>
                    </div>

                    {/* Examples Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {category.examples.map((example, exampleIndex) => {
                        const commandId = `${categoryIndex}-${exampleIndex}`;

                        return (
                          <motion.div
                            key={exampleIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.6,
                              delay: exampleIndex * 0.1,
                            }}
                            viewport={{ once: true }}
                            className="card group hover:shadow-2xl hover:-translate-y-1">
                            {/* Example Header */}
                            <div className="mb-4">
                              <h3 className="text-xl font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                                {example.title}
                              </h3>
                              <p className="text-secondary-600 text-sm">
                                {example.description}
                              </p>
                            </div>

                            {/* Command */}
                            <div className="bg-secondary-900 rounded-lg overflow-hidden mb-4">
                              <div className="flex items-center justify-between px-4 py-2 bg-secondary-800">
                                <span className="text-secondary-300 text-sm font-medium">
                                  Command
                                </span>
                                <CopyToClipboard
                                  text={example.command}
                                  onCopy={() =>
                                    handleCopy(example.command, commandId)
                                  }>
                                  <button className="flex items-center space-x-1 text-secondary-400 hover:text-white transition-colors text-sm">
                                    {copiedCommand === commandId ? (
                                      <>
                                        <CheckIcon className="w-4 h-4" />
                                        <span>Copied!</span>
                                      </>
                                    ) : (
                                      <>
                                        <DocumentDuplicateIcon className="w-4 h-4" />
                                        <span>Copy</span>
                                      </>
                                    )}
                                  </button>
                                </CopyToClipboard>
                              </div>

                              <div className="p-4">
                                <div className="font-mono text-xs md:text-sm break-all">
                                  <span className="text-primary-400">$</span>
                                  <span className="text-green-400 ml-2">
                                    {example.command}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Stats */}
                            {example.size !== "-" && (
                              <div className="flex items-center justify-between text-sm text-secondary-600">
                                <div className="flex items-center space-x-4">
                                  <span>📁 {example.files}</span>
                                  <span>📦 {example.size}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-green-600">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-xs">Ready to use</span>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pro Tips */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-16">
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Pro Tips
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <h4 className="font-semibold mb-2">Speed Up Downloads</h4>
                    <p className="text-primary-200 text-sm">
                      Use shorter folder paths for faster processing and fewer
                      API calls.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl mb-2">🔄</div>
                    <h4 className="font-semibold mb-2">
                      Resume Large Downloads
                    </h4>
                    <p className="text-primary-200 text-sm">
                      For large folders, let Git-ripper handle interruptions
                      automatically.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl mb-2">📦</div>
                    <h4 className="font-semibold mb-2">Organize with ZIP</h4>
                    <p className="text-primary-200 text-sm">
                      Use --zip for easy sharing and archival of downloaded
                      content.
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <a
                    href="/docs"
                    className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-3 px-6 rounded-lg transition-all duration-200 inline-flex items-center space-x-2">
                    <span>View Full Documentation</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Examples;
