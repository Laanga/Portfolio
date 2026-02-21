"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaReact, FaJava, FaNodeJs, FaPython, FaGithub, FaDocker
} from "react-icons/fa";
import {
  SiTypescript,
  SiMysql,
  SiTailwindcss,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiAmazons3,
} from "react-icons/si";
import { useLanguage } from "../i18n/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const frontendStack = [
    { name: "React", icon: FaReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "JavaScript", icon: SiJavascript },
    { name: "TypeScript", icon: SiTypescript },
    { name: "HTML", icon: SiHtml5 },
    { name: "CSS", icon: SiCss3 },
    { name: "Tailwind", icon: SiTailwindcss },
  ];

  const backendStack = [
    { name: "Node.js", icon: FaNodeJs },
    { name: "Python", icon: FaPython },
    { name: "Java", icon: FaJava },
    { name: "MySQL", icon: SiMysql },
  ];

  const cloudStack = [
    { name: "Amazon S3", icon: SiAmazons3 },
    { name: "Docker", icon: FaDocker },
    { name: "GitHub", icon: FaGithub },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label - empieza antes de ser visible
      gsap.fromTo(".about-label", 
        { x: -100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ".about-label", 
            start: "top 95%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Título - empieza muy pronto
      gsap.fromTo(".about-title-wrap", 
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { 
            trigger: ".about-title-wrap", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Párrafos
      gsap.fromTo(".about-text",
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ".about-text", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Skills
      gsap.fromTo(".skill-item",
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ".skills-list", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Tech stack cards
      gsap.fromTo(".tech-card",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ".tech-stack-grid", 
            start: "top 95%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Tech stack items
      gsap.fromTo(".tech-icon",
        { y: 60, opacity: 0, scale: 0.5, rotation: -10 },
        {
          y: 0, opacity: 1, scale: 1, rotation: 0, 
          duration: 0.8, stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: { 
            trigger: ".tech-stack-grid", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

      // Línea decorativa
      gsap.fromTo(".about-line",
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: { 
            trigger: ".about-line", 
            start: "top 100%",
            toggleActions: "restart none restart none"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] top-0 -right-[200px]" />
      <div className="absolute top-1/2 left-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="container relative z-10">
        <div className="about-label flex items-center gap-4 mb-6">
          <span className="text-mono">01</span>
          <span className="w-12 h-px bg-white/20" />
          <span className="text-mono text-white/40">{t.about.title}</span>
        </div>
        
        <div className="about-title-wrap mb-20">
          <h2 className="text-heading max-w-3xl">
            {t.about.description1.split('.')[0]}.
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">
          <div className="lg:col-span-3 space-y-8">
            <p className="about-text text-body-lg">{t.about.description1}</p>
            <p className="about-text text-body-lg">{t.about.description2}</p>
            <div className="about-line h-px w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent origin-left" />
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-mono mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white/50" />
              {t.about.professionalSkillsTitle}
            </h3>
            <ul className="skills-list space-y-4">
              {t.about.professionalSkills.map((skill, i) => (
                <li 
                  key={i} 
                  className="skill-item group flex items-center gap-4 text-white/50 hover:text-white transition-all duration-300"
                >
                  <span className="w-6 h-px bg-white/20 group-hover:w-10 group-hover:bg-white/50 transition-all duration-300" />
                  <span className="text-sm">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-32 pt-16 border-t border-white/5">
          <h3 className="text-mono mb-12 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white/50" />
            {t.about.stackTitle}
          </h3>

          <div className="tech-stack-grid mt-14 md:mt-20 pt-4 md:pt-6 grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              { title: t.about.frontendStackTitle, items: frontendStack },
              { title: t.about.backendStackTitle, items: backendStack },
              { title: t.about.cloudStackTitle, items: cloudStack },
            ].map((group) => (
              <div
                key={group.title}
                className="tech-column"
              >
                <h4 className="text-mono mb-10 md:mb-12 flex items-center gap-3 text-white/65">
                  <span className="w-2 h-2 rounded-full bg-white/35" />
                  {group.title}
                </h4>
                <div className="tech-list space-y-9 md:space-y-10">
                  {group.items.map((tech, i) => {
                    const Icon = tech.icon;
                    return (
                      <div
                        key={`${group.title}-${i}`}
                        className="tech-icon group flex items-center gap-4 cursor-default py-1"
                      >
                        <div className="relative">
                          <Icon
                            className="text-2xl md:text-3xl text-white/40 group-hover:text-white transition-all duration-500 group-hover:scale-110"
                          />
                          <div
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 bg-white/10"
                          />
                        </div>
                        <span className="text-sm text-white/30 group-hover:text-white/70 transition-colors duration-300">
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
