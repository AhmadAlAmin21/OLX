import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Category } from '../services/categoriesService';

interface CategoryItemProps {
  category: Category;
  compact?: boolean;
  getCategoryName: (category: Category) => string;
  onPress?: () => void;
}

// Generate a color based on category ID for visual variety
const getCategoryColor = (id: number): string => {
  const colors = [
    '#007bff',
    '#28a745',
    '#ffc107',
    '#dc3545',
    '#17a2b8',
    '#6610f2',
    '#e83e8c',
    '#fd7e14',
    '#20c997',
    '#6f42c1',
  ];
  return colors[id % colors.length];
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  compact = false,
  getCategoryName,
  onPress,
}) => {
  const categoryName = getCategoryName(category);
  const categoryColor = getCategoryColor(category.id);

  // Use first letter of category name as placeholder
  const firstLetter = categoryName.charAt(0).toUpperCase();

  return (
    <TouchableOpacity
      style={[styles.categoryItem, compact && styles.compactCategoryItem]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.categoryContainer}>
        {/* Circular Image Container */}
        <View
          style={[styles.circleContainer, { backgroundColor: categoryColor }]}
        >
          <View style={styles.circleContent}>
            <Text style={styles.circleLetter}>{firstLetter}</Text>
          </View>
        </View>
        {/* Category Title */}
        <Text
          style={[styles.categoryName, compact && styles.compactCategoryName]}
          numberOfLines={2}
        >
          {categoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    marginBottom: 16,
  },
  compactCategoryItem: {
    width: 80,
    marginRight: 16,
    marginBottom: 16,
  },
  categoryContainer: {
    alignItems: 'center',
    width: '100%',
  },
  circleContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  circleContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleLetter: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  categoryName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
  },
  compactCategoryName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default CategoryItem;
