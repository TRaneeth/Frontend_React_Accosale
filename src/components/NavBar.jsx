import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaComments, FaBell, FaHeart, FaSearch, FaBars } from "react-icons/fa";
import logo from "../assets/accosale-logoW.png";
import { API_URL } from '../data/ApiPath';

const NavBar = ({ showLoginHandler, showLogout, logoutHandler, onSearch }) => {
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);

  const goWishlist = () => {
    const token = localStorage.getItem("loginToken");
    if (!token) {
      toast.error("Please login!");
      return;
    }
    navigate("/wishlist");
  };

  const loadUnread = async () => {
    try {
      const token = localStorage.getItem("loginToken");
      if (!token) { setUnread(0); return; }
      const res = await fetch(`${API_URL}/chat/unread-count`, { headers: { token } });
      if (!res.ok) return;
      const d = await res.json();
      setUnread(d.unread || 0);
    } catch (err) {
      console.error('loadUnread', err);
    }
  };

  useEffect(() => {
    loadUnread();
    const iv = setInterval(loadUnread, 4000);
    window.addEventListener("refreshChats", loadUnread);
    window.addEventListener("userLoggedIn", loadUnread);
    return () => { clearInterval(iv); window.removeEventListener("refreshChats", loadUnread); window.removeEventListener("userLoggedIn", loadUnread); };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="navSection">
        <div className="logo">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <img src={logo} className="logo-png" />
          </Link>
        </div>

        <div className="right-side">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>

          <div style={{ position: "relative", cursor: "pointer", marginRight: 10 }} onClick={() => navigate("/chat")}>
            <FaComments className="text-xl" />
            {unread > 0 && (
              <div style={{
                position: "absolute",
                top: -6,
                right: -8,
                background: "red",
                color: "white",
                minWidth: 18,
                height: 18,
                padding: "0 4px",
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700
              }}>
                {unread > 99 ? "99+" : unread}
              </div>
            )}
          </div>

          <div><FaBell className="text-xl" /></div>

          {/* wishlist icon */}
          <div style={{ cursor: "pointer" }} onClick={goWishlist}>
            <FaHeart className="text-xl" />
          </div>

          {!showLogout ? (
            <button className="login-button" onClick={showLoginHandler}>Login</button>
          ) : (
            <button className="logout-button" onClick={logoutHandler}>Logout</button>
          )}
        </div>
      </div>

      <div className="smallNav">
        <FaBars className="submenu" />
        <div className="mobile-logo">
          <Link to="/" style={{ color: "white" }}>ACCOSALE</Link>
        </div>
        <FaSearch className="mobile-search" />
      </div>
    </>
  );
};

export default NavBar;
