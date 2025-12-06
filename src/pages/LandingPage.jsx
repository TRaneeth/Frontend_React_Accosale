import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Intro from '../components/Intro';
import Menu from '../components/Menu';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddProduct from '../components/forms/AddProduct';
import Info from '../components/sidebuttons/Info';
import Help from '../components/sidebuttons/Help';
import YourAccounts from '../components/YourAccounts';
import { API_URL } from '../data/ApiPath';
import Wishlist from '../components/sidebuttons/Wishlist';
import SideDrawer from '../components/sidebuttons/SideDrawer';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showInfoButton, setShowInfoButton] = useState(false);
  const [showHelpButton, setShowHelpButton] = useState(false);
  const [showYourAccounts, setShowYourAccounts] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showWishlist, setShowWishlist] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  // Load login state
  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) setShowLogout(true);
  }, []);

  // Warmup backend
  useEffect(() => {
    fetch(`${API_URL}/`);
  }, []);

  // Logout
  const logoutHandler = () => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      const ok = confirm("Are you sure you want to logout?");
      if (ok) {
        localStorage.removeItem('loginToken');
        setShowLogout(false);
        closeAllHandler();
        toast.success('Logged out successfully');
      }
    } else {
      alert('No account is logged in. Please login first.');
    }
  };

  // Login popup
  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowAddProduct(false);
    setShowInfoButton(false);
    setShowHelpButton(false);
  };

  // Register popup
  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowAddProduct(false);
    setShowInfoButton(false);
    setShowHelpButton(false);
  };

  // Add Product popup
  const showAddProductHandler = () => {
    if (showLogout) {
      setShowAddProduct(true);
      setShowLogin(false);
      setShowRegister(false);
      setShowInfoButton(false);
      setShowHelpButton(false);
    } else {
      toast('Please Login');
      setShowLogin(true);
    }
  };

  // Close all modals
  const closeAllHandler = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowAddProduct(false);
    setShowYourAccounts(false);
    setShowSubmenu(false);   // IMPORTANT FIX
  };

  // Show user accounts
  const yourAccountsHandler = () => {
    const token = localStorage.getItem('loginToken');
    if (!token) {
      alert('Please login');
      setShowLogin(true);
      return;
    }
    setShowYourAccounts(true);
  };

  // **MAIN FIX** — submenu open
  const submenuHandler = () => {
    setShowSubmenu(true);
  };

  return (
    <>
      <section className='landingSection'>

        <NavBar 
          showLoginHandler={showLoginHandler} 
          showLogout={showLogout} 
          logoutHandler={logoutHandler}
          onSearch={(txt) => setSearchText(txt)}
          submenuHandler={submenuHandler}   // IMPORTANT FIX
        />

        <SideBar 
          showAddProductHandler={showAddProductHandler}  
          logoutHandler={logoutHandler}
        />

        <Intro 
          showAddProductHandler={showAddProductHandler} 
          yourAccountsHandler={yourAccountsHandler}
        />

        <Menu search={searchText} />

        {showLogin && (
          <Login showRegisterHandler={showRegisterHandler} onClose={closeAllHandler} />
        )}

        {showRegister && (
          <Register showLoginHandler={showLoginHandler} onClose={closeAllHandler} />
        )}

        {showAddProduct && showLogout && (
          <AddProduct 
            onClose={closeAllHandler} 
            onPostSuccess={() => setShowYourAccounts(true)} 
          />
        )}

        {showInfoButton && <Info />}
        {showHelpButton && <Help />}
        {showWishlist && <Wishlist />}

        {showYourAccounts && (
          <YourAccounts onClose={() => setShowYourAccounts(false)} />
        )}

        {/* DRAWER — FIXED */}
        <SideDrawer
  open={showSubmenu}
  onClose={() => setShowSubmenu(false)}
  showAddProductHandler={showAddProductHandler}
  logoutHandler={logoutHandler}
/>


      </section>
    </>
  );
};

export default LandingPage;
