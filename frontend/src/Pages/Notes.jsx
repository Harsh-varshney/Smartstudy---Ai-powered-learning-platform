import { useEffect, useState } from "react";
import api from "../api";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

function Notes() {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ Fetch Notes
  async function fetchNotes() {
    try {
      const res = await api.get("/notes");   // 🔥 axios hata diya

      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  }

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  // ✅ Delete Note
  async function handleDelete(id) {
    try {
      await api.delete(`/notes/${id}`);   // 🔥 headers ki zarurat nahi

      alert("Note Deleted 🗑");
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  }

  // ✅ Toggle Pin
  async function togglePin(id) {
    try {
      await api.patch(`/notes/${id}/pin`);  // 🔥 simple clean call

      fetchNotes();
    } catch (err) {
      console.error("Error toggling pin:", err);
    }
  }

  const pinnedNotes = notes.filter((note) => note.pinned);
  const normalNotes = notes.filter((note) => !note.pinned);

  return (
    <div className="notes-section container mt-4">
      <h2 className="notes-title text-center mb-4">
        SmartStudy Notes 📝
      </h2>

      <NoteForm fetchNotes={fetchNotes} />

      {notes.length === 0 && (
        <h4 className="text-center text-danger mt-5">
          ❌ No Notes Found
        </h4>
      )}

      {pinnedNotes.length > 0 && (
        <div className="mt-5">
          <h4 className="text-warning mb-3">
            📌 Pinned Notes
          </h4>

          <NoteList
            notes={pinnedNotes}
            handleDelete={handleDelete}
            togglePin={togglePin}
            fetchNotes={fetchNotes}
          />
        </div>
      )}

      {normalNotes.length > 0 && (
        <div className="mt-5">
          <NoteList
            notes={normalNotes}
            handleDelete={handleDelete}
            togglePin={togglePin}
            fetchNotes={fetchNotes}
          />
        </div>
      )}
    </div>
  );
}

export default Notes;