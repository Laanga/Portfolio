"use client";

import React from "react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThreeBackground from "../components/ThreeBackground";
import ScrollProgress from "../components/ScrollProgress";
import { LanguageProvider } from "../i18n/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useDocumentLanguage } from "../i18n/useDocumentLanguage";
import { Analytics } from "@vercel/analytics/next"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  useDocumentLanguage();

  return (
    <>
      <ThreeBackground />
      <ScrollProgress />
      <LanguageSwitcher />
      {children}
      <Analytics />
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
        <title>Álvaro Langa - Portfolio Dev</title>
        <meta name="description" content="Portfolio profesional de Álvaro Langa - Desarrollador Software especializado en React, Next.js y tecnologías modernas." />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrains.variable} antialiased bg-black text-white`}
      >
        <LanguageProvider>
          <LayoutContent>{children}</LayoutContent>
        </LanguageProvider>
      </body>
    </html>
  );
}
