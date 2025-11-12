import React from 'react'
import { Link } from "react-router-dom";
import { FaComments, FaBell, FaHeart, FaSearch, FaBars } from "react-icons/fa";

const NavBar = ({showLoginHandler,showLogout,logoutHandler}) => {
  return (
    <>
      <div className="navSection">
        <div className="logo">
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <img src="a"/>ACCOSALE
          </Link>
        </div>
        <div className="right-side">
            <div className='search-bar'>
              <input type="text" placeholder="Search..." />
              <FaSearch className="search-icon" />
            </div>
            <div><FaComments className="text-xl" /></div>
            <div><FaBell className="text-xl" /></div>
            <div><FaHeart className="text-xl" /></div>
            {!showLogout ? <button className='login-button' onClick={showLoginHandler}>Login</button> : 
            <button className='logout-button' onClick={logoutHandler}>Logout</button>}
            
            
            
        </div>
    </div>
    <div className="smallNav">
      <div className="smallNav">
        <FaBars className="submenu" /> 
        <div className="mobile-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>ACCOSALE</Link>
        </div>
        <FaSearch className="mobile-search" />
    </div>

    </div>
    </>
    
  )
}

export default NavBar