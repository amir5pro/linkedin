import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo= action.payload
    },
    logout:(state)=>{
       state.userInfo=null
    }
  },
})

// Action creators are generated for each case reducer function
export const { login,logout } = userSlice.actions

export default userSlice.reducer