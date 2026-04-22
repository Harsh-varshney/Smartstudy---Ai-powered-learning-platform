import axios from "axios";
import api from "../api";

// const API_URL = "http://localhost:5000/api/ai";

export const analyzePaper = async (file) => {

  const formData = new FormData();
  formData.append("paper", file);

  // const res = await axios.post(`${API_URL}/paper-analyze`,formData,
  const res = await api.post("/ai/paper-analyze", formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return res.data;
};