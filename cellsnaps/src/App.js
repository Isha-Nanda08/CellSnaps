import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout';
import Login from './Components/Login';
import PersistLogin from './Components/PersistLogin';
import Register from './Components/Register';
import RequireAuth from './Components/RequireAuth';
import Unauthorized from './Components/Unauthorized';
import Home from './Pages/Home';
import SplashScreen from './Pages/SplashScreen';


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
        ) :(
          <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
          )
        }
        
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App;
