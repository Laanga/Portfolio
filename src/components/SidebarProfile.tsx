"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const SidebarProfile: React.FC = () => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>, href: string) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <aside className="md:sticky md:top-6">
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-[18px] border border-foreground/15 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6"
      >
        <div className="flex flex-col items-center text-center">
          <div className="h-28 w-28 rounded-full overflow-hidden border border-foreground/15 shadow-sm">
            <Image src="/vercel.svg" alt="Avatar" width={96} height={96} className="object-cover" />
          </div>
          <h1 className="mt-4 text-[28px] font-bold tracking-tight">Tu Nombre</h1>
          <p className="text-[13px] text-foreground/70">Front‑End Developer</p>

          <div className="mt-3 inline-flex items-center gap-2 text-[12px] text-foreground/70">
            <span>📍</span>
            <span>Ciudad, País</span>
          </div>

          <div className="mt-4 flex gap-3">
            <a
              href="mailto:tuemail@ejemplo.com"
              aria-label="Enviar email"
              tabIndex={0}
              className="h-9 px-3 inline-flex items-center justify-center rounded-md border border-foreground/20 hover:border-foreground/40 transition-colors text-[13px]"
            >
              Email
            </a>
            <a
              href="/cv.pdf"
              aria-label="Descargar CV"
              tabIndex={0}
              className="h-9 px-3 inline-flex items-center justify-center rounded-md bg-foreground text-background hover:opacity-90 transition-opacity text-[13px]"
            >
              Descargar CV
            </a>
          </div>

          <div className="mt-6 w-full">
            <p className="text-[13px] font-medium mb-2">Sígueme</p>
            <div className="flex items-center gap-3">
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/" },
                { label: "GitHub", href: "https://github.com/" },
                { label: "X", href: "https://x.com/" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={`Abrir ${item.label}`}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-3 rounded-md border border-foreground/20 hover:border-foreground/40 transition-colors text-[12px]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </aside>
  );
};

export default SidebarProfile;


