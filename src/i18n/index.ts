import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import en from './locales/en/translation.json';
import it from './locales/it/translation.json';

const resources = {
  en: { translation: en },
  it: { translation: it },
};

const locales = getLocales();
const deviceLocale = locales[0]?.languageCode || 'en';
const supportedLanguages = ['en', 'it'];
const fallbackLng = supportedLanguages.includes(deviceLocale) ? deviceLocale : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: fallbackLng,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;

export function changeLanguage(lng: string) {
  return i18n.changeLanguage(lng);
}
