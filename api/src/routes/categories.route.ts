import CategoryUseCase from "../onion/application/usecases/category.usecase";
import {CategoryTransformer} from "../transformers/category.transformer";
import CategoryService from "../onion/domain/services/category.service";
import SQLiteCategoryRepository from "../onion/infrastructure/data/sqllite/category.repository.sqlite";

import express from 'express';

const router = express.Router();
require('../schemas/edition.schema');

const categoryRepository = new SQLiteCategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryUseCase = new CategoryUseCase(categoryRepository, categoryService);

router.use((req: any, res: any, next: any) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/', async (req: any, res: any) => {
    try {
        const isDetailed = req.query.detailed === 'true';
        const categories = await categoryUseCase.findAllCategories(isDetailed);
        const transformedCategories = categories.map(CategoryTransformer.transform);
        res.json(transformedCategories);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch categories'});
    }
});

router.get('/:id', async (req: any, res: any) => {
    try {
        const category = await categoryUseCase.findCategoryById(req.params.id);

        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }

        res.json(category);
    } catch (error: any) {
        res.status(500).json({message: 'Error fetching category: ' + error.message, error});
    }
});

module.exports = router;
