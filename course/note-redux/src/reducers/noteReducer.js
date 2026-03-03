const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.payload];
    case "TOGGLE_IMPORTANCE": {
      const id = action.payload.id;
      const noteUpdate = state.find((n) => n.id === id);
      const updatedNote = { ...noteUpdate, important: !noteUpdate.important };
      return state.map((n) => (n.id === id ? updatedNote : n));
    }
    default:
      return state;
  }
}

export default noteReducer