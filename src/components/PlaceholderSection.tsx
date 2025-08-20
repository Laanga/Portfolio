"use client";

import React from "react";
import { motion } from "framer-motion";

interface PlaceholderSectionProps {
  title: string;
  description: string;
}

export const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ title, description }) => {
  return (
    <section className="py-0">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-white"
      >
        <h1 className="text-[48px] font-bold mb-8 leading-tight">{title}</h1>
        <div className="space-y-4 mb-8 text-white/80 leading-relaxed">
          <p>{description}</p>
          <p className="text-white/60 text-[14px] italic">
            This section is coming soon. The layout and styling match the reference design.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default PlaceholderSection;