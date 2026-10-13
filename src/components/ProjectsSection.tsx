"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../i18n/LanguageContext";

export default function ProjectsSection() {
  const { t } = useLanguage();
  const projects = [
    { ...t.projects.projectsList[2], tech: ["Next.js", "Supabase", "PostgreSQL"], demoUrl: "https://katalibrary.vercel.app/", codeUrl: "https://github.com/Laanga/kata", image: "/images/kata.png", fit: "cover" },
    { ...t.projects.projectsList[1], tech: ["Next.js", "TypeScript", "Recharts"], demoUrl: "https://delta-zero.vercel.app", codeUrl: "https://github.com/Laanga/DeltaZero", image: "/images/icon.png", fit: "contain" },
    { ...t.projects.projectsList[0], tech: ["React", "Node.js", "Express"], demoUrl: null, codeUrl: "https://github.com/Laanga/GridRush", image: "/images/kart.png", fit: "contain" },
  ];
  return (
    <section id="projects" className="section projects theme-light">
      <div className="container">
        <div className="projects-head">
          <div><p className="eyebrow">IV — {t.projects.title}</p><h2 className="section-title">{t.projects.selectedLine1}<br />{t.projects.selectedLine2}</h2></div>
          <p className="body-copy">{t.projects.featuredLabel}. {t.projects.introDescription}</p>
        </div>
        <div className="project-list">
          {projects.map((project, i) => (
            <article className={`project ${i % 2 ? "project-flip" : ""}`} key={project.title}>
              <a className={`project-media project-media-${project.fit}`} href={project.demoUrl ?? project.codeUrl} target="_blank" rel="noreferrer" aria-label={project.title}>
                <Image src={project.image} alt="" fill sizes="(max-width: 900px) 100vw, 55vw" className={project.fit === "cover" ? "object-cover" : "object-contain"} />
              </a>
              <div className="project-info">
                <p className="project-index mono">{t.projects.projectLabel} 0{i + 1} / 0{projects.length}</p>
                <h3>{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <ul className="project-tags">{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                <div className="project-links">
                  {project.demoUrl && <a className="btn btn-primary" href={project.demoUrl} target="_blank" rel="noreferrer">{t.projects.viewDemo}<span>↗</span></a>}
                  <a className="btn btn-outline" href={project.codeUrl} target="_blank" rel="noreferrer">{t.projects.viewCode}<span>↗</span></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
