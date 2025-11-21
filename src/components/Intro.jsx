import React from 'react'
import { useNavigate } from 'react-router-dom'

const Intro = ({showAddProductHandler}) => {
  const navigate = useNavigate();
  return (
    <div className='intro'>
        <div className='intro-card'>
            <h1>Buy and Sell Trusted Digital Accounts</h1>
            <p className="description">AccoSale is your safe and reliable platform to buy, sell, and trade verified digital accounts.</p>
            <div className='intro-buttons'>
                <button className="intro-btn" onClick={showAddProductHandler}>Post An Account</button>
                <button className="intro-btn" onClick={() => navigate('/youraccounts')}>Your Accounts</button>
            </div>
        </div>
    </div>
  )
}

export default Intro;
