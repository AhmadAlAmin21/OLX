import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { changeLanguage } from '../i18n';
import BottomSheet from '../components/BottomSheet';
import { styles } from '../styles/SettingsScreen.styles';

const SettingsScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language || 'en',
  );
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const isRTL = I18nManager.isRTL;

  useEffect(() => {
    setSelectedLanguage(i18n.language || 'en');
  }, [i18n.language]);

  const handleLanguageChange = async (lang: string) => {
    if (lang === selectedLanguage) {
      setShowLanguageModal(false);
      return;
    }

    setShowLanguageModal(false);
    await changeLanguage(lang);
    setSelectedLanguage(lang);
    // Restart app after a short delay to ensure language is saved
    setTimeout(() => {
      RNRestart.restart();
    }, 100);
  };

  const getLanguageLabel = (lang: string) => {
    return lang === 'en' ? t('settings.english') : t('settings.arabic');
  };

  const languages = [
    { code: 'en', label: t('settings.english') },
    { code: 'ar', label: t('settings.arabic') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('settings.title')}</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.preferences')}</Text>

          <TouchableOpacity
            style={[
              styles.settingItem,
              { flexDirection: isRTL ? 'row-reverse' : 'row' },
            ]}
            onPress={() => setShowLanguageModal(true)}
          >
            <View
              style={[
                styles.settingInfo,
                { marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0 },
              ]}
            >
              <Text style={styles.settingLabel}>{t('settings.language')}</Text>
              <Text style={styles.settingDescription}>
                {t('settings.languageDescription')}
              </Text>
            </View>
            <Text style={styles.settingValue}>
              {isRTL ? '‹ ' : ''}
              {getLanguageLabel(selectedLanguage)}
              {!isRTL ? ' ›' : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomSheet
        visible={showLanguageModal}
        title={t('settings.language')}
        options={languages}
        selectedValue={selectedLanguage}
        onSelect={handleLanguageChange}
        onClose={() => setShowLanguageModal(false)}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;
