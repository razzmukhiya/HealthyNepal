import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  seller: null,
  error: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("SellerLoginSuccess", (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.seller = action.payload.user;
      state.error = null;
    })
    .addCase("SellerRegisterSuccess", (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.seller = action.payload.user;
      state.error = null;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.seller = action.payload;
      state.error = null;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.seller = null;
      state.error = action.payload;
    })
    .addCase("UpdateSellerInfoRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("UpdateSellerInfoSuccess", (state, action) => {
      state.isLoading = false;
      state.seller = action.payload;
      state.error = null;
    })
    .addCase("UpdateSellerInfoFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("SellerLogout", (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.seller = null;
      state.error = null;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    // Add default case to handle unknown actions
    .addDefaultCase((state) => {
      return state;
    });
});
