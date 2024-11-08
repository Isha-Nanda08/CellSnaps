import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import SplashScreen from './Pages/SplashScreen';

function App() {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Automatically navigate to the home page after 3 seconds
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <Router>
      <Routes>
        {showSplash ? (
          <Route path="/" element={<SplashScreen />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>

  );
}

export default App;
