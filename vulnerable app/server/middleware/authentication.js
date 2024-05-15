require('dotenv').config();
const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const token = req.get('Authorization');

    if (token == null)
        return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ message: 'Invalid token' });

        req.user = user;
        next();
    });
};

module.exports = authentication;