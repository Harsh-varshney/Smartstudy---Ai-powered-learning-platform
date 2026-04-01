import { useEffect, useState } from "react";
import api from "../api";
import NoteList from "../components/NoteList";
import SearchAndFilter from "../components/SearchAndFilter";
import { useToast } from "../context/ToastContext";

function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { showToast } = useToast();

  async function fetchNotes() {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`/notes/${id}`);

      showToast("Note Deleted Successfully", "success");

      fetchNotes();
    } catch (err) {
      console.error(err);
      showToast("Delete Failed", "danger");
    }
  }

  async function togglePin(id) {
    try {
      const res = await api.patch(`/notes/${id}/pin`);

      if (res.data.pinned) {
        showToast("Note Pinned 📌", "success");
      } else {
        showToast("Note Unpinned ", "success");
      }

      fetchNotes();
    } catch (err) {
      console.error(err);
      showToast("Pin Action Failed", "danger");
    }
  }

  // 🔎 Search Filter
  let filteredNotes = notes.filter((note) =>
    note.subject.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  // 📌 Apply Filters
  if (filter === "pinned") {
    filteredNotes = filteredNotes.filter((note) => note.pinned);
  }

  if (filter === "recent") {
    filteredNotes = [...filteredNotes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const normalNotes = filteredNotes.filter((note) => !note.pinned);

  return (
    <div className="container mt-4">

      {/* 🔍 Search + Filter */}
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      {/* ❌ No Notes */}
      {filteredNotes.length === 0 && (
        <h4 className="text-center text-danger">
          ❌ No Notes Found
        </h4>
      )}

      {/* 📌 Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <>
          <h4 className="text-warning">📌 Pinned Notes</h4>
          <NoteList
            notes={pinnedNotes}
            handleDelete={handleDelete}
            togglePin={togglePin}
            fetchNotes={fetchNotes}
          />
        </>
      )}

      {/* 📝 Normal Notes */}
      {normalNotes.length > 0 && (
        <NoteList
          notes={normalNotes}
          handleDelete={handleDelete}
          togglePin={togglePin}
          fetchNotes={fetchNotes}
        />
      )}

    </div>
  );
}

export default ViewNotes;