import {Request, Response} from 'express';
import nodemailer from 'nodemailer';
import {validationResult} from 'express-validator';
import {generateToken} from '../../utils/jwt.util';
import UserUseCase from "../../application/usecases/user.usecase";
import User from "../../core/models/user.model";
import {inject, injectable} from "tsyringe";

@injectable()
export default class UserController {

    constructor(@inject('UserUseCase') private userUseCase: UserUseCase) {
    }

    async createUser(req: Request, res: Response) {
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

            await this.userUseCase.save(user);

            const tempUser = {
                id: "123",
                email: "test@example.com"
            };
            const token = generateToken({userId: tempUser.id, username: tempUser.email});

            // Sending email (TODO: Move this to a service or utility function)
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
                // TODO: Handle email sending error
                // if (error) {
                //     logger.error(error);
                // } else {
                //     logger.debug('Email sent: ' + info.response);
                // }
            });
            // End email stuff

            return res.json({message: ('Registration successful'), newUser: tempUser, token});

        } catch (err) {
            // TODO: Use middleware to handle this
            return res.status(500).json({error: ('Internal server error')});
        }
    }
}
