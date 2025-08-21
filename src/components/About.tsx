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



export const About: React.FC = () => {
  const professionalSkills = [
    "Desarrollo Frontend",
    "Desarrollo Backend",
    "Bases de datos",
    "Metodologías ágiles (Scrum, Kanban)",
    "Control de versiones",
    "Testing y debugging",
    "APIs REST y GraphQL",
    "Deployment y DevOps básico"
  ];

  const additionalSkills = [
    "Gestión de proyectos",
    "Comunicación efectiva",
    "Trabajo en equipo",
    "Resolución de problemas",
    "Aprendizaje autodidacta",
    "Mentoring y liderazgo",
    "Análisis de datos básico"
  ];

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
    <section className="py-0 pr-0 md:pr-4">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-white"
      >
        {/* Main heading */}
        <h1 className="text-[36px] md:text-[48px] font-bold mb-6 md:mb-8 leading-tight">About Me</h1>

        {/* Description paragraphs */}
        <div className="space-y-4 mb-6 md:mb-8 text-white/80 leading-relaxed">
          <p>
            Soy un desarrollador apasionado con 1 año de experiencia en el desarrollo
            de aplicaciones web modernas. Me especializo en tecnologías frontend y backend,
            creando soluciones eficientes y escalables.
          </p>

          <p>
            Mi enfoque se centra en escribir código limpio, implementar las mejores prácticas
            y colaborar efectivamente en equipos ágiles. Siempre busco aprender nuevas
            tecnologías y mantenerme actualizado con las tendencias del desarrollo.
          </p>
        </div>

        {/* Professional Skills Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-6 text-white">Professional Skills</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              {professionalSkills.map((skill, index) => (
                <div key={index} className="flex items-start gap-3 text-white/80">
                  <span className="text-white/40 mt-1.5">•</span>
                  <span className="text-[13px] md:text-[14px] leading-relaxed">{skill}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {additionalSkills.map((skill, index) => (
                <div key={index} className="flex items-start gap-3 text-white/80">
                  <span className="text-white/40 mt-1.5">•</span>
                  <span className="text-[13px] md:text-[14px] leading-relaxed">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stack Section */}
        <div>
          <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-6 text-white">Stack</h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-2 cursor-pointer transition-transform duration-200 hover:scale-130"
              >
                <div className="text-xl md:text-2xl mb-1 md:mb-2">{tech.icon}</div>
                <span className="text-[10px] md:text-[12px] text-white/70 text-center font-medium">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;