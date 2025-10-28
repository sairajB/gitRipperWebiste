import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BoltIcon,
  CloudArrowDownIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  ClockIcon,
  FolderIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const Features = () => {
  const features = [
    {
      icon: FolderIcon,
      title: "Selective Downloads",
      description:
        "Download only the folders you need instead of entire repositories, saving bandwidth and storage space.",
      highlight: "Precision targeting",
    },
    {
      icon: ArrowPathIcon,
      title: "Resume Downloads",
      description:
        "Automatically resume interrupted downloads with intelligent checkpoint management and file integrity verification.",
      highlight: "Smart recovery",
    },
    {
      icon: BoltIcon,
      title: "Lightning Fast",
      description:
        "Optimized download engine with progress tracking and parallel processing for maximum speed.",
      highlight: "High performance",
    },
    {
      icon: ShieldCheckIcon,
      title: "File Integrity",
      description:
        "Built-in verification ensures downloaded files are complete and uncorrupted with hash validation.",
      highlight: "Reliable downloads",
    },
    {
      icon: CpuChipIcon,
      title: "Lightweight",
      description:
        "Minimal dependencies and efficient code base with fast execution and low resource usage.",
      highlight: "Resource efficient",
    },
    {
      icon: ClockIcon,
      title: "Progress Tracking",
      description:
        "Real-time progress indicators with detailed file-by-file download status and time estimates.",
      highlight: "Visual feedback",
    },
    {
      icon: CloudArrowDownIcon,
      title: "Archive Export",
      description:
        "Create ZIP archives of downloaded content with custom naming and compression options.",
      highlight: "Flexible output",
    },
    {
      icon: CheckCircleIcon,
      title: "No Authentication",
      description:
        "Works with public repositories without requiring GitHub credentials or API tokens.",
      highlight: "Zero setup",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-blue-500/20 text-primary-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-primary-200 dark:border-blue-500/30">
            <BoltIcon className="w-4 h-4" />
            <span>Powerful Features</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-gray-100 mb-6">
            Why Choose <span className="gradient-text">Git-ripper</span>?
          </h2>

          <p className="text-xl text-secondary-600 dark:text-gray-300 max-w-3xl mx-auto">
            Built for developers who value efficiency. Git-ripper combines
            speed, reliability, and ease of use to revolutionize how you
            download GitHub content.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative">
                <div className="card group-hover:shadow-2xl dark:group-hover:shadow-black/40 group-hover:-translate-y-2 h-full relative overflow-hidden transition-all duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-primary-200 dark:hover:border-blue-500/30">
                  {/* Icon */}
                  <div className="feature-icon group-hover:bg-gradient-to-br group-hover:from-primary-600 group-hover:to-primary-700 dark:group-hover:from-blue-500 dark:group-hover:to-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-secondary-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-blue-600 dark:to-blue-800 rounded-2xl p-8 md:p-10 text-white shadow-2xl dark:shadow-black/40 border border-primary-500/20 dark:border-blue-500/30 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">
              Ready to experience the difference?
            </h3>
            <p className="text-primary-100 dark:text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who have already made the switch to
              smarter GitHub downloads.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="https://www.npmjs.com/package/git-ripper"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-900 text-primary-600 dark:text-blue-300 hover:bg-primary-50 dark:hover:bg-gray-800 font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-blue-900/30 hover:scale-105 hover:-translate-y-1 inline-block">
                Install Git-ripper
              </a>
              <Link
                to="/docs"
                className="border-2 border-white/80 dark:border-blue-300 text-white dark:text-blue-200 hover:bg-white hover:text-primary-600 dark:hover:bg-blue-400/20 dark:hover:text-blue-100 font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 inline-block backdrop-blur-sm">
                View Documentation
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
