import React from "react";
import '../Styles/Footer.css'; // Import the corresponding CSS file for styling
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>The Institute</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Diversity, Equity, & Inclusion</a></li>
            <li><a href="#">Archived Content</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Citation Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Help & contact</h4>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">Send us a Message</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024 Allen Institute. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
