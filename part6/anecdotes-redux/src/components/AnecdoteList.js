import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = (id) => {
    dispatch(addVote(id))
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
