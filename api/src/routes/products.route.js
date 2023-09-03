
const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product.model');
const ProductService = require('../services/product.service');

router.use((req, res, next) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

/**
 * Fetch all products.
 * 
 * @route GET /product
 * @returns {Object} An array of all products.
 * @throws {Object} If an error occurs, an object with an 'error' field will be returned.
 *                  The 'error' field contains an error message indicating the failure to 
 *                  fetch products.
 */
router.get('/', async (req, res) => {
    try {
        const transformedProducts = await ProductService.getAllProducts();

        res.json(transformedProducts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

/**
 * Fetch a product by id.
 * 
 * @route GET /product/:id
 * @returns {Object} The product object with HATEOAS links.
 * @throws {Object} If an error occurs, an object with an 'error' field will be returned.
 *                  The 'error' field contains an error message indicating the failure to
 *                  fetch the product.
 * 
 * @example <caption>Success response.</caption>
 *
 * {
 *    "_embedded":{
 *       "categoryList":[
 *          {
 *             "name":"Category 1",
 *             "_links":{
 *                "self":{
 *                   "href":"/categories/1"
 *                }
 *             }
 *          },
 *          {
 *             "name":"Category 2",
 *             "_links":{
 *                "self":{
 *                   "href":"/categories/2"
 *                }
 *             }
 *          }
 *       ]
 *    },
 *    "id":"1",
 *    "name":"Chair",
 *    "description":"The description.",
 *    "price":454,
 *    "color":"orange",
 *    "_links":{
 *       "self":{
 *          "href":"/products/1"
 *       }
 *    }
 * }
 *
 * @example <caption>Error response.</caption>
 * {
 *   "error": "Error fetching product: 1"
 * }
 */
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const transformedProduct = await ProductService.getProductById(productId);

        if (!transformedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(transformedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product: ' + error.message, error });
    }
});

module.exports = router;
