import express from 'express';
import UserController from './user.controller';
import {container} from "tsyringe";

const router = express.Router();
const userController = container.resolve("UserController") as UserController;

router.use((req, res, next) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/:id', userController.findUser.bind(userController));

export default router;
