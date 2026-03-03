import { useDispatch, useSelector } from "react-redux";
import { updateVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  
  const dispatch = useDispatch();

  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter === '') return anecdotes
    return anecdotes.filter(a => a.content.trim().toLowerCase().includes(filter))
  });

  const vote = (id) => {
    dispatch(updateVote(id));
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <>
      {sortedAnecdotes.map((a) => (
        <Anecdote key={a.id} anecdote={a} handleVote={() => vote(a.id)} />
      ))}
    </>
  );
};

export default AnecdoteList;
