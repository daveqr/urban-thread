import CategoryService from "../onion/application/services/category.service";
import MongoDBCategoryRepository from "../onion/infrastructure/dataAccess/mongo/MongoDBCategoryRepository";

const express = require('express');
const router = express.Router();
require('../schemas/edition.schema');

const categoryRepository = new MongoDBCategoryRepository();
const categoryService = new CategoryService(categoryRepository);

router.use((req: any, res: any, next: any) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/', async (req: any, res: any) => {
    try {
        const {isDetailed} = req.query;

        const categories = await categoryService.findAllCategories(isDetailed);

        res.json(categories);
    } catch (error: any) {
        res.status(500).json({message: 'Error fetching categories: ' + error.message, error});
    }
});

router.get('/:id', async (req: any, res: any) => {
    try {
        const category = await categoryService.findCategoryById(req.params.id);

        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }

        res.json(category);
    } catch (error: any) {
        res.status(500).json({message: 'Error fetching category: ' + error.message, error});
    }
});

module.exports = router;
