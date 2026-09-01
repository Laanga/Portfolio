"use client";

import React from "react";
import { Download, MapPin } from "./icons";
import { useLanguage } from "../i18n/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section id="hero" className="hero">
      <div className="hero-stage">
        <div className="hero-content">
          <aside className="hero-side hero-side-left" aria-label={t.hero.availability}>
            <p className="hero-kicker eyebrow reveal">Portfolio / 2026</p>
            <div className="availability reveal"><i />{t.hero.availability}</div>
          </aside>

          <div className="hero-title-wrap">
            <span className="hero-mark" aria-hidden="true" />
            <h1 className="hero-name display reveal reveal-delay"><span>ÁLVARO</span><span className="hero-outline">LANGA</span></h1>
          </div>

          <aside className="hero-side hero-side-right reveal reveal-delay-2">
            <p className="hero-location"><MapPin size={13} />{t.profile.location}</p>
            <strong>{t.hero.roleLine1}<br />{t.hero.roleLine2}</strong>
            <p className="mono">React · Next.js · Node.js</p>
          </aside>

          <div className="hero-bottom">
            <p className="hero-summary body-copy reveal reveal-delay-2">{t.hero.description}</p>
            <div className="hero-actions reveal reveal-delay-2">
              <a href="/CV-Alvaro-Langa.pdf" download className="btn btn-primary"><Download size={15} />{t.profile.downloadCV}</a>
              <a href={`mailto:${t.profile.email}`} className="btn btn-outline">{t.hero.contact}<span>↗</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
