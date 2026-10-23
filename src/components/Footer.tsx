"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { LenisContext } from "./SmoothScroll";
import MythArt from "./MythArt";

export default function Footer() {
  const { t } = useLanguage();
  const lenis = useContext(LenisContext);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(copiedTimer.current), []);

  const sections = [
    { id: "hero", numeral: "I", label: t.footer.home },
    { id: "about", numeral: "II", label: t.navigation.about },
    { id: "experience", numeral: "III", label: t.navigation.experience },
    { id: "projects", numeral: "IV", label: t.navigation.projects },
    { id: "education", numeral: "V", label: t.navigation.education },
  ];

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: id === "hero" ? 0 : -80, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t.footer.email);
      setCopied(true);
      window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${t.footer.email}`;
    }
  };

  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="footer-top">
          <p className="eyebrow">VI — {t.footer.contactLabel}</p>
          <p className="mono">{t.footer.locationLabel}<br />{t.footer.remoteAvailability}</p>
        </div>

        <div className="footer-hero">
          <div className="footer-cta">
            <h2 className="footer-title">{t.footer.ctaLine1}<br /><span>{t.footer.ctaLine2}</span></h2>
            <p className="footer-epigraph">{t.footer.epigraph}</p>
            <div className="footer-terminal">
              <span className="footer-prompt" aria-hidden="true">$</span>
              <span className="footer-command" aria-hidden="true">{t.footer.terminalCommand}</span>
              <a href={`mailto:${t.footer.email}`} className="footer-email">{t.footer.email}</a>
              <i className="footer-cursor" aria-hidden="true" />
            </div>
            <div className="footer-actions">
              <a href={`mailto:${t.footer.email}`} className="btn btn-primary">{t.footer.writeMe}</a>
              <button type="button" className="btn btn-outline" onClick={copyEmail} aria-live="polite">
                {copied ? `${t.footer.copied} ✓` : t.footer.copyEmail}
              </button>
            </div>
          </div>

          <MythArt
            art="apollo"
            className="footer-art"
            sizes="(max-width: 900px) 80vw, 38vw"
            fragments={[
              { className: "frag-eye", at: "38% 61%" },
              { className: "frag-curls", at: "62% 8%" },
              { className: "frag-mouth", at: "50% 86%" },
            ]}
          />
        </div>

        <div className="footer-columns">
          <nav aria-label={t.footer.indexTitle}>
            <h3 className="mono">{t.footer.indexTitle}</h3>
            <ul>
              {sections.map((section) => (
                <li key={section.id}>
                  <button type="button" onClick={() => scrollToSection(section.id)}><span>{section.numeral}</span>{section.label}</button>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="mono">{t.footer.contactTitle}</h3>
            <ul>
              <li><a href={`mailto:${t.footer.email}`}>Email</a></li>
              <li><a href="https://www.linkedin.com/in/alvaro-langa-dev/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com/Laanga" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href={t.profile.cvPath} download>{t.profile.downloadCV}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mono">{t.footer.statusTitle}</h3>
            <ul className="footer-status">
              <li><i />{t.hero.availability}</li>
              <li>{t.footer.locationLabel}</li>
              <li>{t.footer.remoteAvailability}</li>
            </ul>
          </div>
        </div>

        <p className="footer-wordmark" aria-hidden="true">ÁLVARO LANGA</p>

        <div className="footer-bottom">
          <p className="mono">© {new Date().getFullYear()} ÁLVARO LANGA</p>
          <p className="mono">{t.footer.role} · {t.footer.madeIn}</p>
          <button type="button" className="mono footer-top-link" onClick={() => scrollToSection("hero")}>{t.footer.backToTop}</button>
        </div>
      </div>
    </footer>
  );
}
