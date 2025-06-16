// redux/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState }) => {
    const { skip, limit } = getState().products;
    const res = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    return res.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    total: 0,
    skip: 0,
    limit: 10,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
  const newProducts = action.payload.products;

  // Avoid duplicates by filtering based on existing IDs
  const existingIds = new Set(state.items.map(p => p.id));
  const uniqueNew = newProducts.filter(p => !existingIds.has(p.id));

  state.items.push(...uniqueNew);
  state.total = action.payload.total;
  state.skip += state.limit;
  state.loading = false;
})

      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
