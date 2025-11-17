import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Intro from '../components/Intro'
import Menu from '../components/Menu'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddProduct from '../components/forms/AddProduct'
import Info from '../components/sidebuttons/Info'
import Help from '../components/sidebuttons/Help'
import { TbFlagSearch } from 'react-icons/tb'

const LandingPage = () => {
  const [showLogin,setShowLogin] = useState(false)
  const [showRegister,setShowRegister] = useState(false)
  const [showAddProduct,setShowAddProduct] = useState(false)
  const [showLogout,setShowLogout] = useState(false)
  const [showInfoButton,setShowInfoButton] = useState(false)
  const [showHelpButton,setShowHelpButton] = useState(false)

  useEffect(()=>{
    const loginToken =localStorage.getItem('loginToken')
    if(loginToken){
      setShowLogout(true)
    }
  },[])

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
}


  const showLoginHandler=()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowAddProduct(false)
    setShowInfoButton(false)
    setShowHelpButton(false)
  }
  const showRegisterHandler=()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowAddProduct(false)
    setShowInfoButton(false)
    setShowHelpButton(false)
  }
  const showAddProductHandler=()=>{
    if(showLogout){
      setShowAddProduct(true)
      setShowLogin(false)
      setShowRegister(false)
      setShowInfoButton(false)
      setShowHelpButton(false)
    }
    else{
      alert('Please Login')
      setShowLogin(true)
    }
    
  }
  const closeAllHandler=()=>{
    setShowLogin(false)
    setShowRegister(false)
    setShowAddProduct(false)
    setShowInfoButton(false)
    setShowHelpButton(false)
  }
  const infoButtonHandler=()=>{
    setShowLogin(false)
    setShowRegister(false)
    setShowAddProduct(false)
    setShowInfoButton(true)
    setShowHelpButton(false)
  }
  const helpButtonHandler=()=>{
    setShowLogin(false)
    setShowRegister(false)
    setShowAddProduct(false)
    setShowInfoButton(false)
    setShowHelpButton(true)
  }

  return (
    <>
        <section className='landingSection'>
            <NavBar showLoginHandler={showLoginHandler} showLogout={showLogout} logoutHandler={logoutHandler}/>
            <SideBar showAddProductHandler={showAddProductHandler} infoButtonHandler={infoButtonHandler} 
            helpButtonHandler={helpButtonHandler} logoutHandler={logoutHandler}/>
            <Intro showAddProductHandler={showAddProductHandler}/>
            <Menu/>
            {showLogin && <Login showRegisterHandler={showRegisterHandler} onClose={closeAllHandler}/>}
            {showRegister && <Register showLoginHandler={showLoginHandler} onClose={closeAllHandler}/>}
            {showAddProduct && showLogout && <AddProduct onClose={closeAllHandler}/>}
            {showInfoButton && <Info onClose={closeAllHandler}/>}
            {showHelpButton && <Help onClose={closeAllHandler}/>}
        </section>
    </>
  )
}

export default LandingPage