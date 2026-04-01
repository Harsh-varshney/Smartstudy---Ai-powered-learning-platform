function formatText(text) {
  if (!text) return "";

  // Convert "- " lines into bullet lines
  const lines = text.split("\n");

  return lines.map((line, index) => {
    if (line.trim().startsWith("-")) {
      return (
        <div key={index} className="ai-bullet">
          {line.replace("-", "•")}
        </div>
      );
    }

    return (
      <div key={index}>
        {line}
      </div>
    );
  });
}

function AIResponse({ messages, loading }) {

  return (

    <div className="ai-response">

      {messages.map((msg, index) => (

        <div
          key={index}
          className={msg.role === "user" ? "user-msg" : "ai-msg"}
        >

          <div className="ai-label">
            {msg.role === "user" ? "You" : "SmartStudy AI"}
          </div>

          <div className="ai-text">
            {formatText(msg.text)}
          </div>

        </div>

      ))}

      {loading && (
        <div className="ai-thinking">
          AI is thinking...
        </div>
      )}

    </div>
  );
}

export default AIResponse;