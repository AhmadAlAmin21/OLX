import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { categoriesService, Category } from '../../services/categoriesService';
import { AppDispatch } from '../index';

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
      state.error = null;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setLoading, setCategories, setError } = categoriesSlice.actions;

export const fetchCategories = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());
    const categories = await categoriesService.fetchCategories();
    dispatch(setCategories(categories));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch categories';
    dispatch(setError(errorMessage));
  }
};

export default categoriesSlice.reducer;
