import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import './App.css';
import NotFound from './components/NotFound';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/*' element={<NotFound/>} />
        {/* future pages */}
      </Routes>
    </Router>
  )
}

export default App;
