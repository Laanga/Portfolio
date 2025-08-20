"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import Projects from "./Projects";
import About from "./About";
import Footer from "./Footer";

export type SectionKey = "inicio" | "proyectos" | "sobre-mi" | "contacto";

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
    if (active === "inicio") return <Hero />;
    if (active === "proyectos") return <Projects />;
    if (active === "sobre-mi") return <About />;
    return <Footer />;
  };

  return (
    <div className="relative min-h-[60vh]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSections;


