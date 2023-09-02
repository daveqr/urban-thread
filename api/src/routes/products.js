const express = require('express');
const router = express.Router();
const Product = require('../schemas/product.schema');
const Category = require('../schemas/category.schema');

/**
 * Fetch all products.
 * @route GET /product
 * @returns {Object} An array of all products.
 * @throws {Object} If an error occurs, an object with an 'error' field will be returned.
 *                  The 'error' field contains an error message indicating the failure to 
 *                  fetch products.
 */
router.get('/', async (req, res) => {
    // TODO need to do something about this method. Can't be returning all the products.
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

/**
 * Fetch a product by id.
 * @route GET /product/:id
 * @returns {Object} The product object with HATEOAS links.
 * @throws {Object} If an error occurs, an object with an 'error' field will be returned.
 *                  The 'error' field contains an error message indicating the failure to
 *                  fetch the product.
 * 
 * @example <caption>Success response.</caption>
 * // TODO need to update this with transformed response
 * {
 *   "data": {
 *     "_id": "64ef325035a7060656be182c",
 *     "name": "Chair",
 *     "description": "New range of formal shirts are designed keeping you in mind.",
 *     "price": 454,
 *     "color": "orange",
 *     "__v": 0
 *   },
 *   "links": [
 *     {
 *       "rel": "self",
 *       "href": "/products/1"
 *     },
 *     {
 *       "rel": "category",
 *       "href": "/categories/1",
 *       "name": "Category 1"
 *     },
 *     {
 *       "rel": "category",
 *       "href": "/categories/2",
 *       "name": "Category 2"
 *     }
 *   ]
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
        const product = await Product.findById(productId);

        // TODO need to transform product to simplified product

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // TODO replace this with a simple call to the Category (return stripped down category)
        // const categories = await Category.find({ _id: { $in: product.categoryIds } });
        const categories = await findProductCategories(product);
        const categoryLinks = createCategoryLinks(categories);
        const productLinks = createProductLinks(req, productId, categoryLinks);

        res.json({ data: product, links: productLinks });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching product: ' + error.message, error });
    }
});

function createCategoryLinks(categories) {
    return categories.map(category => ({
        rel: 'category',
        href: `/categories/${category.id}`,
        name: category.name,
    }));
}

function createProductLinks(req, productId, categoryLinks) {
    const selfLink = {
        rel: 'self',
        href: `${req.baseUrl}/${productId}`,
    };

    return [selfLink].concat(categoryLinks);
}

async function findProductCategories(produdct) {
    // TODO get the categories from the db
    // TODO need to find stripped down versions of the categories. only return id and name
    // return await Category.find({ _id: { $in: product.categoryIds } });
    return [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' }
    ]
}

module.exports = router;
