import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Person from '../assets/person.png';
import Email from '../assets/email.png';
import Password from '../assets/password.png';
import '../css/SignUp.css';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signedIn, setSignedIn] = useState(false);
    const [resp, setResp] = useState({});
    const [error, setError] = useState('');

    const { signup } = useAuth();
    const navigate = useNavigate();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const validateName = (name) => {
        if (name === "") return "Name should not be empty";
        return "";
    }

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
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            setError({ ...error, name: validateName(value) });
        } else if (name === "email") {
            setError({ ...error, email: validateEmail(value) });
        } else if (name === "password") {
            setError({ ...error, password: validatePassword(value) });
        }

        console.log(error);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(name, email, password);

        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (nameError || emailError || passwordError) {
            setError({name: nameError, email: emailError, password: passwordError });
            return;
        }
        
        try {
            //const response = await axios('http://localhost:8080/welcome');
            //console.log(response.data);
            //setResp(response);
            
            const userData = {
                userName: name,
                userEmail: email,
                userPassword: password
            }

            const response = await signup(userData.userName, userData.userEmail, userData.userPassword);
            const status = response.status;

            if (status === 409) {
                setSignedIn(false);
                setError({ form: "Email is already in use. Please sign up with a different account."});
            } else if (status === 500) {
                setSignedIn(false);
                setError({ form: "An unexpected error occurred from server. Please try again later."});
            } else if (status === 200) {
                setSignedIn(true);
                setError("");
                navigate('/login');
                //navigate(`/home`, {state: {email:userData.userEmail, token: response.data.token}});
            }

            /*try {
                const status = await signup(name, email, password); //await signup(name, email, password);
                setSignedIn(true);
                setError("");
                //navigate('/home');
            } catch (error) {
                console.log('The Error: ', error);
                setSignedIn(false);
                //console.log(error.response);
                //console.log(error.response.status);
                if (error.response && error.response.status === 409) {
                    setError({ form: "Email is already in use. Please sign up with a different account."});
                } else {
                    setError({ form: "An unexpected error occurred from server. Please try again later."});
                }
            }*/

            /*axios.post('http://localhost:8080/signup', userData)
            .then((response) => {
                console.log(response);
                setResp(response);
                setSignedIn(true);
                setError("");       // clear any existing errors
                signup(name, email, password);
            })
            .catch((error) => {
                console.log('The Error: ', error);
                setSignedIn(false);
                //setError(error);
                //console.log(error.response.status);

                if (error.response && error.response.status === 409) {
                    setError({ form: "Email is already in use. Please sign up with a different account."});
                } else {
                    setError({ form: "An unexpected error occurred from server. Please try again later."});
                }
            });*/
        } catch (e) {
            setSignedIn(false);
            setError({ form: "An unexpected error occurred (500). Please try again later." });
        }
    }

    /*useEffect(() => {
        if (signedIn) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [signedIn, navigate]);*/

    return (
        <div className="signup-container">
            <div className="signup-header">
                <h1>Sign Up for an Account</h1>
                <h5>Already have an account? <a href="/login">Login</a></h5>
            </div>

            <div className="signup-body">
                <form action="" onSubmit={handleSubmit}>
                    <div className="input-group">
                        {/* <label htmlFor="name">Name: </label> */}
                        <img src={Person} alt="person" className="person-icon" />
                        <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={e => handleChange(e)} required></input>
                        {error.name && <div className="error-message">{error.name}</div>}
                    </div>

                    <br></br>

                    <div className="input-group">
                        {/* <label htmlFor="emailAddress">Email: </label> */}
                        <img src={Email} alt="email" className="email-icon" />
                        <input type="email" id="emailAddress" name="email" placeholder="Email" value={email} onChange={e => handleChange(e)} onBlur={handleBlur} required></input>
                        {error.email && <div className="error-message">{error.email}</div>}
                    </div>

                    <br></br>

                    <div className="input-group">
                        {/* <label htmlFor="password">Password: </label> */}
                        <img src={Password} alt="password" className="password-icon" />
                        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={e => handleChange(e)} onBlur={handleBlur} required></input>
                        {error.password && <div className="error-message">{error.password}</div>}
                    </div>

                    <br></br>

                    <div className="signup-submit-button">
                        <button id="submit-button" type="submit"><b>Sign Up</b></button>
                        { /* <Button submit={handleSubmit} userName={name} /> */ }
                    </div>

                    {signedIn && <div className="success-message">Success!</div>}
                    {error.form && <div className="error-message">{error.form}</div>}
                    {/* resp && <p id="welcome">{resp.data} 200</p> */}
                    {/* error && <p>{error}</p> */}
                </form>
            </div>
        </div>
    );
}

export default SignUp;