const dayjs = require('dayjs');
const fs = require('fs');
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'It was secret, but now it is not.';

const users = {
    "users": [
        {
            "id": "1",
            "name": "John Doe",
            "email": ""
        },
        {
            "id": "2",
            "name": "Jane Doe",
            "email": ""
        }
    ]
}


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
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
    }
    res.status(401).json({ error: 'Unauthorized' });
})

// Get all users
router.get('/users', (req, res) => {
    console.log(req.cookies.secureCookie);
    try{
        const cookie = jwt.verify(req.cookies.secureCookie.replaceAll('"',''), SECRET_KEY);
        console.log(cookie);
        if (cookie) {
            res.json(users);
        }
    }catch(err){
        console.log(err);
    }
    res.status(401).json({ error: 'Unauthorized' });
});

// Get a specific user by ID
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const cookie = jwt.verify(req.cookies.secureCookie.replaceAll('"',''), SECRET_KEY);
    if (cookie) {
        const user = users.users.find(user => user.id === userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }

    res.status(401).json({ error: 'Unauthorized' });
});

// Create a new user
router.post('/users', (req, res) => {
    const newUser = req.body;
    const cookie = jwt.verify(req.cookies.secureCookie.replaceAll('"',''), SECRET_KEY);
    if (cookie) {
        users.users.push(newUser);
        res.json(newUser);
    }
    res.status(401).json({ error: 'Unauthorized' });
});

// Update an existing user
router.put('/users/:id', (req, res) => {
    const cookie = jwt.verify(req.cookies.secureCookie.replaceAll('"',''), SECRET_KEY);
    if (cookie) {
        const userId = req.params.id;
        const index = users.users.findIndex(user => user.id === userId);
        if (index !== -1) {
            users.users[index] = req.body;
            res.json(users.users[index]);
        }
    }
    res.status(401).json({ error: 'Unauthorized' });
});

// Delete a user
router.delete('/users/:id', (req, res) => {

    const cookie = jwt.verify(req.cookies.secureCookie.replaceAll('"',''), SECRET_KEY);
    if (cookie) {
        const userId = req.params.id;
        const index = users.users.findIndex(user => user.id === userId);
        if (index !== -1) {
            users.users.splice(index, 1);
            res.json({ message: 'User deleted' });
        }
    }
    res.status(401).json({ error: 'Unauthorized' });
});


// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('secureCookie');
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;