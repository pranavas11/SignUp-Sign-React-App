const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.sendStatus(403);

            // We could verify the user exists in the database here if needed
            const user = await UserModel.findByEmail(decoded.email);

            // 403 forbidden — you don't have permission to access this resource
            if (!user || user.length === 0) return res.sendStatus(403);

            const accessToken = jwt.sign(
                { id: decoded.id, email: decoded.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30m' }
            );

            res.json({ accessToken });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error. Please try again later.");
    }
};