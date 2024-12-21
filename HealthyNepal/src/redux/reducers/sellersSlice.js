import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchSellers = createAsyncThunk(
  'sellers/fetchSellers',
  async ({ status = 'active', page = 1, search = '', sort = '' }, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            sellers: [
              {
                id: 1,
                name: 'Kamal Pharmacy',
                owner: 'Kamal Hasan',
                email: 'kamal@gmail.com',
                contact: '98123456',
                location: 'Tinkune, Kathmandu',
                status: 'Active'
              },
              {
                id: 2,
                name: 'City Pharmacy',
                owner: 'Ram Kumar',
                email: 'ram@gmail.com',
                contact: '98765432',
                location: 'Baneshwor, Kathmandu',
                status: 'Active'
              }
            ],
            totalPages: 3,
            currentPage: page,
            totalSellers: 25
          });
        }, 1000);
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSellerStatus = createAsyncThunk(
  'sellers/updateStatus',
  async ({ sellerId, status }, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: sellerId,
            status: status
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
  sellers: [],
  totalPages: 0,
  currentPage: 1,
  totalSellers: 0,
  loading: false,
  error: null,
  filters: {
    status: 'active',
    search: '',
    sort: ''
  }
};

const sellersSlice = createSlice({
  name: 'sellers',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    clearFilters: (state) => {
      state.filters = {
        status: 'active',
        search: '',
        sort: ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch sellers cases
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload.sellers;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalSellers = action.payload.totalSellers;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update seller status cases
      .addCase(updateSellerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sellers.findIndex(seller => seller.id === action.payload.id);
        if (index !== -1) {
          state.sellers[index].status = action.payload.status;
        }
      })
      .addCase(updateSellerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearFilters } = sellersSlice.actions;
export default sellersSlice.reducer;

// Selectors
export const selectSellers = (state) => state.sellers.sellers;
export const selectSellersLoading = (state) => state.sellers.loading;
export const selectSellersError = (state) => state.sellers.error;
export const selectSellersFilters = (state) => state.sellers.filters;
export const selectSellersPagination = (state) => ({
  currentPage: state.sellers.currentPage,
  totalPages: state.sellers.totalPages,
  totalSellers: state.sellers.totalSellers
});
