import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';

const store2 = configureStore({
  reducer: {
    products: productsReducer, // ✅ key must match
  },
});

export default store2;
