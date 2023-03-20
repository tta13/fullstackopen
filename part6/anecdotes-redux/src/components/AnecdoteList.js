import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { updateMessage } from '../reducers/messageReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(updateMessage(`you voted "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(updateMessage(''))
    }, 5000)
  }

  const byVote = (a, b) => b.votes - a.votes

  return (
    <div>
      {anecdotes.sort(byVote).map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={vote}/>    
      )}
    </div>
  )
}

export default AnecdoteList
