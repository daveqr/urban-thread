
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwtService = require('../services/jwt.service');
const { validationResult, check } = require('express-validator');

const User = require('../schemas/user.schema');
const logger = require('../utils/logger');

const isEmailUnique = async (value, { req }) => {
    const userExists = await User.countDocuments({ email: value }) > 0;
    if (userExists) {
        const errorMsg = req.i18n.__('User %s already exists', value);
        throw new Error(errorMsg);
    }
    return true;
};

// Create
router.post('/', [
    check('email').isEmail()
        .custom((value, { req }) => isEmailUnique(value, { req }))
        .normalizeEmail(),
    check('password').isLength({ min: 6 }),
    check('fname').isLength({ min: 2 }),
    check('lname').isLength({ min: 2 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, fname, lname } = req.body;

        // TODO move all this user stuff to a service.
        // Create a new user
        const newUser = new User({
            email: email,
            password: await bcrypt.hash(password, 10),
            fname: fname,
            lname: lname,
        });

        // Save the user to the database
        await newUser.save();
        // End move user stuff

        const token = jwtService.generateToken({ userId: newUser._id, username: newUser.email });

        // TODO move this email stuff somewhere else
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'trycia45@ethereal.email',
                pass: 'kFvGmXXPfvFN5tAdGb'
            }
        });

        const mailOptions = {
            from: 'trycia45@ethereal.email',
            to: 'test@example.com',
            subject: 'Test Email',
            text: 'Account created.',
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error(error);
            } else {
                logger.debug('Email sent: ' + info.response);
            }
        });
        // end email stuff

        return res.json({ message: req.i18n.__('Registration successful'), token });

    } catch (err) {
        // TODO use middleware to handle this
        return res.status(500).json({ error: req.i18n.__('Internal server error') });
    }
});

// Get user
// router.get('/users/:id', (req, res) => {

// Update user
// router.put('/users/:id', (req, res) => {

// Delete user
// router.delete('/users/:id', (req, res) => {

module.exports = router;
