import { useParams } from "react-router-dom";
import { useToast } from "../../context/ToastContext"
import "./PYQPapers.css";

function PYQPapers() {
  const { sem, subject } = useParams();
  const { showToast } = useToast();

const years = ["2025","2024","2023"];

const availablePapers = {
  "Fundamental of Computers & Emerging Technologies": years,
  "Problem Solving using C": years,
  "Principles of Management & Communication": years,
  "Discrete Mathematics": years,
  "Computer Organization & Architecture": years,

  "Web Technology": years,
  "Object Oriented Programming": ["2024","2023","2022"],
  "Operating Systems": ["2024","2023","2022"],
  "Database Management Systems": years,
  "Data Structures & Analysis of Algorithms": years,

  "Python Programming": ["2024","2023","2022"],
  "Software Engineering": years,
  "Computer Network": years,
  "Cloud Computing": years,
  "Artificial Intelligence": years,

  "Privacy and security in online social media": years,
  "Blockchain Architecture": ["2022","2023"],
  "Mobile computing": ["2025","2024","2023"]
};

  const subjectFileMap = {
      "Fundamental of Computers & Emerging Technologies": "fcet",
      "Problem Solving using C": "c",
      "Principles of Management & Communication": "pmc",
      "Discrete Mathematics": "dm",
      "Computer Organization & Architecture": "coa",

      "Web Technology": "wt",
      "Object Oriented Programming": "oop",
      "Operating Systems": "os",
      "Database Management Systems": "dbms",
      "Data Structures & Analysis of Algorithms": "dsa",

      "Python Programming": "python",
      "Software Engineering": "se",
      "Computer Network": "cn",
      "Cloud Computing": "cloud",
      "Artificial Intelligence": "ai",

      "Privacy and security in online social media": "psosm",
      "Blockchain Architecture": "blockchain",
      "Mobile computing": "mc"
  };

  const decodedSubject = decodeURIComponent(subject);
  const fileSubject = subjectFileMap[decodedSubject];

  const handleOpenPDF = async (year) => {

  if (!fileSubject) {
    showToast("Subject mapping not found.", "danger", 6000);
    return;
  }

  // if (!availablePapers[decodedSubject]?.includes(year)) {
  //   showToast(`${year} paper not available right now.`, "danger", 6000);
  //   return;
  // }

  const pdfPath = `/pdfs/${fileSubject}_${year}.pdf`;

  try {
    const res = await fetch(pdfPath);

    if (res.headers.get("content-type")?.includes("pdf")) {
      window.open(pdfPath, "_blank");
    } else {
      showToast("Oops! Paper not available.", "danger", 5000);
    }

  } catch (err) {
    showToast("Paper not available.", "danger", 5000);
  }
};

  return (
    <div className="pyq-papers-section container">
      <h2 className="pyq-papers-title text-center mb-5">
        📄 {decodedSubject} PYQs (Sem {sem})
      </h2>

      {/* Paper Cards */}
      <div className="pyq-papers-grid">
          {availablePapers[decodedSubject]?.map((year, index) => (
          <div key={index} className="pyq-paper-card">
            <h5 className="pyq-paper-year">{decodedSubject} - {year}</h5>
            <button
              className="pyq-paper-btn"
              onClick={() => handleOpenPDF(year)}
            >
              Open PDF 📄
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PYQPapers;
