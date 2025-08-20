"use client";

import SectionTabs from "../components/SectionTabs";
import AnimatedSections from "../components/AnimatedSections";
import SidebarProfile from "../components/SidebarProfile";
import React from "react";

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<"inicio" | "proyectos" | "sobre-mi" | "contacto">("inicio");

  return (
    <div className="font-sans min-h-screen">
      <div className="sticky top-4 z-40 flex justify-center px-4">
        <SectionTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
        <div className="md:col-span-4">
          <SidebarProfile />
        </div>
        <div className="md:col-span-8">
          <AnimatedSections active={activeTab} />
        </div>
      </main>
    </div>
  );
}
