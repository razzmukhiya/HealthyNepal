const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item._id !== action.payload._id),
      };
    default:
      return state;
  }
};
