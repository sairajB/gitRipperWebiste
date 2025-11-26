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
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#0d0d15] to-[#0a0a0f]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-neon-purple/10 text-neon-purple px-4 py-2 rounded-full text-sm font-medium mb-6 border border-neon-purple/30 backdrop-blur-sm shadow-[0_0_20px_rgba(191,0,255,0.15)]">
            <CheckCircleIcon className="w-4 h-4" />
            <span>Simple Process</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            How{" "}
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-blue bg-clip-text text-transparent">
              Git-ripper
            </span>{" "}
            Works
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
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
          className="space-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;
            const neonColors = [
              "neon-cyan",
              "neon-purple",
              "neon-blue",
              "neon-cyan",
            ];
            const currentColor = neonColors[index];

            return (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-12 group`}>
                {/* Content */}
                <div className="flex-1">
                  <div className="relative">
                    {/* Step Number */}
                    <div
                      className={`text-6xl md:text-8xl font-black absolute -top-8 -left-4 select-none bg-gradient-to-br from-${currentColor}/20 to-transparent bg-clip-text text-transparent`}>
                      {step.step}
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br from-${currentColor}/30 to-${currentColor}/10 rounded-xl flex items-center justify-center border border-${currentColor}/30 shadow-[0_0_30px_rgba(0,245,255,0.2)] group-hover:shadow-[0_0_40px_rgba(0,245,255,0.3)] transition-shadow duration-500`}>
                          <Icon className={`w-8 h-8 text-${currentColor}`} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-neon-cyan transition-colors duration-300">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-center space-x-3 group/item">
                            <div
                              className={`w-2 h-2 bg-${currentColor} rounded-full shadow-[0_0_10px] shadow-${currentColor}/50`}></div>
                            <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
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
                  <div className="relative group/visual">
                    <div
                      className={`w-full h-64 bg-gradient-to-br from-[#12121a] to-[#0a0a0f] rounded-2xl border border-gray-800/50 flex items-center justify-center overflow-hidden group-hover/visual:border-${currentColor}/30 transition-all duration-500 group-hover/visual:shadow-[0_0_40px_rgba(0,245,255,0.15)]`}>
                      {/* Grid pattern */}
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                          backgroundSize: "24px 24px",
                        }}></div>

                      {/* Glow effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-${currentColor}/10 via-transparent to-neon-purple/10 opacity-0 group-hover/visual:opacity-100 transition-opacity duration-500`}></div>

                      <Icon
                        className={`w-24 h-24 text-${currentColor} opacity-60 group-hover/visual:opacity-100 group-hover/visual:scale-110 transition-all duration-500 relative z-10 drop-shadow-[0_0_20px_rgba(0,245,255,0.5)]`}
                      />
                    </div>

                    {/* Decorative elements */}
                    <div
                      className={`absolute -top-4 -right-4 w-8 h-8 bg-${currentColor}/30 border border-${currentColor}/50 rounded-full animate-pulse shadow-[0_0_20px] shadow-${currentColor}/30`}></div>
                    <div
                      className="absolute -bottom-4 -left-4 w-6 h-6 bg-neon-purple/30 border border-neon-purple/50 rounded-full animate-pulse shadow-[0_0_15px] shadow-neon-purple/30"
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
          <div className="bg-[#12121a]/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:border-neon-cyan/20 transition-all duration-500">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Technical Implementation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-neon-cyan/10 text-neon-cyan rounded-xl flex items-center justify-center mx-auto mb-4 border border-neon-cyan/30 group-hover:bg-neon-cyan/20 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all duration-500">
                  <MagnifyingGlassIcon className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                  GitHub API
                </h4>
                <p className="text-gray-500 text-sm">
                  Leverages GitHub's REST API for efficient tree traversal and
                  metadata collection
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-neon-purple/10 text-neon-purple rounded-xl flex items-center justify-center mx-auto mb-4 border border-neon-purple/30 group-hover:bg-neon-purple/20 group-hover:shadow-[0_0_30px_rgba(191,0,255,0.3)] transition-all duration-500">
                  <CloudArrowDownIcon className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-white mb-2 group-hover:text-neon-purple transition-colors duration-300">
                  Parallel Processing
                </h4>
                <p className="text-gray-500 text-sm">
                  Concurrent downloads with intelligent rate limiting and error
                  recovery
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-neon-blue/10 text-neon-blue rounded-xl flex items-center justify-center mx-auto mb-4 border border-neon-blue/30 group-hover:bg-neon-blue/20 group-hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] transition-all duration-500">
                  <DocumentCheckIcon className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                  Resume Logic
                </h4>
                <p className="text-gray-500 text-sm">
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
