import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
    { name: "Stats", href: "/stats", icon: ChartBarIcon },
    { name: "Contact", href: "/contact", icon: EnvelopeIcon },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg backdrop-blur-xl dark:bg-secondary-900/80 dark:border-secondary-700 dark:shadow-black/30"
          : "bg-transparent dark:bg-secondary-900/60"
      }`}>
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-secondary-800 dark:text-secondary-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <CommandLineIcon className="w-5 h-5 text-white" />
            </div>
            <span className="gradient-text">Git-ripper</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary-100 text-primary-700 dark:bg-secondary-700 dark:text-primary-300"
                      : "text-secondary-600 hover:text-primary-600 hover:bg-primary-50 dark:text-secondary-300 dark:hover:text-primary-300 dark:hover:bg-secondary-700/50"
                  }`}>
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg border border-secondary-200 dark:border-secondary-600 text-secondary-600 dark:text-secondary-300 hover:bg-primary-50 dark:hover:bg-secondary-700 transition-colors">
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
            <a
              href="https://www.npmjs.com/package/git-ripper"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm dark:border-primary-400 dark:text-primary-300 dark:hover:bg-primary-600/20">
              Install Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-secondary-700 transition-colors">
              {theme === "dark" ? (
                <SunIcon className="w-6 h-6" />
              ) : (
                <MoonIcon className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-secondary-700 transition-colors">
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700">
          <div className="py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-100 text-primary-700 dark:bg-secondary-700 dark:text-primary-300"
                      : "text-secondary-600 hover:text-primary-600 hover:bg-primary-50 dark:text-secondary-300 dark:hover:text-primary-300 dark:hover:bg-secondary-700/60"
                  }`}>
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
              <a
                href="https://www.npmjs.com/package/git-ripper"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full btn-primary text-center text-sm dark:bg-primary-600 dark:hover:bg-primary-500">
                Install Now
              </a>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;
