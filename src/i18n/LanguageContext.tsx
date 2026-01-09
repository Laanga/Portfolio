"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { es, en, Language, TranslationKeys } from './translations';

interface LanguageContextType {
  language: Language;
  t: typeof es | typeof en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Detecta el idioma del navegador
function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'es'; // SSR fallback
  
  // navigator.language devuelve cosas como "es-ES", "en-US", "en-GB", etc.
  const browserLang = navigator.language || (navigator as any).userLanguage || 'es';
  
  // Extraer el código de idioma principal (es, en, fr, etc.)
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  // Solo soportamos español e inglés, cualquier otro idioma → inglés
  if (langCode === 'es') {
    return 'es';
  }
  
  // Para cualquier otro idioma (inglés, francés, alemán, etc.) usamos inglés
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [isClient, setIsClient] = useState(false);

  // Detectar idioma del navegador solo en cliente
  useEffect(() => {
    setIsClient(true);
    const detectedLanguage = detectBrowserLanguage();
    setLanguage(detectedLanguage);
  }, []);

  const translations = language === 'es' ? es : en;

  const value: LanguageContextType = {
    language,
    t: translations
  };

  // Evitar flash de contenido incorrecto durante SSR
  if (!isClient) {
    return (
      <LanguageContext.Provider value={{ language: 'es', t: es }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
