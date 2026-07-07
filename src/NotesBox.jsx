import { useState, useEffect } from 'react';

function NotesBox() {
  const [note, setNote] = useState(() => {
    return localStorage.getItem('note') || '';
  });

  useEffect(() => {
    localStorage.setItem('note', note);
  }, [note]);

  return (
    <div className="notes-box">
      <h2>My Notes</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={5}
        cols={40}
        placeholder="Write something..."
      />
      <p>Saved automatically</p>
    </div>
  );
}

export default NotesBox;