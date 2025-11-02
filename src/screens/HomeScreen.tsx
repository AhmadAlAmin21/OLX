import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>OLX</Text>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => navigation.navigate('PostAd')}
        >
          <Text style={styles.postButtonText}>Post Ad</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome to OLX</Text>
          <Text style={styles.subtitle}>Browse and discover amazing deals</Text>
        </View>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Your ads will appear here</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
