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
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CommandLineIcon className="w-4 h-4" />
            <span>Live Examples</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
            See <span className="gradient-text">Git-ripper</span> in Action
          </h2>

          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
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
            className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-primary-600 text-white shadow-lg"
                      : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
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
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                  {examples[activeTab].title}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  {examples[activeTab].description}
                </p>
              </div>

              <div className="bg-secondary-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-secondary-800">
                  <span className="text-secondary-300 text-sm font-medium">
                    Terminal
                  </span>
                  <CopyToClipboard
                    text={examples[activeTab].command}
                    onCopy={() =>
                      handleCopy(examples[activeTab].command, activeTab)
                    }>
                    <button className="flex items-center space-x-1 text-secondary-400 hover:text-white transition-colors text-sm">
                      {copiedCommand === activeTab ? (
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
                  <div className="font-mono text-sm">
                    <span className="text-primary-400">$</span>
                    <span className="text-green-400 ml-2">
                      {examples[activeTab].command}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Output */}
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                  Output
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                  What you'll see when running this command
                </p>
              </div>

              <div className="bg-secondary-900 rounded-lg overflow-hidden">
                <div className="px-4 py-2 bg-secondary-800">
                  <span className="text-secondary-300 text-sm font-medium">
                    Output
                  </span>
                </div>

                <div className="p-4">
                  <pre className="font-mono text-sm text-secondary-300 whitespace-pre-wrap">
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
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-8 text-center">
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
                <div key={index} className="card">
                  <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                    {example.title}
                  </h4>
                  <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-3">
                    {example.description}
                  </p>
                  <div className="bg-secondary-900 rounded p-3">
                    <code className="text-green-400 text-sm font-mono">
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
