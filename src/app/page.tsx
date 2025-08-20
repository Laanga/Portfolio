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
      
      {/* Main content */}
      <main className="mx-auto max-w-7xl px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 pb-12 relative z-10">
        {/* Sidebar Profile */}
        <div className="lg:col-span-4 xl:col-span-3">
          <SidebarProfile />
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-8 xl:col-span-9">
          <AnimatedSections active={activeTab} />
        </div>
      </main>
    </div>
  );
}
