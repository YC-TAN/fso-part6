import { useDispatch, useSelector } from "react-redux";
import { upVote } from "../reducers/anecdoteReducer";
import {setNotification } from '../reducers/notificationReducer'

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

  const vote = (anecdote) => {
    dispatch(upVote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <>
      {sortedAnecdotes.map((a) => (
        <Anecdote key={a.id} anecdote={a} handleVote={() => vote(a)} />
      ))}
    </>
  );
};

export default AnecdoteList;
