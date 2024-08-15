import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './contexts/ProtectedRoute';
import Welcome from './pages/Welcome';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
//import Button from './components/button';

const RedirectAuthenticated = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" /> : children;
};

function App() {
  return (
    <div className='App'>
      <div className='App-header'>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Welcome />} />
              { /* <Route path='/signup' element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} /> */ }

              <Route 
                path="/signup" 
                element={<SignUp />}
              />

              <Route 
                path="/login"
                element={
                  <RedirectAuthenticated>
                    <Login />
                  </RedirectAuthenticated>
                } 
              />

              { /*<Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} /> */}

              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/*" 
                element={<p>404! Not Found!</p>}
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
