"use client";

import React from "react";
import { MotionDiv, MotionH1 } from "../lib/motion";
import { useLanguage } from "../i18n/LanguageContext";

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="inicio" className="relative pt-8 pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <MotionH1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              {t.hero.title}
            </MotionH1>
            <MotionDiv
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mt-4 text-base sm:text-lg text-foreground/70 max-w-2xl"
            >
              {t.hero.description}
            </MotionDiv>
            <div className="mt-8 flex gap-4">
              <a
                href="#proyectos"
                aria-label="Explorar proyectos"
                tabIndex={0}
                className="inline-flex items-center justify-center h-11 px-5 rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                {t.hero.viewProjects}
              </a>
              <a
                href="#contacto"
                aria-label="Ir a contacto"
                tabIndex={0}
                className="inline-flex items-center justify-center h-11 px-5 rounded-md border border-foreground/20 hover:border-foreground/40 transition-colors"
              >
                {t.hero.contact}
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="aspect-[4/5] rounded-lg border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


