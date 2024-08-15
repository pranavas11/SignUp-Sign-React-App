import React from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    console.log(isAuthenticated);

    if (!isAuthenticated) {
        alert("Unauthorized access. Please login first.");
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;