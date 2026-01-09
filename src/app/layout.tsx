"use client";

import React from "react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SectionBackgrounds from "../components/SectionBackgrounds";
import PremiumBackground from "../components/PremiumBackground";
import CustomCursor from "../components/CustomCursor";
import ScrollProgress from "../components/ScrollProgress";
import SmoothScroll from "../components/SmoothScroll";
import { LanguageProvider } from "../i18n/LanguageContext";
import { useDocumentLanguage } from "../i18n/useDocumentLanguage";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  useDocumentLanguage();

  return (
    <SmoothScroll>
      <SectionBackgrounds />
      <PremiumBackground />
      <CustomCursor />
      <ScrollProgress />
      <div className="noise" />
      {children}
      <Analytics />
    </SmoothScroll>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <title>Álvaro Langa — Software Developer</title>
        <meta 
          name="description" 
          content="Portfolio de Álvaro Langa - Desarrollador Software especializado en React, Next.js y tecnologías modernas." 
        />
        <link rel="icon" href="/favicon-transparent.svg" type="image/svg+xml" />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        <LanguageProvider>
          <LayoutContent>{children}</LayoutContent>
        </LanguageProvider>
      </body>
    </html>
  );
}
