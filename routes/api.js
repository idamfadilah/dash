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
        },
        {
            "id": "3a6e8e7d-3e4b-4e7f-9e8a-1a2b3c4d5e6f",
            "name": "Alice Smith",
            "email": ""
        },
        {
            "id": "4b5c6d7e-8f9a-1b2c-3d4e-5f6g7h8i9j0k",
            "name": "Bob Johnson",
            "email": ""
        },
        {
            "id": "1a2b3c4d-5e6f-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Sarah Williams",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "Michael Brown",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Emily Davis",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "Daniel Wilson",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Olivia Martinez",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "James Anderson",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Sophia Taylor",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "David Thomas",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Isabella Hernandez",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "Joseph Clark",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Mia Lewis",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "Andrew Lee",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Abigail Walker",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "Christopher Hall",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Elizabeth Young",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "Matthew King",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Samantha Scott",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "William Green",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Victoria Adams",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "Daniel Rodriguez",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Emily Stewart",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "Christopher Turner",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Olivia Phillips",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "Matthew Campbell",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Emma Parker",
            "email": ""
        },
        {
            "id": "5g6h7i8j-9k0l-1m2n-3o4p-5q6r7s8t9u0",
            "name": "Andrew Evans",
            "email": ""
        },
        {
            "id": "a1b2c3d4-e5f6-7g8h-9i0j-a1b2c3d4e5f6",
            "name": "Ava Collins",
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = users.users.slice(startIndex, endIndex);
    const totalPages = Math.ceil(users.users.length / limit);

    const pagination = {
        page: page,
        limit: limit,
        totalItems: users.users.length,
        totalPages: totalPages,
        hasNextPage: endIndex < users.users.length,
        hasPreviousPage: startIndex > 0,
        nextPage: endIndex < users.users.length ? page + 1 : null,
        previousPage: startIndex > 0 ? page - 1 : null
    };

    res.json({ pagination: pagination, results: results });
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