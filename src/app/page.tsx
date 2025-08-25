"use client";

import SectionTabs from "../components/SectionTabs";
import AnimatedSections from "../components/AnimatedSections";
import SidebarProfile from "../components/SidebarProfile";
import React from "react";

export default function Home() {
  const [activeTab, setActiveTab] = React.useState<"about" | "experience" | "education" | "projects">("about");

  return (
    <div className="font-sans min-h-screen bg-transparent relative">
      {/* NAVIGATION TABS  */}
      <header className="sticky top-4 md:top-6 z-40 flex justify-center px-4">
        <SectionTabs activeTab={activeTab} onChange={setActiveTab} />
      </header>
      
      {/* MAIN CONTENT */}
      <main className="relative z-10 mt-6 md:mt-8 px-4 lg:px-0">
        
        {/* CONTENEDOR PRINCIPAL */}
        <div className="lg:flex lg:justify-between lg:max-w-7xl lg:mx-auto lg:gap-20">
          
          {/* SIDEBAR PROFILE */}
          <aside className="
            w-full mb-8 lg:w-[280px] 
            lg:mb-0 lg:sticky lg:top-[120px] lg:h-fit lg:flex-shrink-0
          ">
            <SidebarProfile />
          </aside>
          
          {/* CONTENT AREA */}
          <section className="
            w-full lg:flex-1 lg:min-w-0
          ">
            <div className="max-w-4xl lg:max-w-none">
              <AnimatedSections active={activeTab} />
            </div>
          </section>
          
        </div>
      </main>
    </div>
  );
}