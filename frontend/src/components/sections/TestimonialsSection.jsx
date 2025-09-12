import React from "react";
import { motion } from "framer-motion";
import {
  StarIcon,
  HeartIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jayesh Jadhav",
      role: "Frontend Developer",
      company: "Sanyu InfoTech",
      avatar: "👩‍💻",
      content:
        "Git-ripper has completely changed how I work with large repositories. Instead of cloning entire projects just to get a component, I can download exactly what I need in seconds.",
      rating: 5,
    },
    {
      id: 2,
      name: "Parth Bhurke",
      role: "DevOps Engineer",
      company: "JABIL",
      avatar: "👨‍💼",
      content:
        "The resume functionality is a game-changer. I was downloading a large documentation folder and my connection dropped halfway through. Git-ripper picked up exactly where it left off!",
      rating: 5,
    },
    {
      id: 3,
      name: "Rudra Kochari",
      role: "Full Stack Developer",
      company: "Atlas Copco",
      avatar: "👩‍🔬",
      content:
        "Simple, fast, and reliable. I use git-ripper daily to grab configuration files and components from various open source projects. The CLI is intuitive and the output is clean.",
      rating: 5,
    },
    {
      id: 4,
      name: "Yashita Killedar",
      role: "Team Lead",
      company: "Citi Bank",
      avatar: "👨‍🚀",
      content:
        "Our team loves how git-ripper preserves the folder structure perfectly. We can quickly prototype with components from different repositories without any manual reorganization.",
      rating: 5,
    },
    {
      id: 5,
      name: "Siddesh Mengane",
      role: "Mechanic",
      company: "TATA Motors",
      avatar: "👩‍🎨",
      content:
        "The ZIP export feature is fantastic! I regularly download UI component libraries and having them automatically archived saves me so much time in my workflow.",
      rating: 5,
    },
    {
      id: 6,
      name: "Aditya Bhosale",
      role: "Software Architect",
      company: "CampusDekho.ai",
      avatar: "👨‍💻",
      content:
        'Finally, a tool that solves the "I just need this one folder" problem elegantly. Git-ripper is now part of our standard developer toolkit. Highly recommended!',
      rating: 5,
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
            <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
            <span>Developer Testimonials</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
            Loved by <span className="gradient-text">Developers</span>
          </h2>

          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what developers are saying
            about how Git-ripper has improved their workflow and productivity.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="card group hover:shadow-2xl hover:-translate-y-1">
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-4 h-4 text-accent-400 fill-current"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-secondary-700 dark:text-secondary-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-secondary-900 dark:text-secondary-100">
                    {testimonial.name}
                  </div>
                  <div className="text-secondary-600 dark:text-secondary-400 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Growing Community
            </h3>

            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Become part of a thriving community of developers who are
              revolutionizing how they work with GitHub repositories.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold mb-1">3.0K</div>
                <div className="text-primary-200">Total Downloads</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">120</div>
                <div className="text-primary-200">Weekly Downloads</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">6</div>
                <div className="text-primary-200">GitHub Stars</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="https://github.com/sairajB/git-ripper"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 hover:bg-primary-50 dark:bg-secondary-900 dark:text-primary-300 dark:hover:bg-secondary-800 font-medium py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl dark:shadow-primary-900/30 flex items-center space-x-2">
                <StarIcon className="w-5 h-5" />
                <span>Star on GitHub</span>
              </a>

              <a
                href="https://www.npmjs.com/package/git-ripper"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-200 flex items-center space-x-2">
                <HeartIcon className="w-5 h-5" />
                <span>Try Git-ripper</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
