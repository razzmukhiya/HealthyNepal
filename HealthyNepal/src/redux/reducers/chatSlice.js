import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (_, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            sellers: [
              {
                id: 1,
                name: 'Kamal Pharmacy',
                avatar: 'https://via.placeholder.com/40',
                online: true,
                unread: 2,
                lastMessage: 'Hello, I have a question about...',
                lastMessageTime: '10:30 AM'
              },
              {
                id: 2,
                name: 'City Pharmacy',
                avatar: 'https://via.placeholder.com/40',
                online: false,
                unread: 0,
                lastMessage: 'Thank you for your help!',
                lastMessageTime: 'Yesterday'
              }
            ],
            chats: {
              1: [
                { id: 1, sender: 'seller', text: 'Hello, I have a question about my withdrawal request', time: '10:25 AM' },
                { id: 2, sender: 'admin', text: 'Hi, sure! How can I help you?', time: '10:28 AM' },
                { id: 3, sender: 'seller', text: 'I submitted it yesterday but haven\'t received any update', time: '10:30 AM' }
              ],
              2: [
                { id: 1, sender: 'seller', text: 'Hi, I\'m having trouble updating my shop details', time: 'Yesterday' },
                { id: 2, sender: 'admin', text: 'Let me check that for you', time: 'Yesterday' },
                { id: 3, sender: 'seller', text: 'Thank you for your help!', time: 'Yesterday' }
              ]
            }
          });
        }, 1000);
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ sellerId, message }, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now(),
            sender: 'admin',
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        }, 500);
      });
      return { sellerId, message: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markAsRead = createAsyncThunk(
  'chat/markAsRead',
  async (sellerId, { rejectWithValue }) => {
    try {
      // Replace with actual API call
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      return sellerId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  sellers: [],
  chats: {},
  selectedSeller: null,
  loading: false,
  error: null,
  search: ''
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedSeller: (state, action) => {
      state.selectedSeller = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch chats cases
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload.sellers;
        state.chats = action.payload.chats;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send message cases
      .addCase(sendMessage.pending, (state) => {
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { sellerId, message } = action.payload;
        if (!state.chats[sellerId]) {
          state.chats[sellerId] = [];
        }
        state.chats[sellerId].push(message);
        
        // Update last message in sellers list
        const sellerIndex = state.sellers.findIndex(s => s.id === sellerId);
        if (sellerIndex !== -1) {
          state.sellers[sellerIndex].lastMessage = message.text;
          state.sellers[sellerIndex].lastMessageTime = message.time;
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Mark as read cases
      .addCase(markAsRead.fulfilled, (state, action) => {
        const sellerIndex = state.sellers.findIndex(s => s.id === action.payload);
        if (sellerIndex !== -1) {
          state.sellers[sellerIndex].unread = 0;
        }
      });
  }
});

export const { setSelectedSeller, setSearch, clearError } = chatSlice.actions;
export default chatSlice.reducer;

// Selectors
export const selectSellers = (state) => {
  const search = state.chat.search.toLowerCase();
  return state.chat.sellers.filter(seller => 
    seller.name.toLowerCase().includes(search)
  );
};
export const selectChats = (state) => state.chat.chats;
export const selectSelectedSeller = (state) => state.chat.selectedSeller;
export const selectChatLoading = (state) => state.chat.loading;
export const selectChatError = (state) => state.chat.error;
export const selectSearch = (state) => state.chat.search;
