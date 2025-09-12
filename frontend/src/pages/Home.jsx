import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

// Sections
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import HowItWorks from "../components/sections/HowItWorks";
import CodeExample from "../components/sections/CodeExample";
import Statistics from "../components/sections/Statistics";
import Testimonials from "../components/sections/TestimonialsSection";
import CTA from "../components/sections/CTA";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Git-ripper - Selective GitHub Downloads</title>
        <meta
          name="description"
          content="Download specific folders from GitHub repositories without cloning the entire codebase. Save bandwidth, time, and disk space with Git-ripper CLI tool."
        />
        <meta
          name="keywords"
          content="git, github, download, folder, repository, clone, partial, subfolder, cli, npm"
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}>
        <Hero />
        <Features />
        <HowItWorks />
        <CodeExample />
        <Statistics />
        <Testimonials />
        <CTA />
      </motion.div>
    </>
  );
};

export default Home;
