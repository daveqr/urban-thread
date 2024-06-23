import {Product} from "../../core/models/product.model";
import {inject, injectable} from "tsyringe";
import {ProductService} from "../../core/services/product.service";

export interface ProductUseCase {
    findAllProducts(): Promise<Product[]>;

    findProductByUuid(uuid: string): Promise<Product | null>;

    findFullProductById(productId: string): Promise<Product | null>;

    findBasicProductById(productId: string): Promise<Product | null>;
}

@injectable()
class ProductUseCaseImpl implements ProductUseCase {

    constructor(
        @inject('ProductService') private productService: ProductService) {
    }

    async findAllProducts() {
        return await this.productService.findAllProducts();
    }

    async findProductByUuid(uuid: string): Promise<Product | null> {
        return await this.productService.findProductByUuid(uuid);
    }

    async findFullProductById(productId: string) {
        return await this.findProductByUuid(productId);
    }

    async findBasicProductById(productId: string) {
        return await this.findProductByUuid(productId);
    }
}

export default ProductUseCaseImpl;
