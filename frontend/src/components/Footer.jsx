import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container text-center">

        <p className="mb-2 footer-text">
          Made with ❤️ for MCA Students | SmartStudy Hub <br />
          Created by <strong>Harsh Varshney</strong>
        </p>

        <div className="footer-socials d-flex justify-content-center gap-3 mb-2">
          <a
            href="https://www.linkedin.com/in/harsh-varshney"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none social-link"
          >
            <i className="fab fa-linkedin fa-lg"></i>
          </a>

          <a
            href="https://www.instagram.com/harsh.varshney.7568/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none social-link"
          >
            <i className="fab fa-instagram fa-lg"></i>
          </a>

          <a
            href="https://www.facebook.com/share/1KHNBJcLG1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none social-link"
          >
            <i className="fab fa-facebook fa-lg"></i>
          </a>

          <a
            href="https://x.com/Harsh23varshney"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none social-link"
          >
            <i className="fab fa-twitter fa-lg"></i>
          </a>
        </div>

        {/* Contact + Email row */}
        <div className="footer-contact-row">
          <span>
            <i className="fas fa-phone"></i> +91 7417609888
          </span>

          <a
            href="https://mail.google.com/mail/?view=cm&to=harsh.23varshney@gmail.com&su=SmartStudy%20Project"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none social-link"
          >
            <i className="fas fa-envelope"></i> Email Me
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;