"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-0 pr-0 md:pr-4 space-y-8 md:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="text-white"
      >
        {/* Main heading */}
        <h1 className="text-[40px] md:text-[52px] font-bold mb-10 md:mb-14 leading-tight tracking-[-1px] font-mono">{t.experience.title}</h1>
        
        {/* Experience items */}
        <div className="space-y-8 md:space-y-10">
          {t.experience.experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="relative rounded-3xl bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] p-8 md:p-10 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"
              }}
            >
              {/* iOS-style subtle inner glow */}
              <div className="absolute inset-0 rounded-3xl opacity-30"
                   style={{
                     background: "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)"
                   }}
              />
              
              <div className="relative">
                {/* Job title */}
                <h2 className="text-[24px] md:text-[28px] font-bold mb-3 text-white tracking-[-0.6px] font-mono">{exp.title}</h2>
                
                {/* Company and period */}
                <h3 className="text-[16px] md:text-[18px] font-semibold mb-6 md:mb-8 text-white/70 tracking-[0.1px]">{exp.company}</h3>
                
                {/* Achievements */}
                <div className="space-y-4 md:space-y-5">
                  {exp.achievements.map((achievement, achIndex) => (
                    <motion.div 
                      key={achIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + (achIndex * 0.08) }}
                      className="flex items-start gap-4 text-white/80 py-3 px-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-white/60 mt-2 flex-shrink-0"></div>
                      <span className="text-[14px] md:text-[15px] leading-relaxed font-medium tracking-[0.1px]">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;