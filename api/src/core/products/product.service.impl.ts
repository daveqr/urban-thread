import Product from "../models/product.model";
import {ProductRepository} from "../repositories/product.repository";
import ProductService from "./product.service";

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