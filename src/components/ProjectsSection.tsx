"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      title: t.projects.projectsList[1].title,
      description: t.projects.projectsList[1].description,
      tech: "React · Vite · Tailwind · GSAP",
      link: "https://f1-data-explorer.vercel.app/",
      image: "/images/f1.png",
    },
    {
      title: t.projects.projectsList[0].title,
      description: t.projects.projectsList[0].description,
      tech: "React · Node.js · SQLite · Firebase",
      link: "https://github.com/Laanga/GridRush",
      image: "/images/kart.png",
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label - empieza antes
      gsap.fromTo(".proj-label", 
        { x: -100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ".proj-label", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Título
      gsap.fromTo(".proj-title-wrap",
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { 
            trigger: ".proj-title-wrap", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Proyectos
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        const overlay = card.querySelector(".image-overlay");
        const img = card.querySelector(".project-img");
        const content = card.querySelector(".project-content");

        if (overlay) {
          gsap.fromTo(overlay,
            { scaleX: 1 },
            {
              scaleX: 0,
              duration: 1.6,
              ease: "power4.inOut",
              scrollTrigger: { 
                trigger: card, 
                start: "top 100%",
                toggleActions: "restart none restart none"
              }
            }
          );
        }

        if (img) {
          gsap.fromTo(img,
            { scale: 1.4 },
            {
              scale: 1,
              duration: 1.8,
              ease: "power3.out",
              scrollTrigger: { 
                trigger: card, 
                start: "top 100%",
                toggleActions: "restart none restart none"
              }
            }
          );
        }

        if (content) {
          gsap.fromTo(content,
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1,
              delay: 0.3,
              ease: "power3.out",
              scrollTrigger: { 
                trigger: card, 
                start: "top 95%",
                toggleActions: "restart none restart none"
              }
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section relative overflow-hidden">
      <div className="orb w-[600px] h-[600px] bottom-0 -right-[200px]" />

      <div className="container relative z-10">
        <div className="proj-label flex items-center gap-4 mb-6">
          <span className="text-mono">03</span>
          <span className="w-12 h-px bg-white/20" />
          <span className="text-mono text-white/40">{t.projects.title}</span>
        </div>
        
        <div className="proj-title-wrap mb-20">
          <h2 className="text-heading">
            Proyectos destacados
          </h2>
        </div>

        <div className="space-y-28">
          {projects.map((project, i) => (
            <article key={i} className="project-card group">
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg mb-8"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img w-full h-full object-cover"
                />
                
                <div className="image-overlay absolute inset-0 bg-[#050505] origin-right z-10" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex items-end justify-between p-6 md:p-8">
                  <span className="text-white text-sm font-medium">
                    {project.title}
                  </span>
                  <span className="flex items-center gap-2 text-white/70 text-sm">
                    Ver proyecto
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </span>
                </div>
              </a>

              <div className="project-content max-w-2xl">
                <h3 className="text-title text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed mb-4">
                  {project.description}
                </p>
                <span className="text-mono text-xs text-white/30">
                  {project.tech}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
