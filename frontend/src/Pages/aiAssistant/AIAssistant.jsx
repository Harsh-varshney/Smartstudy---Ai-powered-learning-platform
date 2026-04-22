import { useState,useEffect  } from "react";
import axios from "axios";
import AIInput from "./AIInput";
import AIResponse from "./AIResponse";
import "./ai.css";
import api from "../../api";

function AIAssistant() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

   // ✅ Load messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("assistantMessages");

    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        setMessages(parsed);
      }
    }
  }, []);

  // ✅ Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        "assistantMessages",
        JSON.stringify(messages)
      );
    }
  }, [messages]);
 
  const askAI = async () => {

    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question
    };

    setMessages((prev) => [...prev, userMessage]);

    try {

      setLoading(true);

      // const res = await axios.post(
      //   "http://localhost:5000/api/ai/ask",
      //   { question }
      // );
      const res = await api.post(
        "/ai/ask",
        { question }
      );

      const aiMessage = {
        role: "ai",
        text: res.data.answer
      };

      setMessages((prev) => [...prev, aiMessage]);

      setQuestion("");   // input clear

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const newChat = () => {

      // state clear
      setMessages([]);

      // localStorage clear
      localStorage.removeItem("assistantMessages");

    };
  return (

    <div className="ai-page">

      <div className="ai-container">

        {/* <div className="ai-header">
          SmartStudy AI Assistant
          <p>Ask anything related to study</p>
        </div> */}

        <div className="ai-header">

          <button className="new-chat-btn" onClick={newChat}>
            + New Chat
          </button>

          <h3>SmartStudy AI Assistant</h3>
          <p>Ask anything related to study</p>

        </div>

        <AIResponse
          messages={messages}
          loading={loading}
        />

        <AIInput
          question={question}
          setQuestion={setQuestion}
          askAI={askAI}
        />

      </div>

    </div>
  );
}

export default AIAssistant;