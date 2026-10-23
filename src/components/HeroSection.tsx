"use client";

import React from "react";
import { Download, MapPin } from "./icons";
import MythArt from "./MythArt";
import { useLanguage } from "../i18n/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section id="hero" className="hero">
      <div className="hero-stage">
        <MythArt
          art="icarus"
          className="hero-art"
          priority
          sizes="(max-width: 900px) 100vw, 60vw"
          fragments={[
            { className: "frag-face", at: "22% 24%" },
            { className: "frag-foot", at: "78% 4%" },
          ]}
        />
        <div className="hero-content">
          <div className="hero-meta">
            <p className="hero-kicker eyebrow">Portfolio / 2026</p>
            <div className="availability"><i />{t.hero.availability}</div>
            <p className="hero-location"><MapPin size={13} />{t.profile.location}</p>
          </div>

          <div className="hero-copy">
            <p className="hero-chapter mono">I — {t.myth.chapter}</p>
            <h1 className="hero-name display"><span>ÁLVARO</span><span className="hero-outline">LANGA</span></h1>
            <div className="hero-terminal">
              <span className="terminal-prompt" aria-hidden="true">$</span>
              <span className="terminal-command" aria-hidden="true">{t.hero.terminal}</span>
              <strong>{t.hero.roleLine1} {t.hero.roleLine2}</strong>
              <span className="terminal-stack">React · Next.js · Node.js</span>
            </div>
            <p className="hero-summary body-copy">{t.hero.description}</p>
            <div className="hero-actions">
              <a href={t.profile.cvPath} download className="btn btn-primary"><Download size={15} />{t.profile.downloadCV}</a>
              <a href={`mailto:${t.profile.email}`} className="btn btn-outline">{t.hero.contact}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
