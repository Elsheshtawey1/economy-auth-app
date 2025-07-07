import React from "react";
import "../Style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <img src="/final logo 2.png" alt="Family Economy Logo" className="logo" />
        <h2 className="footer-title">
          Family <span className="footer-subtitle">ECONOMY</span>
        </h2>
        <p className="footer-description">We help you track your income, control your spending, and build a secure financial future — simply and effectively.</p>
      </div>

      <div className="footer-column">
        <h4 className="footer-heading">Quick Links</h4>
        <ul className="footer-nav">
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Refund Policy</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </div>

      <div className="footer-column">
        <h4 className="footer-heading">💡 Money Tip</h4>
        <p className="footer-quote">"Save first. Spend what’s left — not the other way around."</p>
        <p className="footer-copy">© 2025 Family Economy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
