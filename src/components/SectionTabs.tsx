"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

type TabKey = "about" | "experience" | "education" | "projects";

type SectionTabsProps = {
  activeTab: TabKey;
  onChange: (key: TabKey) => void;
};

export const SectionTabs: React.FC<SectionTabsProps> = ({ activeTab, onChange }) => {
  const { t } = useLanguage();
  
  const tabs: { key: TabKey; label: string }[] = [
    { key: "about", label: t.navigation.about },
    { key: "experience", label: t.navigation.experience },
    { key: "education", label: t.navigation.education },
    { key: "projects", label: t.navigation.projects },
  ];

  const handleClick = (key: TabKey) => onChange(key);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, key: TabKey) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onChange(key);
  };

  return (
    <div className="mx-auto max-w-none px-0">
      <div className="relative inline-flex rounded-2xl border border-white/10 p-1 bg-black/40 backdrop-blur-sm">
        <div className="flex gap-0 relative">
          <AnimatePresence initial={false}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className="relative z-10 rounded-xl px-3 md:px-6 py-2 md:py-3 text-[12px] md:text-[14px] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-colors min-w-[70px] md:min-w-[100px]"
                aria-pressed={activeTab === tab.key}
                aria-label={`Show ${tab.label} section`}
                tabIndex={0}
                onClick={() => handleClick(tab.key)}
                onKeyDown={(e) => handleKeyDown(e, tab.key)}
              >
                <span className={activeTab === tab.key ? "text-white" : "text-white/60 hover:text-white/80"}>{tab.label}</span>
                {activeTab === tab.key && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-white/10 backdrop-blur-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
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


