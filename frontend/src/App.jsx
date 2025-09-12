import React from "react";
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

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.main>

      <Footer />
    </div>
  );
}

export default App;
