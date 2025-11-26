import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  CommandLineIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  ChartBarIcon,
  EnvelopeIcon,
  SunIcon,
  MoonIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/", icon: CommandLineIcon },
    { name: "Documentation", href: "/docs", icon: DocumentTextIcon },
    { name: "Examples", href: "/examples", icon: CodeBracketIcon },
    { name: "Web Interface", href: "/web-interface", icon: ArrowDownTrayIcon },
    { name: "Stats", href: "/stats", icon: ChartBarIcon },
    { name: "Contact", href: "/contact", icon: EnvelopeIcon },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-strong shadow-xl dark:shadow-none"
          : "bg-white/60 dark:bg-transparent backdrop-blur-sm"
      }`}>
      {/* Neon border bottom on scroll */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.5), rgba(168, 85, 247, 0.5), transparent)"
              : "linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.3), transparent)",
        }}
      />

      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-lg md:text-xl font-bold text-secondary-800 dark:text-white hover:text-primary-600 dark:hover:text-cyan-400 transition-colors group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 to-blue-600 dark:from-cyan-400 dark:to-purple-500 rounded-lg flex items-center justify-center shadow-lg dark:shadow-neon">
              <CommandLineIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </motion.div>
            <span className="gradient-text font-extrabold tracking-tight">
              Git-ripper
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link key={item.name} to={item.href} className="relative group">
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300"
                        : "text-secondary-600 hover:text-primary-600 hover:bg-primary-50/50 dark:text-gray-300 dark:hover:text-cyan-300 dark:hover:bg-cyan-500/10"
                    }`}>
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </motion.div>

                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-cyan-400 dark:to-purple-500 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2.5 rounded-xl border border-secondary-200 dark:border-gray-700/50 text-secondary-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-cyan-500/10 dark:hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg dark:hover:shadow-neon/20">
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <SunIcon className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <MoonIcon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.npmjs.com/package/git-ripper"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm px-4 py-2 dark:border-cyan-400/50 dark:text-cyan-300 dark:hover:bg-cyan-500/15 dark:hover:border-cyan-400 dark:hover:shadow-neon/30 transition-all duration-300">
              Install Now
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-cyan-300 hover:bg-primary-50 dark:hover:bg-cyan-500/10 transition-colors">
              {theme === "dark" ? (
                <SunIcon className="w-6 h-6" />
              ) : (
                <MoonIcon className="w-6 h-6" />
              )}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-secondary-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-cyan-300 hover:bg-primary-50 dark:hover:bg-cyan-500/10 transition-colors">
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <XMarkIcon className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <Bars3Icon className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden glass-strong rounded-b-2xl border-t border-secondary-200 dark:border-cyan-500/10">
              <div className="py-4 space-y-1 px-2">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}>
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300 dark:shadow-neon/10"
                            : "text-secondary-600 hover:text-primary-600 hover:bg-primary-50 dark:text-gray-300 dark:hover:text-cyan-300 dark:hover:bg-cyan-500/10"
                        }`}>
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4 px-2 border-t border-secondary-200 dark:border-cyan-500/10">
                  <a
                    href="https://www.npmjs.com/package/git-ripper"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full btn-primary text-center text-sm">
                    Install Now
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
