import { createSlice } from "@reduxjs/toolkit";
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id= action.payload
      const noteChange = state.find(n => n.id === id)
      const changedNote = {...noteChange, important: !noteChange.important}
      return state.map(n => n.id === id ? changedNote : n)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

const { createNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const appendNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }
}

export const { toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer