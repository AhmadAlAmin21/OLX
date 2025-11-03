import React, { useEffect, useState } from 'react';
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
import ItemCard, { ListingItem } from '../components/ItemCard';
import SectionHeader from '../components/SectionHeader';
import { styles } from '../styles/HomeScreen.styles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCategories } from '../store/slices/categoriesSlice';
import { Category } from '../services/categoriesService';
import dummyListings from '../data/dummyListings.json';
import dummyProperties from '../data/dummyProperties.json';
import dummyMobilePhones from '../data/dummyMobilePhones.json';

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
  const [listings] = useState<ListingItem[]>(dummyListings as ListingItem[]);
  const [properties] = useState<ListingItem[]>(
    dummyProperties as ListingItem[],
  );
  const [mobilePhones] = useState<ListingItem[]>(
    dummyMobilePhones as ListingItem[],
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

  const category1 = categories.find(cat => cat.id === 1);
  const category2 = categories.find(cat => cat.id === 2);
  const category3 = categories.find(cat => cat.id === 3);

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

            {/* Category 1 Listings Section */}
            {category1 && listings.length > 0 && (
              <>
                <SectionHeader
                  title={getCategoryName(category1)}
                  isFirst={false}
                  rightComponent={
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ViewAll', {
                          categoryId: category1.id,
                          categoryName: getCategoryName(category1),
                        });
                      }}
                    >
                      <Text style={styles.viewAllText}>
                        {t('home.viewAll', 'View All')}
                      </Text>
                    </TouchableOpacity>
                  }
                />
                <FlatList
                  data={listings}
                  renderItem={({ item }) => (
                    <ItemCard
                      item={item}
                      onPress={() => {
                        // Handle item press
                      }}
                      onFavoritePress={() => {
                        // Handle favorite press
                      }}
                    />
                  )}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.listingsListContent}
                />
              </>
            )}

            {/* Category 2 Listings Section */}
            {category2 && properties.length > 0 && (
              <>
                <SectionHeader
                  title={getCategoryName(category2)}
                  isFirst={false}
                  rightComponent={
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ViewAll', {
                          categoryId: category2.id,
                          categoryName: getCategoryName(category2),
                        });
                      }}
                    >
                      <Text style={styles.viewAllText}>
                        {t('home.viewAll', 'View All')}
                      </Text>
                    </TouchableOpacity>
                  }
                />
                <FlatList
                  data={properties}
                  renderItem={({ item }) => (
                    <ItemCard
                      item={item}
                      onPress={() => {
                        // Handle item press
                      }}
                      onFavoritePress={() => {
                        // Handle favorite press
                      }}
                    />
                  )}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.listingsListContent}
                />
              </>
            )}

            {/* Category 3 Listings Section */}
            {category3 && mobilePhones.length > 0 && (
              <>
                <SectionHeader
                  title={getCategoryName(category3)}
                  isFirst={false}
                  rightComponent={
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ViewAll', {
                          categoryId: category3.id,
                          categoryName: getCategoryName(category3),
                        });
                      }}
                    >
                      <Text style={styles.viewAllText}>
                        {t('home.viewAll', 'View All')}
                      </Text>
                    </TouchableOpacity>
                  }
                />
                <FlatList
                  data={mobilePhones}
                  renderItem={({ item }) => (
                    <ItemCard
                      item={item}
                      onPress={() => {
                        // Handle item press
                      }}
                      onFavoritePress={() => {
                        // Handle favorite press
                      }}
                    />
                  )}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.listingsListContent}
                />
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
