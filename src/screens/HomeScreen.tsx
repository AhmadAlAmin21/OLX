import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/AppNavigator';
import { styles } from '../styles/HomeScreen.styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.header,
          { flexDirection: isRTL ? 'row-reverse' : 'row' },
        ]}
      >
        <Text style={styles.title}>{t('home.title')}</Text>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => navigation.navigate('PostAd')}
        >
          <Text style={styles.postButtonText}>{t('home.postAd')}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>{t('home.welcome')}</Text>
          <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
        </View>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>{t('home.placeholder')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
