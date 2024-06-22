import express from 'express';
import UserController from './user.controller';
import UserUseCase from "../../application/usecases/user.usecase";
import TypeORMUserRepository from "../../infrastructure/data/typeorm/user.repository.typeorm";
import {AppDataSource} from "../../data-source";
import {check} from "express-validator";
import {LanguageRequest} from "../../index";
import UserServiceImpl from "../../core/users/user.service.impl";

const router = express.Router();
const userRepository = new TypeORMUserRepository(AppDataSource);
const userService = new UserServiceImpl(AppDataSource, userRepository);
const userUseCase = new UserUseCase(AppDataSource, userService);
const userController = new UserController(userUseCase);

router.use((req, res, next) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

// Create user route
router.post('/', [
    check('email').isEmail()
        .custom(async (value, {req}) => {
            // TODO: Implement userExists check
            const exists = false;
            if (exists) {
                const errorMsg = req.i18n.__('User %s already exists', value);
                throw new Error(errorMsg);
            }
            return true;
        })
        .normalizeEmail(),
    check('password').isLength({min: 6}),
    check('fname').isLength({min: 2}),
    check('lname').isLength({min: 2}),
], async (req: LanguageRequest, res: any) => {
    await userController.createUser(req, res);
});

export default router;
