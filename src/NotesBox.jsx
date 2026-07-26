import useLocalStorage from './useLocalStorage';

function NotesBox() {
  const [note, setNote] = useLocalStorage('note', '');

  return (
    <div className="notes-box">
      <h2>My Notes</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={5}
        placeholder="Write something..."
      />
      <p>Saved automatically as you type.</p>
    </div>
  );
}

export default NotesBox;