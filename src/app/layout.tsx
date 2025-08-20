import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BackgroundStars from "../components/BackgroundStars";

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

export const metadata: Metadata = {
  title: "Mi Portafolio — Front‑End Developer",
  description: "Proyectos y experiencia en React, Next.js, TypeScript y UI/UX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${spaceGrotesk.variable} ${jetbrains.variable} antialiased`}
      >
        <BackgroundStars />
        {children}
      </body>
    </html>
  );
}
