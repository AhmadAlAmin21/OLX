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
};
