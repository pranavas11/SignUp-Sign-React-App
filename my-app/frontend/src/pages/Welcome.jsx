import React from "react";
import { useNavigate } from 'react-router-dom';
import "../css/Welcome.css";

function Welcome() {
    const navigate = useNavigate();

    const signUp = () => navigate("/signup");
    const signIn = () => navigate("/login");

    return (
        <div className="welcome-container">
            <h1>Welcome!</h1>
            <h3>Would You Like to Sign Up or Sign In?</h3>
            <button className="signup-button" onClick={signUp}><b>Sign Up</b></button>
            <button className="signin-button" onClick={signIn}><b>Sign In</b></button>
        </div>
    );
}

export default Welcome;