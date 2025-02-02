import { createSlice } from '@reduxjs/toolkit';
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    currentCategory: null,
  },
  reducers: {
    updateProducts: (state, action) => {
      state.products = action.payload; // Action carries products array
    },
    updateCategories: (state, action) => {
      state.categories = action.payload; // Action carries categories array
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory = action.payload; // Action carries currentCategory value
    },
  },
});
export const { updateProducts, updateCategories, updateCurrentCategory } = productsSlice.actions;
export default productsSlice.reducer;