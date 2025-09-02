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
      <header className="sticky top-6 md:top-8 z-40 flex justify-center px-4 md:px-6">
        <SectionTabs activeTab={activeTab} onChange={setActiveTab} />
      </header>
      
      {/* MAIN CONTENT */}
      <main className="relative z-10 mt-8 md:mt-12 px-4 md:px-6 lg:px-8">
        
        {/* CONTENEDOR PRINCIPAL */}
        <div className="lg:flex lg:justify-between lg:max-w-[1400px] lg:mx-auto lg:gap-12 xl:gap-16">
          
          {/* SIDEBAR PROFILE */}
          <aside className="
            w-full mb-10 md:mb-12 lg:w-[360px] 
            lg:mb-0 lg:sticky lg:top-[140px] lg:h-fit lg:flex-shrink-0
          ">
            <SidebarProfile />
          </aside>
          
          {/* CONTENT AREA */}
          <section className="
            w-full lg:flex-1 lg:min-w-0
          ">
            <div className="max-w-5xl lg:max-w-none">
              <AnimatedSections active={activeTab} />
            </div>
          </section>
          
        </div>
      </main>
    </div>
  );
}