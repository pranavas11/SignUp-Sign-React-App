const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log(req);
    // Get the token from the authorization header
    const authHeader = req.headers['authorization'];
    console.log("the authheader is: ", authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    //console.log("value of req.params and req.query are: ", req.params, req.query);
    console.log("the token is: ", token);

    // If no token is provided, return a 401 Unauthorized status
    if (token == null) return res.sendStatus(401);

    // Verify the token using the secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        else {
            // If valid, attach the decoded payload to the request object
            req.user = user;

            // Proceed to the next middleware/route handler
            next();
        }
    });
};

module.exports = verifyToken;