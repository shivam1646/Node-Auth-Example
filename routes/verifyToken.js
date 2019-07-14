const jwt = require('jsonwebtoken');

// middleware to restricts access to users not having token/invalid token.
const authenticate = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('Access Denied!!');
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch {
        res.status(400).send('Invalid token');
    }
}

module.exports = authenticate;