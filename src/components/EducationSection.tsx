"use client";

import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function EducationSection() {
  const { t } = useLanguage();
  return (
    <section id="education" className="education">
      <div className="container education-row">
        <p className="eyebrow">04 — {t.education.title}</p>
        <div><h2>{t.education.degree.title}</h2><p className="mono education-place">{t.education.degree.institution}<br />{t.education.degree.location}</p></div>
        <div className="education-meta">
          <time className="mono">{t.education.degree.date}</time>
          <p className="mono education-languages"><span>{t.education.languagesLabel}</span>{t.education.languages}</p>
        </div>
      </div>
    </section>
  );
}
