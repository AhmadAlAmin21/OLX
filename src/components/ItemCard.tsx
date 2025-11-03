import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/ItemCard.styles';

export interface ListingItem {
  id: string;
  imageUrl: string;
  price: number;
  currency: string;
  title: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  mileageUnit: string;
  location: string;
  postedAgo: string;
  isFavorite: boolean;
}

interface ItemCardProps {
  item: ListingItem;
  onPress?: () => void;
  onFavoritePress?: () => void;
  style?: any;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onPress,
  onFavoritePress,
  style,
}) => {
  const formatPrice = (price: number, currency: string): string => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const formatMileage = (mileage: number, unit: string): string => {
    return `${mileage.toLocaleString()} ${unit}`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Price */}
        <Text style={styles.price}>
          {formatPrice(item.price, item.currency)}
        </Text>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Mileage and Year */}
        <Text style={styles.details}>
          {formatMileage(item.mileage, item.mileageUnit)} • {item.year}
        </Text>

        {/* Location */}
        <Text style={styles.location}>{item.location}</Text>

        {/* Posted Time */}
        <Text style={styles.postedAgo}>{item.postedAgo}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
