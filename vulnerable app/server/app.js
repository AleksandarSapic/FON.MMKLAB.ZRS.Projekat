require('dotenv').config();

const express = require('express');

const { register } = require('./api/register');
const login = require('./api/login');
const imageUpload = require('./api/imageUpload');
const { getAllUsers, createUser } = require('./api/users');

const authentication = require('./middleware/authentication');
const serverRateLimiter = require('./middleware/serverRateLimiter');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(serverRateLimiter);
app.use('/api/images/upload', authentication);
app.use('/api/users', authentication);

app.post('/api/register', register);
app.post('/api/login', login);
app.post('/api/images/upload', imageUpload);
app.post('/api/users', createUser);
app.get('/api/users', getAllUsers);

app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});