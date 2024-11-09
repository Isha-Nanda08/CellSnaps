import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import SplashScreen from './Pages/SplashScreen';
// import CellModel from './components/CellModel';
import Animation from './Components/Animation';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Register from './Components/Register';
import Unauthorized from './Components/Unauthorized';
import About from './Pages/About';
import PersistLogin from './Components/PersistLogin';
import RequireAuth from './Components/RequireAuth';

// import Animation from './Pages/Animation';  // Import the Animation component
function App() {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const ROLES = {
    'User': 'user',
    'Editor': 'editor',
    'Admin': 'admin'
  }

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
        {showSplash ? (
          <Route path="/" element={<SplashScreen />} />
        ) : (
          <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          </Route>
        )}

        <Route path="/a" element={<Animation/>} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<Navigate to="/"/>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
