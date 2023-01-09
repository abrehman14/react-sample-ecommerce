import { default as i18, default as i18next } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: 'assets/i18n/{{ns}}//{{lng}}.json',
    },
    fallbackLng: 'en-US',
    debug: false,
    ns: ['Login', 'Signup', 'Products'],
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
    },
  })

export default i18next
