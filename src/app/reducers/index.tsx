import { combineReducers } from "@reduxjs/toolkit";
import LoadingSlice from './Loading'

const rootReducer = combineReducers({
  loading: LoadingSlice
})

export default rootReducer