// i18Next
import Translations from "i18next";
import { initReactI18next } from "react-i18next";

// Files
import Language_EN from './Languages/en.json';
import Language_AR from './Languages/ar.json';

// Resources
const resources = {
    en: {
        translation: Language_EN
    },

    ar: {
        translation: Language_AR
    }
}

// Translation
Translations
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        }
    }).then();

export default Translations;

