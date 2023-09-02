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
 * // TODO update this doc
 * {
 *   "_embedded":{
 *      "categoryList":[
 *         {
 *            "name":"Category 1",
 *            "_links":{
 *               "self":{
 *                  "href":"/categories/1"
 *               }
 *            }
 *         },
 *         {
 *            "name":"Category 2",
 *            "_links":{
 *               "self":{
 *                  "href":"/categories/2"
 *               }
 *            }
 *         },
 *         {
 *            "name":"Category 3",
 *            "_links":{
 *               "self":{
 *                  "href":"/categories/3"
 *               }
 *            }
 *         }
 *      ]
 *   },
 *   "_links":{
 *      "self":{
 *         "href":"/products/64ef325035a7060656be182c"
 *      }
 *   }
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

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const categories = await findProductCategories();
        const categoryLinks = createCategoryLinks(categories);
        const transformedProduct = createTransformedProduct(product, categoryLinks, req.baseUrl);

        res.setHeader('Content-Type', 'application/hal+json');
        res.json(transformedProduct);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching product: ' + error.message, error });
    }
});

function createTransformedProduct(product, categoryLinks, baseUrl) {
    // TODO need to add the rest of the product fields
    // TODO need to extract this transformer to the ProductTransformer
    const embeddedCategories = {
        categoryList: mapCategoriesToEmbedded(categoryLinks),
    };

    const selfLink = {
        self: {
            href: `${baseUrl}/${product._id}`,
        },
    };

    return {
        _embedded: embeddedCategories,
        name: product.name,
        description: product.description,
        price: product.price,
        color: product.color,
        _links: selfLink,
    };
}

function mapCategoriesToEmbedded(categories) {
    return categories.map(category => ({
        categoryId: category.id,
        name: category.name,
        _links: {
            self: {
                href: category.href,
            },
        },
    }));
}

function createCategoryLinks(categories) {
    return categories.map(category => ({
        rel: 'category',
        href: `/categories/${category.id}`,
        name: category.name,
    }));
}



// TODO remove this method once I get the
//  await Category.find({ _id: { $in: product.categoryIds } });
// working
async function findProductCategories() {
    return [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' }
    ]
}

module.exports = router;
