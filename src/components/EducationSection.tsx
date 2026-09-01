"use client";

import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function EducationSection() {
  const { t } = useLanguage();
  return (
    <section id="education" className="education">
      <div className="container education-row">
        <p className="eyebrow">04 — {t.education.title}</p>
        <div><h2>{t.education.degree.title}</h2><p className="mono education-place">{t.education.degree.institution}</p></div>
        <time className="mono">{t.education.degree.date}</time>
      </div>
    </section>
  );
}
