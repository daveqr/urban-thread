import ProductService from "../../core/products/product.service";
import {Product} from "../../core/models/product.model";
import {inject, injectable} from "tsyringe";

@injectable()
class ProductUseCase {

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

export default ProductUseCase;