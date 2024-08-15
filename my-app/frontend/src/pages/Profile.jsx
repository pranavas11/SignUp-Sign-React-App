import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import TopNav from './TopNav';
import '../css/Profile.css';

function Profile() {
    //const [profileImage, setProfileImage] = useState(null);
    const [userID, setUserID] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const { userName, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    console.log("the email in profile page is: ", location);

    useEffect(() => {
        // Fetch user profile to get the user name
        axios.get(`http://localhost:8080/profile?email=${location.state.userEmail}`, {
            headers: { "Authorization": `Bearer ${location.state.token}` }   // response.data.accessToken
        }).then(response => {
            console.log("in profile page: ", response);
            const {userName, email, bio, userID} = response.data;
            setUserID(userID);
            setEmail(email);
            setBio(bio);
        });

        // Fetch the user data to pre-fill the form
        // axios.get(`http://localhost:8080/profile?email=${location.state.userEmail}&token=${location.state.token}`).then(response => {
        //     const { email, userBio /*, profileImage*/ } = response.data;
        //     setEmail(email);
        //     setBio(userBio);
        //     //setProfileImage(profileImage);
        // });
    }, []);

    /*const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };*/

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            /* await axios.put('http://localhost:8080/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }); */
            const userData = {userID, email, password, bio};
            axios.put(`http://localhost:8080/profile`, userData, {
                headers: { "Authorization": `Bearer ${location.state.token}` }
            }).then(response => {
                console.log(response);
                alert('Profile updated successfully!');
            }).catch(error => {
                console.log("error in axios: ", error);
            });
            // Reload the page or do something to update the UI
        } catch (error) {
            console.log('Error updating profile:', error);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (confirmation) {
            try {
                const userData = {userID};
                console.log("user data and token in delete: ", userData, location.state.token);
                axios.delete(`http://localhost:8080/profile?userID=${userID}`, {
                    headers: { "Authorization": `Bearer ${location.state.token}` }
                }).then(response => {
                    console.log(response);
                    alert('Profile deleted successfully!');
                    logout();
                    navigate('/signup');
                }).catch(error => {
                    console.log("error in axios: ", error);
                });
                /*axios.delete('http://localhost:8080/profile');
                logout();
                navigate('/signup');*/
            } catch (error) {
                console.error('Error deleting account:', error);
            }
        }
    };

    return (
        <div className="profile-container">
            <TopNav userEmail={email} />
            <h1>Welcome to Your Profile, {userName}!</h1>
            <form className='profile-form' onSubmit={handleSubmit}>
                { /* <div className="form-group">
                    <label htmlFor="profileImage">Profile Image</label>
                    <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} />
                    {profileImage && <img src={URL.createObjectURL(profileImage)} alt="Profile Preview" className="profile-preview" />}
                </div> */ }

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>

                <button type="submit" className="update-button">Update Profile</button>
            </form>

            <button onClick={handleDeleteAccount} className="delete-button">Delete Account</button>
        </div>
    );
}

export default Profile;