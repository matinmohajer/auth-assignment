'use client';

import { useCallback } from 'react';
import { en } from '../locales/en';

export function useTranslation() {
  const t = useCallback(
    (key: string, interpolation?: Record<string, string | number>) => {
      // Navigate through nested keys (e.g., 'auth.login.title')
      const keys = key.split('.');
      let value: unknown = en;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key; // Return the key if translation not found
        }
      }

      if (typeof value !== 'string') {
        console.warn(`Translation value is not a string: ${key}`);
        return key;
      }

      // Handle interpolation (e.g., "Hello {name}" -> "Hello John")
      if (interpolation) {
        return value.replace(/\{(\w+)\}/g, (match, placeholder) => {
          return interpolation[placeholder]?.toString() || match;
        });
      }

      return value;
    },
    []
  );

  return { t };
}
