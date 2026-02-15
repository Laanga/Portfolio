"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../i18n/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      title: t.projects.projectsList[2].title,
      description: t.projects.projectsList[2].description,
      tech: "Next.js · Supabase · Tailwind · GSAP · TypeScript",
      link: "https://katalibrary.vercel.app/",
      image: "/images/kata-no.png",
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

  const [primaryProject, secondaryProject, tertiaryProject] = projects;
  const featuredLabel =
    language === "es" ? "Proyectos destacados" : "Featured Work";
  const viewProjectLabel = language === "es" ? "Ver proyecto" : "View Project";

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

      gsap.utils.toArray<HTMLElement>(".bento-card").forEach((card) => {
        const media = card.querySelector(".bento-media");
        const copy = card.querySelectorAll(".bento-copy");

        const timeline = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
            immediateRender: false,
          },
        });

        timeline.fromTo(
          card,
          {
            y: 60,
            autoAlpha: 0,
            scale: 0.96,
            rotateX: 7,
            transformOrigin: "top center",
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.75,
          }
        );

        if (media) {
          timeline.fromTo(
            media,
            {
              clipPath: "inset(20% 0 20% 0 round 14px)",
              scale: 1.08,
              autoAlpha: 0,
            },
            {
              clipPath: "inset(0% 0 0% 0 round 14px)",
              scale: 1,
              autoAlpha: 1,
              duration: 0.85,
            },
            0.08
          );
        }

        if (copy.length) {
          timeline.fromTo(
            copy,
            { y: 18, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.52,
              stagger: 0.07,
            },
            0.18
          );
        }

        ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          end: "bottom 30%",
          animation: timeline,
          toggleActions: "play reverse play reverse",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="orb w-[640px] h-[640px] bottom-0 -right-[250px]" />

      <div className="container relative z-10">
        <div className="proj-label flex items-center gap-4 mb-4">
          <span className="text-mono">03</span>
          <span className="w-12 h-px bg-white/20" />
          <span className="text-mono text-white/40">{t.projects.title}</span>
        </div>

        <div className="proj-title-wrap mb-8 md:mb-10">
          <h2 className="text-heading">{featuredLabel}</h2>
        </div>

        <div className="projects-bento-grid grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[340px]">
          <article className="bento-card group md:col-span-2 md:row-span-2">
            <a
              href={primaryProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full overflow-hidden rounded-3xl border border-white/14 bg-gradient-to-br from-[#121212] via-[#0d0d0d] to-[#090909] p-7 md:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/30 hover:shadow-[0_24px_50px_rgba(0,0,0,0.45)]"
            >
              <div className="bento-copy mb-4 min-w-0">
                <h3 className="text-xl md:text-[1.7rem] font-semibold text-white leading-[1.2] break-words [word-break:break-word] [overflow-wrap:anywhere] hyphens-auto">
                  {primaryProject.title}
                </h3>
                <p className="bento-copy text-mono text-[10px] md:text-[11px] text-white/55 mt-2">
                  {primaryProject.tech}
                </p>
              </div>

              <div className="bento-media relative h-52 md:h-[54%] overflow-hidden rounded-2xl">
                <div className="absolute inset-2 rounded-full bg-white/10 blur-3xl opacity-30" />
                <Image
                  src={primaryProject.image}
                  alt={primaryProject.title}
                  fill
                  sizes="(min-width: 768px) 48vw, 96vw"
                  className="object-contain p-2 md:p-3 drop-shadow-[0_22px_38px_rgba(0,0,0,0.55)] transition-transform duration-700 group-hover:-translate-y-0.5 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute top-3 right-3 z-20 rounded-full border border-white/25 bg-black/50 px-2.5 py-1 text-[10px] text-white/80 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
                  {viewProjectLabel}
                </span>
              </div>

              <p className="bento-copy mt-4 text-sm md:text-[15px] text-white/82 leading-relaxed break-words [word-break:break-word] [overflow-wrap:anywhere]">
                {primaryProject.description}
              </p>
            </a>
          </article>

          <article className="bento-card group md:col-span-2">
            <a
              href={secondaryProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full overflow-hidden rounded-3xl border border-white/12 bg-[#0f0f10] p-6 md:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)]"
            >
              <div className="flex h-full flex-col md:flex-row md:items-center gap-4">
                <div className="min-w-0 w-full md:w-[58%]">
                  <p className="bento-copy text-[11px] text-white/55 uppercase tracking-[0.14em] mb-2">
                    {secondaryProject.tech}
                  </p>
                  <h3 className="bento-copy text-lg md:text-xl font-semibold text-white leading-[1.2] mb-2 break-words [word-break:break-word] [overflow-wrap:anywhere] hyphens-auto">
                    {secondaryProject.title}
                  </h3>
                  <p className="bento-copy text-sm md:text-[14px] text-white/82 leading-relaxed break-words [word-break:break-word] [overflow-wrap:anywhere]">
                    {secondaryProject.description}
                  </p>
                </div>

                <div className="bento-media relative w-full md:w-[42%] h-44 md:h-full min-h-[150px] overflow-hidden rounded-2xl">
                  <div className="absolute inset-2 rounded-full bg-white/10 blur-3xl opacity-25" />
                  <Image
                    src={secondaryProject.image}
                    alt={secondaryProject.title}
                    fill
                    sizes="(min-width: 768px) 26vw, 90vw"
                    className="object-contain p-2 md:p-2.5 drop-shadow-[0_18px_34px_rgba(0,0,0,0.55)] transition-transform duration-700 group-hover:-translate-y-0.5 group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute top-3 right-3 z-20 rounded-full border border-white/25 bg-black/50 px-2.5 py-1 text-[10px] text-white/80 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
                    {viewProjectLabel}
                  </span>
                </div>
              </div>
            </a>
          </article>

          <article className="bento-card group md:col-span-2">
            <a
              href={tertiaryProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full overflow-hidden rounded-3xl border border-white/12 bg-[#0b0b0c] p-6 md:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
            >
              <div className="flex h-full flex-col md:flex-row md:items-center gap-4">
                <div className="bento-media relative w-full md:w-[40%] h-44 md:h-full min-h-[150px] overflow-hidden rounded-2xl">
                  <div className="absolute inset-2 rounded-full bg-white/10 blur-3xl opacity-25" />
                  <Image
                    src={tertiaryProject.image}
                    alt={tertiaryProject.title}
                    fill
                    sizes="(min-width: 768px) 24vw, 90vw"
                    className="object-contain p-2 md:p-2.5 drop-shadow-[0_18px_34px_rgba(0,0,0,0.55)] transition-transform duration-700 group-hover:-translate-y-0.5 group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute top-3 right-3 z-20 rounded-full border border-white/25 bg-black/50 px-2.5 py-1 text-[10px] text-white/80 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
                    {viewProjectLabel}
                  </span>
                </div>

                <div className="min-w-0 w-full md:w-[60%]">
                  <p className="bento-copy text-[11px] text-white/55 uppercase tracking-[0.14em] mb-2">
                    {tertiaryProject.tech}
                  </p>
                  <h3 className="bento-copy text-lg md:text-xl font-semibold text-white leading-[1.2] mb-2 break-words [word-break:break-word] [overflow-wrap:anywhere] hyphens-auto">
                    {tertiaryProject.title}
                  </h3>
                  <p className="bento-copy text-sm md:text-[14px] text-white/82 leading-relaxed break-words [word-break:break-word] [overflow-wrap:anywhere]">
                    {tertiaryProject.description}
                  </p>
                </div>
              </div>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
