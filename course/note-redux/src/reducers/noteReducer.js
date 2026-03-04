import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id= action.payload
      const noteChange = state.find(n => n.id === id)
      const changedNote = {...noteChange, important: !noteChange.important}
      console.log(current(state))
      return state.map(n => n.id === id ? changedNote : n)
    },
  }
})

export const {createNote, toggleImportanceOf} = noteSlice.actions
export default noteSlice.reducer