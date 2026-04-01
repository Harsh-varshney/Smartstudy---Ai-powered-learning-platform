import "./Syllabus.css";

function Syllabus() {
  const syllabusData = [
    { sem: "Semester 1", file: "/syllabus/sem1.pdf" },
    { sem: "Semester 2", file: "/syllabus/sem2.pdf" },
    { sem: "Semester 3", file: "/syllabus/sem3.pdf" },
    { sem: "Semester 4", file: "/syllabus/sem4.pdf" },
  ];

  return (
    <div className="syllabus-section container">
      
      {/* Title */}
      <h2 className="syllabus-title">
        MCA Semester-wise Syllabus 📘
      </h2>

      {/* Grid */}
      <div className="syllabus-grid">
        {syllabusData.map((item, index) => (
          <div key={index} className="syllabus-card">
            
            <h4 className="syllabus-sem">{item.sem}</h4>

            <p className="syllabus-text">
              Download / View MCA syllabus PDF instantly.
            </p>

            <a
              href={item.file}
              target="_blank"
              rel="noreferrer"
              className="syllabus-btn"
            >
              Open PDF 📄
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Syllabus;
