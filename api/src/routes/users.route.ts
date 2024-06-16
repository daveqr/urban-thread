import express from 'express';
import nodemailer from 'nodemailer';
import {check, CustomValidator, validationResult} from 'express-validator';

import {generateToken} from '../utils/jwt.util'
import {LanguageRequest} from '..';
import {AppDataSource} from "../data-source";
import UserService from "../core/services/user.service";
import SQLiteUserRepository from "../infrastructure/data/sqllite/user.repository.sqlite";
import UserUseCase from "../application/usecases/user.usecase";
import UserDto from "../application/dtos/user.dto";

const router = express.Router();

const userRepository = new SQLiteUserRepository(AppDataSource);
const userService = new UserService(AppDataSource, userRepository);
const userUseCase = new UserUseCase(AppDataSource, userRepository, userService);

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

            const userDto = new UserDto();
            userDto.email = email;
            userDto.password = password;
            userDto.fname = fname;
            userDto.lname = lname;
            await userUseCase.save(userDto);

            const user = {
                id: "123",
                email: "test@example.com"
            }
            const token = generateToken({userId: user.id, username: user.email});

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

            return res.json({message: req.i18n.__('Registration successful'), newUser: user, token});

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
