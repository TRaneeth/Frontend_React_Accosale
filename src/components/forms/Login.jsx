import React, { useState } from 'react'
import { API_URL } from '../../data/ApiPath'

const Login = ({showRegisterHandler,onClose}) => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  
  const loginHandler = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/user/login`,{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email,password})
      })
      const data = await response.json()
      if(response.ok){
        alert('Login Successful')
        setEmail("")
        setPassword("")
        localStorage.setItem('loginToken',data.token)
        window.location.reload()
      }
      else{
        alert('email is not registered, create an account')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="loginSection" onSubmit={loginHandler}>
        <form className='authForm'>
            <button className="close-btn" onClick={onClose}>×</button>
            <h2>Login</h2>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Username or Email"></input>
            <input type="password" name='password' value={password} onChange  ={(e)=>setPassword(e.target.value)} placeholder="Password"></input><br/>
            <button className="submit-btn" type='submit'>Login</button>
            <div className="links">
                <a href="#">Forgot Password?</a>
                <a href="#" onClick={showRegisterHandler}>Create New Account</a>
            </div>
        </form>
    </div>
  )
}

export default Login