import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import noteReducer from "./reducers/noteReducer";
// import App from './App.jsx'

const store = createStore(noteReducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the app is now in redux state",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: true,
    id: 2,
  },
});

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  payload: {
    id: 2
  }
})

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map((n) => (
          <li key={n.id}>
            {n.content} <strong>{n.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

// initial render
renderApp();

// store call render everytime state update
store.subscribe(renderApp);
