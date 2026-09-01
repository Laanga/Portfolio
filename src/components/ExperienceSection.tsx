"use client";

import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function ExperienceSection() {
  const { t } = useLanguage();
  const exp = t.experience.experiences[0];
  return (
    <section id="experience" className="section experience">
      <div className="experience-watermark" aria-hidden="true">{t.experience.watermark}</div>
      <div className="container">
        <div className="experience-head">
          <div><p className="eyebrow">02 — {t.experience.title}</p><h2 className="section-title">{t.experience.subtitle}</h2></div>
          <div className="experience-index">01</div>
        </div>
        <article className="experience-card">
          <div className="experience-role">
            <p className="mono">{exp.period}</p>
            <h3>{exp.title}</h3>
            <p className="mono">@ {exp.company}</p>
          </div>
          <ul className="experience-list">{exp.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
        </article>
      </div>
    </section>
  );
}
