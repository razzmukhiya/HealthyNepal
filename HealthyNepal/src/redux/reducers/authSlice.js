import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        error: null,
        loading: false
    },
    reducers: {
        login(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        logoutAdmin(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        LOGOUT(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;
        },
        clearError(state) {
            state.error = null;
        },
        loginAdmin(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        loadUserRequest(state) {
            state.loading = true;
            state.error = null;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loadUserFail(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        }
    },
});

export const { 
    login, 
    logout, 
    logoutAdmin, 
    clearError, 
    loginAdmin,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    LOGOUT
} = authSlice.actions;

export default authSlice.reducer;