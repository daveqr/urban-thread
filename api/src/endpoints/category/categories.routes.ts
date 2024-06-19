import express from 'express';
import {AppDataSource} from "../../data-source";
import TypeORMCategoryRepository from "../../infrastructure/data/typeorm/category.repository.typeorm";
import CategoryServiceImpl from "../../core/categories/category.service.impl";
import CategoryUseCase from "../../application/usecases/category.usecase";
import CategoryController from './category.controller';

const router = express.Router();

const categoryRepository = new TypeORMCategoryRepository(AppDataSource);
const categoryService = new CategoryServiceImpl(categoryRepository);
const categoryUseCase = new CategoryUseCase(categoryRepository, categoryService);
const categoryController = new CategoryController(categoryUseCase);

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
