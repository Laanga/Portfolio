"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import Projects from "./Projects";
import About from "./About";
import Footer from "./Footer";
import PlaceholderSection from "./PlaceholderSection";

export type SectionKey = "about" | "experience" | "education" | "projects";

type AnimatedSectionsProps = {
  active: SectionKey;
};

const variants = {
  enter: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export const AnimatedSections: React.FC<AnimatedSectionsProps> = ({ active }) => {
  const renderSection = () => {
    if (active === "about") return <About />;
    if (active === "experience") return <PlaceholderSection title="Experience" description="Add your work experience, positions held, and professional achievements here." />;
    if (active === "education") return <PlaceholderSection title="Education" description="Add your educational background, degrees, certifications, and relevant courses here." />;
    if (active === "projects") return <PlaceholderSection title="Projects" description="Showcase your best projects with descriptions, technologies used, and links to demos or repositories." />;
    return <Footer />;
  };

  return (
    <div className="relative min-h-[80vh] py-4">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          className="w-full"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSections;


