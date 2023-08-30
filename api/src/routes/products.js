const express = require('express');
const router = express.Router();
const Product = require('../schemas/product.schema');

/**
 * GET route handler for fetching products.
 * @route GET /product
 * @returns {Object} An object containing products fetched from the database.
 * @throws {Object} If an error occurs, an object with an 'error' field will be returned.
 *                 The 'error' field contains an error message indicating the failure to fetch products.
 */
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const data = product;
        // const data = CategoryTransformer.transform(category);

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product: ' + error.message, error });
    }
});

module.exports = router;
