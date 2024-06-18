import CategoryUseCase from "../application/usecases/category.usecase";
import CategoryService from "../core/services/category.service";
import TypeORMCategoryRepository from "../infrastructure/data/typeorm/category.repository.typeorm";

import express from 'express';
import {AppDataSource} from "../data-source";
import {CategoryResponseTransformer} from "./transformers/category.response.transformer";
import {HighlightedCategoryResponseTransformer} from "./transformers/highlighted-category.response.transformer";

const router = express.Router();

const categoryRepository = new TypeORMCategoryRepository(AppDataSource);
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
        const isDetailed = Boolean(req.query.detailed);

        let categories = await categoryUseCase.find(isDetailed);

        const transformedCategories = categories.map(CategoryResponseTransformer.transform);
        res.json(transformedCategories);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to fetch categories'});
    }
});

router.get('/highlighted', async (req: any, res: any) => {
    try {
        let categories = await categoryUseCase.findHighlightedCategories()

        const transformedCategories = categories.map(HighlightedCategoryResponseTransformer.transform);

        console.log(transformedCategories);

        res.json(transformedCategories);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to fetch categories'});
    }
});

router.get('/:id', async (req: any, res: any) => {
    try {
        let uuid = req.params.id;
        const category = await categoryUseCase.findByUuid(uuid);

        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }

        res.json(category);
    } catch (error: any) {
        res.status(500).json({message: 'Error fetching category: ' + error.message, error});
    }
});

module.exports = router;
