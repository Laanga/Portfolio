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
  const titleRef = useRef<HTMLHeadingElement>(null);

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

      // Degree Title Animation
      gsap.from(".degree-title", {
        scrollTrigger: {
          trigger: ".degree-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });

      // Education Card Animation
      gsap.from(".education-card", {
        scrollTrigger: {
          trigger: ".education-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-12 md:py-16 px-4 relative"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-white mb-10 md:mb-12 text-center"
        >
          {t.education.title}
        </h2>

        <div className="mb-10">
          <h3 className="degree-title text-xl md:text-2xl font-bold mb-6 md:mb-8 text-white text-center">
            {t.education.degreeTitle}
          </h3>

          <div
            className="education-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 max-w-2xl mx-auto group"
          >
            <div className="flex justify-center mb-4 md:mb-5">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-blue-300 transition-colors">
                {t.education.degree.title}
              </h4>
              <p className="text-sm md:text-base text-white/70 mb-1.5 md:mb-2">
                {t.education.degree.institution}
              </p>
              <p className="text-xs md:text-sm text-white/50">
                {t.education.degree.date}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default EducationSection;
