import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

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

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-secondary-800 dark:text-secondary-100 transition-colors duration-300 relative">
        {/* Subtle radial accent (light) / vignette (dark) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent)]"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(14,165,233,0.12), transparent 60%), radial-gradient(circle at 80% 70%, rgba(99,102,241,0.12), transparent 65%)",
          }}></div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden dark:block"
          style={{
            background:
              "radial-gradient(circle at 20% 25%, rgba(30,58,138,0.35), transparent 60%), radial-gradient(circle at 80% 70%, rgba(15,23,42,0.55), transparent 70%)",
          }}></div>
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/web-interface" element={<WebInterface />} />
          </Routes>
        </motion.main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
