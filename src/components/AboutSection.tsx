"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaReact,
  FaJava,
  FaPhp,
  FaNodeJs,
  FaPython,
  FaGithub,
  FaDocker,
  FaAws
} from "react-icons/fa";
import { SiJavascript, SiMysql } from "react-icons/si";
import { useLanguage } from "../i18n/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const techStack = [
    { name: "React", icon: <FaReact style={{ color: '#61DAFB' }} /> },
    { name: "JavaScript", icon: <SiJavascript style={{ color: '#F7DF1E' }} /> },
    { name: "Java", icon: <FaJava style={{ color: '#007396' }} /> },
    { name: "PHP", icon: <FaPhp style={{ color: '#777BB4' }} /> },
    { name: "Node.js", icon: <FaNodeJs style={{ color: '#339933' }} /> },
    { name: "Python", icon: <FaPython style={{ color: '#3776AB' }} /> },
    { name: "MySQL", icon: <SiMysql style={{ color: '#4479A1' }} /> },
    { name: "GitHub", icon: <FaGithub style={{ color: '#FFFFFF' }} /> },
    { name: "Docker", icon: <FaDocker style={{ color: '#2496ED' }} /> },
    { name: "AWS", icon: <FaAws style={{ color: '#FF9900' }} /> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Paragraphs Animation
      gsap.fromTo(".about-paragraph",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-paragraph",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Skills Animation
      const skillItems = gsap.utils.toArray(".skill-item");
      gsap.fromTo(skillItems,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skill-item", // Use the first item or container as trigger? Better to use batch or just the first one if they are grouped.
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Tech Stack Animation
      const techItems = gsap.utils.toArray(".tech-item");
      gsap.fromTo(techItems,
        { opacity: 0, y: 20, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".tech-item",
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-12 md:py-16 px-4 relative"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-10 text-center"
        >
          {t.about.title}
        </h2>

        <div className="space-y-4 mb-10 md:mb-12 text-white/80 leading-relaxed max-w-3xl mx-auto">
          <p className="about-paragraph text-sm md:text-base">
            {t.about.description1}
          </p>
          <p className="about-paragraph text-sm md:text-base">
            {t.about.description2}
          </p>
        </div>

        <div className="mb-10 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-white text-center">
            {t.about.professionalSkillsTitle}
          </h3>

          <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
            {t.about.professionalSkills.map((skill, index) => (
              <div
                key={`prof-${index}`}
                className="skill-item flex items-center gap-2 p-2 md:p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:translate-x-1"
              >
                <span className="text-blue-400 flex-shrink-0 text-xs">✓</span>
                <span className="text-xs text-white/80 leading-tight">
                  {skill}
                </span>
              </div>
            ))}
            {t.about.additionalSkills.map((skill, index) => (
              <div
                key={`add-${index}`}
                className="skill-item flex items-center gap-2 p-2 md:p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 hover:translate-x-1"
              >
                <span className="text-purple-400 flex-shrink-0 text-xs">✓</span>
                <span className="text-xs text-white/80 leading-tight">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-white text-center">
            {t.about.stackTitle}
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 md:gap-5 max-w-4xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="tech-item flex flex-col items-center justify-center p-4 md:p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 group"
              >
                <div className="text-2xl md:text-3xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <span className="text-[10px] md:text-xs text-white/70 text-center font-medium group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default AboutSection;
