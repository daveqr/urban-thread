const express = require('express');
const router = express.Router();
const Category = require('../schemas/category.schema');
require('../schemas/edition.schema');
const BasicCategoryTransformer = require('../transformers/category.basic.transformer');
const CategoryTransformer = require('../transformers/category.detailed.transformer');

/**
 * GET request handler for retrieving categories.
 * 
 * This route allows you to retrieve a list of categories, with the option
 * to request fully populated categories (with 'edition' data) or simplified
 * categories by specifying the 'full' query parameter in the URL.
 *  
 * @route GET /categories
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * 
 * @queryparam {boolean} full - Optional. Set to 'true' to retrieve fully populated categories.
 *                             Omit or set to 'false' (default) to retrieve simplified categories.
 * 
 * @returns {Promise<void>} A promise indicating the completion of the request handling.
 * @throws {Error} If there's an issue with fetching the categories.
 */
router.get('/', async (req, res) => {
    try {
        // full argument means to return the list of categories fully populated (ie not simplified)
        // TODO replace with accept header
        // Accept: application/hal+json, application/vnd.custom-extended-resource+json
        const { full } = req.query;
        const categories = await Category.find().populate('edition');

        if (full) {
            res.json(categories);
        } else {
            // return simplified categories by default
            const simplifiedData = categories.map(category => BasicCategoryTransformer.transform(category));
            res.json(simplifiedData);
        }
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
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId)
            .populate('edition')
            .populate('products');

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
