import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Intro from '../components/Intro'
import Menu from '../components/Menu'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddProduct from '../components/forms/AddProduct'
import Info from '../components/sidebuttons/Info'
import { TbFlagSearch } from 'react-icons/tb'

const LandingPage = () => {
  const [showLogin,setShowLogin] = useState(false)
  const [showRegister,setShowRegister] = useState(false)
  const [showAddProduct,setShowAddProduct] = useState(false)
  const [showLogout,setShowLogout] = useState(false)
  const [showInfoButton,setShowInfoButton] = useState(false)

  useEffect(()=>{
    const loginToken =localStorage.getItem('loginToken')
    if(loginToken){
      setShowLogout(true)
    }
  },[])

  const logoutHandler=()=>{
    confirm("are you sure to logout?")
    localStorage.removeItem('loginToken')
    setShowLogout(false)
  }

  const showLoginHandler=()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowAddProduct(false)
    setShowInfoButton(false)
  }
  const showRegisterHandler=()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowAddProduct(false)
    setShowInfoButton(false)
  }
  const showAddProductHandler=()=>{
    if(showLogout){
      setShowAddProduct(true)
      setShowLogin(false)
      setShowRegister(false)
      setShowInfoButton(false)
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
  }
  const infoButtonHandler=()=>{
    setShowLogin(false)
    setShowRegister(false)
    setShowAddProduct(false)
    setShowInfoButton(true)
  }

  return (
    <>
        <section className='landingSection'>
            <NavBar showLoginHandler={showLoginHandler} showLogout={showLogout} logoutHandler={logoutHandler}/>
            <SideBar showAddProductHandler={showAddProductHandler} infoButtonHandler={infoButtonHandler}/>
            <Intro showAddProductHandler={showAddProductHandler}/>
            <Menu/>
            {showLogin && <Login showRegisterHandler={showRegisterHandler} onClose={closeAllHandler}/>}
            {showRegister && <Register showLoginHandler={showLoginHandler} onClose={closeAllHandler}/>}
            {showAddProduct && showLogout && <AddProduct onClose={closeAllHandler}/>}
            {showInfoButton && <Info onClose={closeAllHandler}/>}
        </section>
    </>
  )
}

export default LandingPage