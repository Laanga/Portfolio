"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduceMotionRef = useRef(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const projects = [
    {
      title: t.projects.projectsList[2].title,
      description: t.projects.projectsList[2].description,
      tech: "Next.js · Supabase · Tailwind · GSAP · TypeScript",
      link: "https://katalibrary.vercel.app/",
      image: "/images/kata.png",
    },
    {
      title: t.projects.projectsList[1].title,
      description: t.projects.projectsList[1].description,
      tech: "React · Vite · Tailwind · GSAP",
      link: "https://f1-data-explorer.vercel.app/",
      image: "/images/f1.png",
    },
    {
      title: t.projects.projectsList[0].title,
      description: t.projects.projectsList[0].description,
      tech: "React · Node.js · SQLite · Firebase",
      link: "https://github.com/Laanga/GridRush",
      image: "/images/kart.png",
    },
  ];

  const featuredLabel = t.projects.featuredLabel;
  const viewProjectLabel = t.projects.viewProject;

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mql.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reduceMotionRef.current = e.matches;
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-label",
        { x: -70, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: ".proj-label",
            start: "top 92%",
            end: "top 70%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".proj-title-wrap",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: ".proj-title-wrap",
            start: "top 92%",
            end: "top 70%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      const mm = gsap.matchMedia();

      // Tablet/Mobile (<1024px): reveal de cada tarjeta apilada
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".stack-card").forEach((card) => {
          const media = card.querySelector(".stack-media");
          const copy = card.querySelectorAll(".stack-copy");

          const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "power3.out", immediateRender: false },
          });

          tl.fromTo(
            card,
            { y: 40, autoAlpha: 0, scale: 0.97 },
            { y: 0, autoAlpha: 1, scale: 1, duration: 0.65 }
          );

          if (media) {
            tl.fromTo(
              media,
              { clipPath: "inset(15% 0 15% 0 round 16px)", autoAlpha: 0 },
              {
                clipPath: "inset(0% 0 0% 0 round 16px)",
                autoAlpha: 1,
                duration: 0.7,
              },
              0.05
            );
          }

          if (copy.length) {
            tl.fromTo(
              copy,
              { y: 14, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.06 },
              0.18
            );
          }

          ScrollTrigger.create({
            trigger: card,
            start: "top 88%",
            end: "bottom 30%",
            animation: tl,
            toggleActions: "play reverse play reverse",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animatePanel = (panel: HTMLDivElement, open: boolean) => {
    const reduce = reduceMotionRef.current;
    gsap.to(panel, {
      height: open ? "auto" : 0,
      duration: reduce ? 0 : open ? 0.55 : 0.45,
      ease: open ? "power3.out" : "power3.in",
      overwrite: "auto",
    });
  };

  const toggle = (i: number) => {
    setOpenIndex((prev) => {
      if (prev === i) {
        const panel = panelRefs.current[i];
        if (panel) animatePanel(panel, false);
        return null;
      }
      if (prev !== null) {
        const prevPanel = panelRefs.current[prev];
        if (prevPanel) animatePanel(prevPanel, false);
      }
      const nextPanel = panelRefs.current[i];
      if (nextPanel) animatePanel(nextPanel, true);
      return i;
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="orb h-[640px] w-[640px] bottom-0 -right-[250px]" />

      <div className="container relative z-10">
        <div className="proj-label mb-4 flex items-center gap-4">
          <span className="text-mono text-[10px]">03</span>
          <span className="h-px w-12 bg-black/20" />
          <span className="text-mono text-black/40">{t.projects.title}</span>
        </div>

        <div className="proj-title-wrap mb-10 md:mb-14">
          <h2 className="text-heading">{featuredLabel}</h2>
        </div>

        {/* Desktop ≥1024px — accordion tipográfico */}
        <ol className="hidden lg:block list-none border-t border-black/10">
          {projects.map((p, i) => {
            const isOpen = openIndex === i;
            return (
              <li
                key={p.link}
                className="proj-row group border-b border-black/10"
                data-open={isOpen || undefined}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`proj-panel-${i}`}
                  className="grid w-full cursor-pointer grid-cols-12 items-center gap-6 py-9 text-left xl:py-11"
                >
                  <span className="col-span-1 text-mono text-[11px] text-black/40 transition-colors duration-500 group-hover:text-black/70 group-data-[open]:text-black">
                    0{i + 1}
                  </span>

                  <h3
                    id={`proj-title-${i}`}
                    className="col-span-7 font-semibold leading-[1.05] tracking-[-0.02em] text-black/55 transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-black group-data-[open]:translate-x-3 group-data-[open]:text-black"
                    style={{ fontSize: "clamp(2rem, 5.2vw, 4.25rem)" }}
                  >
                    {p.title}
                  </h3>

                  <span className="col-span-3 truncate text-right text-mono text-[11px] text-black/45 transition-colors duration-500 group-hover:text-black/70 group-data-[open]:text-black/70">
                    {p.tech}
                  </span>

                  <span
                    aria-hidden
                    className="col-span-1 inline-flex items-center justify-end text-2xl text-black/30 transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-black group-data-[open]:rotate-180 group-data-[open]:text-black"
                  >
                    ↓
                  </span>
                </button>

                <div
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  id={`proj-panel-${i}`}
                  role="region"
                  aria-labelledby={`proj-title-${i}`}
                  className="proj-panel overflow-hidden"
                  style={{ height: 0 }}
                >
                  <div className="grid grid-cols-12 gap-8 pb-12">
                    <div className="col-span-5 col-start-2 relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 bg-[var(--color-bg-elevated)]">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1280px) 40vw, 45vw"
                        className="object-contain p-6"
                      />
                    </div>
                    <div className="col-span-5 flex flex-col justify-center">
                      <p className="max-w-[52ch] text-body-lg text-black/75">
                        {p.description}
                      </p>
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-7 inline-flex items-center gap-2 self-start border-b border-black/30 pb-1 text-mono text-[11px] uppercase tracking-[0.14em] text-black transition-colors hover:border-black"
                      >
                        {viewProjectLabel}
                        <span
                          aria-hidden
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Tablet/Mobile <1024px — stack con imagen inline */}
        <div className="flex flex-col gap-12 lg:hidden">
          {projects.map((p, i) => (
            <article
              key={p.link}
              className="stack-card"
              style={{ opacity: 0 }}
            >
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="stack-media relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 bg-[var(--color-bg-elevated)]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 90vw, 92vw"
                    priority={i === 0}
                    className="object-contain p-6 md:p-10"
                  />
                </div>
                <div className="mt-5">
                  <p className="stack-copy text-mono text-[10px] text-black/45">
                    0{i + 1} · {p.tech}
                  </p>
                  <h3 className="stack-copy mt-2 text-2xl md:text-3xl font-semibold text-black leading-[1.15]">
                    {p.title}
                  </h3>
                  <p className="stack-copy mt-3 max-w-[60ch] text-[15px] leading-relaxed text-black/70">
                    {p.description}
                  </p>
                  <span className="stack-copy mt-4 inline-flex items-center gap-2 text-mono text-black/70">
                    {viewProjectLabel}
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
