import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import "react-toastify/dist/ReactToastify.css"
import RefreshHandler from './RefreshHandler'
import Navbar from './components/Navbar'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const links = [
    { label: 'Home', to: '/home' },
    { label: 'Products', to: '/home' }, // example; point to real route when available
    { label: 'Contact', to: '/home' },  // example link
  ];

  return (
    <>
      {/* This will check token/session on refresh and update auth state */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      {isAuthenticated && (
        <Navbar
          brand="MyShop"
          links={links}
        />
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
