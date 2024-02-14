import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profileInfo: null,
}

export const infoSlice = createSlice({
  name: 'profileInfo',
  initialState,
  reducers: {
    updateProfile:(state,action)=>{
      state.profileInfo=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateProfile } = infoSlice.actions

export default infoSlice.reducer