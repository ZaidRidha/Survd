import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentBasket: [ ],
    currentLoc: null,
    searchRadius:null,
    currentAddress: null,
    totalBasket: [],
    currentVendor: null,
}

export const locSlice = createSlice({
    name: 'loc',
    initialState,
    reducers: {
        setLoc: (state,action) =>{
            state.currentLoc = action.payload;
        },
        setSearchRadius: (state,action) =>{
            state.searchRadius = action.payload;
        },
        setAddress: (state,action) =>{
            state.currentAddress= action.payload;
        },
        setcurrentBasket: (state,action) =>{
            state.currentBasket= action.payload;
        },
        addtoB: (state, action) => {
            state.totalBasket.push(action.payload);
         },  
         removeFromBasket: (state, action) => {
            const serviceIdToRemove = action.payload;
            state.totalBasket = state.totalBasket.filter(service => service[0].objectId !== serviceIdToRemove);
          },
        clearBasket: (state) => {
            state.totalBasket = [];
        },
        setcurrentVendor: (state,action) =>{
            state.currentVendor= action.payload;
        },
    }
});

export const {setLoc,setSearchRadius,setAddress,setcurrentBasket,addToBasket,removeFromBasket,clearBasket,addtoB,setcurrentVendor} = locSlice.actions;


//selectors

export const selectCurrentLoc = (state) => state.loc.currentLoc;
export const selectSearchRadius = (state) => state.loc.searchRadius;
export const selectCurrentAddress = (state) => state.loc.currentAddress;
export const selectCurrentBasket = (state) => state.loc.totalBasket;
export const selectCurrentVendor = (state) => state.loc.currentVendor;

//primary export

export default locSlice.reducer;