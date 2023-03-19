import { createSlice } from '@reduxjs/toolkit'

const messageAtStart = ''

const initialState = messageAtStart

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    updateMessage(state, action) {
      return action.payload
    }
  }
})

export const { updateMessage } = messageSlice.actions
export default messageSlice.reducer
