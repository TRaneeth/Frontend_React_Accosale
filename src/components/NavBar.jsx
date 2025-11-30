import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaComments, FaBell, FaHeart, FaSearch, FaBars } from "react-icons/fa";
import logo from "../assets/accosale-logoW.png";

const NavBar = ({ showLoginHandler, showLogout, logoutHandler, onSearch }) => {
  const navigate = useNavigate();

  const goWishlist = () => {
    const token = localStorage.getItem("loginToken");
    if (!token) {
      toast.error("Please login!");
      return;
    }
    navigate("/wishlist");
  };

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

          <div><FaComments className="text-xl" /></div>
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
