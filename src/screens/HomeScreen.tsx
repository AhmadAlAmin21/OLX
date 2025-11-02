import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/AppNavigator';
import ScreenHeader from '../components/ScreenHeader';
import { styles } from '../styles/HomeScreen.styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={t('home.title')}
        titleStyle={styles.title}
        rightComponent={
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => navigation.navigate('PostAd')}
          >
            <Text style={styles.postButtonText}>{t('home.postAd')}</Text>
          </TouchableOpacity>
        }
      />
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
