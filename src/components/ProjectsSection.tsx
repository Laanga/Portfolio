"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../i18n/LanguageContext";

export default function ProjectsSection() {
  const { t } = useLanguage();
  const projects = [
    { ...t.projects.projectsList[2], tech: "NEXT.JS / SUPABASE / GSAP", link: "https://katalibrary.vercel.app/", image: "/images/kata.png", fit: "cover" },
    { ...t.projects.projectsList[1], tech: "NEXT.JS / TYPESCRIPT / RECHARTS", link: "https://delta-zero.vercel.app", image: "/images/icon.png", fit: "contain" },
    { ...t.projects.projectsList[0], tech: "REACT / NODE.JS / SQLITE", link: "https://github.com/Laanga/GridRush", image: "/images/kart.png", fit: "contain" },
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
            <a className="project-row" href={project.link} target="_blank" rel="noreferrer" key={project.title}>
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
                <span className="project-visit">{t.projects.viewProject}<span>↗</span></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
