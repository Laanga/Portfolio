"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Variaciones sutiles de negro - sin flashazos
const sectionColors: Record<string, string> = {
  hero: "#050505",      // Negro base
  about: "#0a0a0c",     // Gris con toque azulado
  experience: "#080808", // Gris neutro
  projects: "#0c0a0a",   // Gris con toque cálido
  education: "#0a0c0a",  // Gris con toque verdoso
  footer: "#050505",     // Volver a negro base
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
