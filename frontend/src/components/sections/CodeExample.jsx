import React, { useState } from "react";
import { motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  CommandLineIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  PlayIcon,
  FolderIcon,
  ArchiveBoxIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const CodeExample = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [copiedCommand, setCopiedCommand] = useState("");

  const handleCopy = (command, id) => {
    setCopiedCommand(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedCommand(""), 2000);
  };

  const examples = {
    basic: {
      title: "Basic Usage",
      description: "Download a specific folder from any GitHub repository",
      command:
        "git-ripper https://github.com/facebook/react/tree/main/packages/react-dom",
      output: `✓ Parsing GitHub URL...
✓ Fetching folder structure...
📁 Found 45 files (2.3 MB total)
⬇️  Downloading files...
█████████████████████████████████████████ 100%
✅ Download completed: ./react-dom/`,
    },
    output: {
      title: "Custom Output Directory",
      description: "Specify where to save the downloaded folder",
      command:
        "git-ripper https://github.com/microsoft/vscode/tree/main/build -o ./vscode-build",
      output: `✓ Parsing GitHub URL...
✓ Fetching folder structure...
📁 Found 127 files (8.7 MB total)
⬇️  Downloading files...
█████████████████████████████████████████ 100%
✅ Download completed: ./vscode-build/`,
    },
    zip: {
      title: "Create ZIP Archive",
      description: "Download and automatically create a ZIP file",
      command:
        "git-ripper https://github.com/tailwindlabs/tailwindcss/tree/master/src/components --zip",
      output: `✓ Parsing GitHub URL...
✓ Fetching folder structure...
📁 Found 89 files (1.2 MB total)
⬇️  Downloading files...
█████████████████████████████████████████ 100%
📦 Creating ZIP archive...
✅ Archive created: components.zip`,
    },
    resume: {
      title: "Resume Downloads",
      description: "Automatically resume interrupted downloads",
      command: "git-ripper https://github.com/nodejs/node/tree/main/doc",
      output: `✓ Found existing checkpoint
✓ Validating downloaded files...
📁 Resuming download (23/156 files remaining)
⬇️  Downloading files...
█████████████████████████████████████████ 100%
✅ Download completed: ./doc/`,
    },
  };

  const tabs = [
    { id: "basic", label: "Basic", icon: PlayIcon },
    { id: "output", label: "Custom Output", icon: FolderIcon },
    { id: "zip", label: "ZIP Archive", icon: ArchiveBoxIcon },
    { id: "resume", label: "Resume", icon: ClockIcon },
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-[#0a0a0f] dark:via-[#0d0d15] dark:to-[#0a0a0f]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-neon-blue/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/5 dark:bg-neon-purple/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-neon-blue/10 text-blue-700 dark:text-neon-blue px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200 dark:border-neon-blue/30 backdrop-blur-sm shadow-sm dark:shadow-[0_0_20px_rgba(0,102,255,0.15)]">
            <CommandLineIcon className="w-4 h-4" />
            <span>Live Examples</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            See{" "}
            <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-blue-600 dark:from-neon-cyan dark:via-neon-purple dark:to-neon-blue bg-clip-text text-transparent">
              Git-ripper
            </span>{" "}
            in Action
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Learn how to use Git-ripper with real-world examples. From basic
            folder downloads to advanced features like resume capabilities and
            ZIP archives.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-gradient-to-r dark:from-neon-cyan/20 dark:to-neon-purple/20 text-primary-600 dark:text-neon-cyan border border-primary-200 dark:border-neon-cyan/30 shadow-md dark:shadow-[0_0_20px_rgba(0,245,255,0.2)]"
                      : "bg-gray-100 dark:bg-[#12121a] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-800/50 hover:border-primary-200 dark:hover:border-neon-cyan/30"
                  }`}>
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Example Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Command */}
            <div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {examples[activeTab].title}
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  {examples[activeTab].description}
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-[#12121a] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800/50 hover:border-primary-200 dark:hover:border-neon-cyan/30 transition-all duration-500 shadow-sm dark:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-200 dark:bg-[#0a0a0f] border-b border-gray-300 dark:border-gray-800/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                    <span className="text-gray-500 text-sm font-medium ml-2">
                      Terminal
                    </span>
                  </div>
                  <CopyToClipboard
                    text={examples[activeTab].command}
                    onCopy={() =>
                      handleCopy(examples[activeTab].command, activeTab)
                    }>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 dark:hover:text-neon-cyan transition-colors text-sm">
                      {copiedCommand === activeTab ? (
                        <>
                          <CheckIcon className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Copied!</span>
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

                <div className="p-4 bg-gray-900 dark:bg-transparent">
                  <div className="font-mono text-sm flex items-start gap-2">
                    <span className="text-gray-500 dark:text-gray-600">$</span>
                    <span className="text-primary-400 dark:text-neon-cyan">
                      {examples[activeTab].command}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output */}
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Output
                </h3>
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  What you'll see when running this command
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-[#12121a] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800/50 hover:border-purple-200 dark:hover:border-neon-purple/30 transition-all duration-500 shadow-sm dark:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="px-4 py-3 bg-gray-200 dark:bg-[#0a0a0f] border-b border-gray-300 dark:border-gray-800/50">
                  <span className="text-gray-500 text-sm font-medium">
                    Output
                  </span>
                </div>

                <div className="p-4 bg-gray-900 dark:bg-transparent">
                  <pre className="font-mono text-sm text-gray-300 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                    {examples[activeTab].output}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Commands */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              More Command Examples
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Download with custom ZIP name",
                  command:
                    'git-ripper https://github.com/repo/tree/main/src --zip="source-code.zip"',
                  description: "Create a ZIP with your preferred filename",
                },
                {
                  title: "Force restart download",
                  command:
                    "git-ripper https://github.com/repo/tree/main/docs --force-restart",
                  description: "Ignore existing checkpoints and start fresh",
                },
                {
                  title: "Disable resume functionality",
                  command:
                    "git-ripper https://github.com/repo/tree/main/tests --no-resume",
                  description: "Use traditional behavior without resume",
                },
                {
                  title: "List saved checkpoints",
                  command: "git-ripper --list-checkpoints",
                  description: "View all saved download progress",
                },
              ].map((example, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#12121a]/80 backdrop-blur-sm rounded-xl p-5 border border-gray-200 dark:border-gray-800/50 hover:border-primary-200 dark:hover:border-neon-cyan/30 transition-all duration-500 group shadow-sm hover:shadow-md dark:hover:shadow-[0_0_30px_rgba(0,245,255,0.1)]">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-neon-cyan transition-colors duration-300">
                    {example.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-500 text-sm mb-3">
                    {example.description}
                  </p>
                  <div className="bg-gray-900 dark:bg-[#0a0a0f] rounded-lg p-3 border border-gray-700 dark:border-gray-800/30">
                    <code className="text-primary-400 dark:text-neon-cyan text-sm font-mono">
                      {example.command}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodeExample;
