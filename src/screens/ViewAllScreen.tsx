import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/AppNavigator';
import ScreenHeader from '../components/ScreenHeader';
import ItemCard, { ListingItem } from '../components/ItemCard';
import { styles } from '../styles/ViewAllScreen.styles';
import dummyListings from '../data/dummyListings.json';
import { globalStyles } from '../styles/globalStyles';

type ViewAllScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'ViewAll'
>;

type ViewAllScreenRouteProp = RouteProp<HomeStackParamList, 'ViewAll'>;

const ViewAllScreen: React.FC = () => {
  const navigation = useNavigation<ViewAllScreenNavigationProp>();
  const route = useRoute<ViewAllScreenRouteProp>();
  const { categoryName } = route.params || {};
  const listings = dummyListings as ListingItem[];

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScreenHeader
        title={categoryName || 'Cars for Sale'}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ItemCard
              item={item}
              style={styles.cardStyle}
              onPress={() => {
                // Handle item press - navigate to detail screen
              }}
              onFavoritePress={() => {
                // Handle favorite press
              }}
            />
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default ViewAllScreen;
