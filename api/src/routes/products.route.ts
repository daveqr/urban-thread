
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
const router = express.Router();
import ProductService from '../services/product.service';

router.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/', async (req: Request, res: Response) => {
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
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const basic = req.query.basic

        const isBasic = basic === 't';

        const transformedProduct = isBasic ?
            await ProductService.getBasicProductById(productId) :
            await ProductService.getFullProductById(productId);

        if (!transformedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(transformedProduct);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching product: ' + error.message, error });
    }
});

module.exports = router;
