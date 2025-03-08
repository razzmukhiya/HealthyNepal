import { createSlice } from '@reduxjs/toolkit';


const loadAddressesFromStorage = () => {
  try {
    const addresses = localStorage.getItem('addresses');
    return addresses ? JSON.parse(addresses) : [];
  } catch (error) {
    console.error('Error loading addresses from localStorage:', error);
    return [];
  }
};

const initialState = {
  addresses: loadAddressesFromStorage(),
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
      localStorage.setItem('addresses', JSON.stringify(state.addresses));
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
      localStorage.setItem('addresses', JSON.stringify(state.addresses));
    },
    updateAddress: (state, action) => {
      const index = state.addresses.findIndex(
        (address) => address.id === action.payload.id
      );
      if (index !== -1) {
        state.addresses[index] = action.payload;
        localStorage.setItem('addresses', JSON.stringify(state.addresses));
      }
    },
    loadAddresses: (state) => {
      state.addresses = loadAddressesFromStorage();
    },
  },
});

export const { addAddress, removeAddress, updateAddress, loadAddresses } =
  addressSlice.actions;

export default addressSlice.reducer;
