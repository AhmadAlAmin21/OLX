import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { styles } from '../styles/SettingsScreen.styles';

const SettingsScreen: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleLanguageSelect = useCallback((language: string) => {
    setSelectedLanguage(language);
    bottomSheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Arabic',
    'Chinese',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={openBottomSheet}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Language</Text>
              <Text style={styles.settingDescription}>
                Select your preferred language
              </Text>
            </View>
            <Text style={styles.settingValue}>{selectedLanguage} ›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Select Language</Text>
          {languages.map(language => (
            <TouchableOpacity
              key={language}
              style={[
                styles.languageOption,
                selectedLanguage === language && styles.languageOptionSelected,
              ]}
              onPress={() => handleLanguageSelect(language)}
            >
              <Text
                style={[
                  styles.languageOptionText,
                  selectedLanguage === language &&
                    styles.languageOptionTextSelected,
                ]}
              >
                {language}
              </Text>
              {selectedLanguage === language && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default SettingsScreen;
