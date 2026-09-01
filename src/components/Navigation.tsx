"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { LenisContext } from "./SmoothScroll";

export default function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const lenis = useContext(LenisContext);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
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

  const go = (id: string) => {
    const target = `#${id}`;
    const scrollToTarget = () => {
      if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.1 });
      else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    };

    if (open) {
      setOpen(false);
      window.requestAnimationFrame(scrollToTarget);
    } else {
      scrollToTarget();
    }
  };

  return (
    <>
      <nav className="nav-shell" aria-label={t.navigation.mainAriaLabel}>
        <div className="nav-inner">
          <div className="nav-group nav-group-left">
            {leftItems.map((item) => <button type="button" key={item.id} className={`nav-link ${active === item.id ? "active" : ""}`} onClick={() => go(item.id)}>{item.label}</button>)}
          </div>
          <button type="button" className="nav-logo" onClick={() => go("hero")} aria-label={t.navigation.homeAriaLabel}>
            <span className="nav-emblem" aria-hidden="true" />
          </button>
          <div className="nav-group nav-group-right">
            {rightItems.map((item) => <button type="button" key={item.id} className={`nav-link ${active === item.id ? "active" : ""}`} onClick={() => go(item.id)}>{item.label}</button>)}
            <button type="button" className="language" onClick={() => setLanguage(language === "es" ? "en" : "es")} aria-label={t.navigation.switchLanguageAriaLabel}>{t.navigation.switchLanguageLabel}</button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            aria-label={t.navigation.menuAriaLabel}
          >
            {open ? "×" : "＋"}
          </button>
        </div>
      </nav>
      {open && (
        <div ref={menuRef} id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label={t.navigation.menuAriaLabel}>
          <div>{items.map((item, i) => <button type="button" key={item.id} onClick={() => go(item.id)}><small>0{i + 1}</small>{item.label}</button>)}</div>
          <button type="button" className="mobile-language" onClick={() => setLanguage(language === "es" ? "en" : "es")} aria-label={t.navigation.switchLanguageAriaLabel}>{t.navigation.switchLanguageLabel} — {t.navigation.languageLabel}</button>
        </div>
      )}
    </>
  );
}
