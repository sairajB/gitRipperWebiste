import React from "react";
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
    <section id="features" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BoltIcon className="w-4 h-4" />
            <span>Powerful Features</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Why Choose <span className="gradient-text">Git-ripper</span>?
          </h2>

          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
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
                <div className="card group-hover:shadow-2xl group-hover:-translate-y-1 h-full">
                  {/* Highlight Badge */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-accent-400 to-accent-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    {feature.highlight}
                  </div>

                  {/* Icon */}
                  <div className="feature-icon group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-secondary-600 leading-relaxed">
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
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to experience the difference?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who have already made the switch to
              smarter GitHub downloads.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="https://www.npmjs.com/package/git-ripper"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                Install Git-ripper
              </a>
              <a
                href="/docs"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200">
                View Documentation
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
