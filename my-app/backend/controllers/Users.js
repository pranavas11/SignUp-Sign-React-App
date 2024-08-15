const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    console.log(req.body);
    try {
        const { userName, userEmail, userPassword } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findByEmail(userEmail);
        if (existingUser.length > 0) {
            res.status(409).send("Email is already in use. Please sign up with a different account.");
            return;
        } else {
            // Create new user
            await UserModel.createUser(userName, userEmail, userPassword);
            res.status(200).send("Registration successful!");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try again later.");
    }
};

exports.login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        // Authenticate user
        const user = await UserModel.authenticateUser(userEmail, userPassword);
        console.log(user);
        if (!user) {
            res.status(401).send("Invalid email or password.");
        } else {
            // Generate JWT tokens
            const accessToken = jwt.sign(
                { id: user.userID, email: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30m' }
            );

            const refreshToken = jwt.sign(
                { id: user.userID, email: user.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // We can store the refresh token in a database if needed
            // Here we assume we may store it later or use it as a cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });

            console.log(accessToken);
            //res.json({ accessToken });
            //res.status(200).send({token: accessToken, userName: user.name});
            res.status(200).json({token: accessToken, userName: user.name});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try again later.");
    }
};