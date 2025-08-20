"use client";

import React from "react";
import { motion } from "framer-motion";

export const About: React.FC = () => {
  const professionalSkills = [
    "Add your skills here",
    "Another skill", 
    "Your expertise",
    "Technical knowledge",
    "Professional ability",
    "Your strength",
    "Another competency",
    "Final skill example"
  ];

  const additionalSkills = [
    "Additional skill 1",
    "Additional skill 2", 
    "More expertise",
    "Professional skill",
    "Your capability",
    "Another ability",
    "Technical skill",
    "Last skill example"
  ];

  const techStack = [
    { name: "Technology 1", icon: "🔧" },
    { name: "Technology 2", icon: "⚡" },
    { name: "Technology 3", icon: "🚀" },
    { name: "Technology 4", icon: "💻" },
    { name: "Technology 5", icon: "🛠️" },
    { name: "Technology 6", icon: "📱" },
    { name: "Technology 7", icon: "🌐" },
    { name: "Technology 8", icon: "🔥" },
    { name: "Technology 9", icon: "💡" },
    { name: "Technology 10", icon: "📊" },
    { name: "Technology 11", icon: "🎯" },
    { name: "Technology 12", icon: "⭐" }
  ];

  return (
    <section className="py-0 pr-4">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-white"
      >
        {/* Main heading */}
        <h1 className="text-[48px] font-bold mb-8 leading-tight">About Me</h1>
        
        {/* Description paragraphs */}
        <div className="space-y-4 mb-8 text-white/80 leading-relaxed">
          <p>
            Write your professional introduction here. Describe your role, experience, 
            and what makes you unique. Talk about your background, the projects you've 
            worked on, and the impact you've made. This is where you tell your story 
            and connect with your audience.
          </p>
          
          <p>
            Add a second paragraph to elaborate on your experience, achievements, 
            or specific areas of expertise. You can mention technologies you work with, 
            methodologies you follow, or any notable accomplishments that showcase 
            your professional growth and capabilities.
          </p>
        </div>

        {/* Professional Skills Section */}
        <div className="mb-8">
          <h2 className="text-[24px] font-bold mb-6 text-white">Professional Skills</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              {professionalSkills.map((skill, index) => (
                <div key={index} className="flex items-start gap-3 text-white/80">
                  <span className="text-white/40 mt-1.5">•</span>
                  <span className="text-[14px] leading-relaxed">{skill}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              {additionalSkills.map((skill, index) => (
                <div key={index} className="flex items-start gap-3 text-white/80">
                  <span className="text-white/40 mt-1.5">•</span>
                  <span className="text-[14px] leading-relaxed">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stack Section */}
        <div>
          <h2 className="text-[24px] font-bold mb-6 text-white">Stack</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <span className="text-[12px] text-white/70 text-center font-medium">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;