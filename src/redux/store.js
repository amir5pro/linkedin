import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import infoReducer from "./infoSlice"

export const store = configureStore({
  reducer: {
    userInfo:userReducer,
    profileInfo:infoReducer
  },
})