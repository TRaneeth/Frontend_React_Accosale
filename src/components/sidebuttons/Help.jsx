import React from "react";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const nav = useNavigate();

  return (
    <div className="route-page">   
      <div className="page-header">
        <h2>Help & Support</h2>
        <button className="small-btn" onClick={() => nav(-1)}>Go Back</button>
      </div>
      <div className="page-content">
        <h3>Popular Questions</h3>
        <ul>
          <li>
            <strong>How do I post an account?</strong>
            <p>Click "Post An Account" → fill the form → upload an image → submit.</p>
          </li>
          <li>
            <strong>Why can't I see my posted account?</strong>
            <p>Only your own posts appear inside "Your Accounts".  
            Make sure you're logged in with the same account.</p>
          </li>
          <li>
            <strong>How to buy safely?</strong>
            <p>Check seller details. Ask screenshots. Never share your passwords until you fully trust the buyer.</p>
          </li>
        </ul>
        <h3>Troubleshooting</h3>
        <ul>
          <li>
            <strong>Image not visible?</strong>
            <p>Open the image URL directly:  
            <code>API_URL/uploads/yourImageName.jpg</code></p>
          </li>
          <li>
            <strong>Unexpected token "&lt;" error?</strong>
            <p>Your backend (Render) was sleeping and returned HTML.  
            Refresh or retry after backend wakes up.</p>
          </li>
          <li>
            <strong>Post deleted but still visible?</strong>
            <p>Refresh your page. YourAccounts will reload your latest posts.</p>
          </li>
        </ul>
        <h3>Contact Support</h3>
        <p>Email: <a href="mailto:19891a0236@gmail.com">19891a0236@gmail.com</a></p>      
      </div>

    </div>
  );
};

export default Help;
