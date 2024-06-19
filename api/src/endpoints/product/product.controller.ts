import {Request, Response} from 'express';
import ProductUseCase from '../../application/usecases/product.usecase';

export default class ProductController {
    private productUseCase: ProductUseCase;

    constructor(productUseCase: ProductUseCase) {
        this.productUseCase = productUseCase;
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await this.productUseCase.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({error: 'Failed to fetch products'});
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const productId = req.params.id;
            const basic = req.query.basic;

            const isBasic = basic === 't';
            const transformedProduct = isBasic
                ? await this.productUseCase.getBasicProductById(productId)
                : await this.productUseCase.getFullProductById(productId);

            if (!transformedProduct) {
                return res.status(404).json({message: 'Product not found'});
            }

            res.json(transformedProduct);
        } catch (error: any) {
            res.status(500).json({message: 'Error fetching product: ' + error.message, error});
        }
    }
}
