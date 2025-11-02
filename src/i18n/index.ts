import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

import en from './locales/en.json';
import ar from './locales/ar.json';

const LANGUAGE_KEY = '@app_language';

// Define which languages are RTL
const RTL_LANGUAGES = ['ar'];

const setRTL = (isRTL: boolean) => {
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  // Force layout update
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.swapLeftAndRightInRTL(isRTL);
  }
};

// Initialize i18n synchronously first (required for react-i18next)
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: 'en', // Default language, will be updated from AsyncStorage
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Load saved language from AsyncStorage and update i18n
const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) {
      const isRTL = RTL_LANGUAGES.includes(savedLanguage);
      setRTL(isRTL);
      await i18n.changeLanguage(savedLanguage);
    } else {
      setRTL(false);
    }
  } catch (error) {
    console.error('Error loading saved language:', error);
    setRTL(false);
  }
};

// Initialize on module load
loadSavedLanguage();

// Change language and save to AsyncStorage
export const changeLanguage = async (language: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
    const isRTL = RTL_LANGUAGES.includes(language);
    setRTL(isRTL);
    await i18n.changeLanguage(language);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

// Get current language
export const getCurrentLanguage = () => {
  return i18n.language || 'en';
};

export default i18n;
