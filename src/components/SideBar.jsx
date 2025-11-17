import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaHome, FaUser, FaPlus, FaCog, FaInfoCircle, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";

const SideBar = ({showAddProductHandler,infoButtonHandler,helpButtonHandler}) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }
  return (
    <div className='sideBar'>
      <div className="sideBar-item" onClick={goHome} style={{ cursor: 'pointer' }}>
        <FaHome />
        <span>Home</span>
      </div>
      <div className="sideBar-item">
        <FaUser />
        <span>Profile</span>
      </div>
      <div className="sideBar-item" onClick={showAddProductHandler}>
        <FaPlus />
        <span>Add +</span>
      </div>
      <div className="sideBar-item">
        <FaCog />
        <span>Settings</span>
      </div>
      <div className="sideBar-item" onClick={infoButtonHandler}>
        <FaInfoCircle />
        <span>About us</span>
      </div>
      <div className="sideBar-item" onClick={helpButtonHandler}>
        <FaQuestionCircle />
        <span>Help</span>
      </div>
      <div className="sideBar-item">
        <FaSignOutAlt />
        <span>Logout</span>
      </div>
    </div>
  )
}

export default SideBar
