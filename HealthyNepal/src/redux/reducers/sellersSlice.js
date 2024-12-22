import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  seller: null,
  error: null,
  loadingStates: {
    login: false,
    loadSeller: false,
    update: false
  }
};

const sellerSlice = createSlice({
  name: 'sellers',
  initialState,
  reducers: {
    LoadSellerRequest: (state) => {
      state.loadingStates.loadSeller = true;
      state.error = null;
    },
    LoadSellerSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.seller = action.payload;
      state.error = null;
      state.loadingStates.loadSeller = false;
      state.loadingStates.login = false;
    },
    LoadSellerFail: (state, action) => {
      state.isAuthenticated = false;
      state.seller = null;
      state.error = action.payload;
      state.loadingStates.loadSeller = false;
      state.loadingStates.login = false;
    },
    SellerLogout: (state) => {
      state.isAuthenticated = false;
      state.seller = null;
      state.error = null;
      Object.keys(state.loadingStates).forEach(key => {
        state.loadingStates[key] = false;
      });
    },
    UpdateSellerInfoRequest: (state) => {
      state.loadingStates.update = true;
      state.error = null;
    },
    UpdateSellerInfoSuccess: (state, action) => {
      state.seller = action.payload;
      state.error = null;
      state.loadingStates.update = false;
    },
    UpdateSellerInfoFail: (state, action) => {
      state.error = action.payload;
      state.loadingStates.update = false;
    },
    clearErrors: (state) => {
      state.error = null;
    }
  }
});

// Export actions
export const {
  LoadSellerRequest,
  LoadSellerSuccess,
  LoadSellerFail,
  SellerLogout,
  UpdateSellerInfoRequest,
  UpdateSellerInfoSuccess,
  UpdateSellerInfoFail,
  clearErrors
} = sellerSlice.actions;

// Export selectors
export const selectSeller = (state) => state.sellers.seller;
export const selectIsAuthenticated = (state) => state.sellers.isAuthenticated;
export const selectError = (state) => state.sellers.error;
export const selectLoadingStates = (state) => state.sellers.loadingStates;

// Export reducer
export default sellerSlice.reducer;
