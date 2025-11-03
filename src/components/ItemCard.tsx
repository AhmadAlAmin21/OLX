import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/ItemCard.styles';

export interface ListingItem {
  id: string;
  imageUrl: string;
  price: number;
  currency: string;
  title: string;
  location: string;
  postedAgo: string;
  isFavorite: boolean;
  // Vehicle specific fields
  make?: string;
  model?: string;
  year?: number;
  mileage?: number;
  mileageUnit?: string;
  // Property specific fields
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  areaUnit?: string;
  // Mobile phone specific fields
  brand?: string;
  storage?: string;
  condition?: string;
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

  const renderDetails = () => {
    // Property listing
    if (item.bedrooms !== undefined && item.bathrooms !== undefined) {
      const areaText = item.area
        ? ` • ${item.area} ${item.areaUnit || 'sqm'}`
        : '';
      return `${item.bedrooms} bed • ${item.bathrooms} bath${areaText}`;
    }
    // Vehicle listing
    if (item.mileage !== undefined && item.year !== undefined) {
      return `${formatMileage(item.mileage, item.mileageUnit || 'km')} • ${item.year}`;
    }
    // Mobile phone listing
    if (item.brand || item.storage || item.condition) {
      const parts: string[] = [];
      if (item.brand) parts.push(item.brand);
      if (item.storage) parts.push(item.storage);
      if (item.condition) parts.push(item.condition);
      return parts.join(' • ');
    }
    return '';
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

        {/* Details */}
        {renderDetails() && (
          <Text style={styles.details}>{renderDetails()}</Text>
        )}

        {/* Location */}
        <Text style={styles.location}>{item.location}</Text>

        {/* Posted Time */}
        <Text style={styles.postedAgo}>{item.postedAgo}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
