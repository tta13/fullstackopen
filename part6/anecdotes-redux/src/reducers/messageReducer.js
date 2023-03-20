import { createSlice } from '@reduxjs/toolkit'

const messageAtStart = ''

const initialState = messageAtStart

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    updateMessage(state, action) {
      return action.payload
    },
    clearMessage(state, action) {
      return ''
    }
  }
})

export const { updateMessage, clearMessage } = messageSlice.actions

export const setMessage = (message, timeInSeconds) => async dispatch => {
  dispatch(updateMessage(message))
  setTimeout(() => {
    dispatch(clearMessage())
  }, timeInSeconds*1000)
}

export default messageSlice.reducer
