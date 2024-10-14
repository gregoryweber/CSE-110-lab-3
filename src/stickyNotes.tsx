import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module

import "./App.css";
import { useState } from "react";
import { ThemeContext, themes } from "./ThemeContext";
import { Label, Note } from "./types";

import ToggleTheme from "./hooksExercise";

export const StickyNotes = () => {
  const [favorites, setFavorites] = useState<Note[]>([]);

  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  const [currId, setCurrId] = useState(7);

  const [currentTheme, setCurrentTheme] = useState(themes.light);

  function createNoteHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    setNotes([...notes, { ...createNote, id: currId }]);
    setCurrId(currId + 1);
  }

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className="app-container">
        <ToggleTheme setCurrentTheme={setCurrentTheme} />
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              required></input>
          </div>

          <div>
            <textarea
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })
              }
              required></textarea>
          </div>

          <div>
            <select
              onChange={(event) =>
                setCreateNote({
                  ...createNote,
                  label: event.target.value as Label,
                })
              }
              required>
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div>
            <button type="submit">Create Note</button>
          </div>
          <div>
            <h1>List of favorites:</h1>
            {favorites.map((note) => (
              <div key={note.id}>{note.title}</div>
            ))}
          </div>
        </form>

        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-item"
              style={{
                background: currentTheme.background,
                color: currentTheme.foreground,
              }}>
              <div className="notes-header">
                <button
                  onClick={() => {
                    if (favorites.includes(note)) {
                      const newFavorites = [...favorites];
                      newFavorites.splice(newFavorites.indexOf(note), 1);
                      setFavorites(newFavorites);
                    } else {
                      setFavorites([...favorites, note]);
                    }
                  }}>
                  {favorites.includes(note) ? (
                    <div>❤️</div>
                  ) : (
                    <div
                      style={{
                        color: currentTheme.foreground,
                      }}>
                      ♡
                    </div>
                  )}
                </button>
                <button
                  onClick={() => {
                    setNotes(notes.filter((n) => n.id !== note.id));
                    if (favorites.includes(note)) {
                      const newFavorites = [...favorites];
                      newFavorites.splice(newFavorites.indexOf(note), 1);
                      setFavorites(newFavorites);
                    }
                  }}
                  style={{ color: currentTheme.foreground }}>
                  x
                </button>
              </div>
              <h2
                contentEditable="true"
                onFocus={() =>
                  setSelectedNote({
                    id: note.id,
                    title: note.title,
                    content: note.content,
                    label: note.label,
                  })
                }
                onInput={(event: React.ChangeEvent<HTMLDivElement>) => {
                  setSelectedNote({
                    id: note.id,
                    title: event.target.innerText,
                    content: note.content,
                    label: note.label,
                  });
                }}>
                {note.title}
              </h2>
              <p contentEditable="true"> {note.content} </p>
              <p contentEditable="true"> {note.label} </p>
            </div>
          ))}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
