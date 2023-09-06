
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('./schemas/user.schema');

const jwtService = require('../services/jwt.service');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // TODO move all this user stuff to a service.
        
        // Check if the user already exists
        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username: username,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        const token = jwtService.generateToken({ userId: newUser._id, username: newUser.username });

        return res.json({ message: 'Registration successful', token });

    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
    const user = req.user;

    const token = jwtService.generateToken({ userId: user._id, username: user.username });

    res.json({ message: 'Login successful', token });
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful' });
});

module.exports = router;
