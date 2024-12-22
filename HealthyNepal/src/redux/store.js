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

// Custom middleware for logging actions and errors
const logger = (store) => (next) => (action) => {
  // Log all product-related actions
  if (action.type?.startsWith('product/')) {
    console.log('Product Action:', {
      type: action.type,
      payload: action.payload
    });
  }
  if (action.type?.startsWith('LoadSeller')) {
    console.log('Dispatching seller action:', action.type);
  }
  try {
    const result = next(action);
    // Log state after product actions
    if (action.type?.startsWith('product/')) {
      const state = store.getState();
      console.log('Product State after action:', {
        products: state.product.allProducts?.length || 0,
        loading: state.product.isLoading,
        error: state.product.error,
        currentPage: state.product.currentPage,
        hasMore: state.product.hasMore
      });
    }
    return result;
  } catch (err) {
    console.error('Error in reducer:', err);
    throw err;
  }
};

// Custom middleware for handling async actions
const asyncErrorHandler = () => (next) => (action) => {
  if (typeof action === 'function') {
    return action(next).catch((error) => {
      console.error('Async Action Error:', {
        error: error.message,
        stack: error.stack
      });
      return Promise.reject(error);
    });
  }
  return next(action);
};

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
    }).concat(logger, asyncErrorHandler),
  devTools: process.env.NODE_ENV !== 'production',
});

// Subscribe to store changes for debugging
store.subscribe(() => {
  const state = store.getState();
  if (state.sellers) {
    console.log('Sellers State:', {
      isAuthenticated: state.sellers.isAuthenticated,
      seller: state.sellers.seller ? 'Present' : 'Not Present',
      error: state.sellers.error
    });
  }
});

export default store;
