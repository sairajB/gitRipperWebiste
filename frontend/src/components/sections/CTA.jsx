import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RocketLaunchIcon,
  ArrowDownIcon,
  DocumentTextIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const CTA = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#0d0d15] to-[#0a0a0f]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[150px] animate-pulse"
          style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[200px]"></div>
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full animate-float"></div>
      <div
        className="absolute top-40 right-20 w-12 h-12 bg-neon-purple/10 border border-neon-purple/30 rounded-full animate-float"
        style={{ animationDelay: "2s" }}></div>
      <div
        className="absolute bottom-40 left-20 w-20 h-20 bg-neon-blue/5 border border-neon-blue/20 rounded-full animate-float"
        style={{ animationDelay: "4s" }}></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-20 h-20 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/30 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,245,255,0.2)] backdrop-blur-sm">
            <RocketLaunchIcon className="w-10 h-10 text-neon-cyan" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-blue bg-clip-text text-transparent">
              GitHub Workflow?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
            Join thousands of developers who have already discovered the power
            of selective downloads. Install Git-ripper today and start saving
            time, bandwidth, and storage space.
          </motion.p>

          {/* Installation Command */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#12121a]/80 backdrop-blur-sm border border-neon-cyan/30 rounded-xl p-6 mb-8 max-w-2xl mx-auto shadow-[0_0_30px_rgba(0,245,255,0.1)]">
            <div className="text-neon-cyan text-sm font-medium mb-2">
              Get started in seconds:
            </div>
            <div className="font-mono text-left flex items-center gap-2">
              <span className="text-gray-500">$</span>
              <span className="text-neon-cyan">npm install -g git-ripper</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <a
              href="https://www.npmjs.com/package/git-ripper"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-neon-cyan to-neon-blue text-[#0a0a0f] font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:shadow-[0_0_50px_rgba(0,245,255,0.5)] transform hover:-translate-y-2 hover:scale-105 flex items-center space-x-3 text-lg">
              <ArrowDownIcon className="w-6 h-6" />
              <span>Install Git-ripper</span>
            </a>

            <Link
              to="/docs"
              className="border-2 border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center space-x-3 text-lg hover:shadow-[0_0_30px_rgba(191,0,255,0.2)]">
              <DocumentTextIcon className="w-6 h-6" />
              <span>View Documentation</span>
            </Link>
          </motion.div>

          {/* Features Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Download only what you need",
                color: "neon-cyan",
              },
              {
                icon: "🔄",
                title: "Resume Downloads",
                desc: "Never lose progress again",
                color: "neon-purple",
              },
              {
                icon: "📦",
                title: "ZIP Archives",
                desc: "Automatic compression option",
                color: "neon-blue",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1 text-white group-hover:text-neon-cyan transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500">
            <div className="flex items-center space-x-2 group hover:text-neon-cyan transition-colors duration-300">
              <ArrowDownIcon className="w-5 h-5" />
              <span>3.0K Total Downloads</span>
            </div>

            <div className="flex items-center space-x-2 group hover:text-yellow-400 transition-colors duration-300">
              <StarIcon className="w-5 h-5" />
              <span>6 GitHub Stars</span>
            </div>

            <div className="flex items-center space-x-2 group hover:text-neon-purple transition-colors duration-300">
              <span className="text-lg">💝</span>
              <span>98% User Satisfaction</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
