"use client";

import React, { useState } from "react";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SectionBackgrounds from "../components/SectionBackgrounds";
import PremiumBackground from "../components/PremiumBackground";
import CustomCursor from "../components/CustomCursor";
import ScrollProgress from "../components/ScrollProgress";
import SmoothScroll from "../components/SmoothScroll";
import LoadingScreen from "../components/LoadingScreen";
import { LanguageProvider } from "../i18n/LanguageContext";
import { useDocumentLanguage } from "../i18n/useDocumentLanguage";
import { Analytics } from "@vercel/analytics/next";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  useDocumentLanguage();

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}
      <SmoothScroll>
        <SectionBackgrounds />
        <PremiumBackground />
        <CustomCursor />
        <ScrollProgress />
        <div className="noise" />
        {children}
        <Analytics />
      </SmoothScroll>
    </>
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
        <link rel="icon" href="/logoPersonal-removebg-preview.png" type="image/png" />
      </head>
      <body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
        <LanguageProvider>
          <LayoutContent>{children}</LayoutContent>
        </LanguageProvider>
      </body>
    </html>
  );
}
