
const express = require('express');
const router = express.Router();
require('../schemas/edition.schema');
const CategoryService = require('../services/category.service');

router.use((req, res, next) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

/**
 * GET request handler for retrieving categories.
 * 
 * This route allows you to retrieve a list of categories, with the option
 * to request fully populated categories (with 'edition' data) or simplified
 * categories by specifying the 'detailed' query parameter in the URL.
 *  
 * @route GET /categories
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * 
 * @queryparam {boolean} detailed - Optional. Set to 'true' to retrieve the detailed categories.
 *                             Omit or set to 'false' (default) to retrieve basic categories.
 * 
 * @returns {Promise<void>} A promise indicating the completion of the request handling.
 * @throws {Error} If there's an issue with fetching the categories.
 */
router.get('/', async (req, res) => {
    try {
        const { isDetailed } = req.query;

        const categories = await CategoryService.getAllCategories(isDetailed);

        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories: ' + error.message, error });
    }
});

/**
 * GET request handler for retrieving a cateogry by its ID.
 * 
 * @route GET /categories/:id
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {Promise<void>} A promise indicating the completion of the request handling.
 * @throws {Error} If there's an issue with fetching the category.
 */
router.get('/:id', async (req, res) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category: ' + error.message, error });
    }
});

module.exports = router;
