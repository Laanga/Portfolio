import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";
import AppProviders from "../components/AppProviders";

const hermesDisplay = Barlow_Condensed({
  variable: "--font-hermes",
  subsets: ["latin"],
  weight: ["300", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Álvaro Langa | Full Stack Developer en Madrid",
  description:
    "Portfolio de Álvaro Langa, desarrollador Full Stack en Madrid especializado en React, Next.js, Node.js y automatización con Python.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f2f5ff",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className={hermesDisplay.variable}>
      <body>
        <AppProviders enableAnalytics={Boolean(process.env.VERCEL)}>{children}</AppProviders>
      </body>
    </html>
  );
}
