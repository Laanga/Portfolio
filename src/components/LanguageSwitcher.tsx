"use client";

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="flex items-center gap-1 bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-1.5 overflow-hidden"
           style={{
             background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
             boxShadow: "0 12px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"
           }}>
        <button
          onClick={() => setLanguage('es')}
          className={`px-4 py-2.5 text-[13px] font-bold rounded-xl transition-all duration-400 ${
            language === 'es'
              ? 'bg-white text-black shadow-lg'
              : 'text-white/70 hover:text-white/90 hover:bg-white/[0.06]'
          }`}
          style={language === 'es' ? {
            boxShadow: "0 6px 16px rgba(255,255,255,0.15), 0 2px 4px rgba(255,255,255,0.1)"
          } : {}}
          aria-label="Cambiar a español"
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2.5 text-[13px] font-bold rounded-xl transition-all duration-400 ${
            language === 'en'
              ? 'bg-white text-black shadow-lg'
              : 'text-white/70 hover:text-white/90 hover:bg-white/[0.06]'
          }`}
          style={language === 'en' ? {
            boxShadow: "0 6px 16px rgba(255,255,255,0.15), 0 2px 4px rgba(255,255,255,0.1)"
          } : {}}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
