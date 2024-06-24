import express from 'express';
import CategoryController from './category.controller';
import {container} from "tsyringe";

const router = express.Router();
const categoryController = container.resolve("CategoryController") as CategoryController;

router.get('/', categoryController.getAllCategories.bind(categoryController));
router.get('/highlighted', categoryController.getHighlightedCategories.bind(categoryController));
router.get('/:id', categoryController.getCategoryById.bind(categoryController));

export default router;
