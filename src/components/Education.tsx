"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

interface EducationItem {
  type: "degree" | "certification";
  icon: string;
  title: string;
  institution: string;
  date: string;
}

const Education: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-0 pr-0 md:pr-4">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-white"
      >
        {/* Main heading */}
        <h1 className="text-[36px] md:text-[48px] font-bold mb-6 md:mb-8 leading-tight">{t.education.title}</h1>
        
        {/* Degree Section */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-6 text-white">{t.education.degreeTitle}</h2>
          
          <div className="flex items-start gap-3 md:gap-4 mb-6">
            {/* Icon */}
            <div className="text-xl md:text-2xl mt-1">
              🏛️
            </div>
            
            {/* Content */}
            <div>
              <h3 className="text-white font-medium text-[14px] md:text-[16px] mb-1">
                {t.education.degree.title}
              </h3>
              <p className="text-white/70 text-[13px] md:text-[14px] mb-1">
                {t.education.degree.institution} • {t.education.degree.date}
              </p>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <h2 className="text-[20px] md:text-[24px] font-bold mb-4 md:mb-6 text-white">{t.education.certificationsTitle}</h2>
          
          <div className="space-y-4 md:space-y-6">
            {t.education.certifications.map((item, index) => (
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