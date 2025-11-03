import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/AppNavigator';
import ScreenHeader from '../components/ScreenHeader';
import CategoryItem from '../components/CategoryItem';
import SectionHeader from '../components/SectionHeader';
import { styles } from '../styles/HomeScreen.styles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCategories } from '../store/slices/categoriesSlice';
import { Category } from '../services/categoriesService';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    state => state.categories,
  );

  const currentLanguage = i18n.language || 'en';

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const getCategoryName = (category: Category): string => {
    return currentLanguage === 'ar' ? category.name_l1 : category.name;
  };

  const topLevelCategories = [...categories]
    .filter(category => category.level === 0)
    .sort((a, b) => a.displayPriority - b.displayPriority);

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
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles.loadingText}>{t('home.loading')}</Text>
          </View>
        )}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        {!loading && !error && topLevelCategories.length === 0 && (
          <View style={styles.centerContainer}>
            <Text style={styles.placeholderText}>{t('home.noCategories')}</Text>
          </View>
        )}
        {!loading && !error && topLevelCategories.length > 0 && (
          <>
            {/* All Categories Section */}
            <SectionHeader title={t('home.allCategories')} isFirst />
            <FlatList
              data={topLevelCategories}
              renderItem={({ item: category }) => (
                <CategoryItem
                  category={category}
                  compact
                  getCategoryName={getCategoryName}
                />
              )}
              keyExtractor={category => category.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryListContent}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
