const express = require('express');
const router = express.Router();
const Category = require('../models/category');
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
        const { full } = req.query;
        const categories = await Category.find().populate('edition');

        if (full) {
            res.json(categories);
        } else {
            // return simplified categories by default
            const simplifiedData = categories.map(category => CategoryTransformer.transform(category));
            res.json(simplifiedData);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});

module.exports = router;
