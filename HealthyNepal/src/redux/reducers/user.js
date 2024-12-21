import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    // Load user
    .addCase("LOAD_USER_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("LOAD_USER_SUCCESS", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LOAD_USER_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    })
    // Login user
    .addCase("LoginRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoginSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase("LoginFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    })
    // Clear errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
