import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item._id === action.payload._id); // Changed id to _id
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload._id); // Changed id to _id
        },
        increaseQuantity: (state, action) => {
            const existingItem = state.items.find(item => item._id === action.payload._id); // Changed id to _id
            if (existingItem) {
                existingItem.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const existingItem = state.items.find(item => item._id === action.payload._id); // Changed id to _id
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
        },
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
