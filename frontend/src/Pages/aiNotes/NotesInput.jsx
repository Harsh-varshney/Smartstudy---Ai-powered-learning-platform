function NotesInput({ topic, setTopic, generateNotes }) {

  return (

    <div className="notes-input">

      <input
        type="text"
        placeholder="Enter topic (ex: DBMS Normalization)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && generateNotes()}
      />

      <button onClick={generateNotes}>
        Generate Notes
      </button>

    </div>

  );
}

export default NotesInput;