"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaJava,
  FaPhp,
  FaNodeJs,
  FaPython,
  FaGithub,
  FaDocker,
  FaAws
} from "react-icons/fa";
import { SiJavascript, SiMysql } from "react-icons/si";
import { useLanguage } from "../i18n/LanguageContext";



export const About: React.FC = () => {
  const { t } = useLanguage();

 const techStack = [
  { name: "React", icon: <FaReact style={{ color: '#FFFFFF' }} /> },
  { name: "JavaScript", icon: <SiJavascript style={{ color: '#FFFFFF' }} /> },
  { name: "Java", icon: <FaJava style={{ color: '#FFFFFF' }} /> },
  { name: "PHP", icon: <FaPhp style={{ color: '#FFFFFF' }} /> },
  { name: "Node.js", icon: <FaNodeJs style={{ color: '#FFFFFF' }} /> },
  { name: "Python", icon: <FaPython style={{ color: '#FFFFFF' }} /> },
  { name: "MySQL", icon: <SiMysql style={{ color: '#FFFFFF' }} /> },
  { name: "GitHub", icon: <FaGithub style={{ color: '#FFFFFF' }} /> },
  { name: "Docker", icon: <FaDocker style={{ color: '#FFFFFF' }} /> },
  { name: "AWS", icon: <FaAws style={{ color: '#FFFFFF' }} /> },
];


  return (
    <section className="py-0 pr-0 md:pr-4 space-y-8 md:space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="text-white"
      >
        {/* Main heading */}
        <h1 className="text-[40px] md:text-[52px] font-bold mb-8 md:mb-12 leading-tight tracking-[-1px] font-mono">{t.about.title}</h1>

        {/* Description Card */}
        <div className="relative rounded-3xl bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] p-8 md:p-10 mb-8 md:mb-12 overflow-hidden"
             style={{
               background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
               boxShadow: "0 16px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"
             }}>
          <div className="space-y-6 text-white/80 leading-relaxed text-[15px] md:text-[16px]">
            <p className="font-medium tracking-[0.1px]">
              {t.about.description1}
            </p>

            <p className="font-medium tracking-[0.1px]">
              {t.about.description2}
            </p>
          </div>
        </div>

        {/* Professional Skills Section */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-[24px] md:text-[28px] font-bold mb-6 md:mb-8 text-white tracking-[-0.6px] font-mono">{t.about.professionalSkillsTitle}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="relative rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 overflow-hidden"
                 style={{
                   background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                   boxShadow: "0 12px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)"
                 }}>
              <div className="space-y-4">
                {t.about.professionalSkills.map((skill, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center gap-3 text-white/80 py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-white/60"></div>
                    <span className="text-[14px] md:text-[15px] leading-relaxed font-medium tracking-[0.1px]">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 overflow-hidden"
                 style={{
                   background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                   boxShadow: "0 12px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)"
                 }}>
              <div className="space-y-4">
                {t.about.additionalSkills.map((skill, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index + t.about.professionalSkills.length) * 0.05 }}
                    className="flex items-center gap-3 text-white/80 py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-white/60"></div>
                    <span className="text-[14px] md:text-[15px] leading-relaxed font-medium tracking-[0.1px]">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stack Section */}
        <div>
          <h2 className="text-[24px] md:text-[28px] font-bold mb-6 md:mb-8 text-white tracking-[-0.6px] font-mono">{t.about.stackTitle}</h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                className="group relative rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] backdrop-blur-lg border border-white/[0.08] hover:border-white/[0.15] p-4 md:p-6 cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
                style={{
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.04)"
                }}
              >
                {/* Subtle inner glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                     style={{
                       background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 70%)"
                     }}
                />
                
                <div className="relative flex flex-col items-center justify-center text-center">
                  <div className="text-2xl md:text-3xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                  <span className="text-[11px] md:text-[13px] text-white/70 group-hover:text-white/90 font-semibold tracking-[0.2px] transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;