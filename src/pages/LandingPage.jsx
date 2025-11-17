import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Intro from '../components/Intro'
import Menu from '../components/Menu'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddProduct from '../components/forms/AddProduct'
import SidebarButtons from '../components/sidebuttons/SidebarButtons'
import { TbFlagSearch } from 'react-icons/tb'

const LandingPage = () => {
  const [showLogin,setShowLogin] = useState(false)
  const [showRegister,setShowRegister] = useState(false)
  const [showAddProduct,setShowAddProduct] = useState(false)
  const [showLogout,setShowLogout] = useState(false)
  const [showSideButtons,setShowSideButtons] = useState(false)

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
    setShowSideButtons(false)
  }
  const showRegisterHandler=()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowAddProduct(false)
    setShowSideButtons(false)
  }
  const showAddProductHandler=()=>{
    if(showLogout){
      setShowAddProduct(true)
      setShowLogin(false)
      setShowRegister(false)
      setShowSideButtons(false)
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
    setShowSideButtons(false)
  }
  const sideBarButtonsHandler=()=>{
    setShowLogin(false)
    setShowRegister(false)
    setShowAddProduct(false)
    setShowSideButtons(true)
  }

  return (
    <>
        <section className='landingSection'>
            <NavBar showLoginHandler={showLoginHandler} showLogout={showLogout} logoutHandler={logoutHandler}/>
            <SideBar showAddProductHandler={showAddProductHandler} sideBarButtonsHandler={sideBarButtonsHandler}/>
            <Intro showAddProductHandler={showAddProductHandler}/>
            <Menu/>
            {showLogin && <Login showRegisterHandler={showRegisterHandler} onClose={closeAllHandler}/>}
            {showRegister && <Register showLoginHandler={showLoginHandler} onClose={closeAllHandler}/>}
            {showAddProduct && showLogout && <AddProduct onClose={closeAllHandler}/>}
            {showSideButtons && <SidebarButtons onClose={closeAllHandler}/>}
        </section>
    </>
  )
}

export default LandingPage