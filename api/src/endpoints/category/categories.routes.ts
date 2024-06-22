import express from 'express';
import CategoryController from './category.controller';
import {container} from "tsyringe";

const router = express.Router();
const categoryController = container.resolve("CategoryController") as CategoryController;

router.use((req: any, res: any, next: any) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/', categoryController.getAllCategories.bind(categoryController));
router.get('/highlighted', categoryController.getHighlightedCategories.bind(categoryController));
router.get('/:id', categoryController.getCategoryById.bind(categoryController));

export default router;
d9604da2 - cdc3 - 4434 - ac1c - b50cab3d8d65