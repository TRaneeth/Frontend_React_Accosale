import React from 'react'
import { Link } from 'react-router-dom'

const notFound = () => {
  return (
    <>
        <div className='errorSection'>
            <h1>404</h1>
            <div>Page not found</div>
            <Link to="/"><p>go back</p></Link>
        </div>
    </>
    
  )
}

export default notFound