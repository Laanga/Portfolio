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
      <div className="sticky top-4 md:top-6 z-40 flex justify-center px-4">
        <SectionTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>
      
      {/* Main content */}
      <main className="relative z-10 mt-6 md:mt-8">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div className="px-4 space-y-8">
            {/* Profile Section - Mobile */}
            <div className="w-full">
              <SidebarProfile />
            </div>
            
            {/* Main content - Mobile */}
            <div className="w-full">
              <AnimatedSections active={activeTab} />
            </div>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden lg:flex">
          {/* Sidebar Profile - Desktop */}
          <div className="fixed left-4 top-20 w-[280px] h-[calc(100vh-6rem)] overflow-y-auto">
            <SidebarProfile />
          </div>
          
          {/* Main content area - Desktop */}
          <div className="flex-1 flex justify-center px-[300px]">
            <div className="w-full max-w-4xl">
              <AnimatedSections active={activeTab} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
