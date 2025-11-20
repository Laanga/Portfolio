"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectItem {
  title: string;
  description: string;
  status: string;
  statusColor: "green" | "yellow";
  technologies: string[];
  visitLink: string;
  image: string;
}

const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const projects: ProjectItem[] = [
    {
      title: t.projects.projectsList[1].title,
      description: t.projects.projectsList[1].description,
      status: t.projects.status[t.projects.projectsList[1].status as keyof typeof t.projects.status],
      statusColor: "green" as const,
      technologies: ["React", "Vite", "Tailwind", "GSAP", "Framer Motion"],
      visitLink: "https://f1-data-explorer.vercel.app/",
      image: "/images/f1.png"
    },
    {
      title: t.projects.projectsList[0].title,
      description: t.projects.projectsList[0].description,
      status: t.projects.status[t.projects.projectsList[0].status as keyof typeof t.projects.status],
      statusColor: "green" as const,
      technologies: ["React", "Node.js", "SQLite", "Firebase"],
      visitLink: "https://github.com/Laanga/GridRush",
      image: "/images/kart.png"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Projects Animation
      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card: any, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-12 md:py-16 px-4 relative"
    >
      <div className="max-w-6xl mx-auto backdrop-blur-md bg-black/20 rounded-3xl p-8 md:p-12 border border-white/10">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-white mb-10 md:mb-12 text-center"
        >
          {t.projects.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
            >

              {/* Card content */}
              <div className="relative bg-black/40 rounded-2xl overflow-hidden">
                {/* Image section with enhanced effects */}
                <div className="relative h-[220px] md:h-[240px] bg-gradient-to-br from-gray-900/80 to-black/80 border-b border-white/10 overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

                  {/* Visit button */}
                  <a
                    href={project.visitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-black/70 backdrop-blur-md border border-white/20 rounded-lg text-white text-xs md:text-sm hover:bg-black/80 transition-all z-10 group-hover:scale-110"
                  >
                    <span className="text-white/80">↗</span>
                    <span>{t.projects.visitButton}</span>
                  </a>

                  {/* Status badge */}
                  <span
                    className={`absolute top-3 left-3 md:top-4 md:left-4 px-2.5 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-semibold ${project.statusColor === 'green'
                      ? 'bg-green-500 text-black'
                      : 'bg-yellow-400 text-black'
                      }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Content section */}
                <div className="p-6 md:p-7">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 md:px-3 py-1 md:py-1.5 bg-white/10 rounded-lg text-white/80 text-[10px] md:text-xs font-medium border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default ProjectsSection;
