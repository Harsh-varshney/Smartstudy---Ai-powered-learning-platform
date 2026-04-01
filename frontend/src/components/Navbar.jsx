import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";
import "./Navbar.css";

function Navbar({ user, setUser }) {

  const [theme, setTheme] = useState("dark");
  const { showToast } = useToast();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {

    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);

  };

  function handleLogout() {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    showToast("Logout successfully", "success");

  }

  return (

    <nav className="navbar smart-navbar navbar-expand-lg">

      <div className="container">

        {/* Logo */}
        <NavLink className="navbar-brand smart-logo" to="/">
          📘 SmartStudy
        </NavLink>

        {/* Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#smartNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="smartNavbar">

          <ul className="navbar-nav ms-auto gap-3">

            {/* Home */}
            <li className="nav-item">
              <NavLink className="nav-link smart-link" to="/">
                Home
              </NavLink>
            </li>

            {user ? (
              <>

                {/* AI Tools */}
                <li className="nav-item dropdown">

                  <a
                    className="nav-link smart-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    AI Tools
                  </a>

                  <ul className="dropdown-menu">

                    <li>
                      <NavLink className="dropdown-item" to="/ai">
                        AI Assistant
                      </NavLink>
                    </li>

                    <li>
                      <NavLink className="dropdown-item" to="/ai-notes">
                        AI Notes
                      </NavLink>
                    </li>

                    <li>
                      <NavLink className="dropdown-item" to="/ai-quiz">
                        AI Quiz
                      </NavLink>
                    </li>

                    <li>
                      <NavLink className="dropdown-item" to="/paper-analysis">
                        Paper Analyzer
                      </NavLink>
                    </li>

                  </ul>

                </li>

                {/* Notes */}
                <li className="nav-item">
                  <NavLink className="nav-link smart-link" to="/create">
                    Create Note
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link smart-link" to="/notes">
                    Notes
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link smart-link" to="/papers">
                    Papers
                  </NavLink>
                </li>

                {/* Admin Upload */}
                {user?.role === "admin" && (
                  <li className="nav-item">
                    <NavLink className="nav-link smart-link" to="/admin/upload">
                      Upload
                    </NavLink>
                  </li>
                )}

                {/* Avatar */}
                <li className="nav-item user-avatar-wrapper">
                  <div className="avatar-circle" title={user?.name}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </li>

                {/* Logout */}
                <li className="nav-item">
                  <span
                    className="nav-link smart-link logout-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </li>

              </>
            ) : (
              <>
                {/* Login */}
                <li className="nav-item">
                  <NavLink className="nav-link smart-link" to="/login">
                    Login
                  </NavLink>
                </li>

                {/* Register */}
                <li className="nav-item">
                  <NavLink className="nav-link smart-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}

            {/* Theme Icon */}
            <li className="nav-item">
              <span
                className="theme-icon"
                onClick={toggleTheme}
                title="Toggle Theme"
              >
                {theme === "dark" ? <i class="fa-solid fa-circle-half-stroke"></i> : <i class="fa-solid fa-circle-half-stroke"></i>}
              </span>
            </li>

          </ul>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;