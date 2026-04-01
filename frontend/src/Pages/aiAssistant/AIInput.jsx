function AIInput({ question, setQuestion, askAI }) {

  return (

    <div className="ai-input">

      <input
        type="text"
        placeholder="Ask anything about your studies..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && askAI()}
      />

      <button onClick={askAI}>
        Ask AI
      </button>

    </div>

  );
}

export default AIInput;