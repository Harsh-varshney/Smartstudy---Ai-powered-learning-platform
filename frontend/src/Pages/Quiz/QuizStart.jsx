import { useState } from "react";
import axios from "axios";
import api from "../../api";

function QuizStart({ setQuiz }) {

  const [mode, setMode] = useState("topic");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateTopicQuiz = async () => {
    if (!topic.trim()) return alert("Please enter topic");

    try {
      setLoading(true);

      // const res = await axios.post(
      //   "http://localhost:5000/api/quiz/topic",
      //   { topic }
      // );
      const res = await api.post(
        "/quiz/topic",
        { topic }
      );

      setQuiz(res.data);
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const generateQuestionQuiz = async () => {
    if (!question.trim()) return alert("Please enter question");

    try {
      setLoading(true);

      // const res = await axios.post(
      //   "http://localhost:5000/api/quiz/question",
      //   { question }
      // );

      const res = await api.post(
        "/quiz/question",
        { question }
      );

      setQuiz(res.data);
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const generatePDFQuiz = async () => {
    if (!pdf) return alert("Please upload PDF");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("pdf", pdf);

      // const res = await axios.post(
      //   "http://localhost:5000/api/quiz/pdf",
      //   formData
      // );

      const res = await api.post(
        "/quiz/pdf",
        formData
      );

      setQuiz(res.data);
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="quiz-container">

      <h2 className="quiz-title">AI Quiz Generator</h2>

      <div className="quiz-modes">

        <button
          className={mode === "topic" ? "active" : ""}
          onClick={() => setMode("topic")}
        >
          Topic
        </button>

        <button
          className={mode === "question" ? "active" : ""}
          onClick={() => setMode("question")}
        >
          Question
        </button>

        <button
          className={mode === "pdf" ? "active" : ""}
          onClick={() => setMode("pdf")}
        >
          PDF
        </button>

      </div>

      {/* Input Row */}

      <div className="input-row">

        {mode === "topic" && (
          <input
            type="text"
            placeholder="Enter Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        )}

        {mode === "question" && (
          <input
            type="text"
            placeholder="Enter Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        )}

        {mode === "pdf" && (
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files[0])}
          />
        )}

        <button
          className="primary-btn"
          onClick={
            mode === "topic"
              ? generateTopicQuiz
              : mode === "question"
              ? generateQuestionQuiz
              : generatePDFQuiz
          }
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>

      </div>

    </div>

  );
}

export default QuizStart;