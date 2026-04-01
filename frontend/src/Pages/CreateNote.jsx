import NoteForm from "../components/NoteForm";
import "./Notes.css"

function CreateNote() {
  return (
    <div className="container mt-4">
      <h2 className="notes-title text-center mb-4">Create Notes 📝</h2>

      <NoteForm/>
    </div>
  );
}

export default CreateNote;