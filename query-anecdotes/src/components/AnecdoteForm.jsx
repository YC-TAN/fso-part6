import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({
        type: 'NOTIFY',
        payload: {
          message: `anecdote ${newAnecdote.content} created`,
          type: 'success',
        },
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    },
    onError: (error) => {
        // 'error' is the object returned by your request (e.g., from axios)
        const errorMessage = error.error || 'Something went wrong'
        
        notificationDispatch({
          type: 'NOTIFY',
          payload: { message: errorMessage, type: 'error' }
        })

        // Clear error message after 5 seconds
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR' })
        }, 5000)
      }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
