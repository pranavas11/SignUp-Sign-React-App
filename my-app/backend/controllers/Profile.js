const fs = require('fs');
const path = require('path');
const UserModel = require('../models/UserModel');

exports.getProfile = async (req, res) => {
    try {
        const user = await UserModel.findByEmail(req.query.email);
        console.log(`the user is: ${user}`);
        if (user) {
            res.status(200).json({
                userName: user[0].name,
                email: user[0].email,
                bio: user[0].userBio || '',
                userID: user[0].userID
                //profileImage: user.profileImage || ''
            });
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send("Server error. Please try again later.");
    }
};

exports.updateProfile = async (req, res) => {
    try {
        console.log("user data in update profile: ", req.body);
        const { userID, email, password, bio } = req.body; //req.body.userData;
        /* let profileImagePath = '';

        if (req.files && req.files.profileImage) {
            const profileImage = req.files.profileImage;
            profileImagePath = `/uploads/${req.user.id}_${profileImage.name}`;
            const uploadPath = path.join(__dirname, '../public', profileImagePath);
            await profileImage.mv(uploadPath);
        }*/

        const profileResponse = await UserModel.updateUserProfile(userID, {
            email,
            password,
            bio
            // profileImage: profileImagePath
        });

        console.log("the profile response is: ". profileResponse);

        res.status(200).send("Profile updated successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try again later.");
    }
};

exports.deleteProfile = async (req, res) => {
    console.log("\nreq.params: ", req.user.id);
    try {
        const deletedUser = await UserModel.deleteUser(req.user.id);
        console.log(deletedUser);
        res.send("User account deleted successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try again later.");
    }
};