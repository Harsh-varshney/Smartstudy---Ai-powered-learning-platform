import React from "react";
import { Link } from "react-router-dom";

const AITools = () => {
  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">🤖 SmartStudy AI Tools</h2>

      <div className="row g-4">

        {/* AI Assistant */}
        <div className="col-md-4 d-flex">
          <div className="feature-card w-100">
            <h4>🤖 AI Assistant</h4>
            <p>
              Ask academic or programming questions and get instant
              explanations powered by AI.
            </p>

            <Link to="/ai" className="btn feature-btn">
              Open Assistant →
            </Link>
          </div>
        </div>

        {/* AI Notes */}
        <div className="col-md-4 d-flex">
          <div className="feature-card w-100">
            <h4>📝 AI Notes Generator</h4>
            <p>
              Enter any topic and generate structured notes instantly
              for quick study and revision.
            </p>

            <Link to="/ai-notes" className="btn feature-btn">
              Generate Notes →
            </Link>
          </div>
        </div>

        {/* AI Quiz */}
        <div className="col-md-4 d-flex">
          <div className="feature-card w-100">
            <h4>🧠 AI Quiz Generator</h4>
            <p>
              Generate quizzes from any topic and test your
              knowledge with instant feedback.
            </p>

            <Link to="/ai-quiz" className="btn feature-btn">
              Start Quiz →
            </Link>
          </div>
        </div>

        {/* AI Paper Analyzer */}
        <div className="col-md-4 d-flex">
          <div className="feature-card w-100">
            <h4>📄 AI Paper Analyzer</h4>
            <p>
              Upload a question paper and let AI detect important
              topics and concepts for exam preparation.
            </p>

            <Link to="/paper-analysis" className="btn feature-btn">
              Analyze Paper →
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AITools;