

// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
// };

// export const userReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase("LOGIN_SUCCESS", (state) => {
//       state.isAuthenticated = true;
//     })
//     .addCase("LOGOUT", (state) => {
//       state.isAuthenticated = false;
//     });
// });

// const initialState = {
//   isAuthenticated: false,
// };

// export const userReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase('LoadUser Request', (state) => {
//       state.loading = true;
//     })
//     .addCase('LoadUser Success', (state, action) => {
//       state.isAuthenticated = true;
//       state.loading = false;
//       state.user = action.payload;
//     })
//     .addCase('LoadUser Fail', (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.isAuthenticated = false;
//     });
// });

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LOAD_USER_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('LOAD_USER_SUCCESS', (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase('LOAD_USER_FAIL', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });
});


