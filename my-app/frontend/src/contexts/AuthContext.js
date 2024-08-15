import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      setUserName(localStorage.getItem('userName'));
    }
  }, []);

  const signup = async (name, email, password) => {
    console.log("inside signup");
    try {
      const response = await axios.post('http://localhost:8080/signup', {
        userName: name,
        userEmail: email,
        userPassword: password,
      });
      
      /*localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('userName', name);
      setIsAuthenticated(true);
      setUserName(name);*/

      //navigate('/home');
      return response;
    } catch (error) {
      console.error("Signup failed:", error);
      //throw new Error("Signup failed");
      const statusCode = error.response?.status || 500;
      //console.log(statusCode);
      return statusCode;
    }
  };

  const login = async (email, password) => {
    console.log("inside login");
    try {
        const response = await axios.post('http://localhost:8080/authenticate', {
            userEmail: email,
            userPassword: password
        });
        const name = response.data.userName;
        //console.log(name);
        localStorage.setItem('accessToken', response.data.token);
        //localStorage.setItem('userName', response.data.userName);
        setIsAuthenticated(true);
        //console.log(isAuthenticated);
        localStorage.setItem('userName', name);
        setUserName(name);

        // // Fetch user profile to get the user name
        // const profileResponse = await axios.get(`http://localhost:8080/profile?${email}`, {
        //     headers: { "Authorization": `Bearer ${response.data.token}` }   // response.data.accessToken
        // });

        // console.log("The profile response in auth context is: ", profileResponse);

        /*localStorage.setItem('userName', profileResponse.data.userName);
        setUserName(response.data.userName);
        console.log(localStorage.getItem('userName'));
        console.log(userName);*/

        //navigate('/home');
        //console.log("the response is: ", response.status);
        //const status = response.status;
        // return profileResponse;
        return response;
    } catch (error) {
        console.error("Login failed:", error);
        const statusCode = error.response?.status || 500;
        console.log(statusCode);
        return statusCode;
        //throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName('');
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    userName,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}





/*import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });
    const navigate = useNavigate();

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home');
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);*/







/*import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home');
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    useEffect(() => {
        // check if the user is already logged in
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
*/