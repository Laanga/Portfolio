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
    }
  ];

  const ProjectCard = ({ project, index, isMobile = false }: { project: ProjectItem, index: number, isMobile?: boolean }) => (
    <div
      className={`relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl overflow-hidden p-0`}
    >
      {/* Imagen superior */}
      <div className={`relative ${isMobile ? 'h-[150px]' : 'h-[180px] md:h-[200px]'} bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-b border-white/10 overflow-hidden`}>
        {/* Project Image */}
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Visit button */}
        <a 
          href={project.visitLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-1 px-2.5 py-1.5 md:px-3 md:py-1.5 bg-black/60 backdrop-blur-sm border border-white/20 rounded-md text-white text-xs md:text-sm hover:bg-black/70 transition-all cursor-pointer z-[4]"
        >
          <span className="text-blue-400">↗</span>
          <span>{t.projects.visitButton}</span>
        </a>
      </div>
      
      {/* Contenido inferior */}
      <div className="p-4 md:p-6">
        {/* Título y status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-[16px] md:text-[20px] font-bold text-white">{project.title}</h3>
          <span className={`px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-[11px] font-medium ${
            project.statusColor === 'green' ? 'bg-green-500 text-black' : 'bg-yellow-400 text-black'
          }`}>
            {project.status}
          </span>
        </div>
        
        {/* Descripción */}
        <p className="text-white/70 text-[12px] md:text-[13px] leading-relaxed mb-3 md:mb-4">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {project.technologies.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="px-2 py-0.5 md:px-2.5 md:py-1 bg-white/10 rounded-md text-white/80 text-[10px] md:text-[11px] font-medium border border-white/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-0 pr-0 md:pr-4">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-white"
      >
        {/* Main heading */}
        <h1 className="text-[36px] md:text-[48px] font-bold mb-6 md:mb-8 leading-tight">{t.projects.title}</h1>
        
        {/* Mobile Layout - Una columna */}
        <div className="block md:hidden space-y-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} isMobile={true} />
          ))}
        </div>
        
        {/* Desktop Layout - Como el diseño original */}
        <div className="hidden md:block space-y-6">
          {/* Primera fila - 2 proyectos lado a lado */}
          <div className="grid grid-cols-2 gap-6">
            {projects.slice(0, 2).map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
          
          {/* Segunda fila - 1 proyecto centrado */}
          <div className="flex justify-center">
            <div className="w-1/2">
              {projects.slice(2).map((project, index) => (
                <ProjectCard key={index + 2} project={project} index={index + 2} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;