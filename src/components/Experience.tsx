"use client";

import React from "react";
import { motion } from "framer-motion";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: "Software Developer",
      company: "Neural.ONE - Marzo 2025 - Presente",
      period: "",
      achievements: [
        "Trafficking: Asociación de códigos de seguimiento para medición precisa de campañas y recolección de datos",
        "Desarrollo Creativo: Programación de anuncios interactivos y banners publicitarios usando HTML, CSS y JavaScript",
        "Desarrollo Web: Creación de landing pages y aplicaciones web de alto rendimiento con tecnologías modernas como React + Node.js",
        "Desarrollo y Automatización: Actualmente expandiendo habilidades técnicas aprendiendo Python, ya que es la base de nuestra principal herramienta de trafficking, para entender y optimizar flujos de trabajo futuros"
      ]
    }
  ];

  return (
    <section className="py-0 pr-0 md:pr-4">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-white"
      >
        {/* Main heading */}
        <h1 className="text-[36px] md:text-[48px] font-bold mb-6 md:mb-8 leading-tight">Experience</h1>
        
        {/* Experience items */}
        <div className="space-y-6 md:space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-6 md:mb-8">
              {/* Job title */}
              <h2 className="text-[20px] md:text-[24px] font-bold mb-2 text-white">{exp.title}</h2>
              
              {/* Company and period */}
              <h3 className="text-[14px] md:text-[16px] font-medium mb-4 md:mb-6 text-white/80">{exp.company}</h3>
              
              {/* Achievements */}
              <div className="space-y-3">
                {exp.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-start gap-3 text-white/80">
                    <span className="text-white/40 mt-1.6">•</span>
                    <span className="text-[13px] md:text-[14px] leading-relaxed">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;