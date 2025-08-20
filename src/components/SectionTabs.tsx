"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabKey = "inicio" | "proyectos" | "sobre-mi" | "contacto";

type SectionTabsProps = {
  activeTab: TabKey;
  onChange: (key: TabKey) => void;
};

export const SectionTabs: React.FC<SectionTabsProps> = ({ activeTab, onChange }) => {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "inicio", label: "Inicio" },
    { key: "proyectos", label: "Proyectos" },
    { key: "sobre-mi", label: "Sobre mí" },
    { key: "contacto", label: "Contacto" },
  ];

  const handleClick = (key: TabKey) => onChange(key);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, key: TabKey) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onChange(key);
  };

  return (
    <div className="mx-auto max-w-none px-0">
      <div className="relative inline-flex rounded-full border border-foreground/15 p-1 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex gap-1 relative">
          <AnimatePresence initial={false}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className="relative z-10 rounded-full px-4 sm:px-5 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
                aria-pressed={activeTab === tab.key}
                aria-label={`Mostrar sección ${tab.label}`}
                tabIndex={0}
                onClick={() => handleClick(tab.key)}
                onKeyDown={(e) => handleKeyDown(e, tab.key)}
              >
                <span className={activeTab === tab.key ? "text-background" : "text-foreground/70"}>{tab.label}</span>
                {activeTab === tab.key && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-foreground"
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


