import React, { useState, useEffect } from 'react';
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
import { TbFlagSearch } from 'react-icons/tb';
import { API_URL } from '../data/ApiPath';   // ⭐ IMPORTANT ⭐

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showInfoButton, setShowInfoButton] = useState(false);
  const [showHelpButton, setShowHelpButton] = useState(false);
  const [showYourAccounts, setShowYourAccounts] = useState(false);

  // Check login on page load
  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      setShowLogout(true);
    }
  }, []);

  // Warm up backend (only needed for Render servers)
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
        alert('Logged out successfully');
      }
    } else {
      alert('No account is logged in. Please login first.');
    }
  };

  // Show login popup
  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowAddProduct(false);
    setShowInfoButton(false);
    setShowHelpButton(false);
  };

  // Show register popup
  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowAddProduct(false);
    setShowInfoButton(false);
    setShowHelpButton(false);
  };

  // Show add-product popup
  const showAddProductHandler = () => {
    if (showLogout) {
      setShowAddProduct(true);
      setShowLogin(false);
      setShowRegister(false);
      setShowInfoButton(false);
      setShowHelpButton(false);
    } else {
      alert('Please Login');
      setShowLogin(true);
    }
  };

  // Close all modals
  const closeAllHandler = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowAddProduct(false);
    setShowInfoButton(false);
    setShowHelpButton(false);
    setShowYourAccounts(false);
  };

  const infoButtonHandler = () => {
    setShowInfoButton(true);
  };

  const helpButtonHandler = () => {
    setShowHelpButton(true);
  };

  // Show Your Accounts modal
  const yourAccountsHandler = () => {
  const token = localStorage.getItem('loginToken');
  if (!token) { 
    alert('Please login'); 
    setShowLogin(true); 
    return; 
  } 
  setShowYourAccounts(true);
};


  return (
    <>
      <section className='landingSection'>
        
        <NavBar showLoginHandler={showLoginHandler} showLogout={showLogout} logoutHandler={logoutHandler}/>
        <SideBar showAddProductHandler={showAddProductHandler} infoButtonHandler={infoButtonHandler}
          helpButtonHandler={helpButtonHandler} logoutHandler={logoutHandler}/>
        <Intro showAddProductHandler={showAddProductHandler} yourAccountsHandler={yourAccountsHandler}/>
        <Menu />
        {showLogin && (<Login showRegisterHandler={showRegisterHandler} onClose={closeAllHandler}/>)}
        {showRegister && (<Register showLoginHandler={showLoginHandler} onClose={closeAllHandler}/>)}
        {showAddProduct && showLogout && (
          <AddProduct onClose={closeAllHandler} onPostSuccess={() => setShowYourAccounts(true)} />)}

        {showInfoButton && <Info onClose={closeAllHandler} />}
        {showHelpButton && <Help onClose={closeAllHandler} />}

        {showYourAccounts && (<YourAccounts onClose={() => setShowYourAccounts(false)} />)}

      </section>
    </>
  );
};

export default LandingPage;