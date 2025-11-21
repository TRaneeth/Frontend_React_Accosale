import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import './App.css';
import YourAccounts from './components/YourAccounts';
import Help from './components/sidebuttons/Help';
import Info from './components/sidebuttons/Info'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/youraccounts" element={<YourAccounts/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/aboutus" element={<Info/>} />
        {/* future pages */}
      </Routes>
    </Router>
  )
}

export default App;