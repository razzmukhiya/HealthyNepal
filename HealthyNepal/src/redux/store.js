import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import registerReducer from './reducers/registerSlice';
import sellersReducer from './reducers/sellersSlice';
import withdrawalsReducer from './reducers/withdrawalsSlice';
import requestsReducer from './reducers/requestsSlice';
import chatReducer from './reducers/chatSlice';
import productReducer from './reducers/productSlice';
import cartReducer from './reducers/cartSlice';
import wishlistReducer from './reducers/wishlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    sellers: sellersReducer,
    withdrawals: withdrawalsReducer,
    requests: requestsReducer,
    chat: chatReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
