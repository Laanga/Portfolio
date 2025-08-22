"use client";

import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer id="contacto" className="border-t border-foreground/10 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-medium">{t.footer.title}</h3>
            <p className="text-sm text-foreground/70 mt-1">
              {t.footer.description}
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href={`mailto:${t.footer.email}`}
              aria-label="Enviar email"
              tabIndex={0}
              className="inline-flex items-center justify-center h-10 px-4 rounded-md border border-foreground/20 hover:border-foreground/40 transition-colors"
            >
              {t.footer.email}
            </a>
            <a
              href="https://www.linkedin.com/in/álvaro-langa-dev/"
              aria-label="Abrir LinkedIn"
              tabIndex={0}
              className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.footer.linkedIn}
            </a>
          </div>
        </div>
        <p className="text-xs text-foreground/50 mt-8">© {new Date().getFullYear()} {t.footer.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;


