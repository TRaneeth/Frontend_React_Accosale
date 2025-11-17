import React, { useState } from 'react'
import { API_URL } from '../../data/ApiPath'

const Register = ({showLoginHandler,onClose}) => {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/user/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({username,email,password})
      })
      const data = await response.json()
      if(response.ok){
        console.log(data)
        setUsername("")
        setEmail("")
        setPassword("")
        alert('user registered successfully')
        showLoginHandler()
      }
      else{
        setError(data.error)
      }
    } catch (error) {
      console.error(error)
      alert('registration failed')
    }
  }

  return (
    <div className="loginSection">
        <form className='authForm' onSubmit={handleSubmit}>
            <button type='button' className="close-btn" onClick={onClose}>×</button>
            <h2>Register</h2>
            <input type="text" name='username' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username"></input>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"></input>
            <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"></input>
            <button className="submit-btn" type='submit'>Register</button>
            <div className="links">
                <a href="#" onClick={showLoginHandler}>already have an account?</a>
            </div>
        </form>
    </div>
  )
}

export default Register