"use client";

import React from "react";
import gsap from "gsap";
import { LinkedIn, GitHub } from "./icons";
import { useLanguage } from "../i18n/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: LinkedIn, href: "https://www.linkedin.com/in/%C3%A1lvaro-langa-dev/", label: "LinkedIn" },
    { icon: GitHub, href: "https://github.com/Laanga", label: "GitHub" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHover = (e: React.MouseEvent<HTMLElement>, scale = 1.05, x = 0, y = 0) => {
    gsap.to(e.currentTarget, {
      scale: scale,
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleHoverExit = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <footer className="relative py-12 md:py-14 px-4 border-t border-white/10 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-8 md:mb-10">
          <div>
            <h3
              className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 inline-block cursor-default"
              onMouseEnter={(e) => handleHover(e, 1.05)}
              onMouseLeave={handleHoverExit}
            >
              Álvaro Langa
            </h3>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed">
              {t.profile.jobTitle}
            </p>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Links</h4>
            <nav className="space-y-2 md:space-y-2.5">
              {[
                { id: "about", label: t.navigation.about },
                { id: "experience", label: t.navigation.experience },
                { id: "education", label: t.navigation.education },
                { id: "projects", label: t.navigation.projects },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    const element = document.getElementById(link.id);
                    if (element) {
                      const offset = 80;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - offset;
                      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                  }}
                  className="block text-white/60 hover:text-white text-xs md:text-sm transition-colors text-left"
                  onMouseEnter={(e) => handleHover(e, 1, 5)}
                  onMouseLeave={handleHoverExit}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Contact</h4>
            <a
              href={`mailto:${t.profile.email}`}
              className="block text-white/60 hover:text-white text-xs md:text-sm mb-3 md:mb-4 transition-colors break-all"
            >
              {t.profile.email}
            </a>

            <div className="flex gap-3 md:gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-white/60 hover:text-white transition-all"
                    onMouseEnter={(e) => handleHover(e, 1.1, 0, -2)}
                    onMouseLeave={handleHoverExit}
                    aria-label={social.label}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-6 md:pt-8 border-t border-white/10 gap-3 md:gap-4">
          <p className="text-white/40 text-[10px] md:text-xs text-center md:text-left">
            © {new Date().getFullYear()} Álvaro Langa. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 md:gap-2 text-white/60 hover:text-white text-xs md:text-sm transition-colors"
            onMouseEnter={(e) => handleHover(e, 1, 0, -2)}
            onMouseLeave={handleHoverExit}
          >
            <span>Back to top</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
