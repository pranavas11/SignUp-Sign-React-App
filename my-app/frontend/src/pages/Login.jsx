import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Email from '../assets/email.png';
import Password from '../assets/password.png';
import '../css/Login.css';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [signedIn, setSignedIn] = useState(false);
    const [error, setError] = useState({});

    const { login } = useAuth();
    const navigate = useNavigate();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const validateEmail = (email) => {
        if (email === "") {
            return "Email should not be empty";
        } else if (!emailPattern.test(email)) {
            return "Please enter a valid email address.";
        } else {
            return "";
        }
    };

    const validatePassword = (password) => {
        if (password === "") {
            return "Password should not be empty";
        } else if (!passwordPattern.test(password)) {
            return "Password didn't match the required pattern.";
        } else {
            return "";
        }
    };

    const handleChange = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));

        // clear error message when user starts typing
        setError(prevError => ({
            ...prevError,
            [event.target.name]: ''
        }));
    }

    const handleBlur = (event) => {
        const { name, value } = event.target;
        //let newError = "";

        if (name === "email") {
            setError({ ...error, email: validateEmail(value) });
        } else if (name === "password") {
            setError({ ...error, password: validatePassword(value) });
        }

        /*setError(prevError => ({
            ...prevError,
            [name]: newError
        }));*/
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailError = validateEmail(values.email);
        const passwordError = validatePassword(values.password);

        if (emailError || passwordError) {
            setError({ email: emailError, password: passwordError });
            return;
        }

        try {
            const userData = {
                userEmail: values.email,
                userPassword: values.password
            };

            const response = await login(userData.userEmail, userData.userPassword);
            console.log("the recent response is: ", response);
            const status = response.status;
            console.log("status is:", status);

            if (status === 401 || response === 401) {
                setSignedIn(false);
                setError({ form: "Invalid email or password. Please try again." });
                console.log("error.form is ", error.form);
            } else if (status === 500) {
                setSignedIn(false);
                setError({ form: "An unexpected error occurred. Please try again later." });
            } else if (status === 200) {
                setSignedIn(true);
                //console.log(values.email);
                const userEmail = localStorage.getItem('userName');
                localStorage.setItem("email", userData.userEmail);
                localStorage.setItem("token", response.data.token);
                setError("");
                //localStorage.setItem("token", response.data.token);
                //console.log("the local storage's get item value: ", localStorage.getItem('userName'));
                navigate(`/home`, {state: {email:userData.userEmail, token: response.data.token}});
            }
    
            /*axios.post('http://localhost:8080/authenticate', userData)
                .then((response) => {
                    console.log(response);
                    setSignedIn(true);  // Set success state to true upon successful login
                    setError({});       // clear all errors on successful login
                    login();
                })
                .catch((error) => {
                    console.log('Error:', error);
                    setSignedIn(false);
                    setError({ form: "Invalid email or password. Please try again." });
                });*/
        } catch (e) {
            console.log(e);
            setSignedIn(false);
            setError({ form: "An error occurred. Please try again later." });
        }
    }

    /*useEffect(() => {
        console.log(values.email);
        if (signedIn) {
            const timer = setTimeout(() => {
                //navigate(`/home${values.email}`);
                //navigate(`/home/`, {state: {email:values.email}});
                history.push('/home', {email: values.email});
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [signedIn, navigate]);    // trigger useEffect when success state changes */

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Login to Your Account</h1>
                <h5>Don't have an account yet? <a href="/signup">Sign Up</a></h5>
            </div> <br></br>

            <div className="login-body">
                <form action="" onSubmit={handleSubmit}>
                    <div className="input-group">
                        {/* <label htmlFor="emailAddress">Email: </label> */}
                        <img src={Email} alt="email" className="email-icon" />
                        <input type="email" id="emailAddress" name="email" placeholder="Enter Email" value={values.email} onChange={e => handleChange(e)} onBlur={handleBlur} required></input>
                        {error.email && <div className="error-message">{error.email}</div>}
                    </div>

                    <br></br>

                    <div className="input-group">
                        {/* <label htmlFor="password">Password: </label> */}
                        <img src={Password} alt="password" className="password-icon" />
                        <input type="password" id="password" name="password" placeholder="Enter Password" value={values.password} onChange={e => handleChange(e)} onBlur={handleBlur} required></input>
                        {error.password && <div className="error-message">{error.password}</div>}
                    </div>

                    <br></br>

                    <div className="login-submit-button">
                        { /*<button id="submit-button" onClick={handleSubmit}>Sign In</button> */}
                        <button id="submit-button" type="submit">Sign In</button>
                        { /* <Button submit={handleSubmit} userName={name} /> */ }
                    </div>

                    {signedIn && <div className="success-message">Success!</div>}
                    {error.form && <div className="form-error-message">{error.form}</div>}
                </form>
            </div>
        </div>
    );
}

export default Login;