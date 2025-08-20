"use client";

import SectionTabs from "../components/SectionTabs";
import AnimatedSections from "../components/AnimatedSections";
import SidebarProfile from "../components/SidebarProfile";
import React from "react";

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<"about" | "experience" | "education" | "projects">("about");

  return (
    <div className="font-sans min-h-screen bg-transparent relative">
      {/* Navigation tabs */}
      <div className="sticky top-6 z-40 flex justify-center px-4">
        <SectionTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>
      
      {/* Main content con separación amplia */}
      <main className="mx-auto max-w-[1400px] px-16 mt-12 pb-12 relative z-10">
        <div className="flex gap-24 lg:gap-32 xl:gap-40">
          {/* Sidebar Profile - Más hacia la izquierda - CON SCROLL */}
          <div className="w-full max-w-[320px] flex-shrink-0">
            <SidebarProfile />
          </div>
          
          {/* Main content area - Más hacia la derecha */}
          <div className="flex-1 max-w-[800px]">
            <AnimatedSections active={activeTab} />
          </div>
        </div>
      </main>
    </div>
  );
}
