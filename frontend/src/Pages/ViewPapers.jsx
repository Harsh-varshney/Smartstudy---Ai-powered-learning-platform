import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import "./ViewPapers.css";

function ViewPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ role: "" });
  const { showToast } = useToast();

  useEffect(() => {
    // Get user info from localStorage
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));

    const fetchPapers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const res = await axios.get("http://localhost:5000/api/papers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPapers(res.data);
      } catch (error) {
        console.error("Error fetching papers", error);
        showToast("Failed to load papers", "danger");
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this paper?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/papers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPapers(papers.filter((p) => p._id !== id));
       showToast("Paper Deleted Successfully", "success");
    } catch (error) {
      console.error("Delete failed", error);
      showToast("Delete Failed", "danger");
    }
  };

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading Papers...</h3>;

  return (
    <div className="project-container">
      <h2 className="project-title-main">Available Question Papers</h2>

      <div className="project-grid">
        {papers.length === 0 ? (
          <p>No Papers Found</p>
        ) : (
          papers.map((paper) => (
            <div className="project-card" key={paper._id}>
              <h4 className="project-title">Subject: {paper.subject}</h4>
              <p className="project-text"><strong>Title:</strong> {paper.title}</p>

              <div className="button-group">
                <a
                  href={`http://localhost:5000/${paper.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn view-btn"
                >
                  View PDF
                </a>

                {user.role === "admin" && (
                  <button
                    className="project-btn delete-btn"
                    onClick={() => handleDelete(paper._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewPapers;