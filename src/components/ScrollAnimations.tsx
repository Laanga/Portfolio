"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations({ enabled = true }: { enabled?: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .fromTo(".nav-shell", { y: -26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75 })
        .fromTo(".nav-emblem", { scale: 0.78, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7 }, "-=0.48")
        .fromTo(".hero-side-left > *", { x: -28, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.35")
        .fromTo(".hero-mark", { scale: 0.72, rotate: -5, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: "power4.out" }, "-=0.5")
        .fromTo(".hero-name > span", { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.11, ease: "power4.out" }, "-=0.68")
        .fromTo(".hero-side-right", { x: 28, opacity: 0 }, { x: 0, opacity: 1, duration: 0.75 }, "-=0.65")
        .fromTo(".hero-summary", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-actions > *", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.42");

      gsap.to(".hero-content", {
        yPercent: -5,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "75% top", scrub: 1 },
      });

      const reveal = (
        trigger: string,
        targets: string,
        options: { fromY?: number; stagger?: number; duration?: number } = {}
      ) => {
        const { fromY = 56, stagger = 0.1, duration = 0.95 } = options;
        gsap.set(targets, { y: fromY, opacity: 0 });
        gsap.to(targets, {
            y: 0,
            opacity: 1,
            duration,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          });
      };

      reveal("#about", ".about .eyebrow, .about-statement, .about-copy", { stagger: 0.14 });
      reveal(".skills-grid", ".skill", { fromY: 38, stagger: 0.1 });
      reveal(".tech-catalog", ".tech-catalog-head > *", { fromY: 36, stagger: 0.12 });
      reveal(".tech-groups", ".tech-group", { fromY: 42, stagger: 0.12 });
      reveal("#experience", ".experience-head > *", { stagger: 0.14 });
      reveal(".experience-card", ".experience-role, .experience-list li", { fromY: 40, stagger: 0.1 });
      reveal("#projects", ".projects-head > *", { stagger: 0.16 });
      reveal(".project-list", ".project-row", { fromY: 70, stagger: 0.12, duration: 1.05 });
      reveal("#education", ".education-row > *", { fromY: 36, stagger: 0.12 });
      reveal("#footer", ".footer-top > *, .footer-title, .footer-description, .footer-email", { fromY: 48, stagger: 0.1 });

      gsap.to(".experience-watermark", {
        xPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: "#experience", start: "top bottom", end: "bottom top", scrub: 1.2 },
      });

      gsap.utils.toArray<HTMLElement>(".project-visual img").forEach((image) => {
        gsap.fromTo(image, { yPercent: -4 }, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: image.closest(".project-row"), start: "top bottom", end: "bottom top", scrub: 1.1 },
        });
      });
    }, document.body);

    const syncScroll = () => ScrollTrigger.update();
    window.addEventListener("scroll", syncScroll, { passive: true });
    const refresh = window.setTimeout(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    }, 250);
    return () => {
      window.removeEventListener("scroll", syncScroll);
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [enabled]);

  return null;
}
