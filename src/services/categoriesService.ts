export interface Category {
  id: number;
  name: string;
  name_l1: string;
  externalID: string;
  slug: string;
  level: number;
  parentID: number | null;
  displayPriority: number;
  purpose: string;
  roles: string[];
  locationDepthLimits: {
    min: number;
    max: number;
  };
  configurations: Record<string, any>;
  statistics: {
    activeCount: number;
  };
  children: Category[];
}

export interface CategoryFieldChoice {
  value: string | number;
  label: string;
  label_l1?: string;
}

export interface CategoryField {
  name: string;
  label?: string;
  label_l1?: string;
  type: string; // 'text', 'number', 'select', 'multiselect', 'checkbox', 'textarea', etc.
  required?: boolean;
  placeholder?: string;
  placeholder_l1?: string;
  choices?: CategoryFieldChoice[];
  min?: number;
  max?: number;
  maxLength?: number;
  section?: string;
  section_l1?: string;
  dependencies?: Record<string, any>;
  validation?: Record<string, any>;
}

export interface CategoryFieldsResponse {
  [categoryId: string]: {
    flatFields?: any[];
    fields?: any[];
  };
}

const API_BASE_URL = 'https://www.olx.com.lb/api';

export const categoriesService = {
  fetchCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/categories`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch categories: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data as Category[];
  },

  fetchCategoryFields: async (
    categorySlug: string,
    options?: {
      includeChildCategories?: boolean;
      splitByCategoryIDs?: boolean;
      flatChoices?: boolean;
      groupChoicesBySection?: boolean;
      flat?: boolean;
    },
  ): Promise<CategoryFieldsResponse> => {
    const {
      includeChildCategories = true,
      splitByCategoryIDs = true,
      flatChoices = true,
      groupChoicesBySection = true,
      flat = true,
    } = options || {};

    const params = new URLSearchParams({
      categorySlugs: categorySlug,
      includeChildCategories: includeChildCategories.toString(),
      splitByCategoryIDs: splitByCategoryIDs.toString(),
      flatChoices: flatChoices.toString(),
      groupChoicesBySection: groupChoicesBySection.toString(),
      flat: flat.toString(),
    });

    const url = `${API_BASE_URL}/categoryFields?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch category fields: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    return data as CategoryFieldsResponse;
  },
};
