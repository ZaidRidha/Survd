import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentBasket: [],
  currentLoc: null,
  searchRadius: null,
  currentAddress: null,
  totalBasket: [],
  currentVendor: null,
  filters: {
    sortBy: 'featured', // Default value, for example
    distance: 10, // Default value, for example
    serviceTypes: [
      "shop",
      "mobile",
      "home",
    ], // Default value, for example
  },
};

export const locSlice = createSlice({
  name: 'loc',
  initialState,
  reducers: {
    setLoc: (state, action) => {
      state.currentLoc = action.payload;
    },
    setSearchRadius: (state, action) => {
      state.searchRadius = action.payload;
    },
    setAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setcurrentBasket: (state, action) => {
      state.currentBasket = action.payload;
    },
    addtoB: (state, action) => {
      state.totalBasket.push(action.payload);
    },
    removeFromBasket: (state, action) => {
      const serviceIdToRemove = action.payload;
      state.totalBasket = state.totalBasket.filter((service) => service[0].objectId !== serviceIdToRemove);
    },
    clearBasket: (state) => {
      state.totalBasket = [];
    },
    setcurrentVendor: (state, action) => {
      state.currentVendor = action.payload;
    },

    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setLoc,
  setSearchRadius,
  setAddress,
  setcurrentBasket,
  addToBasket,
  removeFromBasket,
  clearBasket,
  addtoB,
  setcurrentVendor,
  setFilters,
  clearFilters,
} = locSlice.actions;

// selectors

export const selectCurrentLoc = (state) => state.loc.currentLoc;
export const selectSearchRadius = (state) => state.loc.searchRadius;
export const selectCurrentAddress = (state) => state.loc.currentAddress;
export const selectCurrentBasket = (state) => state.loc.totalBasket;
export const selectCurrentVendor = (state) => state.loc.currentVendor;
export const selectFilters = (state) => state.loc.filters;
// primary export

export default locSlice.reducer;
