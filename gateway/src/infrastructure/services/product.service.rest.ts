import {inject, injectable} from "tsyringe";
import {ProductRepository} from "../../core/repositories/product.repository";
import {Product} from "../../core/models/product.model";
import axios from "axios";
import {ProductService} from "../../core/services/product.service";

@injectable()
export class ProductRestService implements ProductService {

    constructor(
        @inject('ProductRepository') private productRepository: ProductRepository) {
    }

    async findAllProducts(): Promise<Product[]> {
        const response = await axios.get('http://localhost:4000');
        return response.data;
        // return this.productRepository.find();
    }

    async findProductByUuid(uuid: string): Promise<Product | null> {
        return this.productRepository.findByUuid(uuid);
    }
}