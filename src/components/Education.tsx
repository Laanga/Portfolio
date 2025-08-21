"use client";

import React from "react";
import { motion } from "framer-motion";

interface EducationItem {
  type: "degree" | "certification";
  icon: string;
  title: string;
  institution: string;
  date: string;
}

const Education: React.FC = () => {
  // Reemplaza con tu información real
  const educationData: EducationItem[] = [
    // Degree
    {
      type: "degree",
      icon: "🏛️",
      title: "Grado Superior Desarrollo de Aplicaciones Web",
      institution: "I.E.S GASPAR MELCHOR DE JOVELLANOS",
      date: "2023 - 2025"
    },
    // Certifications
    {
      type: "certification", 
      icon: "🎓",
      title: "React - The Complete Guide",
      institution: "Udemy",
      date: "2023"
    },
    {
      type: "certification",
      icon: "📊", 
      title: "AWS Cloud Practitioner",
      institution: "Amazon Web Services",
      date: "2023"
    },
    {
      type: "certification",
      icon: "🔧",
      title: "Full Stack Web Development",
      institution: "FreeCodeCamp",
      date: "2022"
    },
    {
      type: "certification",
      icon: "💼",
      title: "Agile Project Management",
      institution: "LinkedIn Learning", 
      date: "2022"
    }
  ];

  const degreeItems = educationData.filter(item => item.type === "degree");
  const certificationItems = educationData.filter(item => item.type === "certification");

  return (
    <section className="py-0 pr-0 md:pr-4">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-white"
      >
        {/* Main heading */}
        <h1 className="text-[36px] md:text-[48px] font-bold mb-6 md:mb-8 leading-tight">Education</h1>
        
        {/* Degree Section */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-6 text-white">Degree</h2>
          
          {degreeItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3 md:gap-4 mb-6">
              {/* Icon */}
              <div className="text-xl md:text-2xl mt-1">
                🏛️
              </div>
              
              {/* Content */}
              <div>
                <h3 className="text-white font-medium text-[14px] md:text-[16px] mb-1">
                  {item.title}
                </h3>
                <p className="text-white/70 text-[13px] md:text-[14px] mb-1">
                  {item.institution} • {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div>
          <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-6 text-white">Certifications</h2>
          
          <div className="space-y-4 md:space-y-6">
            {certificationItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 md:gap-4">
                {/* Icon - diferentes según el tipo */}
                <div className="text-xl md:text-2xl mt-1">
                  {index === 0 ? "🎓" : 
                   index === 1 ? "📊" : 
                   index === 2 ? "🔧" : 
                   "💼"}
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-white font-medium text-[14px] md:text-[16px] mb-1">
                    {item.title} • {item.institution}
                  </h3>
                  <p className="text-white/70 text-[13px] md:text-[14px]">
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;