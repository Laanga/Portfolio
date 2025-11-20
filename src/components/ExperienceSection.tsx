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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Timeline Line Animation
      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
      });

      // Experience Cards Animation
      const cards = gsap.utils.toArray(".experience-card");
      cards.forEach((card: any, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: -30,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
        });

        // Dot Animation
        const dot = card.querySelector(".timeline-dot");
        if (dot) {
          gsap.from(dot, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            scale: 0,
            duration: 0.4,
            delay: index * 0.1 + 0.2,
            ease: "back.out(1.7)",
          });
        }
      });

      // Achievements Animation
      const achievements = gsap.utils.toArray(".achievement-item");
      achievements.forEach((item: any) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: -10,
          duration: 0.5,
          ease: "power2.out",
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-12 md:py-16 px-4 relative"
    >
      <div className="max-w-4xl mx-auto backdrop-blur-md bg-black/20 rounded-3xl p-8 md:p-12 border border-white/10">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-white mb-10 md:mb-12 text-center"
        >
          {t.experience.title}
        </h2>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-white/10">
            <div className="timeline-line absolute inset-0 bg-white/30" />
          </div>

          <div className="space-y-8 md:space-y-10">
            {t.experience.experiences.map((exp, index) => (
              <div
                key={index}
                className="experience-card relative pl-8 md:pl-20 group"
              >
                <div className="timeline-dot absolute left-[-6px] md:left-[26px] top-2 w-3 h-3 bg-white rounded-full border-2 border-black z-10" />

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:translate-x-2">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1.5 md:mb-2">
                    {exp.title}
                  </h3>

                  <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3 mb-4 md:mb-5">
                    <span className="text-sm md:text-base font-medium text-white/80">
                      {exp.company}
                    </span>
                    {exp.period && (
                      <>
                        <span className="hidden md:inline text-white/40">•</span>
                        <span className="text-xs md:text-sm text-white/60">
                          {exp.period}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="space-y-2 md:space-y-2.5">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div
                        key={achIndex}
                        className="achievement-item flex items-start gap-2.5 md:gap-3 transition-transform duration-200 hover:translate-x-1"
                      >
                        <span className="text-blue-400 mt-0.5 md:mt-1 text-base md:text-lg flex-shrink-0">→</span>
                        <span className="text-xs md:text-sm text-white/80 leading-relaxed">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default ExperienceSection;
