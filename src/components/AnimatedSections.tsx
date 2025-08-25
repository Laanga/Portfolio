"use client";

import React, { lazy, Suspense } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// 🚀 LAZY LOADING: Los componentes se cargan solo cuando se necesitan
const About = lazy(() => import("./About"));
const Experience = lazy(() => import("./Experience"));
const Education = lazy(() => import("./Education"));
const Projects = lazy(() => import("./Projects"));

export type SectionKey = "about" | "experience" | "education" | "projects";

type AnimatedSectionsProps = {
  active: SectionKey;
};

// ✨ MEJOR TIPADO: Sin 'as any'
const variants: Variants = {
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

// 🎨 LOADING COMPONENT: Skeleton loader elegante
const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-6 py-0">
    {/* Title skeleton */}
    <div className="h-12 bg-white/10 rounded-lg w-3/4"></div>
    
    {/* Content skeleton */}
    <div className="space-y-4">
      <div className="h-4 bg-white/8 rounded w-full"></div>
      <div className="h-4 bg-white/8 rounded w-5/6"></div>
      <div className="h-4 bg-white/8 rounded w-4/6"></div>
    </div>
    
    {/* Grid skeleton */}
    <div className="grid grid-cols-2 gap-4 mt-8">
      <div className="h-20 bg-white/6 rounded-lg"></div>
      <div className="h-20 bg-white/6 rounded-lg"></div>
      <div className="h-20 bg-white/6 rounded-lg"></div>
      <div className="h-20 bg-white/6 rounded-lg"></div>
    </div>
  </div>
);

// 📦 COMPONENTES MAPEADOS: Más limpio y mantenible
const COMPONENTS = {
  about: About,
  experience: Experience,
  education: Education,
  projects: Projects,
} as const;

export const AnimatedSections: React.FC<AnimatedSectionsProps> = ({ active }) => {
  const renderSection = () => {
    const Component = COMPONENTS[active];
    return <Component />;
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
          {/* 🔄 SUSPENSE WRAPPER: Maneja la carga diferida */}
          <Suspense fallback={<LoadingSkeleton />}>
            {renderSection()}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSections;