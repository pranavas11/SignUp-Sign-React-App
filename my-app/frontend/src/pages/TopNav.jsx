import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import homeIcon from '../assets/home.png';
import profileIcon from '../assets/user_profile.png';
import '../css/TopNav.css';

const TopNav = (props) => {
    console.log("the props is: ", props);
    const {email, token} = props;
    const { logout, userName } = useAuth();
    const navigate = useNavigate();

    console.log(email);

    const goToProfile = () => {
        console.log(token);
        //navigate(`/profile`, {state:{userEmail:email, token: token}});
        navigate(`/profile`, {state:{userEmail: localStorage.getItem('email'), token: localStorage.getItem('token')}});
    };

    const goToHome = () => navigate(`/home`, {state:{userEmail:email, token: token}});

    return (
        <nav className="top-nav">
            <span className="user-name">Hello, {userName}!</span>
            <img src={homeIcon} alt="Home" className="home-icon" onClick={goToHome} />
            <div className="profile-section">
                <img src={profileIcon} alt="Profile" className="profile-icon" onClick={goToProfile} />
                <button onClick={logout} className="logout-button">Logout</button>
            </div>
        </nav>
    );
}

export default TopNav;