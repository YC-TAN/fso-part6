import { appendAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = ""
    dispatch(appendAnecdote(content));
    dispatch(setNotification(`new anecdote '${content}'`, 5))
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="content" />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
