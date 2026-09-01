"use client";

import React, { useCallback, useState } from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import EducationSection from "../components/EducationSection";
import Footer from "../components/Footer";
import ScrollAnimations from "../components/ScrollAnimations";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [introReady, setIntroReady] = useState(false);
  const revealSite = useCallback(() => setIntroReady(true), []);
  const finishLoading = useCallback(() => setLoaderVisible(false), []);

  return (
    <>
      {loaderVisible && <LoadingScreen onReveal={revealSite} onComplete={finishLoading} />}
      <ScrollAnimations enabled={introReady} />
      <div className="site-shell" inert={loaderVisible} aria-hidden={loaderVisible || undefined}>
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
