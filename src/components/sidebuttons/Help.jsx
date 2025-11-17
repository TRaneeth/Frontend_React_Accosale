import React from "react";

const HelpModal = ({ onClose }) => {

  return (
    <div className="help-overlay">
      <div className="help-modal">
        <button className="close" onClick={onClose}>×</button>
        <h2>Help & Support</h2>
        <section className="faq">
          <h3>Popular Questions</h3>
          <ul>
            <li>
              <strong>How to post an account?</strong>
              <p>Click "Post An Account" → fill the form → submit.</p>
            </li>
            <li>
              <strong>How to buy safely?</strong>
              <p>Check seller rating and never share your password.</p>
            </li>
            <li>
              <strong>Our policy!</strong>
              <p>We never ask your digital account or social media account passwords. 
                kindly dont share your password to the customer until you trust them. 
                We are not responsible for your digital account passwords.</p>
            </li>
          </ul>
        </section>
        <section className="contact">
          <h3>Contact Support</h3>
          <p>Email: 19891a0236@gmail.com</p>
          <button className="open-ticket">Report an Issue</button>
        </section>
      </div>
    </div>
  );
};

export default HelpModal;
