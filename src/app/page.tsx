"use client";

import React from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import ProjectsSection from "../components/ProjectsSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-transparent relative">
      {/* NAVIGATION */}
      <Navigation />

      {/* SECTIONS - STACKED VERTICALLY */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <Footer />
      </main>
    </div>
  );
}