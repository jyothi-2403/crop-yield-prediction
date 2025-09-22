
import { useCallback } from 'react';
import type { Language, TranslationKey } from '../types';
import { TRANSLATIONS } from '../constants';

export const useLocalization = (language: Language) => {
  const t = useCallback(
    (key: TranslationKey): string => {
      return TRANSLATIONS[language].dict[key] || key;
    },
    [language]
  );

  return { t };
};
