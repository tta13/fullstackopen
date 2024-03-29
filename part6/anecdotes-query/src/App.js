import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAll, update } from './services/anecdotes'
import NotificationContext, { notificationReducer } from './NotificationContext'
import { useReducer } from 'react'

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const queryClient = useQueryClient()
  const { isLoading, isError, data } = useQuery(
    'anecdotes', getAll,
    {
      retry: 1
    }
  )
  const updateAnecdoteMutation = useMutation(update, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
    },
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>anecdote service not available due to problems in server</span>
  }
  
  const anecdotes = data
  
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: 'SET', payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  return (    
    <div>
      <h3>Anecdote app</h3>
      <Notification message={notification}/>
      <AnecdoteForm notificationDispatch={notificationDispatch}/>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
