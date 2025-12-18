"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { LinkedIn, GitHub, Download, MapPin } from "./icons";
import { useLanguage } from "../i18n/LanguageContext";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Refs para los botones magnéticos
  const btnRef1 = useRef<HTMLAnchorElement>(null);
  const btnRef2 = useRef<HTMLAnchorElement>(null);

  const socialLinks = [
    {
      icon: LinkedIn,
      href: "https://www.linkedin.com/in/%C3%A1lvaro-langa-dev/",
      label: "LinkedIn",
    },
    { icon: GitHub, href: "https://github.com/Laanga", label: "GitHub" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Letras individuales del nombre (parten ocultas en CSS)
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      tl.to(letters, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
      });

      // Job Title (parte oculto en CSS)
      tl.to(
        ".hero-job-title",
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.3"
      );

      // Ubicación (parte oculta en CSS)
      tl.to(
        ".hero-location",
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );

      // Botones (parten ocultos en CSS)
      tl.to(
        ".hero-btn",
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
        "-=0.5"
      );

      // Iconos sociales (parten ocultos en CSS)
      tl.to(
        ".social-icon",
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
        "-=0.5"
      );

      // Animación del degradado del título
      gsap.to(".gradient-text", {
        backgroundPosition: "200% center",
        duration: 5,
        repeat: -1,
        ease: "linear",
      });
    }, sectionRef);

    // Efecto magnético de los botones
    const setupMagnetic = (ref: React.RefObject<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        xTo(x * 0.3);
        yTo(y * 0.3);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    const cleanup1 = setupMagnetic(btnRef1 as React.RefObject<HTMLElement>);
    const cleanup2 = setupMagnetic(btnRef2 as React.RefObject<HTMLElement>);

    return () => {
      ctx.revert();
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-16 md:py-20 relative overflow-hidden"
    >
      {/* Fondo limpio sin orbes ni foto */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div>
          <h1
            ref={titleRef}
            className="gradient-text text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight text-white"
          >
            {"Álvaro Langa".split("").map((char, index) => (
              <span
                key={index}
                className="hero-letter inline-block opacity-0 translate-y-4"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          <p className="hero-job-title text-lg md:text-xl text-white/70 font-medium mb-4 md:mb-6 opacity-0 translate-y-4">
            {t.profile.jobTitle}
          </p>

          <div className="hero-location flex items-center justify-center gap-2 text-white/50 text-sm md:text-base mb-6 md:mb-8 opacity-0 translate-y-4">
            <MapPin size={16} className="text-white/40" />
            <span>{t.profile.location}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-10">
          <a
            ref={btnRef1}
            href="/CV-Alvaro-Langa.pdf"
            download="CV-Álvaro-Langa.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn group w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-white hover:bg-white/90 text-black rounded-xl text-sm md:text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 md:gap-3 shadow-xl opacity-0 translate-y-4"
          >
            <Download size={16} />
            <span>{t.profile.downloadCV}</span>
          </a>

          <a
            ref={btnRef2}
            href={`mailto:${t.profile.email}`}
            className="hero-btn group w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white rounded-xl text-sm md:text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 md:gap-3 opacity-0 translate-y-4"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="relative z-10"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-10 5L2 7" />
            </svg>
            <span className="relative z-10">
              {t.profile.email.split("@")[0]}
            </span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-6">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon group w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white/60 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 opacity-0 translate-y-4"
                aria-label={social.label}
              >
                <IconComponent size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;