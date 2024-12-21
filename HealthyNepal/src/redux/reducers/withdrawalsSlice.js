import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchWithdrawals = createAsyncThunk(
  'withdrawals/fetchWithdrawals',
  async ({ status = 'all', page = 1, search = '', sort = '' }, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            withdrawals: [
              {
                id: 1,
                sellerName: 'Kamal Pharmacy',
                owner: 'Kamal Hasan',
                amount: 25000,
                accountNo: '1234567890',
                bank: 'Nepal Bank Limited',
                requestDate: '2024-03-15',
                status: 'Pending'
              },
              {
                id: 2,
                sellerName: 'City Pharmacy',
                owner: 'Ram Kumar',
                amount: 35000,
                accountNo: '0987654321',
                bank: 'NIC Asia Bank',
                requestDate: '2024-03-14',
                status: 'Approved'
              }
            ],
            totalPages: 3,
            currentPage: page,
            totalWithdrawals: 25
          });
        }, 1000);
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWithdrawalStatus = createAsyncThunk(
  'withdrawals/updateStatus',
  async ({ withdrawalId, status }, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: withdrawalId,
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
  withdrawals: [],
  totalPages: 0,
  currentPage: 1,
  totalWithdrawals: 0,
  loading: false,
  error: null,
  filters: {
    status: 'all',
    search: '',
    sort: ''
  },
  stats: {
    pending: 0,
    approved: 0,
    rejected: 0,
    totalAmount: 0
  }
};

const withdrawalsSlice = createSlice({
  name: 'withdrawals',
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
        status: 'all',
        search: '',
        sort: ''
      };
    },
    updateStats: (state) => {
      const stats = state.withdrawals.reduce((acc, withdrawal) => {
        acc[withdrawal.status.toLowerCase()]++;
        acc.totalAmount += withdrawal.amount;
        return acc;
      }, { pending: 0, approved: 0, rejected: 0, totalAmount: 0 });
      state.stats = stats;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch withdrawals cases
      .addCase(fetchWithdrawals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWithdrawals.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawals = action.payload.withdrawals;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalWithdrawals = action.payload.totalWithdrawals;
      })
      .addCase(fetchWithdrawals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update withdrawal status cases
      .addCase(updateWithdrawalStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWithdrawalStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.withdrawals.findIndex(withdrawal => withdrawal.id === action.payload.id);
        if (index !== -1) {
          state.withdrawals[index].status = action.payload.status;
        }
      })
      .addCase(updateWithdrawalStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearFilters, updateStats } = withdrawalsSlice.actions;
export default withdrawalsSlice.reducer;

// Selectors
export const selectWithdrawals = (state) => state.withdrawals.withdrawals;
export const selectWithdrawalsLoading = (state) => state.withdrawals.loading;
export const selectWithdrawalsError = (state) => state.withdrawals.error;
export const selectWithdrawalsFilters = (state) => state.withdrawals.filters;
export const selectWithdrawalsPagination = (state) => ({
  currentPage: state.withdrawals.currentPage,
  totalPages: state.withdrawals.totalPages,
  totalWithdrawals: state.withdrawals.totalWithdrawals
});
export const selectWithdrawalsStats = (state) => state.withdrawals.stats;
