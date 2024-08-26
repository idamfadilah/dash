const dayjs = require('dayjs');
const fs = require('fs');
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const SECRET_KEY = 'It was secret, but now it is not.';

const users = {
    "users": [
        {
            "id": "cc960e84-2dbe-4a27-8eb5-edf2e478ef18",
            "name": "John Doe",
            "email": ""
        },
        {
            "id": "1966daa0-38d3-46a6-9a47-65d805bf2ffd",
            "name": "Jane Doe",
            "email": ""
        }
    ]
}

function verifyToken(req, res, next) {
    var token = req.cookies.secureCookie
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token.replaceAll('"', ''), SECRET_KEY, function (err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: err });
        }
        next();
    });
}



router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        const dataToSecure = {
            dataToSecure: "This is the secret data in the cookie.",
        };
        const token = jwt.sign(dataToSecure, SECRET_KEY);
        res.cookie("secureCookie", JSON.stringify(token), {
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true,
            expires: dayjs().add(30, "days").toDate(),
        });
        res.status(200).json({ token: token });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
})

// Get all users
router.get('/users', verifyToken, (req, res) => {
    res.json(users);
});

// Get a specific user by ID
router.get('/users/:id', verifyToken, (req, res) => {
    const userId = req.params.id;
    const user = users.users.find(user => user.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Create a new user
router.post('/users', verifyToken, (req, res) => {
    const newUser = req.body;
    newUser.id = uuid.v4();
    users.users.push(newUser);
    res.json(newUser);
});

// Update an existing user
router.put('/users/:id', verifyToken, (req, res) => {
    const userId = req.params.id;
    const index = users.users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users.users[index] = req.body;
        res.json(users.users[index]);
    }
});

// Delete a user
router.delete('/users/:id', verifyToken, (req, res) => {
    const userId = req.params.id;
    const index = users.users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users.users.splice(index, 1);
        res.json({ message: 'User deleted' });
    }
});


// Logout
router.post('/logout', verifyToken, (req, res) => {
    res.clearCookie('secureCookie');
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;