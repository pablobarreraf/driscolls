import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
    },
    lng: 'en', // Set the default language here
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // Not needed for React
    },
  });

export default i18n;