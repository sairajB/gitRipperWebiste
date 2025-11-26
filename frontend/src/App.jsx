import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import Examples from "./pages/Examples";
import Stats from "./pages/Stats";
import Contact from "./pages/Contact";
import WebInterface from "./pages/WebInterface";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/web-interface" element={<WebInterface />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-secondary-800 dark:text-gray-100 transition-colors duration-500 relative overflow-hidden">
        {/* Ambient background gradients */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 opacity-60 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(14,165,233,0.08), transparent 50%), radial-gradient(circle at 80% 70%, rgba(99,102,241,0.08), transparent 55%)",
          }}
        />

        {/* Dark mode ambient glow effects */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 hidden dark:block"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(34,211,238,0.12), transparent 50%), radial-gradient(ellipse 60% 40% at 90% 100%, rgba(168,85,247,0.08), transparent 50%), radial-gradient(ellipse 40% 30% at 50% 50%, rgba(99,102,241,0.05), transparent 60%)",
          }}
        />

        {/* Subtle grid pattern for dark mode */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 hidden dark:block opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2322d3ee' stroke-opacity='0.03'%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Header />
        <main className="pt-16 relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
