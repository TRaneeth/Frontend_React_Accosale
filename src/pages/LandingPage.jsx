import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Intro from '../components/Intro'
import Menu from '../components/Menu'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddProduct from '../components/forms/AddProduct'
import { TbFlagSearch } from 'react-icons/tb'

const LandingPage = () => {
  const [showLogin,setShowLogin] = useState(false)
  const [showRegister,setShowRegister] = useState(false)
  const [showAddProduct,setShowAddProduct] = useState(false)
  const [showLogout,setShowLogout] = useState(false)

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
  }
  const showRegisterHandler=()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowAddProduct(false)
  }
  const showAddProductHandler=()=>{
    if(showLogout){
      setShowAddProduct(true)
      setShowLogin(false)
      setShowRegister(false)
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
  }

  return (
    <>
        <section className='landingSection'>
            <NavBar showLoginHandler={showLoginHandler} showLogout={showLogout} logoutHandler={logoutHandler}/>
            <SideBar showAddProductHandler={showAddProductHandler}/>
            <Intro showAddProductHandler={showAddProductHandler}/>
            <Menu/>
            {showLogin && <Login showRegisterHandler={showRegisterHandler} onClose={closeAllHandler}/>}
            {showRegister && <Register showLoginHandler={showLoginHandler} onClose={closeAllHandler}/>}
            {showAddProduct && showLogout && <AddProduct onClose={closeAllHandler}/>}
            
        </section>
    </>
  )
}

export default LandingPage