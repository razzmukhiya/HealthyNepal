import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const registerAdmin = createAsyncThunk(
  'register/registerAdmin',
  async (formData, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate validation
          if (formData.email === 'existing@example.com') {
            reject(new Error('Email already exists'));
          }
          resolve({
            success: true,
            message: 'Registration successful. Please login to continue.'
          });
        }, 1000);
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null,
  message: ''
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = '';
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess } = registerSlice.actions;
export default registerSlice.reducer;
