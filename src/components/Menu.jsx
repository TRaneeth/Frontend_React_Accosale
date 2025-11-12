import React from 'react';
import { FaFilter, FaInstagram, FaYoutube, FaTwitter, FaGamepad, FaTelegram  } from "react-icons/fa";

const Menu = () => {
  return (
    <div className='menu'>
      <div className='filter-bar'>
        <button><FaFilter /> filters</button>
        <button>All</button>
        <button><FaInstagram /> Instagram</button>
        <button><FaYoutube /> YouTube</button>
        <button><FaTwitter /> X</button>
        <button><FaTelegram /> Telegram</button>
        <button><FaGamepad /> Games</button>
      </div>
      <div className='menu-content'>
        <div className="sub-cards">
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
