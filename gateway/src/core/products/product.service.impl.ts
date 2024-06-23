import {ProductRepository} from "../repositories/product.repository";
import ProductService from "./product.service";
import {Product} from "../models/product.model";
import {inject, injectable} from "tsyringe";

@injectable()
class ProductServiceImpl implements ProductService {

    constructor(
        @inject('ProductRepository') private productRepository: ProductRepository) {
    }

    async findAllProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findProductByUuid(uuid: string): Promise<Product | null> {
        return this.productRepository.findByUuid(uuid);
    }
}

export default ProductServiceImpl;
