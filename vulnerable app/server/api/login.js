require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users } = require('./register');

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    const user = users.find(user => user.username === req.body.username);

    if (user == null)
        return res.status(400).json({ message: 'Invalid username or password' });

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET);
            res.json({ accessToken: accessToken });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch {
        res.status(500).json({ message: 'Error logging in' });
    }
}

module.exports = login;