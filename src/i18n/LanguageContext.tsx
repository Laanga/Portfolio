"use client";

import React, { createContext, useCallback, useContext, useSyncExternalStore } from 'react';
import { es, en, Language } from './translations';

interface LanguageContextType {
  language: Language;
  t: typeof es | typeof en;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'preferred-language';
const SUPPORTED: readonly Language[] = ['es', 'en'] as const;
const languageListeners = new Set<() => void>();
let currentLanguage: Language | null = null;

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

function getLanguageSnapshot(): Language {
  if (currentLanguage) return currentLanguage;
  currentLanguage = readStoredLanguage() ?? detectBrowserLanguage();
  return currentLanguage;
}

function getServerLanguageSnapshot(): Language {
  return 'es';
}

function subscribeToLanguage(listener: () => void): () => void {
  languageListeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    currentLanguage = event.newValue && isSupportedLanguage(event.newValue)
      ? event.newValue
      : detectBrowserLanguage();
    languageListeners.forEach((notify) => notify());
  };

  window.addEventListener('storage', handleStorage);
  return () => {
    languageListeners.delete(listener);
    window.removeEventListener('storage', handleStorage);
  };
}

function updateLanguage(lang: Language): void {
  if (currentLanguage === lang) return;
  currentLanguage = lang;
  writeStoredLanguage(lang);
  languageListeners.forEach((notify) => notify());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );

  const setLanguage = useCallback((lang: Language) => {
    updateLanguage(lang);
  }, []);

  const translations = language === 'es' ? es : en;

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
