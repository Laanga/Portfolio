"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useLanguage } from "../i18n/LanguageContext";
import { LenisContext } from "./SmoothScroll";

export default function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const lenis = useContext(LenisContext);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const desktopLanguageRef = useRef<HTMLSpanElement>(null);
  const mobileLanguageRef = useRef<HTMLSpanElement>(null);
  const languageTransitionRef = useRef<HTMLDivElement>(null);
  const languageTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const navigationTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const languageAnimatingRef = useRef(false);
  const items = useMemo(() => [
    { id: "about", label: t.navigation.about },
    { id: "experience", label: t.navigation.experience },
    { id: "projects", label: t.navigation.projects },
    { id: "education", label: t.navigation.education },
  ], [t]);
  const leftItems = items.slice(0, 2);
  const rightItems = items.slice(2);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY + 180;
      let next = "hero";
      items.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop) next = id;
      });
      setActive(next);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [items]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const background = [document.querySelector("main"), document.querySelector("footer")]
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    document.body.style.overflow = "hidden";
    background.forEach((element) => { element.inert = true; });

    const focusable = () => Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])") ?? []
    );
    focusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        navigationTimelineRef.current?.kill();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const controls = focusable();
      if (controls.length === 0) return;
      const first = controls[0];
      const last = controls[controls.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => { element.inert = false; });
      previousFocus?.focus();
    };
  }, [open]);

  useEffect(() => () => {
    languageTimelineRef.current?.kill();
    navigationTimelineRef.current?.kill();
  }, []);

  const animateNavigationControl = (
    target: HTMLElement | null,
    jump: number,
    compact = false,
    onComplete?: () => void,
  ) => {
    navigationTimelineRef.current?.kill();

    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete?.();
      return;
    }

    const cleanUp = () => {
      gsap.set(target, { clearProps: "transform" });
      if (navigationTimelineRef.current === timeline) navigationTimelineRef.current = null;
    };

    const timeline = gsap.timeline({
      onComplete: () => {
        cleanUp();
        onComplete?.();
      },
      onInterrupt: cleanUp,
    });
    navigationTimelineRef.current = timeline;

    timeline
      .to(target, {
        y: -jump,
        rotation: 180,
        scale: 1.06,
        duration: compact ? 0.22 : 0.28,
        ease: "power2.out",
        transformOrigin: "50% 50%",
        force3D: true,
      })
      .to(target, {
        y: 0,
        rotation: 360,
        scale: 1,
        duration: compact ? 0.24 : 0.3,
        ease: "back.out(1.9)",
      })
      .to(target, { y: -2, duration: compact ? 0.04 : 0.05, ease: "power1.out" })
      .to(target, { y: 0, duration: compact ? 0.05 : 0.06, ease: "bounce.out" });
  };

  const animateLanguageChange = (
    button: HTMLButtonElement,
    target: HTMLSpanElement | null,
    jump: number,
  ) => {
    if (languageAnimatingRef.current) return;

    const nextLanguage = language === "es" ? "en" : "es";
    const overlay = languageTransitionRef.current;
    if (!target || !overlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLanguage(nextLanguage);
      return;
    }

    languageAnimatingRef.current = true;
    button.disabled = true;
    const navigationLabels = gsap.utils.toArray<HTMLElement>(
      ".nav-link, .mobile-menu > div",
    );

    const finish = () => {
      gsap.set(target, { clearProps: "transform,opacity,visibility" });
      gsap.set(navigationLabels, { clearProps: "opacity" });
      gsap.set(overlay, { clearProps: "opacity,visibility" });
      button.disabled = false;
      languageAnimatingRef.current = false;
      if (languageTimelineRef.current === timeline) languageTimelineRef.current = null;
    };

    const timeline = gsap.timeline({ onComplete: finish, onInterrupt: finish });
    languageTimelineRef.current = timeline;

    timeline
      .to(target, {
        y: -jump,
        rotation: 180,
        scale: 1.06,
        duration: 0.38,
        ease: "power2.out",
        transformOrigin: "50% 50%",
        force3D: true,
      }, 0)
      .to(target, { autoAlpha: 0, duration: 0.16, ease: "power1.in" }, 0.2)
      .to(overlay, { autoAlpha: 1, duration: 0.3, ease: "power1.inOut" }, 0.06)
      .to(navigationLabels, { opacity: 0, duration: 0.2, ease: "power1.in" }, 0.12)
      .call(() => setLanguage(nextLanguage), [], 0.38)
      .to(target, {
        y: 0,
        rotation: 360,
        scale: 1,
        autoAlpha: 1,
        duration: 0.4,
        ease: "back.out(1.8)",
      }, 0.44)
      .to(navigationLabels, { opacity: 1, duration: 0.32, ease: "power1.out" }, 0.5)
      .to(overlay, { autoAlpha: 0, duration: 0.36, ease: "power1.inOut" }, 0.5)
      .to(target, { y: -2, duration: 0.06, ease: "power1.out" }, 0.84)
      .to(target, { y: 0, duration: 0.08, ease: "bounce.out" });
  };

  const scrollToSection = (id: string) => {
    const target = `#${id}`;
    if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.1 });
    else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const animateMobileNavigation = (button: HTMLButtonElement, id: string) => {
    const content = button.querySelector<HTMLElement>(".mobile-nav-content");
    animateNavigationControl(content, 10, true, () => {
      setOpen(false);
      window.requestAnimationFrame(() => scrollToSection(id));
    });
  };

  return (
    <>
      <nav className="nav-shell" aria-label={t.navigation.mainAriaLabel}>
        <div className="nav-inner">
          <div className="nav-group nav-group-left">
            {leftItems.map((item) => <button type="button" key={item.id} className={`nav-link ${active === item.id ? "active" : ""}`} onClick={(event) => {
              animateNavigationControl(event.currentTarget.querySelector(".nav-link-content"), 15);
              scrollToSection(item.id);
            }}><span className="nav-link-content">{item.label}</span></button>)}
          </div>
          <button type="button" className="nav-logo" onClick={(event) => {
            animateNavigationControl(event.currentTarget.querySelector(".nav-emblem"), 15);
            scrollToSection("hero");
          }} aria-label={t.navigation.homeAriaLabel}>
            <span className="nav-emblem" aria-hidden="true" />
          </button>
          <div className="nav-group nav-group-right">
            {rightItems.map((item) => <button type="button" key={item.id} className={`nav-link ${active === item.id ? "active" : ""}`} onClick={(event) => {
              animateNavigationControl(event.currentTarget.querySelector(".nav-link-content"), 15);
              scrollToSection(item.id);
            }}><span className="nav-link-content">{item.label}</span></button>)}
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            onClick={() => {
              if (open) navigationTimelineRef.current?.kill();
              setOpen((current) => !current);
            }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            aria-label={t.navigation.menuAriaLabel}
          >
            {open ? "×" : "＋"}
          </button>
        </div>
        <button type="button" className="language" onClick={(event) => animateLanguageChange(event.currentTarget, desktopLanguageRef.current, 16)} aria-label={t.navigation.switchLanguageAriaLabel}>
          <span ref={desktopLanguageRef} className="language-content">{t.navigation.switchLanguageLabel}</span>
        </button>
      </nav>
      <div ref={languageTransitionRef} className="language-transition" aria-hidden="true" />
      {open && (
        <div ref={menuRef} id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label={t.navigation.menuAriaLabel}>
          <div>{items.map((item, i) => <button type="button" key={item.id} onClick={(event) => animateMobileNavigation(event.currentTarget, item.id)}><span className="mobile-nav-content"><small>0{i + 1}</small><span>{item.label}</span></span></button>)}</div>
          <button type="button" className="mobile-language" onClick={(event) => animateLanguageChange(event.currentTarget, mobileLanguageRef.current, 10)} aria-label={t.navigation.switchLanguageAriaLabel}>
            <span ref={mobileLanguageRef} className="language-content">{t.navigation.switchLanguageLabel} — {t.navigation.languageLabel}</span>
          </button>
        </div>
      )}
    </>
  );
}
