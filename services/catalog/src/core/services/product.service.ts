import {Product} from "../models/product.model";
import {inject, injectable} from "tsyringe";
import {ProductRepository} from "../repositories/product.repository";

export interface ProductService {
    findAllProducts(): Promise<Product[]>;

    findProductByUuid(uuid: string): Promise<Product | null>;
}

@injectable()
export class ProductServiceImpl implements ProductService {

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