import express from 'express';
import nodemailer from 'nodemailer';
import {check, CustomValidator, validationResult} from 'express-validator';

import {generateToken} from '../utils/jwt.util'
import {LanguageRequest} from '..';
import {AppDataSource} from "../data-source";
import UserServiceImpl from "../core/users/user.service.impl";
import TypeORMUserRepository from "../infrastructure/data/typeorm/user.repository.typeorm";
import UserUseCase from "../application/usecases/user.usecase";
import User from "../core/models/user.model";

const router = express.Router();

const userRepository = new TypeORMUserRepository(AppDataSource);
const userService = new UserServiceImpl(AppDataSource, userRepository);
const userUseCase = new UserUseCase(AppDataSource, userService);

const isEmailUniqueCustomValidator: CustomValidator = async (value, {req}) => {
    // TODO need userExists
    // const exists = await UserModel.userExists(value);
    const exists = false;
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
        check('password').isLength({min: 6}),
        check('fname').isLength({min: 2}),
        check('lname').isLength({min: 2}),
    ], async (req: LanguageRequest, res: any) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            const {email, password, fname, lname} = req.body;

            const user = new User();
            user.email = email;
            user.password = password;
            user.fname = fname;
            user.lname = lname;
            await userUseCase.save(user);

            const tempUser = {
                id: "123",
                email: "test@example.com"
            }
            const token = generateToken({userId: tempUser.id, username: tempUser.email});

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

            return res.json({message: req.i18n.__('Registration successful'), newUser: tempUser, token});

        } catch (err) {
            // TODO use middleware to handle this
            return res.status(500).json({error: req.i18n.__('Internal server error')});
        }
    });

// Get user
// router.get('/users/:id', (req, res) => {

// Update user
// router.put('/users/:id', (req, res) => {

// Delete user
// router.delete('/users/:id', (req, res) => {

module.exports = router;
