"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabKey = "about" | "experience" | "education" | "projects";

type SectionTabsProps = {
  activeTab: TabKey;
  onChange: (key: TabKey) => void;
};

export const SectionTabs: React.FC<SectionTabsProps> = ({ activeTab, onChange }) => {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "about", label: "About" },
    { key: "experience", label: "Experience" },
    { key: "education", label: "Education" },
    { key: "projects", label: "Projects" },
  ];

  const handleClick = (key: TabKey) => onChange(key);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, key: TabKey) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onChange(key);
  };

  return (
    <div className="mx-auto max-w-none px-0">
      <div className="relative inline-flex rounded-full border border-white/10 p-1 bg-black/40 backdrop-blur-sm supports-[backdrop-filter]:bg-black/40">
        <div className="flex gap-0 relative">
          <AnimatePresence initial={false}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className="relative z-10 rounded-full px-4 py-2 text-[13px] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-colors"
                aria-pressed={activeTab === tab.key}
                aria-label={`Show ${tab.label} section`}
                tabIndex={0}
                onClick={() => handleClick(tab.key)}
                onKeyDown={(e) => handleKeyDown(e, tab.key)}
              >
                <span className={activeTab === tab.key ? "text-black" : "text-white/70 hover:text-white/90"}>{tab.label}</span>
                {activeTab === tab.key && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SectionTabs;


