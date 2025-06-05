import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';
import frTranslations from './translations/fr.json';
import deTranslations from './translations/de.json';
import itTranslations from './translations/it.json';
import ptTranslations from './translations/pt.json';
import ruTranslations from './translations/ru.json';
import zhTranslations from './translations/zh.json';
import jaTranslations from './translations/ja.json';
import koTranslations from './translations/ko.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      es: {
        translation: esTranslations
      },
      fr: {
        translation: frTranslations
      },
      de: {
        translation: deTranslations
      },
      it: {
        translation: itTranslations
      },
      pt: {
        translation: ptTranslations
      },
      ru: {
        translation: ruTranslations
      },
      zh: {
        translation: zhTranslations
      },
      ja: {
        translation: jaTranslations
      },
      ko: {
        translation: koTranslations
      }
    },
    lng: navigator.language.split('-')[0] || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 