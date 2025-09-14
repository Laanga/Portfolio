"use client";

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed bottom-4 right-4 md:top-4 md:bottom-auto z-50">
      <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-1">
        <button
          onClick={() => setLanguage('es')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            language === 'es'
              ? 'bg-white/10 text-white'
              : 'text-white/60 hover:text-white/80 hover:bg-white/5'
          }`}
          aria-label="Cambiar a español"
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            language === 'en'
              ? 'bg-white/10 text-white'
              : 'text-white/60 hover:text-white/80 hover:bg-white/5'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
