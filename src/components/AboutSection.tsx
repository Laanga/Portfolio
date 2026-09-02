"use client";

import React from "react";
import type { IconType } from "react-icons";
import {
  SiClaude,
  SiCss,
  SiDocker,
  SiGithub,
  SiGithubactions,
  SiGithubcopilot,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReactquery,
  SiExpress,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbApi, TbBrandOpenai, TbStack2 } from "react-icons/tb";
import { useLanguage } from "../i18n/LanguageContext";

type Technology = {
  name: string;
  icon: IconType;
};

const frontend: Technology[] = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "TanStack Query", icon: SiReactquery },
  { name: "Zustand", icon: TbStack2 },
];

const backend: Technology[] = [
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express", icon: SiExpress },
  { name: "Python", icon: SiPython },
  { name: "Java", icon: SiOpenjdk },
  { name: "MySQL", icon: SiMysql },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Supabase", icon: SiSupabase },
  { name: "REST APIs", icon: TbApi },
];

const cloud: Technology[] = [
  { name: "Docker", icon: SiDocker },
  { name: "Amazon S3", icon: FaAws },
  { name: "GitHub", icon: SiGithub },
  { name: "GitHub Actions", icon: SiGithubactions },
  { name: "Vercel", icon: SiVercel },
];

const artificialIntelligence: Technology[] = [
  { name: "Codex", icon: TbBrandOpenai },
  { name: "Claude Code", icon: SiClaude },
  { name: "n8n", icon: SiN8N },
  { name: "GitHub Copilot", icon: SiGithubcopilot },
];

export default function AboutSection() {
  const { t } = useLanguage();
  const highlights = t.about.professionalSkills.slice(0, 4);
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-layout">
          <div>
            <p className="eyebrow">01 — {t.about.title}</p>
            <h2 className="section-title about-statement">{t.about.statement}<em>.</em></h2>
          </div>
          <div className="about-copy body-copy">
            <p>{t.about.description1}</p>
            <p>{t.about.description2}</p>
          </div>
        </div>
        <div className="skills-grid">
          {highlights.map((skill, i) => <article className="skill" key={skill}><span className="mono">0{i + 1}</span><strong>{skill}</strong></article>)}
        </div>
      </div>
      <div className="container tech-catalog" aria-label={t.about.stackTitle}>
        <div className="tech-catalog-head">
          <p className="eyebrow">{t.about.stackTitle}</p>
          <p className="body-copy">{t.about.stackDescription}</p>
        </div>
        <div className="tech-groups">
          {[
            { title: t.about.frontendStackTitle, items: frontend },
            { title: t.about.backendStackTitle, items: backend },
            { title: t.about.cloudStackTitle, items: cloud },
            { title: t.about.aiStackTitle, items: artificialIntelligence },
          ].map((group, index) => (
            <section className="tech-group" key={group.title}>
              <div className="tech-group-title"><span className="mono">0{index + 1}</span><h3>{group.title}</h3></div>
              <ul>{group.items.map(({ name, icon: Icon }) => <li key={name}><Icon className="tech-icon" aria-hidden="true" /><span>{name}</span></li>)}</ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
