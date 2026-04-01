import jsPDF from "jspdf";

function NotesResponse({ history, loading }) {

  const copyNotes = (text) => {
    navigator.clipboard.writeText(text);
    alert("Notes Copied!");
  };

  const downloadPDF = (text, topic) => {

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(topic, 10, 15);

    doc.setFontSize(12);

    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 25);

    doc.save(`${topic}-notes.pdf`);
  };

  return (

    <div className="notes-response">

      {history.map((item, index) => (

        <div key={index}>

          {/* User Message */}
          <div className="user-msg">
            <p>{item.topic}</p>
          </div>

          {/* AI Message */}
          <div className="ai-msg">

            <p style={{ whiteSpace: "pre-wrap" }}>
              {item.notes}
            </p>

            {/* Action Buttons */}
            <div className="notes-actions">

              <button onClick={() => copyNotes(item.notes)}>
                Copy
              </button>

              <button onClick={() => downloadPDF(item.notes, item.topic)}>
                Save PDF
              </button>

            </div>

          </div>

        </div>

      ))}

      {loading && (
        <div className="notes-thinking">
          Generating Notes...
        </div>
      )}

    </div>
  );
}

export default NotesResponse;