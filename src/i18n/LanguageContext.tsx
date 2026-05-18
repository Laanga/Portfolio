"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { es, en, Language } from './translations';

interface LanguageContextType {
  language: Language;
  t: typeof es | typeof en;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'preferred-language';
const SUPPORTED: readonly Language[] = ['es', 'en'] as const;

function isSupportedLanguage(code: string): code is Language {
  return (SUPPORTED as readonly string[]).includes(code);
}

// Recorre la lista completa de idiomas preferidos del navegador (navigator.languages)
// y devuelve el primero soportado. Si ninguno coincide, cae a inglés.
function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en';

  const candidates: string[] = [];
  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
    candidates.push(...navigator.languages);
  }
  if (navigator.language) {
    candidates.push(navigator.language);
  }

  for (const raw of candidates) {
    if (!raw) continue;
    const code = raw.split('-')[0].toLowerCase();
    if (isSupportedLanguage(code)) return code;
  }

  return 'en';
}

function readStoredLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved && isSupportedLanguage(saved) ? saved : null;
  } catch {
    return null;
  }
}

function writeStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Ignorar errores de storage (modo privado, cuota llena, etc.)
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const [isClient, setIsClient] = useState(false);

  // Sólo en cliente: primero respeta la elección guardada; si no, detecta del navegador.
  useEffect(() => {
    setIsClient(true);
    const stored = readStoredLanguage();
    setLanguageState(stored ?? detectBrowserLanguage());
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    writeStoredLanguage(lang);
  }, []);

  const translations = language === 'es' ? es : en;

  // Placeholder SSR coherente para evitar flashes durante la hidratación.
  // La pantalla de carga (LoadingScreen) cubre la página hasta que el efecto
  // anterior ya ha aplicado el idioma correcto.
  if (!isClient) {
    return (
      <LanguageContext.Provider value={{ language: 'es', t: es, setLanguage: () => {} }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, t: translations, setLanguage }}>
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
