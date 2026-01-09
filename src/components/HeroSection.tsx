"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LinkedIn, GitHub, Download, MapPin } from "./icons";
import { useLanguage } from "../i18n/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const socialLinks = [
    { icon: LinkedIn, href: "https://www.linkedin.com/in/%C3%A1lvaro-langa-dev/", label: "LinkedIn" },
    { icon: GitHub, href: "https://github.com/Laanga", label: "GitHub" },
  ];

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".hero-line-h", { scaleX: 0, transformOrigin: "left" });
      gsap.set(".hero-line-v", { scaleY: 0, transformOrigin: "top" });
      gsap.set(".first-name .char", { yPercent: 110, opacity: 0 });
      gsap.set(".last-name .char", { yPercent: 110, opacity: 0 });
      gsap.set(".hero-fade", { y: 40, opacity: 0 });
      gsap.set(".hero-stagger", { y: 30, opacity: 0 });
      gsap.set(".scroll-indicator", { opacity: 0, y: -20 });
      gsap.set(".corner-frame", { opacity: 0, scale: 0.8 });

      // Master timeline
      const tl = gsap.timeline({ 
        defaults: { ease: "power4.out" }, 
        delay: 0.3 
      });

      // Sequence
      tl
        // Corner frames
        .to(".corner-frame", {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        })
        
        // Lines draw in
        .to(".hero-line-h", {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
        }, "-=0.5")
        .to(".hero-line-v", {
          scaleY: 1,
          duration: 0.8,
          ease: "power3.inOut",
        }, "-=0.8")
        
        // Role text fades in
        .to(".hero-role", {
          y: 0,
          opacity: 1,
          duration: 0.8,
        }, "-=0.4")
        
        // First name letters - más dramático
        .to(".first-name .char", {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: "power4.out",
        }, "-=0.5")
        
        // Last name letters
        .to(".last-name .char", {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: "power4.out",
        }, "-=0.9")
        
        // Description and location
        .to(".hero-fade", {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
        }, "-=0.5")
        
        // CTAs and social
        .to(".hero-stagger", {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
        }, "-=0.4")
        
        // Scroll indicator
        .to(".scroll-indicator", {
          opacity: 1,
          y: 0,
          duration: 0.6,
        }, "-=0.3");

      // Continuous scroll indicator animation
      gsap.to(".scroll-dot", {
        y: 24,
        duration: 1.5,
        repeat: -1,
        ease: "power1.inOut",
        delay: 3,
      });

      // Parallax effect on name
      gsap.to(".hero-name", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Re-animate on scroll back to hero
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        onEnterBack: () => {
          // Reset and replay animations when scrolling back to hero
          gsap.fromTo(".first-name .char", 
            { yPercent: 30, opacity: 0.5 },
            { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" }
          );
          gsap.fromTo(".last-name .char", 
            { yPercent: 30, opacity: 0.5 },
            { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const firstName = "Álvaro";
  const lastName = "Langa";

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Decorative lines */}
      <div className="absolute top-0 left-[10%] w-px h-[30vh] hero-line-v bg-gradient-to-b from-white/20 to-transparent" />
      <div className="absolute bottom-[20%] left-0 w-[40%] h-px hero-line-h bg-gradient-to-r from-white/15 to-transparent" />
      
      {/* Ambient orbs */}
      <div className="orb w-[700px] h-[700px] -top-[300px] -left-[200px]" />
      <div className="orb w-[500px] h-[500px] top-[40%] -right-[150px]" />

      <div className="container relative z-10 py-20">
        <div className="max-w-5xl">
          {/* Role */}
          <div className="overflow-hidden mb-8">
            <p className="hero-role hero-fade text-mono flex items-center gap-3">
              <span className="w-8 h-px bg-white/30" />
              {t.profile.jobTitle}
            </p>
          </div>

          {/* Name */}
          <div className="hero-name mb-8">
            <h1 className="text-display">
              {/* First Name - White */}
              <span className="first-name block overflow-hidden text-white">
                {firstName.split("").map((char, i) => (
                  <span 
                    key={i} 
                    className="char inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>
              
              {/* Last Name - Outlined/Stroke effect */}
              <span 
                className="last-name block overflow-hidden"
                style={{
                  WebkitTextStroke: '1px rgba(255,255,255,0.8)',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {lastName.split("").map((char, i) => (
                  <span 
                    key={i} 
                    className="char inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          {/* Horizontal line */}
          <div className="hero-line-h w-32 h-px bg-gradient-to-r from-white/20 to-transparent mb-10 origin-left" />

          {/* Description */}
          <p className="hero-fade text-body-lg max-w-lg mb-4">
            {t.hero.description}
          </p>

          {/* Location */}
          <p className="hero-fade flex items-center gap-2 text-sm text-white/40" style={{ marginBottom: '64px' }}>
            <MapPin size={14} className="text-white/50" />
            {t.profile.location}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4" style={{ marginBottom: '40px' }}>
            <a
              href="/CV-alvaro-langa-2.0.pdf"
              download
              className="hero-stagger btn btn-primary group"
            >
              <Download size={16} className="transition-transform group-hover:-translate-y-0.5" />
              {t.profile.downloadCV}
            </a>
            <a
              href={`mailto:${t.profile.email}`}
              className="hero-stagger btn btn-ghost group"
            >
              {t.hero.contact}
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-stagger text-white/30 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon size={22} />
                </a>
              );
            })}
            <span className="hero-stagger text-white/10 text-sm">·</span>
            <span className="hero-stagger text-mono text-xs text-white/30">
              Available for work
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-mono text-[10px] text-white/30 mb-4 tracking-widest">SCROLL</span>
        <div className="w-px h-16 bg-white/10 rounded-full overflow-hidden relative">
          <div className="scroll-dot absolute top-0 left-0 w-full h-4 bg-white/50 rounded-full" />
        </div>
      </div>

      {/* Frame corners - decorative */}
      <div className="corner-frame absolute top-8 left-8 w-16 h-16 border-l border-t border-white/10" />
      <div className="corner-frame absolute top-8 right-8 w-16 h-16 border-r border-t border-white/10" />
      <div className="corner-frame absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/10" />
      <div className="corner-frame absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/10" />
    </section>
  );
};

export default HeroSection;
