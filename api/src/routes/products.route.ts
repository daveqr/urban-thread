import express, {NextFunction, Request, Response} from 'express';
import ProductUseCase from '../onion/application/usecases/product.usecase';
import MongoDBProductRepository from '../onion/infrastructure/data/mongo/MongoDBProductRepository';
import SQLiteCategoryRepository from "../onion/infrastructure/data/sqllite/SQLiteCategoryRepository"; // Import MongoDBProductRepository

const router = express.Router();
const productRepository = new MongoDBProductRepository();
// const categoryRepository = new MongoDBCategoryRepository();
const categoryRepository = new SQLiteCategoryRepository();
const productService = new ProductUseCase(productRepository, categoryRepository);

router.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const transformedProducts = await productService.getAllProducts();

        res.json(transformedProducts);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch products'});
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const basic = req.query.basic

        const isBasic = basic === 't';

        const transformedProduct = isBasic ?
            await productService.getBasicProductById(productId) :
            await productService.getFullProductById(productId);

        if (!transformedProduct) {
            return res.status(404).json({message: 'Product not found'});
        }

        res.json(transformedProduct);
    } catch (error: any) {
        res.status(500).json({message: 'Error fetching product: ' + error.message, error});
    }
});

module.exports = router;
