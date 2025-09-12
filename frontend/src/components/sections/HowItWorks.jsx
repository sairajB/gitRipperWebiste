import React from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  CloudArrowDownIcon,
  DocumentCheckIcon,
  ArchiveBoxIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: MagnifyingGlassIcon,
      title: "Parse GitHub URL",
      description:
        "Git-ripper analyzes the GitHub folder URL to extract repository details, branch information, and target folder path.",
      details: [
        "Repository owner & name",
        "Branch specification",
        "Folder path validation",
      ],
    },
    {
      step: "02",
      icon: CloudArrowDownIcon,
      title: "Fetch Folder Structure",
      description:
        "Uses GitHub's API to retrieve the complete folder structure and file metadata without downloading content.",
      details: [
        "API tree traversal",
        "File metadata collection",
        "Size calculation",
      ],
    },
    {
      step: "03",
      icon: DocumentCheckIcon,
      title: "Download Files",
      description:
        "Downloads each file individually while maintaining directory structure and tracking progress with resume capability.",
      details: [
        "Parallel downloads",
        "Progress tracking",
        "Error handling & retry",
      ],
    },
    {
      step: "04",
      icon: ArchiveBoxIcon,
      title: "Organize Output",
      description:
        "Saves files to your specified directory or creates a ZIP archive with proper folder structure preserved.",
      details: [
        "Directory creation",
        "File organization",
        "Optional ZIP creation",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-secondary-800 transition-colors duration-500">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircleIcon className="w-4 h-4" />
            <span>Simple Process</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
            How <span className="gradient-text">Git-ripper</span> Works
          </h2>

          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
            Behind the scenes, Git-ripper uses an intelligent four-step process
            to efficiently download only the content you need from GitHub
            repositories.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-12`}>
                {/* Content */}
                <div className="flex-1">
                  <div className="relative">
                    {/* Step Number */}
                    <div className="text-6xl md:text-8xl font-black text-primary-100 absolute -top-8 -left-4 select-none">
                      {step.step}
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <span className="text-secondary-700 dark:text-secondary-400">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <div className="relative">
                    <div className="w-full h-64 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-2xl flex items-center justify-center">
                      <Icon className="w-24 h-24 text-white opacity-80" />
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-400 rounded-full animate-pulse"></div>
                    <div
                      className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary-400 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20">
          <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-xl p-8 border border-secondary-100 dark:border-secondary-700 transition-colors">
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6 text-center">
              Technical Implementation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                  GitHub API
                </h4>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                  Leverages GitHub's REST API for efficient tree traversal and
                  metadata collection
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CloudArrowDownIcon className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-secondary-900 mb-2">
                  Parallel Processing
                </h4>
                <p className="text-secondary-600 text-sm">
                  Concurrent downloads with intelligent rate limiting and error
                  recovery
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DocumentCheckIcon className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-secondary-900 mb-2">
                  Resume Logic
                </h4>
                <p className="text-secondary-600 text-sm">
                  Checkpoint-based resume system with file integrity
                  verification
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
