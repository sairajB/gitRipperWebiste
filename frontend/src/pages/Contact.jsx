import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  UserIcon,
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you'd make an API call here
      // const response = await fetch('/api/contact/send', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: EnvelopeIcon,
      title: "Email Support",
      description: "Get help with Git-ripper or report issues",
      value: "support@git-ripper.dev",
      link: "mailto:support@git-ripper.dev",
    },
    {
      icon: ChatBubbleLeftEllipsisIcon,
      title: "GitHub Discussions",
      description: "Join community discussions and Q&A",
      value: "GitHub Discussions",
      link: "https://github.com/sairajB/git-ripper/discussions",
    },
    {
      icon: ExclamationTriangleIcon,
      title: "Report Issues",
      description: "Found a bug? Let us know on GitHub",
      value: "GitHub Issues",
      link: "https://github.com/sairajB/git-ripper/issues",
    },
  ];

  const faqs = [
    {
      question: "How do I install Git-ripper?",
      answer:
        "You can install Git-ripper globally using npm: `npm install -g git-ripper`. This requires Node.js 16 or higher.",
    },
    {
      question: "Can I use Git-ripper with private repositories?",
      answer:
        "Currently, Git-ripper works with public repositories only. Support for private repositories with authentication is planned for future releases.",
    },
    {
      question: "What happens if my download is interrupted?",
      answer:
        "Git-ripper automatically saves progress and can resume interrupted downloads. Simply run the same command again to continue where you left off.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "There's no hard limit imposed by Git-ripper, but GitHub's API rate limits may affect very large downloads. The resume feature helps with this.",
    },
    {
      question: "How can I contribute to Git-ripper?",
      answer:
        "We welcome contributions! Check out our GitHub repository for contribution guidelines, open issues, and ways to help improve Git-ripper.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact - Git-ripper</title>
        <meta
          name="description"
          content="Get in touch with the Git-ripper team. Contact us for support, feedback, or contributions."
        />
      </Helmet>

      <div className="min-h-screen pt-16 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d15] to-[#0a0a0f]">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] animate-pulse"></div>
          <div
            className="absolute bottom-1/3 -right-32 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}></div>
        </div>

        {/* Header */}
        <section className="section-padding relative">
          <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 via-transparent to-transparent"></div>
          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-neon-purple/10 text-neon-purple px-4 py-2 rounded-full text-sm font-medium mb-6 border border-neon-purple/30 backdrop-blur-sm shadow-[0_0_20px_rgba(191,0,255,0.15)]">
                <EnvelopeIcon className="w-4 h-4" />
                <span>Get in Touch</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Contact{" "}
                <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-blue bg-clip-text text-transparent">
                  Git-ripper
                </span>
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed">
                Have questions, feedback, or need help? We'd love to hear from
                you. Reach out to our team and we'll get back to you as soon as
                possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="section-padding relative">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                const colors = ["neon-cyan", "neon-purple", "neon-blue"];
                const currentColor = colors[index];

                return (
                  <motion.a
                    key={method.title}
                    href={method.link}
                    target={method.link.startsWith("http") ? "_blank" : "_self"}
                    rel={
                      method.link.startsWith("http")
                        ? "noopener noreferrer"
                        : ""
                    }
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-[#12121a]/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-800/50 hover:border-neon-cyan/30 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(0,245,255,0.1)] hover:-translate-y-2">
                    <div
                      className={`w-16 h-16 bg-${currentColor}/10 border border-${currentColor}/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-${currentColor}/20 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all duration-500`}>
                      <Icon className={`w-8 h-8 text-${currentColor}`} />
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                      {method.title}
                    </h3>

                    <p className="text-gray-500 mb-3 text-sm">
                      {method.description}
                    </p>

                    <span className="text-neon-cyan font-medium text-sm">
                      {method.value}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Contact Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}>
                <div className="bg-[#12121a]/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:border-neon-cyan/20 transition-all duration-500">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 pl-12 rounded-xl transition-all duration-300 bg-[#0a0a0f] text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 ${
                            errors.name
                              ? "border-2 border-red-500"
                              : "border border-gray-800/50 focus:border-neon-cyan/50"
                          }`}
                          placeholder="Enter your full name"
                        />
                        <UserIcon className="w-5 h-5 text-gray-600 absolute left-4 top-1/2 transform -translate-y-1/2" />
                      </div>
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 pl-12 rounded-xl transition-all duration-300 bg-[#0a0a0f] text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 ${
                            errors.email
                              ? "border-2 border-red-500"
                              : "border border-gray-800/50 focus:border-neon-cyan/50"
                          }`}
                          placeholder="your.email@example.com"
                        />
                        <EnvelopeIcon className="w-5 h-5 text-gray-600 absolute left-4 top-1/2 transform -translate-y-1/2" />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl transition-all duration-300 bg-[#0a0a0f] text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 ${
                          errors.subject
                            ? "border-2 border-red-500"
                            : "border border-gray-800/50 focus:border-neon-cyan/50"
                        }`}
                        placeholder="What's this about?"
                      />
                      {errors.subject && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-xl transition-all duration-300 resize-none bg-[#0a0a0f] text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 ${
                          errors.message
                            ? "border-2 border-red-500"
                            : "border border-gray-800/50 focus:border-neon-cyan/50"
                        }`}
                        placeholder="Tell us more about your question or feedback..."
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-neon-cyan to-neon-blue text-[#0a0a0f] font-semibold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:shadow-[0_0_50px_rgba(0,245,255,0.5)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0a0a0f]"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <PaperAirplaneIcon className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}>
                <h2 className="text-2xl font-bold text-white mb-8">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      className="bg-[#12121a]/80 backdrop-blur-sm rounded-xl p-5 border border-gray-800/50 hover:border-neon-purple/30 transition-all duration-500 group">
                      <h3 className="font-semibold text-white mb-3 flex items-start space-x-2 group-hover:text-neon-cyan transition-colors duration-300">
                        <CheckCircleIcon className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-gray-500 leading-relaxed pl-7">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Help */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="mt-8 relative overflow-hidden bg-gradient-to-r from-neon-purple/20 via-neon-blue/20 to-neon-cyan/20 rounded-2xl p-6 text-white border border-neon-cyan/30 shadow-[0_0_30px_rgba(0,245,255,0.1)]">
                  <div className="absolute inset-0 bg-[#0a0a0f]/60 backdrop-blur-sm"></div>
                  <div className="relative z-10">
                    <h3 className="font-semibold mb-2 text-neon-cyan">
                      Still need help?
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Check out our documentation or browse community
                      discussions for more answers.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      <Link
                        to="/docs"
                        className="text-center bg-neon-cyan/20 hover:bg-neon-cyan/30 border border-neon-cyan/30 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 text-neon-cyan">
                        View Documentation
                      </Link>
                      <a
                        href="https://github.com/sairajB/git-ripper/discussions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center border border-neon-purple/30 hover:bg-neon-purple/20 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 text-neon-purple">
                        Join Discussions
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
