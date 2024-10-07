import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ToggleTheme from "./hooksExercise";

import "./App.css";
import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const theme = useContext(ThemeContext);

  return (
    <div className="app-container">
      <ToggleTheme />
      <form className="note-form">
        <div>
          <input placeholder="Note Title"></input>
        </div>

        <div>
          <textarea></textarea>
        </div>

        <div>
          <button type="submit">Create Note</button>
        </div>

        <div>
          <h1>List of Favorites:</h1>
          {favorites.map((note) => (
            <div key={note}>{note}</div>
          ))}
        </div>
      </form>
      <div className="notes-grid">
        {dummyNotesList.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button
                onClick={() => {
                  if (favorites.includes(note.title)) {
                    const newFavorites = [...favorites];
                    newFavorites.splice(newFavorites.indexOf(note.title), 1);
                    setFavorites(newFavorites);
                  } else {
                    setFavorites([...favorites, note.title]);
                  }
                }}>
                {favorites.includes(note.title) ? (
                  <div>❤️</div>
                ) : (
                  <div
                    style={{
                      color: theme.foreground,
                    }}>
                    ♡
                  </div>
                )}
              </button>
              <button>x</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
