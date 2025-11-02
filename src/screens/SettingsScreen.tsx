import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScreenHeader from '../components/ScreenHeader';
import LanguageSelector from '../components/LanguageSelector';
import { styles } from '../styles/SettingsScreen.styles';

const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={t('settings.title')}
        titleStyle={styles.headerTitle}
      />
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { textAlign: 'left' }]}>
            {t('settings.preferences')}
          </Text>

          <LanguageSelector
            containerStyle={styles.settingItem}
            labelStyle={styles.settingLabel}
            descriptionStyle={styles.settingDescription}
            valueStyle={styles.settingValue}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
