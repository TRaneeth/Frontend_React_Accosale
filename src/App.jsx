import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import './App.css';
import YourAccounts from './components/YourAccounts';
import Help from './components/sidebuttons/Help';
import Info from './components/sidebuttons/Info';
import Wishlist from './components/sidebuttons/Wishlist'
import ChatContainer from './components/sidebuttons/ChatContainer';
import ChatWindow from './components/sidebuttons/ChatWindow';
import Profile from './components/sidebuttons/Profile';
import EditPost from './components/sidebuttons/EditPost';


const App = () => {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/youraccounts" element={<YourAccounts/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/aboutus" element={<Info/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/chat" element={<ChatContainer />} />
        <Route path="/chat/:id" element={<ChatWindow />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/edit-post/:id" element={<EditPost/>} />
        {/* future pages */}
      </Routes>
    </Router>
  )
}

export default App;