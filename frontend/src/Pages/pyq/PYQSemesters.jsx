import { Link } from "react-router-dom";
import "./PYQSemesters.css";

function PYQSemesters() {
  const semesters = [
    { sem: "Semester 1", path: "/pyq/sem/1" },
    { sem: "Semester 2", path: "/pyq/sem/2" },
    { sem: "Semester 3", path: "/pyq/sem/3" },
    { sem: "Semester 4", path: "/pyq/sem/4" },
  ];

  return (
    <div className="pyq-section container">
      {/* Title */}
      <h2 className="pyq-title text-center mb-5">📚 Select Semester</h2>

      {/* Grid */}
      <div className="pyq-grid">
        {semesters.map((item, index) => (
          <div key={index} className="pyq-card">
            <h4 className="pyq-sem">{item.sem}</h4>
            <Link to={item.path} className="pyq-btn">
              Open →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PYQSemesters;
