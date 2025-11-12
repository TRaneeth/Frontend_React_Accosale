import React from 'react'

const Intro = ({showAddProductHandler}) => {
  return (
    <div className='intro'>
        <div className='intro-card'>
            <h1>Buy and Sell Trusted Digital Accounts</h1>
            <p className="description">AccoSale is your safe and reliable platform to buy, sell, and trade verified digital accounts across popular platforms with ease and confidence.</p>
            <div className='intro-buttons'>
                <button onClick={showAddProductHandler}>Post An Account</button>
                <button>Your Accounts</button>
            </div>
        </div>
    </div>
  )
}

export default Intro