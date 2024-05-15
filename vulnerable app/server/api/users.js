const { users } = require('./register');
const User = require('../models/User');

const createUser = async (req, res) => {
    const { username, password, role } = req.body;

    if (!isStrongPassword(password))
        return res.status(400).json({ message: 'Password does not meet strength requirements' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(username, hashedPassword, role);
        users.push(user);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error registering user' });
    }
}

const getAllUsers = async (req, res) => {
    res.status(200).json({ users: users });
}

module.exports = { createUser, getAllUsers }