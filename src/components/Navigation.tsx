"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "../i18n/LanguageContext";

const Navigation: React.FC = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuOverlayRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: "hero", label: t.navigation.about },
    { id: "about", label: t.navigation.about },
    { id: "experience", label: t.navigation.experience },
    { id: "projects", label: t.navigation.projects },
    { id: "education", label: t.navigation.education },
  ];

  // Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // Auto-hide logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);

      // Active section logic
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Navbar Visibility Animation
  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  }, [visible]);

  // Mobile Menu Animation
  useEffect(() => {
    if (isMenuOpen) {
      // Open animation
      gsap.to(mobileMenuOverlayRef.current, {
        opacity: 1,
        duration: 0.3,
        display: "block",
      });
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power3.out",
        display: "block",
      });

      // Stagger menu items
      gsap.fromTo(".mobile-nav-item",
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.3, delay: 0.2 }
      );
    } else {
      // Close animation
      gsap.to(mobileMenuOverlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (mobileMenuOverlayRef.current) mobileMenuOverlayRef.current.style.display = "none";
        }
      });
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          if (mobileMenuRef.current) mobileMenuRef.current.style.display = "none";
        }
      });
    }
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className={`max-w-xl mx-auto px-4 transition-all duration-300 ${scrolled ? "mt-2" : "mt-3"}`}>
          <div className="relative">
            {/* Apple-style pill navbar */}
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-lg">
              <div className="flex items-center justify-between px-5 py-2">
                {/* Logo - Compact */}
                <div
                  className="relative cursor-pointer hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
                  onClick={() => scrollToSection("hero")}
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 bg-black/20">
                    <img
                      src="/icon_portfolio.jpg"
                      alt="Logo"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Desktop Navigation - Apple style */}
                <div className="hidden md:flex items-center gap-0.5">
                  {navItems.slice(1).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative px-3.5 py-2 rounded-full text-base font-medium transition-all duration-200 ${activeSection === item.id
                        ? "text-white bg-white/15"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Mobile Menu Button - Minimal */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden relative p-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95 flex-shrink-0"
                  aria-label="Toggle menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuOverlayRef}
        onClick={() => setIsMenuOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 hidden md:hidden"
        style={{ opacity: 0 }}
      />

      {/* Mobile Menu Sidebar */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 bottom-0 w-[300px] bg-black/90 backdrop-blur-xl border-l border-white/10 z-50 hidden md:hidden"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="p-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all hover:rotate-90 active:scale-90"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="space-y-2">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`mobile-nav-item w-full text-left px-5 py-3.5 rounded-xl text-base font-medium transition-all ${activeSection === item.id
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;
