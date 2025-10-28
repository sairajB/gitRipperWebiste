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
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
      <div
        className="absolute top-40 right-20 w-12 h-12 bg-accent-400/20 rounded-full animate-float"
        style={{ animationDelay: "2s" }}></div>
      <div
        className="absolute bottom-40 left-20 w-20 h-20 bg-white/5 rounded-full animate-float"
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
            className="w-20 h-20 bg-white/10 dark:bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg dark:shadow-blue-900/50">
            <RocketLaunchIcon className="w-10 h-10" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform Your
            <span className="block text-accent-300">GitHub Workflow?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
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
            className="glass-strong rounded-xl p-6 mb-8 max-w-2xl mx-auto shadow-xl dark:shadow-black/60">
            <div className="text-primary-300 text-sm font-medium mb-2">
              Get started in seconds:
            </div>
            <div className="font-mono text-left">
              <span className="text-primary-400">$</span>
              <span className="text-green-400 ml-2">
                npm install -g git-ripper
              </span>
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
              className="bg-white text-primary-600 hover:bg-primary-50 dark:bg-gray-900 dark:text-blue-300 dark:hover:bg-gray-800 dark:border-2 dark:border-blue-500/30 dark:hover:border-blue-400/50 font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl dark:shadow-blue-900/30 transform hover:-translate-y-2 hover:scale-105 flex items-center space-x-3 text-lg backdrop-blur-sm">
              <ArrowDownIcon className="w-6 h-6" />
              <span>Install Git-ripper</span>
            </a>

            <Link
              to="/docs"
              className="border-2 border-white dark:border-blue-300 text-white dark:text-blue-100 hover:bg-white hover:text-primary-600 dark:hover:bg-blue-400/20 dark:hover:border-blue-200 font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center space-x-3 text-lg">
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
              },
              {
                icon: "🔄",
                title: "Resume Downloads",
                desc: "Never lose progress again",
              },
              {
                icon: "📦",
                title: "ZIP Archives",
                desc: "Automatic compression option",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                <p className="text-primary-200 text-sm">{feature.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-primary-200">
            <div className="flex items-center space-x-2">
              <ArrowDownIcon className="w-5 h-5" />
              <span>3.0K Total Downloads</span>
            </div>

            <div className="flex items-center space-x-2">
              <StarIcon className="w-5 h-5" />
              <span>6 GitHub Stars</span>
            </div>

            <div className="flex items-center space-x-2">
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
