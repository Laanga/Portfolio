"use client";

import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "../i18n/LanguageContext";
import { useDocumentLanguage } from "../i18n/useDocumentLanguage";
import ScrollProgress from "./ScrollProgress";
import SmoothScroll from "./SmoothScroll";

function ClientExperience({
  children,
  enableAnalytics,
}: {
  children: ReactNode;
  enableAnalytics: boolean;
}) {
  useDocumentLanguage();

  return (
    <SmoothScroll>
      <ScrollProgress />
      <div className="noise" aria-hidden="true" />
      {children}
      {enableAnalytics && <Analytics />}
    </SmoothScroll>
  );
}

export default function AppProviders({
  children,
  enableAnalytics = false,
}: {
  children: ReactNode;
  enableAnalytics?: boolean;
}) {
  return (
    <LanguageProvider>
      <ClientExperience enableAnalytics={enableAnalytics}>{children}</ClientExperience>
    </LanguageProvider>
  );
}
