import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  I18nManager,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import { changeLanguage } from '../i18n';
import BottomSheet from './BottomSheet';

interface LanguageSelectorProps {
  showLabel?: boolean;
  showDescription?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  valueStyle?: TextStyle;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  showLabel = true,
  showDescription = true,
  containerStyle,
  labelStyle,
  descriptionStyle,
  valueStyle,
}) => {
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
    <>
      <TouchableOpacity
        style={[
          {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
          },
          containerStyle,
        ]}
        onPress={() => setShowLanguageModal(true)}
      >
        {(showLabel || showDescription) && (
          <View
            style={{
              flex: 1,
              marginRight: isRTL ? 0 : 16,
              marginLeft: isRTL ? 16 : 0,
              alignItems: 'flex-start',
            }}
          >
            {showLabel && (
              <Text
                style={[
                  {
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: 4,
                  },
                  labelStyle,
                ]}
              >
                {t('settings.language')}
              </Text>
            )}
            {showDescription && (
              <Text
                style={[
                  {
                    fontSize: 14,
                    color: '#666',
                    marginTop: 2,
                  },
                  descriptionStyle,
                ]}
              >
                {t('settings.languageDescription')}
              </Text>
            )}
          </View>
        )}
        <Text
          style={[
            {
              fontSize: 16,
              color: '#666',
            },
            valueStyle,
          ]}
        >
          {getLanguageLabel(selectedLanguage)} ›
        </Text>
      </TouchableOpacity>

      <BottomSheet
        visible={showLanguageModal}
        title={t('settings.language')}
        options={languages}
        selectedValue={selectedLanguage}
        onSelect={handleLanguageChange}
        onClose={() => setShowLanguageModal(false)}
      />
    </>
  );
};

export default LanguageSelector;
