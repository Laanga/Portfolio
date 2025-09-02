"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";


interface ProjectItem {
  title: string;
  description: string;
  status: string;
  statusColor: "green" | "yellow";
  technologies: string[];
  visitLink: string;
  size: "normal" | "large";
  image: string;
}

const Projects: React.FC = () => {
  const { t } = useLanguage();

  const projects: ProjectItem[] = [
    {
      title: t.projects.projectsList[0].title,
      description: t.projects.projectsList[0].description,
      status: t.projects.status[t.projects.projectsList[0].status as keyof typeof t.projects.status],
      statusColor: "green" as const,
      technologies: ["React", "Node.js", "SQLite", "Firebase"],
      visitLink: "https://github.com/Laanga/GridRush",
      size: "normal" as const,
      image: "/images/kart.png"
    },
    {
      title: t.projects.projectsList[1].title,
      description: t.projects.projectsList[1].description,
      status: t.projects.status[t.projects.projectsList[1].status as keyof typeof t.projects.status],
      statusColor: "green" as const,
      technologies: ["React", "Node.js", "SQLite"],
      visitLink: "https://github.com/Laanga/ProyectoF1",
      size: "normal" as const,
      image: "/images/f1.png"
    }
  ];

  const ProjectCard = ({ project, index, isMobile = false }: { project: ProjectItem, index: number, isMobile?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className={`group relative bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] hover:border-white/[0.2] rounded-3xl overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"
      }}
    >
      {/* Imagen superior */}
      <div className={`relative ${isMobile ? 'h-[160px]' : 'h-[200px] md:h-[220px]'} bg-gradient-to-br from-gray-800/30 to-gray-900/30 overflow-hidden`}>
        {/* Project Image */}
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Visit button */}
        <a 
          href={project.visitLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-white/90 hover:bg-white text-black rounded-2xl text-[12px] md:text-[14px] font-bold hover:scale-105 active:scale-95 transition-all duration-300 z-[4]"
          style={{
            boxShadow: "0 8px 20px rgba(255,255,255,0.15), 0 2px 6px rgba(255,255,255,0.1)"
          }}
        >
          <span>↗</span>
          <span>{t.projects.visitButton}</span>
        </a>
      </div>
      
      {/* Contenido inferior */}
      <div className="p-6 md:p-8">
        {/* Título y status */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-[18px] md:text-[22px] font-bold text-white tracking-[-0.3px] font-mono">{project.title}</h3>
          <span className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[11px] md:text-[12px] font-bold tracking-wide ${
            project.statusColor === 'green' 
              ? 'bg-green-400/90 text-green-900' 
              : 'bg-yellow-400/90 text-yellow-900'
          }`}
               style={{
                 boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
               }}>
            {project.status}
          </span>
        </div>
        
        {/* Descripción */}
        <p className="text-white/75 text-[14px] md:text-[15px] leading-relaxed mb-6 font-medium tracking-[0.1px]">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {project.technologies.map((tech, techIndex) => (
            <motion.span 
              key={techIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (index * 0.1) + (techIndex * 0.05) }}
              className="px-3 py-1.5 md:px-4 md:py-2 bg-white/[0.08] hover:bg-white/[0.12] rounded-xl text-white/80 hover:text-white text-[11px] md:text-[12px] font-semibold border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-sm transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.03)"
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-0 pr-0 md:pr-4 space-y-8 md:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="text-white"
      >
        {/* Main heading */}
        <h1 className="text-[40px] md:text-[52px] font-bold mb-10 md:mb-14 leading-tight tracking-[-1px] font-mono">{t.projects.title}</h1>
        
        {/* Mobile Layout - Una columna */}
        <div className="block md:hidden space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} isMobile={true} />
          ))}
        </div>
        
        {/* Desktop Layout - Grid moderno */}
        <div className="hidden md:block space-y-8">
          {/* Grid de proyectos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;