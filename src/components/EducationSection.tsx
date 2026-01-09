"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EducationSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label - empieza antes
      gsap.fromTo(".edu-label", 
        { x: -100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ".edu-label", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Título
      gsap.fromTo(".edu-title-wrap",
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { 
            trigger: ".edu-title-wrap", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Punto decorativo
      gsap.fromTo(".edu-dot",
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.8,
          ease: "back.out(3)",
          scrollTrigger: { 
            trigger: ".edu-content", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Línea vertical
      gsap.fromTo(".edu-line-v",
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ".edu-content", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Contenido
      gsap.fromTo(".edu-info",
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ".edu-content", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Línea horizontal
      gsap.fromTo(".edu-line-h",
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: { 
            trigger: ".edu-line-h", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="section relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bottom-20 left-1/4 opacity-5" />

      <div className="container relative z-10">
        <div className="edu-label flex items-center gap-4 mb-6">
          <span className="text-mono">04</span>
          <span className="w-12 h-px bg-white/20" />
          <span className="text-mono text-white/40">{t.education.title}</span>
        </div>
        
        <div className="edu-title-wrap mb-16">
          <h2 className="text-heading">
            Formación académica
          </h2>
        </div>

        <div className="edu-content max-w-2xl">
          <div className="flex items-start gap-6">
            <div className="relative mt-2">
              <div className="edu-dot w-3 h-3 rounded-full border-2 border-white/50" />
              <div className="edu-line-v absolute top-3 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-white/30 to-transparent origin-top" />
            </div>
            
            <div className="edu-info">
              <h3 className="text-title text-white mb-2">
                {t.education.degree.title}
              </h3>
              <p className="text-white/50 text-sm mb-4">
                {t.education.degree.institution}
              </p>
              <span className="text-mono text-xs text-white/40">
                {t.education.degree.date}
              </span>
            </div>
          </div>
          
          <div className="edu-line-h mt-12 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent origin-left" />
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
