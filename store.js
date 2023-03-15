import { configureStore } from '@reduxjs/toolkit'
import locReducer from './slices/locSlice.js'

export const store = configureStore({
  reducer: {
    loc: locReducer,
  },
})