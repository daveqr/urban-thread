import express, {NextFunction, Request, Response} from 'express';
import ProductUseCase from '../onion/application/usecases/product.usecase';
import SQLiteCategoryRepository from "../onion/infrastructure/data/sqllite/category.repository.sqlite";
import SQLiteProductRepository from "../onion/infrastructure/data/sqllite/product.repository.sqlite";
import ProductService from "../onion/domain/services/product.service"; // Import MongoDBProductRepository

const router = express.Router();
const categoryRepository = new SQLiteCategoryRepository();
const productRepository = new SQLiteProductRepository();
const productService = new ProductService(productRepository);
const productUseCase = new ProductUseCase(productService, productRepository, categoryRepository);

router.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await productUseCase.getAllProducts();

        res.json(products);
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
            await productUseCase.getBasicProductById(productId) :
            await productUseCase.getFullProductById(productId);

        if (!transformedProduct) {
            return res.status(404).json({message: 'Product not found'});
        }

        res.json(transformedProduct);
    } catch (error: any) {
        res.status(500).json({message: 'Error fetching product: ' + error.message, error});
    }
});

module.exports = router;
