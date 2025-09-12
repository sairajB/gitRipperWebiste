import React from "react";
import { motion } from "framer-motion";
import { StarIcon, UserIcon } from "@heroicons/react/24/solid";

const Testimonials = () => {
  const testimonials = [
    {
      content:
        "Git-ripper has revolutionized my workflow. Instead of cloning massive repositories just to get a single component, I can now download exactly what I need. It's saved me hours of time and gigabytes of storage.",
      author: "Sarah Chen",
      role: "Senior Frontend Developer",
      company: "TechFlow Inc.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face",
      rating: 5,
    },
    {
      content:
        "The resume functionality is a game-changer. I was downloading a large documentation folder when my connection dropped, and Git-ripper picked up exactly where it left off. No more starting over!",
      author: "Marcus Rodriguez",
      role: "DevOps Engineer",
      company: "CloudScale Solutions",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      rating: 5,
    },
    {
      content:
        "As someone who frequently references code from large open-source projects, Git-ripper is indispensable. The ability to download specific folders and create ZIP archives makes my research so much more efficient.",
      author: "Dr. Emily Watson",
      role: "Research Scientist",
      company: "AI Research Lab",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      rating: 5,
    },
    {
      content:
        "I love how Git-ripper preserves the exact folder structure. When I need to examine how a specific feature is implemented in a large codebase, I can get just that section without any hassle.",
      author: "Alex Thompson",
      role: "Full Stack Developer",
      company: "StartupXYZ",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
      rating: 5,
    },
    {
      content:
        "The command-line interface is so intuitive. Even junior developers on our team picked it up immediately. It's become an essential tool in our development toolkit.",
      author: "Lisa Park",
      role: "Team Lead",
      company: "Digital Innovations",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face",
      rating: 5,
    },
    {
      content:
        "Git-ripper's performance is outstanding. What used to take me 10-15 minutes of cloning and navigating now takes 30 seconds. It's not just a tool, it's a productivity multiplier.",
      author: "James Wilson",
      role: "Software Architect",
      company: "MegaCorp Industries",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
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
            <UserIcon className="w-4 h-4" />
            <span>User Testimonials</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
            Loved by <span className="gradient-text">Developers</span>
          </h2>

          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what developers around the
            world are saying about Git-ripper and how it's improved their
            workflow.
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
              key={index}
              variants={itemVariants}
              className="card group hover:shadow-2xl hover:-translate-y-1">
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-accent-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-secondary-700 dark:text-secondary-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-secondary-900 dark:text-secondary-100">
                    {testimonial.author}
                  </div>
                  <div className="text-secondary-600 dark:text-secondary-400 text-sm">
                    {testimonial.role}
                  </div>
                  <div className="text-primary-600 text-sm font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Join the Community</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Be part of a growing community of developers who choose
              efficiency. Share your own Git-ripper success story and help
              others discover better workflows.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center">
                  <StarIcon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">4.9/5 Average Rating</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">3,000+ Total Downloads</span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://github.com/sairajB/git-ripper"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-600 hover:bg-primary-50 dark:bg-secondary-900 dark:text-primary-300 dark:hover:bg-secondary-800 font-medium py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl dark:shadow-primary-900/30 inline-flex items-center space-x-2">
                <StarIcon className="w-5 h-5" />
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
