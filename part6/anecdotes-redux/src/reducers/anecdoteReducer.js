import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return [...state, action.payload]
    },
    addVote(state, action) {
      return state.map(anecdote => 
          anecdote.id === action.payload ? 
            { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
    },
    setAnecdotes(state, action) {
      return [...action.payload]
    }
  }
})

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
