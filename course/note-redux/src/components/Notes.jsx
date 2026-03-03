import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content + " "}
      <strong style={{ color: "blue" }}>
        {note.important ? "important" : ""}
      </strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();

  const notes = useSelector(({filter, notes}) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((n) => n.important)
      : notes.filter((n) => !n.important);
  });

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <ul>
      {notes.map((n) => (
        <Note key={n.id} note={n} handleClick={() => toggleImportance(n.id)} />
      ))}
    </ul>
  );
};

export default Notes;
