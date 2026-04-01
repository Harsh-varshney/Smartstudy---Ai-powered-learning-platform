import { useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import "./NoteForm.css";

function NoteForm({ fetchNotes }) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const { showToast } = useToast(); 

  async function handleAddNote(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/notes",{subject, content},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast("Note Added Successfully", "success");
      setSubject("");
      setContent("");
      if (fetchNotes) fetchNotes();
    } catch (err) {
      console.log("FULL ERROR:", err);
      showToast("Error Adding Note", "danger"); 
    }
  }

  return (
    <div className="note-form-card card shadow-sm border-1 rounded-4 p-4 mb-4">
      <h3 className="note-form-title mb-3">Add New Note 📝</h3>

      <form onSubmit={handleAddNote}>
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control note-input"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control note-input"
            placeholder="Write your note..."
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button className="note-submit-btn btn w-100"> Add Note</button>
      </form>
    </div>
  );
}

export default NoteForm;
