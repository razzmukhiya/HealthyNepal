import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProducts: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log('setProducts reducer called with:', action.payload);
      state.allProducts = action.payload;
      console.log('New state after setProducts:', state.allProducts);
    },
    appendProducts: (state, action) => {
      console.log('appendProducts reducer called with:', action.payload);
      state.allProducts = [...state.allProducts, ...action.payload];
      console.log('New state after appendProducts:', state.allProducts);
    },
    setLoading: (state, action) => {
      console.log('setLoading reducer called with:', action.payload);
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      console.log('setError reducer called with:', action.payload);
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      console.log('setCurrentPage reducer called with:', action.payload);
      state.currentPage = action.payload;
    },
    setHasMore: (state, action) => {
      console.log('setHasMore reducer called with:', action.payload);
      state.hasMore = action.payload;
    }
  },
});

export const { 
  setProducts, 
  appendProducts, 
  setLoading, 
  setError, 
  setCurrentPage, 
  setHasMore 
} = productSlice.actions;

export default productSlice.reducer;
