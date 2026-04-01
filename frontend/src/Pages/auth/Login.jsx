import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import api from "../../api";
import { Link } from "react-router-dom";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

function Login({setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/users/login", { email,password,});

      // Show backend message
      showToast(res.data.message || "Login Successful", "success");

      // Save token & user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user); 
      // Redirect to notes page
      navigate("/");   

    } catch (err) {
      showToast(err.response?.data?.message || "Login Failed ❌","danger");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back 👋</h2>

        <p className="auth-subtitle">
          Login to continue your SmartStudy journey.
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control auth-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn">Login 🚀</button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;