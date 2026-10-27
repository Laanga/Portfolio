import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed } from "next/font/google";
import "./globals.css";
import AppProviders from "../components/AppProviders";
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_LINKS,
  X_HANDLE,
} from "@/lib/site";

const hermesDisplay = Barlow_Condensed({
  variable: "--font-hermes",
  subsets: ["latin"],
  weight: ["300", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "Álvaro Langa",
    "Full Stack Developer",
    "Desarrollador Full Stack",
    "Software Developer Madrid",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
    "Claude Code",
    "AI agents",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "es_ES",
    alternateLocale: ["en_US"],
    firstName: "Álvaro",
    lastName: "Langa",
    username: "Laanga",
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f2f5ff",
};

// Structured data for search engines and AI assistants: who this person is,
// what they do and where else they can be found.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      email: `mailto:${CONTACT_EMAIL}`,
      jobTitle: "Full Stack Developer",
      worksFor: { "@type": "Organization", name: "Neural.ONE" },
      address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
      alumniOf: { "@type": "EducationalOrganization", name: "IES Gaspar Melchor de Jovellanos" },
      knowsLanguage: ["es", "en"],
      knowsAbout: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Python",
        "PostgreSQL",
        "Supabase",
        "Docker",
        "AI-assisted software development",
        "Claude Code",
      ],
      sameAs: [SOCIAL_LINKS.x, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: ["es", "en"],
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className={hermesDisplay.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <AppProviders enableAnalytics={Boolean(process.env.VERCEL)}>{children}</AppProviders>
      </body>
    </html>
  );
}
