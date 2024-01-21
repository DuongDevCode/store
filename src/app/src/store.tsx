'use client'
import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from '../reducers/Loading'

const store = configureStore({
  reducer: {
    loading: loadingReducer
  }
})

export default store