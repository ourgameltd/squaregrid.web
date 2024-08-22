import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nextI18nextConfig from '../next-i18next.config'; // Adjust path as needed

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: nextI18nextConfig.i18n.defaultLocale,
    supportedLngs: nextI18nextConfig.i18n.locales,
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

export default i18n;
