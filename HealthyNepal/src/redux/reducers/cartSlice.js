import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return [];
  }
};

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(i => i._id === item._id);
      
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.cart.push({ ...item, qty: 1 });
      }
      
      saveCartToStorage(state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item._id !== action.payload._id);
      saveCartToStorage(state.cart);
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cart.find(i => i._id === id);
      if (item) {
        item.qty = qty;
      }
      saveCartToStorage(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      saveCartToStorage(state.cart);
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
