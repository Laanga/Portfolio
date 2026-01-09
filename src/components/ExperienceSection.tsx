"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ExperienceSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label - empieza antes
      gsap.fromTo(".exp-label", 
        { x: -100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ".exp-label", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Título
      gsap.fromTo(".exp-title-wrap",
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { 
            trigger: ".exp-title-wrap", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Línea del timeline
      gsap.fromTo(".timeline-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 95%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Items de experiencia
      gsap.utils.toArray<HTMLElement>(".exp-item").forEach((item) => {
        const dot = item.querySelector(".timeline-dot");
        const content = item.querySelector(".exp-content");
        const achievements = item.querySelectorAll(".achievement");
        
        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.6,
            ease: "back.out(3)",
            scrollTrigger: { 
              trigger: item, 
              start: "top 100%",
              toggleActions: "restart none restart none"
            }
          }
        );

        gsap.fromTo(content,
          { x: 100, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1,
            ease: "power3.out",
            scrollTrigger: { 
              trigger: item, 
              start: "top 100%",
              toggleActions: "restart none restart none"
            }
          }
        );

        gsap.fromTo(achievements,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: { 
              trigger: item, 
              start: "top 95%",
              toggleActions: "restart none restart none"
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section relative overflow-hidden">
      <div className="orb w-[600px] h-[600px] top-1/3 -left-[300px]" />

      <div className="container relative z-10">
        <div className="exp-label flex items-center gap-4 mb-6">
          <span className="text-mono">02</span>
          <span className="w-12 h-px bg-white/20" />
          <span className="text-mono text-white/40">{t.experience.title}</span>
        </div>
        
        <div className="exp-title-wrap mb-20">
          <h2 className="text-heading">
            Trayectoria profesional
          </h2>
        </div>

        <div className="timeline relative max-w-4xl" style={{ marginLeft: '8px' }}>
          <div 
            className="absolute top-0 bottom-0 w-px bg-white/5"
            style={{ left: '6px' }}
          >
            <div className="timeline-progress absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/10 origin-top" />
          </div>

          <div className="space-y-16">
            {t.experience.experiences.map((exp, i) => (
              <div key={i} className="exp-item relative" style={{ paddingLeft: '50px' }}>
                <div 
                  className="timeline-dot absolute rounded-full bg-[#050505] border-2 border-white/50 z-10"
                  style={{ left: '0', top: '6px', width: '13px', height: '13px' }}
                />

                <div className="exp-content">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4 mb-5">
                    <div>
                      <h3 className="text-title text-white">{exp.title}</h3>
                      <p className="text-white/50 text-sm">{exp.company}</p>
                    </div>
                    {exp.period && (
                      <span className="text-mono text-xs text-white/40">
                        {exp.period}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3" style={{ marginLeft: '8px' }}>
                    {exp.achievements.map((achievement, j) => (
                      <li 
                        key={j} 
                        className="achievement text-sm text-white/45 leading-relaxed hover:text-white/70 transition-colors duration-300"
                        style={{ paddingLeft: '16px', position: 'relative' }}
                      >
                        <span 
                          style={{ 
                            position: 'absolute', 
                            left: '0', 
                            top: '8px', 
                            width: '5px', 
                            height: '5px', 
                            borderRadius: '50%', 
                            backgroundColor: 'rgba(255,255,255,0.3)' 
                          }} 
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
