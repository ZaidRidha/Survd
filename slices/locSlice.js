import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLoc: null,
    searchRadius:null,

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
        }
    }
});

export const {setLoc,setSearchRadius} = locSlice.actions;


//selectors

export const selectCurrentLoc = (state) => state.loc.currentLoc;
export const selectSearchRadius = (state) => state.loc.searchRadius;

//primary export

export default locSlice.reducer;