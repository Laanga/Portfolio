"use client";

import React from "react";
import { motion } from "framer-motion";

export const About: React.FC = () => {
  const professionalSkills = [
    "Desarrollo Frontend (React, Vue, Angular)",
    "Desarrollo Backend (Node.js, Python, Java)",
    "Bases de datos (MySQL, MongoDB, PostgreSQL)",
    "Metodologías ágiles (Scrum, Kanban)",
    "Control de versiones (Git, GitHub)",
    "Testing y debugging",
    "APIs REST y GraphQL",
    "Deployment y DevOps básico"
  ];

  const additionalSkills = [
    "Diseño UI/UX con Figma",
    "Gestión de proyectos", 
    "Comunicación efectiva",
    "Trabajo en equipo",
    "Resolución de problemas",
    "Aprendizaje autodidacta",
    "Mentoring y liderazgo",
    "Análisis de datos básico"
  ];

  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "TypeScript", icon: "📘" },
    { name: "Node.js", icon: "🟢" },
    { name: "Python", icon: "🐍" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Git", icon: "📝" },
    { name: "Docker", icon: "🐳" },
    { name: "AWS", icon: "☁️" },
    { name: "Figma", icon: "🎨" },
    { name: "VS Code", icon: "💻" },
    { name: "Postman", icon: "📮" },
    { name: "Slack", icon: "💬" }
  ];

  return (
    <section className="py-0 pr-4">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-white"
      >
        {/* Main heading */}
        <h1 className="text-[48px] font-bold mb-8 leading-tight">About Me</h1>
        
        {/* Description paragraphs */}
        <div className="space-y-4 mb-8 text-white/80 leading-relaxed">
          <p>
            Soy un desarrollador apasionado con [X años] de experiencia en el desarrollo 
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
        <div className="mb-8">
          <h2 className="text-[24px] font-bold mb-6 text-white">Professional Skills</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              {professionalSkills.map((skill, index) => (
                <div key={index} className="flex items-start gap-3 text-white/80">
                  <span className="text-white/40 mt-1.5">•</span>
                  <span className="text-[14px] leading-relaxed">{skill}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              {additionalSkills.map((skill, index) => (
                <div key={index} className="flex items-start gap-3 text-white/80">
                  <span className="text-white/40 mt-1.5">•</span>
                  <span className="text-[14px] leading-relaxed">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stack Section */}
        <div>
          <h2 className="text-[24px] font-bold mb-6 text-white">Stack</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <span className="text-[12px] text-white/70 text-center font-medium">
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