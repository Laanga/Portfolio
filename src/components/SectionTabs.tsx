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
      <div className="relative inline-flex rounded-3xl border border-white/[0.12] p-1.5 bg-white/[0.08] backdrop-blur-2xl overflow-hidden"
           style={{
             background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
             boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)"
           }}>
        <div className="flex gap-1 relative">
          <AnimatePresence initial={false}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className="relative z-10 rounded-2xl px-4 md:px-8 py-3 md:py-4 text-[13px] md:text-[15px] font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-all duration-500 min-w-[80px] md:min-w-[110px] tracking-[0.2px]"
                aria-pressed={activeTab === tab.key}
                aria-label={`Show ${tab.label} section`}
                tabIndex={0}
                onClick={() => handleClick(tab.key)}
                onKeyDown={(e) => handleKeyDown(e, tab.key)}
              >
                <span className={activeTab === tab.key ? "text-black font-bold" : "text-white/70 hover:text-white/90 font-medium"}>{tab.label}</span>
                {activeTab === tab.key && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 -z-10 rounded-2xl bg-white backdrop-blur-sm"
                    style={{
                      boxShadow: "0 8px 20px rgba(255,255,255,0.2), 0 2px 8px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.3)"
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 350, 
                      damping: 35,
                      mass: 0.8
                    }}
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


