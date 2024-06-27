import express from 'express';
import {container} from "tsyringe";
import UserController from "./user.controller";

const router = express.Router();
const userController = container.resolve("UserController") as UserController;

router.get('/', async (req, res) => {
    await userController.findById(req, res);
});

export default router;
