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
      gradient: "from-cyan-500 to-blue-500",
      glowColor: "cyan",
    },
    {
      icon: ArrowPathIcon,
      title: "Resume Downloads",
      description:
        "Automatically resume interrupted downloads with intelligent checkpoint management and file integrity verification.",
      highlight: "Smart recovery",
      gradient: "from-purple-500 to-pink-500",
      glowColor: "purple",
    },
    {
      icon: BoltIcon,
      title: "Lightning Fast",
      description:
        "Optimized download engine with progress tracking and parallel processing for maximum speed.",
      highlight: "High performance",
      gradient: "from-amber-500 to-orange-500",
      glowColor: "amber",
    },
    {
      icon: ShieldCheckIcon,
      title: "File Integrity",
      description:
        "Built-in verification ensures downloaded files are complete and uncorrupted with hash validation.",
      highlight: "Reliable downloads",
      gradient: "from-emerald-500 to-teal-500",
      glowColor: "emerald",
    },
    {
      icon: CpuChipIcon,
      title: "Lightweight",
      description:
        "Minimal dependencies and efficient code base with fast execution and low resource usage.",
      highlight: "Resource efficient",
      gradient: "from-blue-500 to-indigo-500",
      glowColor: "blue",
    },
    {
      icon: ClockIcon,
      title: "Progress Tracking",
      description:
        "Real-time progress indicators with detailed file-by-file download status and time estimates.",
      highlight: "Visual feedback",
      gradient: "from-rose-500 to-pink-500",
      glowColor: "rose",
    },
    {
      icon: CloudArrowDownIcon,
      title: "Archive Export",
      description:
        "Create ZIP archives of downloaded content with custom naming and compression options.",
      highlight: "Flexible output",
      gradient: "from-violet-500 to-purple-500",
      glowColor: "violet",
    },
    {
      icon: CheckCircleIcon,
      title: "No Authentication",
      description:
        "Works with public repositories without requiring GitHub credentials or API tokens.",
      highlight: "Zero setup",
      gradient: "from-teal-500 to-cyan-500",
      glowColor: "teal",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background ambient effects */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34, 211, 238, 0.03), transparent)",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-cyan-500/10 text-primary-700 dark:text-cyan-300 px-5 py-2.5 rounded-full text-sm font-medium mb-6 border border-primary-200 dark:border-cyan-500/20">
            <BoltIcon className="w-4 h-4" />
            <span>Powerful Features</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-900 dark:text-white mb-6 tracking-tight">
            Why Choose <span className="gradient-text">Git-ripper</span>?
          </h2>

          <p className="text-xl text-secondary-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="card h-full relative overflow-hidden dark:hover:border-cyan-500/30">
                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.1), transparent 70%)`,
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`feature-icon bg-gradient-to-br ${feature.gradient} text-white group-hover:shadow-lg dark:group-hover:shadow-neon/30 transition-all duration-300`}>
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-secondary-600 dark:text-gray-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </motion.div>
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
          className="text-center mt-20">
          <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-600 dark:via-blue-700 dark:to-purple-700 rounded-3xl p-10 md:p-12 text-white shadow-2xl dark:shadow-neon/20 overflow-hidden">
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23fff' stroke-opacity='0.3'%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to experience the difference?
              </h3>
              <p className="text-cyan-100 dark:text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Join thousands of developers who have already made the switch to
                smarter GitHub downloads.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.npmjs.com/package/git-ripper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-charcoal-900 text-cyan-600 dark:text-cyan-300 hover:bg-gray-50 dark:hover:bg-charcoal-800 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-block">
                  Install Git-ripper
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/docs"
                    className="border-2 border-white/70 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-block backdrop-blur-sm">
                    View Documentation
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
