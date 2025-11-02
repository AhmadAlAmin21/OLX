import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  categoriesService,
  CategoryFieldsResponse,
  CategoryField,
} from '../../services/categoriesService';
import { AppDispatch } from '../index';

interface CategoryFieldsState {
  fields: CategoryField[];
  loading: boolean;
  error: string | null;
  selectedCategorySlug: string | null;
}

const initialState: CategoryFieldsState = {
  fields: [],
  loading: false,
  error: null,
  selectedCategorySlug: null,
};

const categoryFieldsSlice = createSlice({
  name: 'categoryFields',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
      state.error = null;
    },
    setFields: (
      state,
      action: PayloadAction<{
        fields: CategoryField[];
        categorySlug: string;
      }>,
    ) => {
      state.loading = false;
      state.fields = action.payload.fields;
      state.selectedCategorySlug = action.payload.categorySlug;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearFields: state => {
      state.fields = [];
      state.selectedCategorySlug = null;
      state.error = null;
    },
  },
});

export const { setLoading, setFields, setError, clearFields } =
  categoryFieldsSlice.actions;

export const fetchCategoryFields =
  (categorySlug: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading());

      console.log('🟡 [CategoryFieldsSlice] Starting fetch for:', categorySlug);

      const response = await categoriesService.fetchCategoryFields(
        categorySlug,
      );

      console.log('🟡 [CategoryFieldsSlice] Received response:');
      console.log('  Type:', typeof response);
      console.log('  Is Array:', Array.isArray(response));
      console.log(
        '  Is Object:',
        typeof response === 'object' && response !== null,
      );
      if (response && typeof response === 'object') {
        console.log('  Keys:', Object.keys(response));
        console.log(
          '  Stringified (first 2000 chars):',
          JSON.stringify(response, null, 2).substring(0, 2000),
        );
      }

      // Helper function to map API value types to our field types
      function mapValueTypeToFieldType(
        valueType: string,
        filterType?: string,
      ): string {
        // Map API value types to our field types
        if (valueType === 'enum') {
          if (filterType === 'single_choice') {
            return 'select';
          } else if (filterType === 'multiple_choice') {
            return 'multiselect';
          }
          return 'select';
        } else if (valueType === 'string' || valueType === 'text') {
          return 'text';
        } else if (
          valueType === 'integer' ||
          valueType === 'int' ||
          valueType === 'float' ||
          valueType === 'double'
        ) {
          return 'number';
        } else if (valueType === 'boolean') {
          return 'checkbox';
        }
        return 'text'; // default
      }

      // Helper function to map API field structure to CategoryField
      function mapApiFieldsToCategoryFields(apiFields: any[]): CategoryField[] {
        return apiFields
          .filter((field: any) => {
            // Filter out fields that are excluded from post an ad
            const roles = field.roles || [];
            return !roles.includes('exclude_from_post_an_ad');
          })
          .map((field: any) => {
            const categoryField: CategoryField = {
              name: field.attribute || field.name,
              label: field.name,
              label_l1: field.seoTitle?.ar || field.name,
              type: mapValueTypeToFieldType(field.valueType, field.filterType),
              required: field.isMandatory || false,
              placeholder: '',
              placeholder_l1: '',
              choices: field.choices
                ? field.choices.map((choice: any) => ({
                    value: choice.value,
                    label: choice.label,
                    label_l1: choice.seoSlug?.ar || choice.label,
                  }))
                : undefined,
              min: field.minValue,
              max: field.maxValue,
              maxLength: field.maxLength,
            };

            return categoryField;
          });
      }

      // Extract fields from the response
      // The response might have different structures, so we need to handle it flexibly
      let fields: CategoryField[] = [];

      console.log('🟡 [CategoryFieldsSlice] Extracting fields...');

      // Handle flat response structure
      if (Array.isArray(response)) {
        console.log(
          '🟡 [CategoryFieldsSlice] Response is an array, length:',
          response.length,
        );
        // Map API fields to our CategoryField structure
        fields = mapApiFieldsToCategoryFields(response as any[]);
      } else if (typeof response === 'object' && response !== null) {
        console.log('🟡 [CategoryFieldsSlice] Response is an object');
        // Handle categorized response structure (category IDs as keys)
        const categoryIds = Object.keys(response);
        console.log(
          '🟡 [CategoryFieldsSlice] Category IDs found:',
          categoryIds,
        );

        if (categoryIds.length > 0) {
          // Get fields from the first category (or merge all)
          const firstCategoryData = response[categoryIds[0]];
          console.log(
            '🟡 [CategoryFieldsSlice] First category ID:',
            categoryIds[0],
          );
          console.log(
            '🟡 [CategoryFieldsSlice] First category data type:',
            typeof firstCategoryData,
          );

          if (firstCategoryData && typeof firstCategoryData === 'object') {
            console.log(
              '🟡 [CategoryFieldsSlice] First category data keys:',
              Object.keys(firstCategoryData),
            );

            // The API returns "flatFields" not "fields"
            if (Array.isArray(firstCategoryData.flatFields)) {
              console.log(
                '🟡 [CategoryFieldsSlice] Found .flatFields array, length:',
                firstCategoryData.flatFields.length,
              );
              fields = mapApiFieldsToCategoryFields(
                firstCategoryData.flatFields,
              );
            } else if (Array.isArray(firstCategoryData.fields)) {
              console.log(
                '🟡 [CategoryFieldsSlice] Found .fields array, length:',
                firstCategoryData.fields.length,
              );
              fields = mapApiFieldsToCategoryFields(firstCategoryData.fields);
            } else if (Array.isArray(firstCategoryData)) {
              console.log(
                '🟡 [CategoryFieldsSlice] First category data is array, length:',
                firstCategoryData.length,
              );
              fields = mapApiFieldsToCategoryFields(firstCategoryData);
            } else {
              console.warn(
                '🟡 [CategoryFieldsSlice] No array found in category data',
              );
            }
          }
        } else {
          console.warn(
            '🟡 [CategoryFieldsSlice] No category IDs found in response',
          );
        }
      } else {
        console.warn(
          '🟡 [CategoryFieldsSlice] Unexpected response type:',
          typeof response,
        );
      }

      console.log(
        '🟡 [CategoryFieldsSlice] Final extracted fields count:',
        fields.length,
      );
      if (fields.length > 0) {
        console.log(
          '🟡 [CategoryFieldsSlice] First field sample:',
          JSON.stringify(fields[0], null, 2),
        );
      } else {
        console.warn(
          '🟡 [CategoryFieldsSlice] No fields extracted! Full response:',
          JSON.stringify(response, null, 2),
        );
      }

      dispatch(setFields({ fields, categorySlug }));
    } catch (error) {
      console.error('🔴 [CategoryFieldsSlice] Error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to fetch category fields';
      dispatch(setError(errorMessage));
    }
  };

export default categoryFieldsSlice.reducer;
