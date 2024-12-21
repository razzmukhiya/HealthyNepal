import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromStorage = () => {
  try {
    const wishlistData = localStorage.getItem('wishlist');
    return wishlistData ? JSON.parse(wishlistData) : [];
  } catch (error) {
    console.error('Error loading wishlist from storage:', error);
    return [];
  }
};

const saveWishlistToStorage = (wishlist) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  } catch (error) {
    console.error('Error saving wishlist to storage:', error);
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: loadWishlistFromStorage(),
    loading: false,
    error: null
  },
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const existingItem = state.wishlist.find(i => i._id === item._id);
      
      if (!existingItem) {
        state.wishlist.push(item);
        saveWishlistToStorage(state.wishlist);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item._id !== action.payload._id);
      saveWishlistToStorage(state.wishlist);
    },
    clearWishlist: (state) => {
      state.wishlist = [];
      saveWishlistToStorage(state.wishlist);
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
