"use client";

import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer id="footer" className="footer">
      <div className="footer-scan" aria-hidden="true" />
      <div className="container">
        <div className="footer-top"><p className="eyebrow">05 — {t.footer.contactLabel}</p><p className="mono">{t.footer.locationLabel}<br />{t.footer.remoteAvailability}</p></div>
        <h2 className="footer-title">{t.footer.ctaLine1}<br /><span>{t.footer.ctaLine2}</span></h2>
        <p className="body-copy footer-description">{t.footer.description}</p>
        <a href={`mailto:${t.footer.email}`} className="footer-email">{t.footer.email} ↗</a>
        <div className="footer-bottom">
          <p className="mono">© {new Date().getFullYear()} ÁLVARO LANGA</p>
          <div className="footer-links"><a href="https://www.linkedin.com/in/%C3%A1lvaro-langa-dev/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/Laanga" target="_blank" rel="noreferrer">GitHub</a></div>
          <p className="mono">{t.footer.role}</p>
        </div>
      </div>
    </footer>
  );
}
