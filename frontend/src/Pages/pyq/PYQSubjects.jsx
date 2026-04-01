import { Link, useParams } from "react-router-dom";
import "./PYQSubjects.css";

function PYQSubjects() {
  const { sem } = useParams();

  const semesterSubjects = {
    1: ["Fundamental of Computers & Emerging Technologies", "Problem Solving using C", "Principles of Management & Communication","Discrete Mathematics","Computer Organization & Architecture"],
    2: ["Web Technology", "Object Oriented Programming", "Operating Systems","Database Management Systems","Data Structures & Analysis of Algorithms"],
    3: ["Python Programming", "Software Engineering", "Computer Network","Cloud Computing","Artificial Intelligence"],
    4: ["Privacy and security in online social media", "Blockchain Architecture", "Mobile computing"],
  };

  const subjects = semesterSubjects[sem] || [];

  return (
    <div className="pyq-subjects-section container">
      <h2 className="pyq-subjects-title text-center mb-5">
        📘 Semester {sem} Subjects
      </h2>

      <div className="pyq-subjects-grid">
        {subjects.map((sub, index) => (
          <div key={index} className="pyq-subject-card">
            <h5 className="pyq-subject-name">{sub}</h5>
            <Link
              to={`/pyq/sem/${sem}/subject/${encodeURIComponent(sub)}`}
              className="pyq-subject-btn"
            >
              View Papers →
            </Link>
          </div>
        ))}

        {subjects.length === 0 && (
          <p className="text-center text-danger">
            ❌ No subjects found for this semester.
          </p>
        )}
      </div>
    </div>
  );
}

export default PYQSubjects;
