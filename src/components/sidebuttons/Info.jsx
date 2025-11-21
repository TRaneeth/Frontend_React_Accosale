import React from "react";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const nav = useNavigate();

  return (
    <div className="route-page">
      
      <div className="page-header">
        <h2>About AccoSale</h2>
        <button className="small-btn" onClick={() => nav(-1)}>Go Back</button>
      </div>

      <div className="page-content">

        <p>
          AccoSale is a modern and trustworthy digital marketplace built to help users buy
          and sell verified online accounts with complete confidence. Whether you’re
          looking to grow your social media presence or sell your unused accounts,
          AccoSale makes the entire process seamless, safe, and transparent.
        </p>

        <p>
          Our goal is to bring a secure digital trading environment where users from all
          platforms—Instagram, YouTube, Telegram, Gaming accounts, and more—can exchange
          accounts without fear of scams or unsafe transactions. Every feature is designed
          to protect users and streamline the buying/selling experience.
        </p>

        <h3>Why Choose AccoSale?</h3>
        <ul>
          <li><strong>Verified Listings:</strong> Every posted account goes through basic verification to maintain trust and safety.</li>
          <li><strong>Secure Platform:</strong> We ensure that buyers and sellers never share sensitive data unnecessarily.</li>
          <li><strong>Simple Posting:</strong> Post an account with just your ID, category, image, and price. Takes less than a minute.</li>
          <li><strong>Organized Dashboard:</strong> Users can view, manage, and delete their own posts easily from the "Your Accounts" page.</li>
          <li><strong>Fast Performance:</strong> Optimized for quick loading and smooth performance on both mobile and desktop.</li>
        </ul>

        <h3>What You Can Do On AccoSale</h3>
        <ul>
          <li>Sell your unused or extra digital accounts instantly</li>
          <li>Browse thousands of verified accounts from trusted sellers</li>
          <li>Track and manage your own listings anytime</li>
          <li>Upload images, set accurate pricing, and add details for buyers</li>
          <li>Use our help and support page for guidance</li>
        </ul>

        <p>
          AccoSale runs on modern technologies like React and Node.js, offering a seamless
          experience whether you’re a buyer or seller. Our platform is continuously
          updated to improve safety, performance, and user experience.
        </p>

        <p>
          If you ever face an issue, have a question, or want assistance, visit the Help
          page or contact support. We’re here to help you navigate your digital trading
          journey with ease.
        </p>

      </div>

    </div>
  );
};

export default Info;
