import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  allProducts: [],
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      // Clear error when loading starts
      if (action.payload === true) {
        state.error = null;
      }
    },
    setProducts: (state, action) => {
      state.allProducts = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action) => {
      // Don't set error state for authentication errors on public routes
      if (!action.payload.includes('No authentication token found') && 
          !action.payload.includes('Please login to continue')) {
        state.error = action.payload;
      }
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setProducts, setError, clearError } = productSlice.actions;
export default productSlice.reducer;
