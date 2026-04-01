import { useState } from "react";
import axios from "axios";
import { useToast } from "../../../context/ToastContext";
import "./PaperUpload.css";

function PaperUpload() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

   const { showToast } = useToast();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !subject || !file) {
      showToast("All fields are required ❗", "danger");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/papers/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast("Paper Uploaded Successfully", "success");

      // reset form
      setTitle("");
      setSubject("");
      setFile(null);

    } catch (error) {
      console.error(error);
      showToast("Upload Failed", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="paper-form-card col-md-6">
        <h3 className="paper-form-title">Upload Paper</h3>

        <form onSubmit={handleUpload}>
          <div className="mb-3">
            <input
              type="text"
              className="paper-input"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="paper-input"
              placeholder="Enter Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="file"
              className="paper-input"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button className="paper-submit-btn" disabled={loading}>
            {loading ? "Uploading..." : "Upload Paper"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaperUpload;