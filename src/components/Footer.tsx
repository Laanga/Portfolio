"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label - empieza antes
      gsap.fromTo(".footer-label", 
        { x: -100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ".footer-label", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // CTA text
      gsap.fromTo(".footer-char",
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: 1, stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: { 
            trigger: ".footer-cta", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Descripción y botón
      gsap.fromTo(".footer-fade",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ".footer-content", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Bottom section
      gsap.fromTo(".footer-bottom-item",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { 
            trigger: ".footer-bottom", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Línea decorativa
      gsap.fromTo(".footer-line",
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: { 
            trigger: ".footer-line", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // LANGA grande
      gsap.fromTo(".footer-big-text",
        { yPercent: 50, opacity: 0, scale: 0.9 },
        {
          yPercent: 0, opacity: 1, scale: 1, duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ".footer-big-text", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const ctaText = t.footer.title;

  return (
    <footer id="footer" ref={footerRef} className="section relative overflow-hidden">
      <div className="orb w-[600px] h-[600px] bottom-0 left-1/2 -translate-x-1/2 opacity-5" />
      
      <div className="footer-line absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-center" />

      <div className="container relative z-10">
        <div className="footer-label flex items-center gap-4 mb-8">
          <span className="text-mono">05</span>
          <span className="w-12 h-px bg-white/20" />
          <span className="text-mono text-white/40">Contacto</span>
        </div>

        <div className="text-center" style={{ paddingTop: '64px', paddingBottom: '96px' }}>
          <h2 className="footer-cta text-heading md:text-display mb-8 overflow-hidden">
            <span className="inline-block">
              {ctaText.split("").map((char, i) => (
                <span 
                  key={i} 
                  className="footer-char inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h2>

          <div className="footer-content">
            <p className="footer-fade text-body-lg max-w-lg mx-auto text-white/45" style={{ marginBottom: '56px' }}>
              {t.footer.description}
            </p>

            <a 
              href={`mailto:${t.footer.email}`} 
              className="footer-fade btn btn-primary group inline-flex"
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="transition-transform group-hover:scale-110"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-10 5L2 7"/>
              </svg>
              <span>{t.footer.email}</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="footer-bottom-item flex items-center gap-3">
              <span className="text-lg font-semibold text-white">AL<span className="text-white/50">.</span></span>
              <span className="w-px h-4 bg-white/10" />
              <span className="text-sm text-white/40">Software Developer</span>
            </div>

            <div className="footer-bottom-item flex items-center gap-8">
              <a
                href="https://www.linkedin.com/in/%C3%A1lvaro-langa-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white transition-colors duration-300 link-hover"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Laanga"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white transition-colors duration-300 link-hover"
              >
                GitHub
              </a>
              <a
                href={`mailto:${t.footer.email}`}
                className="text-sm text-white/40 hover:text-white transition-colors duration-300 link-hover"
              >
                Email
              </a>
            </div>

            <div className="footer-bottom-item text-xs text-white/25">
              © {new Date().getFullYear()} Álvaro Langa
            </div>
          </div>
        </div>

        <div className="footer-big-text mt-16 overflow-hidden pointer-events-none select-none">
          <span 
            className="block text-[18vw] font-bold leading-none tracking-tighter text-center"
            style={{
              WebkitTextStroke: '2px rgba(255,255,255,0.2)',
              WebkitTextFillColor: 'transparent',
            }}
          >
            LANGA
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
