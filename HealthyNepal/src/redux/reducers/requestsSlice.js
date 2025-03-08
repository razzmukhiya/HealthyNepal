import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async ({ status = 'pending', page = 1, search = '', sort = '' }, { rejectWithValue }) => {
    try {
      
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            requests: [
              {
                id: 1,
                name: 'New Life Pharmacy',
                owner: 'Anita Gurung',
                email: 'anita@gmail.com',
                contact: '98999888',
                location: 'Maharajgunj, Kathmandu',
                requestDate: '2024-03-15',
                documents: ['license.pdf', 'registration.pdf'],
                status: 'Pending'
              },
              {
                id: 2,
                name: 'Green Cross Pharmacy',
                owner: 'Rajesh Shrestha',
                email: 'rajesh@gmail.com',
                contact: '98111000',
                location: 'Lazimpat, Kathmandu',
                requestDate: '2024-03-14',
                documents: ['license.pdf', 'registration.pdf'],
                status: 'Pending'
              }
            ],
            totalPages: 3,
            currentPage: page,
            totalRequests: 25
          });
        }, 1000);
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRequestStatus = createAsyncThunk(
  'requests/updateStatus',
  async ({ requestId, status, feedback = '' }, { rejectWithValue }) => {
    try {
      
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: requestId,
            status: status,
            feedback: feedback
          });
        }, 1000);
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const viewDocument = createAsyncThunk(
  'requests/viewDocument',
  async ({ requestId, documentName }, { rejectWithValue }) => {
    try {
      
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            url: `https://example.com/documents/${documentName}`
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
  requests: [],
  totalPages: 0,
  currentPage: 1,
  totalRequests: 0,
  loading: false,
  error: null,
  filters: {
    status: 'pending',
    search: '',
    sort: ''
  },
  selectedRequest: null,
  documentUrl: null,
  stats: {
    pending: 0,
    approved: 0,
    rejected: 0
  }
};

const requestsSlice = createSlice({
  name: 'requests',
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
        status: 'pending',
        search: '',
        sort: ''
      };
    },
    selectRequest: (state, action) => {
      state.selectedRequest = action.payload;
    },
    clearSelectedRequest: (state) => {
      state.selectedRequest = null;
    },
    updateStats: (state) => {
      const stats = state.requests.reduce((acc, request) => {
        acc[request.status.toLowerCase()]++;
        return acc;
      }, { pending: 0, approved: 0, rejected: 0 });
      state.stats = stats;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch requests cases
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.requests;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalRequests = action.payload.totalRequests;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update request status cases
      .addCase(updateRequestStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.requests.findIndex(request => request.id === action.payload.id);
        if (index !== -1) {
          state.requests[index].status = action.payload.status;
          state.requests[index].feedback = action.payload.feedback;
        }
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // View document cases
      .addCase(viewDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.documentUrl = null;
      })
      .addCase(viewDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documentUrl = action.payload.url;
      })
      .addCase(viewDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.documentUrl = null;
      });
  }
});

export const {
  setFilters,
  clearFilters,
  selectRequest,
  clearSelectedRequest,
  updateStats
} = requestsSlice.actions;

export default requestsSlice.reducer;

// Selectors
export const selectRequests = (state) => state.requests.requests;
export const selectRequestsLoading = (state) => state.requests.loading;
export const selectRequestsError = (state) => state.requests.error;
export const selectRequestsFilters = (state) => state.requests.filters;
export const selectRequestsPagination = (state) => ({
  currentPage: state.requests.currentPage,
  totalPages: state.requests.totalPages,
  totalRequests: state.requests.totalRequests
});
export const selectSelectedRequest = (state) => state.requests.selectedRequest;
export const selectDocumentUrl = (state) => state.requests.documentUrl;
export const selectRequestsStats = (state) => state.requests.stats;
