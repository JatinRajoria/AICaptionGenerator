import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';


// Ek simple component check karne ke liye ki user logged in hai ya nahi
// Note: Cookies ke case mein hum usually backend se check karwate hain, 
// par UI level par hum navigation handle kar sakte hain.
const ProtectedRoute = ({ children }) => {
  // Aap yahan check kar sakte hain agar user ki state exist karti hai
  // Filhal ke liye ye direct children return kar raha hai
  return children;
};

function MainRoutes() {
  return (

      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Default Route: Login par le jayega */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main App Route (Protected) */}
          <Route 
            path="/create-post" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />

          {/* 404 Page (Optional) */}
          <Route path="*" element={<div className="flex justify-center mt-20 text-2xl">404 - Page Not Found</div>} />
        </Routes>
      </div>
  
  );
}

export default MainRoutes;