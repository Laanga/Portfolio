"use client";

import { useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export function useDocumentLanguage() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
}
