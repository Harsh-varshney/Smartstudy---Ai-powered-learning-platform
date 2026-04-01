import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import api from "../../api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register({setUser}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await api.post("/users/register", { name, email, password });
      showToast(res.data.message || "Registration Successful", "success");

      // 🔥 Save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user); 
      // 🔥 Direct go to notes
      navigate("/");

    } catch (err) {
      showToast(err.response?.data?.message || "Registration Failed ❌","danger");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create Account ✨</h2>
        <p className="auth-subtitle">
          Join SmartStudy and start managing your notes.
        </p>

        <form onSubmit={handleRegister}>
          
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control auth-input"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button className="auth-btn">Register 🚀</button>
        </form>

        {/* Footer */}
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;