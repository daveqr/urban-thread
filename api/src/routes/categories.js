const express = require('express');
const router = express.Router();
const Category = require('../models/category');
require('../models/edition');
const SimplifiedCategoryTransformer = require('../transformers/simplifiedCategory.transformer');
const CategoryTransformer = require('../transformers/category.transformer');

/**
 * GET request handler for retrieving categories.
 * @route GET /categories
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {Promise<void>} A promise indicating the completion of the request handling.
 */
router.get('/', async (req, res) => {
    try {
        // full argument means to return the list of categories fully populated (ie not simplified)
        const { full } = req.query;
        const categories = await Category.find().populate('edition');

        if (full) {
            res.json(categories);
        } else {
            // return simplified categories by default
            const simplifiedData = categories.map(category => SimplifiedCategoryTransformer.transform(category));
            res.json(simplifiedData);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories: ' + error.message, error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId).populate('edition');

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const data = CategoryTransformer.transform(category);

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category: ' + error.message, error });
    }
});

module.exports = router;
