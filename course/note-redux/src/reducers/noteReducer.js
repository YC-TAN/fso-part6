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

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: {
      id,
    },
  };
};

export default noteReducer