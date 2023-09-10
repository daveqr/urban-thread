const express = require('express');
const router = express.Router();
require('../schemas/edition.schema');
import CategoryService from '../services/category.service';

router.use((req: any, res: any, next: any) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/', async (req: any, res: any) => {
    try {
        const { isDetailed } = req.query;

        const categories = await CategoryService.getAllCategories(isDetailed);

        res.json(categories);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching categories: ' + error.message, error });
    }
});

router.get('/:id', async (req: any, res: any) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching category: ' + error.message, error });
    }
});

module.exports = router;
