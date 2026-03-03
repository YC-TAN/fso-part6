import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      // this uses push onto the newly returned state
      // underlying uses Immer library so it is still immutable
      state.push({
        content,
        votes: 0,
        id: getId()
      })
    },
    updateVote(state, action){
      const id = action.payload
      const anecdoteChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteChange, votes: anecdoteChange.votes + 1}
      return state.map(a => a.id === id ? changedAnecdote : a)
    }
  }
})

export const {createAnecdote, updateVote} = anecdoteSlice.actions

export default anecdoteSlice.reducer
