import {Request, Response} from 'express';
import ProductUseCase from '../../application/usecases/product.usecase';
import {inject, injectable} from "tsyringe";

@injectable()
export default class ProductController {

    constructor(@inject('ProductUseCase') private productUseCase: ProductUseCase) {
    }

    async findAllProducts(request: Request, response: Response) {
        try {
            const products = await this.productUseCase.findAllProducts();
            response.json(products);
        } catch (error) {
            response.status(500).json({error: 'Failed to fetch products'});
        }
    }

    async getProductById(request: Request, response: Response) {
        try {
            const productId = request.params.id;
            const basic = request.query.basic;

            const isBasic = basic === 't';
            const transformedProduct = isBasic
                ? await this.productUseCase.findBasicProductById(productId)
                : await this.productUseCase.findFullProductById(productId);

            if (!transformedProduct) {
                return response.status(404).json({message: 'Product not found'});
            }

            response.json(transformedProduct);
        } catch (error: any) {
            response.status(500).json({message: 'Error fetching product: ' + error.message, error});
        }
    }
}
