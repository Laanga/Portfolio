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
  // Reemplaza con tu información real
  const experiences: ExperienceItem[] = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Company - Ene 2022 - Presente",
      period: "",
      achievements: [
        "Lideré el desarrollo de una aplicación web que incrementó la eficiencia del equipo en 40%",
        "Implementé arquitectura de microservicios reduciendo el tiempo de carga en 60%",
        "Mentoré a 3 desarrolladores junior y facilité su integración al equipo",
        "Colaboré con equipos de diseño y producto para entregar 15+ features"
      ]
    },
    {
      title: "Frontend Developer",
      company: "StartUp Inc - Mar 2020 - Dic 2021",
      period: "",
      achievements: [
        "Desarrollé interfaces de usuario responsive usando React y TypeScript",
        "Optimicé el rendimiento web logrando un score de 95+ en Lighthouse",
        "Integré APIs REST y GraphQL para conectar frontend con backend",
        "Implementé testing unitario aumentando la cobertura de código al 85%"
      ]
    },
    {
      title: "Junior Developer",
      company: "Digital Agency - Jun 2019 - Feb 2020",
      period: "",
      achievements: [
        "Contribuí en el desarrollo de 10+ sitios web corporativos",
        "Aprendí y apliqué mejores prácticas de HTML, CSS y JavaScript",
        "Colaboré en proyectos utilizando metodologías ágiles (Scrum)",
        "Participé en code reviews y sesiones de pair programming"
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
                    <span className="text-white/40 mt-1.5">•</span>
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