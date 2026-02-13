import React, { useState, useEffect } from "react";
import { marked } from "marked";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [text, setText] = useState("");

  // Save notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text) return;
    setNotes([...notes, text]);
    setText("");
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h1>📝 Simple Notes</h1>

      <textarea
        placeholder="Write note (Markdown supported)..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addNote}>Add Note</button>

      <div className="preview">
        <h3>Preview</h3>
        <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
      </div>

      <div className="notes">
        {notes.map((note, index) => (
          <div key={index} className="card">
            <div dangerouslySetInnerHTML={{ __html: marked(note) }} />
            <button onClick={() => deleteNote(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
