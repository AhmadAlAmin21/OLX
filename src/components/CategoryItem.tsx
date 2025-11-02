import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Category } from '../services/categoriesService';

interface CategoryItemProps {
  category: Category;
  compact?: boolean;
  getCategoryName: (category: Category) => string;
  onPress?: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  compact = false,
  getCategoryName,
  onPress,
}) => {
  const categoryName = getCategoryName(category);

  return (
    <TouchableOpacity
      style={[styles.categoryItem, compact && styles.compactCategoryItem]}
      onPress={onPress}
    >
      <View style={styles.categoryContent}>
        <Text
          style={[styles.categoryName, compact && styles.compactCategoryName]}
        >
          {categoryName}
        </Text>
        <Text
          style={[styles.categorySlug, compact && styles.compactCategorySlug]}
        >
          /{category.slug}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  compactCategoryItem: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '48%',
    marginHorizontal: 6,
    marginBottom: 12,
    padding: 12,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  compactCategoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
  categorySlug: {
    fontSize: 12,
    color: '#007bff',
    fontFamily: 'monospace',
  },
  compactCategorySlug: {
    fontSize: 11,
  },
});

export default CategoryItem;
