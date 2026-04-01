import { useState } from "react";
import { analyzePaper } from "../../services/aiService";

function PaperUpload({ setResult }) {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file");
      return;
    }

    try {

      setLoading(true);

      const data = await analyzePaper(file);
      console.log(data);

      setResult(data.result);

    } catch (error) {

      console.error(error);
      alert("Analysis failed");

    }

    setLoading(false);
  };

  return (

    <div className="paper-upload">
        <p>Upload your Question Paper (PDF or Image)</p>
      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        {loading ? "Analyzing..." : "Analyze Paper"}
      </button>

    </div>
  );
}

export default PaperUpload;