import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import SplashScreen from './Pages/SplashScreen';
// import CellModel from './components/CellModel';
import Animation from './components/Animation';
import About from './Pages/About';
import Footer from './components/Footer';
// import Animation from './Pages/Animation';  // Import the Animation component

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
        <Route path="/a" element={<Animation/>} />  
        <Route path="/about" element={<About/>} />  
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer/>
    </Router>

  );
}

export default App;
