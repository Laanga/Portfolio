"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { useLanguage } from "../i18n/LanguageContext";
import { LenisContext } from "./SmoothScroll";

const Navigation: React.FC = () => {
  const { t } = useLanguage();
  const lenis = useContext(LenisContext);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: "about", label: t.navigation.about, num: "01" },
    { id: "experience", label: t.navigation.experience, num: "02" },
    { id: "projects", label: t.navigation.projects, num: "03" },
    { id: "education", label: t.navigation.education, num: "04" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      setIsVisible(y < lastScrollY || y < 100);
      setLastScrollY(y);

      const offset = 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (y + offset >= offsetTop && y + offset < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    gsap.to(navRef.current, {
      y: isVisible ? 0 : -100,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [isVisible]);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at calc(100% - 2rem) 2rem)",
        duration: 0.8,
        ease: "power4.inOut",
      });
      gsap.fromTo(".menu-item",
        { y: 60, opacity: 0, rotateX: -45 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.08, duration: 0.6, delay: 0.3, ease: "power3.out" }
      );
      gsap.fromTo(".menu-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, delay: 0.5, ease: "power3.inOut" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at calc(100% - 2rem) 2rem)",
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
  }, [isMenuOpen]);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const target = id === "hero" ? "#hero" : `#${id}`;
    
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    } else {
      const el = document.querySelector(target);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5" 
            : "py-6"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollTo("hero")}
              className="relative group"
            >
              <span className="text-xl font-semibold text-white transition-colors">
                AL<span className="text-white/50 group-hover:text-white transition-colors duration-300">.</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-2 text-sm transition-all duration-300 group ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                  )}
                  
                  {/* Hover background */}
                  <span className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors duration-300"
              aria-label="Menu"
            >
              <div className="relative w-5 h-3">
                <span className={`absolute left-0 w-full h-[1.5px] bg-white transition-all duration-300 ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`} />
                <span className={`absolute left-0 w-full h-[1.5px] bg-white transition-all duration-300 ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#050505] flex items-center justify-center md:hidden"
        style={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
      >
        {/* Background grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <nav className="relative flex flex-col items-center gap-2">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="menu-item group relative py-4 overflow-hidden"
              style={{ perspective: "1000px" }}
            >
              <span className={`block text-4xl font-medium transition-colors duration-300 ${
                activeSection === item.id 
                  ? "text-white" 
                  : "text-white/30 group-hover:text-white"
              }`}>
                {item.label}
              </span>
              <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-mono text-xs text-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.num}
              </span>
            </button>
          ))}
          
          {/* Decorative line */}
          <div className="menu-line w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-8 origin-center" />
        </nav>

        {/* Corner decorations */}
        <div className="absolute bottom-12 left-8 text-mono text-xs text-white/20">
          ÁLVARO LANGA
        </div>
        <div className="absolute bottom-12 right-8 text-mono text-xs text-white/20">
          © {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
};

export default Navigation;
