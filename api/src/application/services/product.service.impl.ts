import Product from "../../core/models/product.model";
import {ProductRepository} from "../../core/repositories/product.repository";
import ProductService from "../../core/services/product.service";

class ProductServiceImpl implements ProductService {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async findAllProducts(isDetailed: boolean): Promise<Product[]> {
        return await this.productRepository.find();
        // return isDetailed
        //     ? await this.categoryRepository.findAll()
        //     : await this.categoryRepository.findWithMinProductsAndProductLinks();
    }

}

export default ProductServiceImpl;