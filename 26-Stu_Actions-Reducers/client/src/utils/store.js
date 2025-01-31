import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import cartReducer from '../features/cartSlice';
import categoryReducer from '../features/categorySlice';
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    category: categoryReducer,
  },
});
export default store;