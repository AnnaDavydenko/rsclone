import i18n from 'i18next';
import {en, ru} from "./messages"
import { LANGUAGE } from './constant';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


const {EN, RU} = LANGUAGE;

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        interpolation: {
            escapeValue: false,
        },
        lng: EN,
        resources: {
            en: en,
            ru: ru,
        },
    });
export default i18n;

export const updateLanguage = (lang: string = EN) => {
    i18n.changeLanguage(lang);
};

