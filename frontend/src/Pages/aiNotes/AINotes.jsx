import { useState,useEffect } from "react";
import axios from "axios";
import NotesInput from "./NotesInput";
import NotesResponse from "./NotesResponse";
import "./notes.css";
import api from "../../api";

function AINotes() {

  const [topic, setTopic] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load notes history
  useEffect(() => {
    const saved = localStorage.getItem("notesHistory");

    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        setHistory(parsed);
      }
    }
  }, []);

  // ✅ Save notes history
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem(
        "notesHistory",
        JSON.stringify(history)
      );
    }
  }, [history]);

  const newNotes = () => {
      setHistory([]);
      localStorage.removeItem("notesHistory");
    };

  const generateNotes = async () => {

    if (!topic.trim()) return;

    const userTopic = topic;

    setTopic("");
    setLoading(true);

    try {

      // const res = await axios.post(
      //   "http://localhost:5000/api/ai/generate-notes",
      //   { topic: userTopic }
      // );
      const res = await api.post(
        "/ai/generate-notes",
        { topic: userTopic }
      );

      const aiNotes = res.data.notes;

      setHistory(prev => [
        ...prev,
        {
          topic: userTopic,
          notes: aiNotes
        }
      ]);

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (

    <div className="notes-page">

      <div className="notes-container">

        {/* <div className="notes-header">
          AI Notes Generator
          <p>Generate clean study notes instantly</p>
        </div> */}

        <div className="notes-header">
          <button className="new-notes-btn" onClick={newNotes}>
            + New Chat
          </button>
          <h3>AI Notes Generator</h3>
          <p>Generate clean study notes instantly</p>
        </div>


        <NotesResponse
          history={history}
          loading={loading}
        />

        <NotesInput
          topic={topic}
          setTopic={setTopic}
          generateNotes={generateNotes}
        />

      </div>

    </div>

  );
}

export default AINotes;