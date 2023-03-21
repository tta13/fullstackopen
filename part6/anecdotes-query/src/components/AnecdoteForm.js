import { useMutation, useQueryClient } from 'react-query'
import { create } from '../services/anecdotes'

const AnecdoteForm = ({ notificationDispatch }) => {
  const queryClient = useQueryClient()
  const anecdoteMutation = useMutation(create, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: () => {
      notificationDispatch({ type: 'SET', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: 'SET', payload: `anecdote '${content}' added` })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
