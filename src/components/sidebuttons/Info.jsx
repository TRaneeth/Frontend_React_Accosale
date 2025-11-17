import React from 'react'

const sidebarButtons = ({onClose}) => {
  return (
    <div className='all-buttons'>
        <div className="about-us">
            <button className="close-btnn" onClick={onClose}>×</button>
            <h1>About Accstore</h1>
            <p>AccStore is a trusted digital marketplace where buyers and sellers can trade 
                verified online accounts quickly and safely.</p>
            <p>Our platform ensures every account is authentic, secure, and verified, 
                helping users buy or sell with confidence.</p>
            <ul>With AccStore, you can:
                <li>Post your accounts for sale easily</li>
                <li>Browse verified listings</li>
                <li>Manage all your trades in one place</li>
            </ul>
            <p>AccStore is built with modern web technologies to give you a fast, simple, and reliable experience.</p>
            <p>Got questions or issues?</p>
            <p>Visit Help or Contact Us from the menu — we’ll guide you.</p>
        </div>
    </div>
  )
}

export default sidebarButtons