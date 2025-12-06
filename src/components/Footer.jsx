import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaYoutube, FaEnvelope } from "react-icons/fa";

const Footer = ({ sticky = false }) => {
  return (
    <footer className={`app-footer ${sticky ? "footer-sticky" : ""}`}>
      <div className="footer-inner">
        <div className="footer-col about">
          <h4>AccoSale</h4>
          <p>
            A simple marketplace for creators — buy, sell and connect.
            Small, fast, and made for creators.
          </p>
          <div className="social">
            <a aria-label="instagram" href="#" onClick={(e)=>e.preventDefault()}><FaInstagram/></a>
            <a aria-label="twitter" href="#" onClick={(e)=>e.preventDefault()}><FaTwitter/></a>
            <a aria-label="youtube" href="#" onClick={(e)=>e.preventDefault()}><FaYoutube/></a>
          </div>
        </div>

        <div className="footer-col links">
          <h5>Quick links</h5>
          <ul>
            <li><Link to="/aboutus">About us</Link></li>
            <li><Link to="/help">Help</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
          </ul>
        </div>

        <div className="footer-col contact">
          <h5>Contact</h5>
          <p><FaEnvelope /> <a href="mailto:support@accosale.com">19891a0236@gmail.com</a></p>
          <p className="small">Have a question? Mail us — typically reply within 24hrs.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} AccoSale.com</div>
        <div className="small">Built with ❤️ — All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
