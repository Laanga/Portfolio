"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProjectItem {
  title: string;
  description: string;
  status: string;
  statusColor: "green" | "yellow";
  technologies: string[];
  visitLink: string;
  size: "normal" | "large";
}

const Projects: React.FC = () => {
  // Reemplaza con tus proyectos reales
  const projects: ProjectItem[] = [
    {
      title: "E-Commerce Platform",
      description: "Plataforma completa de comercio electrónico con carrito de compras, pagos integrados y panel de administración.",
      status: "Completado",
      statusColor: "green",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      visitLink: "https://tuproyecto1.com",
      size: "normal"
    },
    {
      title: "Task Management App", 
      description: "Aplicación web para gestión de tareas con funcionalidades de colaboración en tiempo real y notificaciones.",
      status: "En desarrollo",
      statusColor: "yellow",
      technologies: ["Vue.js", "Firebase", "Tailwind", "PWA"],
      visitLink: "https://tuproyecto2.com",
      size: "normal"
    },
    {
      title: "Weather Dashboard",
      description: "Dashboard interactivo del clima con gráficos, pronósticos extendidos y geolocalización automática.",
      status: "Completado",
      statusColor: "green", 
      technologies: ["React", "Chart.js", "Weather API", "Vercel"],
      visitLink: "https://tuproyecto3.com",
      size: "large"
    }
  ];

  return (
    <section className="py-0 pr-4">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-white"
      >
        {/* Main heading - exactamente igual que About y Experience */}
        <h1 className="text-[48px] font-bold mb-8 leading-tight">Projects</h1>
        
        {/* Projects layout - exacto como la foto */}
        <div className="space-y-6">
          {/* Primera fila - 2 proyectos lado a lado */}
          <div className="grid grid-cols-2 gap-6">
            {projects.slice(0, 2).map((project, index) => (
              <div
                key={index}
                className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden p-0"
              >
                {/* Imagen superior - más alta como en la foto */}
                <div className="relative h-[200px] bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-b border-white/10">
                  {/* Visit button */}
                  <a 
                    href={project.visitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/20 rounded-md text-white text-sm hover:bg-black/70 transition-all cursor-pointer"
                  >
                    <span className="text-blue-400">↗</span>
                    <span>Visit</span>
                  </a>
                  
                  {/* Mock content como en la imagen */}
                  <div className="absolute inset-4 bg-black/30 rounded-lg flex flex-col justify-center p-4">
                    <div className="space-y-2">
                      <div className="h-2 bg-white/20 rounded w-3/4"></div>
                      <div className="h-2 bg-white/15 rounded w-1/2"></div>
                      <div className="h-1 bg-white/10 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
                
                {/* Contenido inferior */}
                <div className="p-6">
                  {/* Título y status */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-[20px] font-bold text-white">{project.title}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
                      project.statusColor === 'green' ? 'bg-green-500 text-black' : 'bg-yellow-400 text-black'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  {/* Descripción */}
                  <p className="text-white/70 text-[13px] leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  {/* Technologies - exactamente como en la foto */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2.5 py-1 bg-white/10 rounded-md text-white/80 text-[11px] font-medium border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Segunda fila - 1 proyecto centrado pero más pequeño como en la foto */}
          <div className="flex justify-center">
            <div className="w-1/2">
              {projects.slice(2).map((project, index) => (
                <div
                  key={index}
                  className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
                >
                  {/* Imagen superior */}
                  <div className="relative h-[200px] bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-b border-white/10">
                    {/* Visit button */}
                    <a 
                      href={project.visitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-white/20 rounded-md text-white text-sm hover:bg-black/70 transition-all cursor-pointer"
                    >
                      <span className="text-blue-400">↗</span>
                      <span>Visit</span>
                    </a>
                    
                    {/* Mock content */}
                    <div className="absolute inset-4 bg-black/30 rounded-lg flex flex-col justify-center p-4">
                      <div className="space-y-2">
                        <div className="h-2 bg-white/20 rounded w-3/4"></div>
                        <div className="h-2 bg-white/15 rounded w-1/2"></div>
                        <div className="h-1 bg-white/10 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contenido inferior */}
                  <div className="p-6">
                    {/* Título y status */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-[20px] font-bold text-white">{project.title}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
                        project.statusColor === 'green' ? 'bg-green-500 text-black' : 'bg-yellow-400 text-black'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    {/* Descripción */}
                    <p className="text-white/70 text-[13px] leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2.5 py-1 bg-white/10 rounded-md text-white/80 text-[11px] font-medium border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;