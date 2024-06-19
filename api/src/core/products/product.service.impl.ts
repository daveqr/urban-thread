import {ProductRepository} from "../repositories/product.repository";
import ProductService from "./product.service";
import {Product} from "../models/product.model";

class ProductServiceImpl implements ProductService {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    findAllProducts(isDetailed: boolean): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }

    findByUuid(uuid: string): Promise<Product | null> {
        return this.productRepository.findByUuid(uuid);
    }
}

export default ProductServiceImpl;