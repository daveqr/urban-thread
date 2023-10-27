import express, { Request, Response } from 'express';
const router = express.Router();
import nodemailer from 'nodemailer';
import { validationResult, check, CustomValidator } from 'express-validator';

import { generateToken } from '../services/jwt.service'
import UserModel from '../models/user.model';
import { LanguageRequest } from '..';

const isEmailUniqueCustomValidator: CustomValidator = async (value, { req }) => {
    const exists = await UserModel.userExists(value);
    if (exists) {
        const errorMsg = req.i18n.__('User %s already exists', value);
        throw new Error(errorMsg);
    }
    return true;
};

// Create
router.post('/',
    [
        check('email').isEmail()
            .custom(isEmailUniqueCustomValidator)
            .normalizeEmail(),
        check('password').isLength({ min: 6 }),
        check('fname').isLength({ min: 2 }),
        check('lname').isLength({ min: 2 }),
    ], async (req: LanguageRequest, res: any) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password, fname, lname } = req.body;

            // TODO move all this user stuff to a service.
            // Create a new user
            const user = await UserModel.createUser({
                email: email,
                password: password,
                fname: fname,
                lname: lname,
            });
            // End move user stuff

            const token = generateToken({ userId: user.id, username: user.email });

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
                // TODO log error
                // if (error) {
                //     logger.error(error);
                // } else {
                //     logger.debug('Email sent: ' + info.response);
                // }
            });
            // end email stuff

            return res.json({ message: req.i18n.__('Registration successful'), newUser: user, token });

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
