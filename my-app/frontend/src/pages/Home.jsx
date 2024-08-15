import React from 'react';
import {useLocation} from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';
import TopNav from './TopNav';
import '../css/Home.css';

const Home = ({route, navigate}) => {
    //const { userName } = useAuth();
    //const {state} = useLocation();
    const location = useLocation();
    console.log("the location is: ", location);

    return (
        <div className="home-container">
            { location && location.state ? <TopNav email={location.state.email} token={location.state.token} /> : <TopNav /> }
            <div className="home-content">
                <p><b>Welcome to your dashboard, {localStorage.getItem('userName')}!</b></p>
                <img src="https://media.giphy.com/media/rBPY21NorKedYzrR2W/giphy.gif?cid=ecf05e47hlbrebd4zkn5bzr19hiyuvjqbt15pyzlkxejrxgm&ep=v1_gifs_search&rid=giphy.gif&ct=g"  alt="Welcome Home!" className='welcome-gif' />
            </div>
        </div>
    );
}

export default Home;





/*
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import profileIcon from '../assets/user_profile.png';

const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#31a79d',
    borderBottom: '2px solid #ddd'
};

const profileContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%'
};

const profileIconStyle = {
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    marginRight: '15px',
    borderRadius: '50%'
};

const logoutButtonStyle = {
    padding: '5px 10px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'
};

function Home() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate('/profile');
    };

    return (
        <div>
            <nav style={navStyle}>
                <h1>Home Page</h1>
                <div style={profileContainerStyle}>
                    <img 
                        src={profileIcon} 
                        alt="Profile" 
                        style={profileIconStyle} 
                        onClick={goToProfile}
                    />
                    <button onClick={logout} style={logoutButtonStyle}>Logout</button>
                </div>
            </nav>
            <p>Hello User!</p>
        </div>
    );
}

export default Home;
*/