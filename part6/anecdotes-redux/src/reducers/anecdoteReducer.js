import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    updateAnecdote(state, action) {
      return state.map(anecdote => 
          anecdote.id === action.payload.id ? action.payload : anecdote)
    },
    setAnecdotes(state, action) {
      return [...action.payload]
    }
  }
})

export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = content => async dispatch => {
  const newAnecdote = await anecdoteService.create(content)
  dispatch(appendAnecdote(newAnecdote))
}

export const addVote = anecdote => async dispatch => {
  const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
  dispatch(updateAnecdote(updatedAnecdote))
}

export default anecdoteSlice.reducer
