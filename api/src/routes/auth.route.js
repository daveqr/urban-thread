
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    User.findOne({ username: username }, (err, existingUser) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            username: username,
            password: password,
        });

        // Save the user to the database
        newUser.save((err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving user' });
            }

            // Log the user in after registration
            req.login(newUser, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error logging in after registration' });
                }
                return res.json({ message: 'Registration successful', user: newUser });
            });
        });
    });
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful' });
});

module.exports = router;
