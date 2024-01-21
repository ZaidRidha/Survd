import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentBasket: [],
  availability: {},
  currentLoc: null,
  searchRadius: null,
  userId: "",
  currentAddress: null,
  totalBasket: [],
  currentVendor: null,
  filters: {
    sortBy: 'featured', // Default value, for example
    distance: 10, // Default value, for example
    serviceTypes: ['shop', 'mobile', 'home'], // Default value, for example
  },
};

export const locSlice = createSlice({
  name: 'loc',
  initialState,
  reducers: {
    setLoc: (state, action) => {
      state.currentLoc = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
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

    clearAvailability: (state) => {
      state.availability = {};
    },

    removeFromAvailability: (state, action) => {
      const serviceIdToRemove = action.payload;
      delete state.availability[serviceIdToRemove];
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
    addTimeslotToService: (state, action) => {
      const { date, timeslot, serviceId } = action.payload;

      if (!state.availability[serviceId]) {
        state.availability[serviceId] = {};
      }

      if (!state.availability[serviceId][date]) {
        state.availability[serviceId][date] = [];
      }

      state.availability[serviceId][date].push(timeslot);
    },
  },
});

export const {
  setLoc,
  setSearchRadius,
  setUserId,
  setAddress,
  setcurrentBasket,
  addToBasket,
  removeFromBasket,
  clearBasket,
  addtoB,
  setcurrentVendor,
  setFilters,
  clearFilters,
  addTimeslotToService,
  removeFromAvailability,
  clearAvailability,
} = locSlice.actions;

// selectors

export const selectCurrentLoc = (state) => state.loc.currentLoc;
export const selectSearchRadius = (state) => state.loc.searchRadius;
export const selectUserId = (state) => state.loc.userId;
export const selectCurrentAddress = (state) => state.loc.currentAddress;
export const selectCurrentBasket = (state) => state.loc.totalBasket;
export const selectCurrentVendor = (state) => state.loc.currentVendor;
export const selectFilters = (state) => state.loc.filters;
export const selectAvailability = (state) => state.loc.availability;
// primary export

export default locSlice.reducer;
