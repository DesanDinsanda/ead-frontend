import React from 'react';
import '../Css/Footer.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h3>ServiceConnect</h3>
          <p>
            Connecting customers with trusted service professionals for all your home service needs.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Popular Services</h4>
          <ul>
            <li><a href="#">Plumbing</a></li>
            <li><a href="#">Electrical</a></li>
            <li><a href="#">Cleaning</a></li>
            <li><a href="#">Landscaping</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li><FaPhoneAlt /> 0785412851</li>
            <li><FaEnvelope /> info@serviceconnect.com</li>
            <li><FaMapMarkerAlt /> 123 Main Street, Colombo 00300</li>
            <li className="social-icons">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
            </li>
          </ul>
        </div>
        
      </div>

      <hr />
      <div className="footer-bottom">
        <p>© 2025 ServiceConnect. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
