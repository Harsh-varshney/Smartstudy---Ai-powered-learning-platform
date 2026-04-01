import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="container mt-5">

      {/* 🔥 HERO SECTION */}
      <div className="hero-box text-center p-5 rounded-5 shadow-lg">
        <h1 className="display-4 fw-bold hero-title">
          SmartStudy 📚
        </h1>

        <p className="hero-subtitle mt-3">
          Your all-in-one study partner for Notes, PYQs, Syllabus and Productivity.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          <Link to="/notes" className="btn hero-btn">
            ✍️ View Notes
          </Link>

          <Link to="/pyq" className="btn hero-btn">
            📄 Explore PYQs
          </Link>
        </div>
      </div>

      {/* 🔥 FEATURES SECTION */}
      <h2 className="text-center fw-bold mt-5 mb-4 section-title">
        Features 🚀
      </h2>

      {/* ✅ Equal Height Cards */}
      <div className="row g-4 align-items-stretch">

        {/* Notes */}
        <div className="col-md-4 d-flex">
          <div className="feature-card w-100">
            <h4>➕ Create Notes</h4>
            <p>Add new notes quickly and organize your study material.</p>

            <Link to="/create" className="btn feature-btn">
              Create Note →
            </Link>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="feature-card w-100">
            <h4>📝View Notes</h4>
            <p>View, edit, pin and delete your notes easily.</p>

            <Link to="/notes" className="btn feature-btn">
              Open Notes →
            </Link>
          </div>
        </div>

        {/* Syllabus */}
        <div className="col-md-4 d-flex">
          <div className="feature-card w-100">
            <h4>📘 Syllabus</h4>
            <p>Access semester-wise MCA syllabus PDFs instantly.</p>

            <Link to="/syllabus" className="btn feature-btn">
              Open Syllabus →
            </Link>
          </div>
        </div>

        {/* PYQs */}
        <div className="col-md-4 d-flex">
          <div className="feature-card w-100">
            <h4>📄 PYQ Papers</h4>
            <p>Previous year papers semester + subject wise.</p>

            <Link to="/pyq" className="btn feature-btn">
              View Papers →
            </Link>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="feature-card w-100">
            <h4>💻 Coding Tutorials</h4>
            <p>Learn coding step by step with curated video playlists for each topic/language.</p>

            <Link to="/video" className="btn feature-btn">
              View Videos →
            </Link>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="feature-card w-100">
            <h4>📝 Todo List</h4>
            <p>Manage your daily tasks easily.</p>

            <Link to="/todo" className="btn feature-btn">
              Open Todo →
            </Link>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="feature-card w-100">
            <h4>📚 New Notes & Question Papers</h4>
            <p>
              Admin has uploaded the latest notes and question papers for your subjects. 
              Access them anytime to stay ahead in your preparation!
            </p>

            <Link to="/papers" className="btn feature-btn">
              View Notes →
            </Link>
          </div>
        </div>
        
      <div className="col-md-4 d-flex">
        <div className="feature-card w-100">

          <h4>🤖 AI Tools</h4>

          <p>
            Explore powerful AI features designed to make your study smarter.
            Generate notes, quizzes, analyze papers, and get instant help
            from AI.
          </p>

          <Link to="/ai-tools" className="btn feature-btn">
            Explore AI Tools →
          </Link>

        </div>
      </div>

      </div>
    </div>
  );
}

export default Home;
