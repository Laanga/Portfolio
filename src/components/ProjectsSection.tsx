"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../i18n/LanguageContext";

export default function ProjectsSection() {
  const { t } = useLanguage();
  const projects = [
    { ...t.projects.projectsList[2], tech: "NEXT.JS / SUPABASE / POSTGRESQL", demoUrl: "https://katalibrary.vercel.app/", codeUrl: "https://github.com/Laanga/kata", image: "/images/kata.png", fit: "cover" },
    { ...t.projects.projectsList[1], tech: "NEXT.JS / TYPESCRIPT / RECHARTS", demoUrl: "https://delta-zero.vercel.app", codeUrl: "https://github.com/Laanga/DeltaZero", image: "/images/icon.png", fit: "contain" },
    { ...t.projects.projectsList[0], tech: "REACT / NODE.JS / EXPRESS", demoUrl: null, codeUrl: "https://github.com/Laanga/GridRush", image: "/images/kart.png", fit: "contain" },
  ];
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="projects-head">
          <div><p className="eyebrow">03 — {t.projects.title}</p><h2 className="section-title">{t.projects.selectedLine1}<br />{t.projects.selectedLine2}</h2></div>
          <p className="body-copy">{t.projects.featuredLabel}. {t.projects.introDescription}</p>
        </div>
        <div className="project-list">
          {projects.map((project, i) => (
            <article className="project-row" key={project.title}>
              <div className="project-main">
                <div className="project-top"><span className="mono">{t.projects.projectLabel} / 0{i + 1}</span></div>
                <h3>{project.title}</h3>
                <p className="project-tech">{project.tech}</p>
              </div>
              <div className={`project-visual project-visual-${project.fit}`}>
                <Image src={project.image} alt="" fill sizes="(max-width: 900px) 100vw, 42vw" className={project.fit === "cover" ? "object-cover" : "object-contain"} />
              </div>
              <div className="project-copy">
                <p className="project-desc">{project.description}</p>
                <div className="project-actions">
                  {project.demoUrl && <a className="project-action" href={project.demoUrl} target="_blank" rel="noreferrer">{t.projects.viewDemo}</a>}
                  <a className="project-action" href={project.codeUrl} target="_blank" rel="noreferrer">{t.projects.viewCode}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
