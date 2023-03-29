import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLoc: null,
    searchRadius:null,
    currentAddress: null,

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
    }
});

export const {setLoc,setSearchRadius,setAddress} = locSlice.actions;


//selectors

export const selectCurrentLoc = (state) => state.loc.currentLoc;
export const selectSearchRadius = (state) => state.loc.searchRadius;
export const selectCurrentAddress = (state) => state.loc.currentAddress;

//primary export

export default locSlice.reducer;