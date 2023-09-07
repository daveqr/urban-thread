
const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwtService = require('../services/jwt.service');

const logger = require('../utils/logger');

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
    const user = req.user;
    const token = jwtService.generateToken({ userId: user._id, username: user.username });

    logger.debug(`User ${user.email} logged in.`);
    res.json({ message: req.i18n.__('Login successful'), token });
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful' });
});

module.exports = router;
