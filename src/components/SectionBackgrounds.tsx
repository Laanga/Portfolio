"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Variaciones sutiles de blanco para mantener dinamismo en tema claro
const sectionColors: Record<string, string> = {
  hero: "#ffffff",
  about: "#fdfdfc",
  experience: "#fafaf9",
  projects: "#fcfcfb",
  education: "#f9f9f8",
  footer: "#ffffff",
};

const SectionBackgrounds: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const sections = ["hero", "about", "experience", "projects", "education", "footer"];
    const triggers: ScrollTrigger[] = [];
    
    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          gsap.to(backgroundRef.current, {
            backgroundColor: sectionColors[sectionId],
            duration: 0.8,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(backgroundRef.current, {
            backgroundColor: sectionColors[sectionId],
            duration: 0.8,
            ease: "power2.out",
          });
        },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 z-[-2]"
      style={{ backgroundColor: sectionColors.hero }}
    />
  );
};

export default SectionBackgrounds;
