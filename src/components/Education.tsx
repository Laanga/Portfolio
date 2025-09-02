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
    <section className="py-0 pr-0 md:pr-4 space-y-8 md:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="text-white"
      >
        {/* Main heading */}
        <h1 className="text-[40px] md:text-[52px] font-bold mb-10 md:mb-14 leading-tight tracking-[-1px] font-mono">{t.education.title}</h1>
        
        {/* Degree Section */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-[24px] md:text-[28px] font-bold mb-6 md:mb-8 text-white tracking-[-0.6px] font-mono">{t.education.degreeTitle}</h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="relative rounded-3xl bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] p-8 md:p-10 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"
            }}
          >
            <div className="flex items-start gap-6 md:gap-8">
              {/* Icon */}
              <div className="text-3xl md:text-4xl mt-1 p-3 rounded-2xl bg-white/[0.08] border border-white/[0.1]">
                🏛️
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-white font-bold text-[16px] md:text-[18px] mb-2 tracking-[-0.2px]">
                  {t.education.degree.title}
                </h3>
                <p className="text-white/70 text-[14px] md:text-[15px] font-medium tracking-[0.1px]">
                  {t.education.degree.institution} • {t.education.degree.date}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certifications Section */}
        <div>
          <h2 className="text-[24px] md:text-[28px] font-bold mb-6 md:mb-8 text-white tracking-[-0.6px] font-mono">{t.education.certificationsTitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {t.education.certifications.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1), ease: [0.23, 1, 0.32, 1] }}
                className="relative rounded-3xl bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] p-6 md:p-8 overflow-hidden hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04)"
                }}
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className="text-2xl md:text-3xl mt-1 p-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                    {index === 0 ? "🎓" : 
                     index === 1 ? "📊" : 
                     index === 2 ? "🔧" : 
                     "💼"}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-[15px] md:text-[17px] mb-1 tracking-[-0.2px]">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-[13px] md:text-[14px] mb-2 font-medium">
                      {item.institution}
                    </p>
                    <p className="text-white/50 text-[12px] md:text-[13px] font-medium tracking-[0.1px]">
                      {item.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;