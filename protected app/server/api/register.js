const User = require('../models/User');
const bcrypt = require('bcrypt');

const users = [new User('admin', '$2b$10$ZGkXTeQtbgdb/HVTtcrqC.YpjNQfdXTKUdrw1DMRi5nBizjCVD6Wa', 'admin')];

const isStrongPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!isStrongPassword(password))
        return res.status(400).json({ message: 'Password does not meet strength requirements' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(username, hashedPassword, 'user');
        users.push(user);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error registering user' });
    }
}

module.exports = { users, register };