"use client";

import { useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export function useDocumentLanguage() {
  const { language, t } = useLanguage();

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Actualiza el título de la página con protección
    document.title = t.profile?.jobTitle || 'Portfolio';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t.hero.description);
    } else {
      // Create meta description if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = t.hero.description;
      document.head.appendChild(meta);
    }
  }, [language, t]);
}
