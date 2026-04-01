import { useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import "./NoteList.css";

function NoteList({ notes, handleDelete, fetchNotes, togglePin }) {
  const [editId, setEditId] = useState(null);
  const [editSubject, setEditSubject] = useState("");
  const [editContent, setEditContent] = useState("");
  const [updating, setUpdating] = useState(false);
  const { showToast } = useToast();

  async function handleUpdate(noteId) {
    setUpdating(true);
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/notes/${noteId}`,
        {
          subject: editSubject,
          content: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setEditId(null);
      showToast("Note Updated Successfully", "success");
      
      if (fetchNotes) await fetchNotes();

    } catch (err) {
      console.error(err);
      showToast("Update Failed", "danger");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="notes-list-section mt-4">
      <h3 className="text-center mb-4 notes-title">All Notes 📚</h3>

      {notes.length === 0 ? (
        <p className="text-center text-danger">No Notes Found ❌</p>
      ) : (
        <div className="notes-container">
          {notes.map((note) => (
            <div key={note._id} className="note-page">
              {editId === note._id ? (
                <>
                  <input
                    className="note-input mb-2"
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                  />
                  <textarea
                    className="note-input mb-2"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                  />

                  <div className="note-footer">
                    <button
                      className="note-btn edit-btn"
                      onClick={() => handleUpdate(note._id)}
                      disabled={updating}
                    >
                      {updating ? "Updating..." : "✅ Update"}
                    </button>

                    <button
                      className="note-btn delete-btn"
                      onClick={() => setEditId(null)}
                      disabled={updating}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="note-subject">
                    Subject : {note.subject}
                  </h5>

                  <p className="note-content">{note.content}</p>

                  <div className="note-footer">
                    <button
                      className="note-btn edit-btn"
                      onClick={() => {
                        setEditId(note._id);
                        setEditSubject(note.subject);
                        setEditContent(note.content);
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="note-btn delete-btn"
                      onClick={() => handleDelete(note._id)}
                    >
                      🗑 Delete
                    </button>

                    {/* ✅ Pin Button Added Only */}
                    <button
                      className="note-btn pin-btn"
                      onClick={() => togglePin(note._id)}
                    >
                      {note.pinned ? "📍 Unpin" : "📌 Pin"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteList;
