import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import categoryFieldsReducer from './slices/categoryFieldsSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    categoryFields: categoryFieldsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
