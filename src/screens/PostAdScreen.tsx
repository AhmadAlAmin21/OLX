import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/AppNavigator';
import ScreenHeader from '../components/ScreenHeader';
import BottomSheet from '../components/BottomSheet';
import DynamicFormField from '../components/DynamicFormField';
import SelectInput from '../components/SelectInput';
import LoadingIndicator from '../components/LoadingIndicator';
import EmptyState from '../components/EmptyState';
import SubmitButton from '../components/SubmitButton';
import { styles } from '../styles/PostAdScreen.styles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCategories } from '../store/slices/categoriesSlice';
import { fetchCategoryFields } from '../store/slices/categoryFieldsSlice';
import { Category } from '../services/categoriesService';

type PostAdScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'PostAd'
>;

const PostAdScreen: React.FC = () => {
  const navigation = useNavigation<PostAdScreenNavigationProp>();
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector(state => state.categories);
  const { fields: categoryFields, loading: fieldsLoading } = useAppSelector(
    state => state.categoryFields,
  );

  const currentLanguage = i18n.language || 'en';

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch categories on mount
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    // When category is selected, fetch its fields
    if (selectedCategory) {
      dispatch(fetchCategoryFields(selectedCategory.slug));
      // Clear previous form values
      setFormValues({});
      setFormErrors({});
    }
  }, [selectedCategory, dispatch]);

  console.log('🔵 [PostAdScreen] Category Fields:', categoryFields);
  const getCategoryName = (category: Category): string => {
    return currentLanguage === 'ar' ? category.name_l1 : category.name;
  };

  const getCategoryOptions = (): Array<{ code: string; label: string }> => {
    const flattenCategories = (cats: Category[]): Category[] => {
      let result: Category[] = [];
      for (const cat of cats) {
        result.push(cat);
        if (cat.children && cat.children.length > 0) {
          result = result.concat(flattenCategories(cat.children));
        }
      }
      return result;
    };

    const allCategories = flattenCategories(categories);
    return allCategories.map(cat => ({
      code: cat.slug,
      label: getCategoryName(cat),
    }));
  };

  const handleCategorySelect = (categorySlug: string) => {
    const category = findCategoryBySlug(categories, categorySlug);
    if (category) {
      setSelectedCategory(category);
      setShowCategoryModal(false);
    }
  };

  const findCategoryBySlug = (
    cats: Category[],
    slug: string,
  ): Category | null => {
    for (const cat of cats) {
      if (cat.slug === slug) return cat;
      if (cat.children && cat.children.length > 0) {
        const found = findCategoryBySlug(cat.children, slug);
        if (found) return found;
      }
    }
    return null;
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value,
    }));
    // Clear error for this field
    if (formErrors[fieldName]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    categoryFields.forEach(field => {
      if (field.required) {
        const value = formValues[field.name];
        if (!value && value !== 0 && value !== false) {
          const label =
            currentLanguage === 'ar' && field.label_l1
              ? field.label_l1
              : field.label || field.name;
          errors[field.name] = `${label} is required`;
        }
      }

      // Additional validation can be added here based on field.validation
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!selectedCategory) {
      Alert.alert(t('common.error'), t('postAd.selectCategoryFirst'));
      return;
    }

    if (!validateForm()) {
      Alert.alert(t('common.error'), t('postAd.errorRequired'));
      return;
    }

    // TODO: Implement ad submission logic
    // For now, just show success message
    Alert.alert(t('common.success'), t('postAd.successMessage'), [
      {
        text: t('common.ok'),
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const getCategoryDisplayName = (): string => {
    if (!selectedCategory) {
      return t('postAd.selectCategory');
    }
    return getCategoryName(selectedCategory);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={t('postAd.headerTitle')}
        showBackButton={true}
        titleStyle={styles.headerTitle}
      />
      <ScrollView style={styles.content}>
        <View style={styles.form}>
          {/* Category Selection */}
          <SelectInput
            label={t('postAd.category')}
            value={selectedCategory ? getCategoryDisplayName() : undefined}
            placeholder={t('postAd.selectCategory')}
            required={true}
            onPress={() => setShowCategoryModal(true)}
            error={formErrors.category}
          />

          {/* Loading indicator for category fields */}
          {fieldsLoading && selectedCategory && (
            <LoadingIndicator
              message={t('postAd.loadingFields')}
              size="small"
              color="#007bff"
            />
          )}

          {/* Dynamic Form Fields */}
          {!fieldsLoading &&
            selectedCategory &&
            categoryFields.length > 0 &&
            categoryFields.map(field => (
              <DynamicFormField
                key={field.name}
                field={field}
                value={formValues[field.name]}
                onChange={value => handleFieldChange(field.name, value)}
                error={formErrors[field.name]}
              />
            ))}

          {/* Show message if no fields available */}
          {!fieldsLoading &&
            selectedCategory &&
            categoryFields.length === 0 && (
              <EmptyState message={t('postAd.noFieldsAvailable')} />
            )}

          {/* Submit Button */}
          <SubmitButton
            title={t('postAd.submit')}
            onPress={handleSubmit}
            disabled={!selectedCategory || fieldsLoading}
            loading={fieldsLoading}
          />
        </View>
      </ScrollView>

      {/* Category Selection Modal */}
      <BottomSheet
        visible={showCategoryModal}
        title={t('postAd.selectCategory')}
        options={getCategoryOptions()}
        selectedValue={selectedCategory?.slug}
        onSelect={handleCategorySelect}
        onClose={() => setShowCategoryModal(false)}
      />
    </SafeAreaView>
  );
};

export default PostAdScreen;
