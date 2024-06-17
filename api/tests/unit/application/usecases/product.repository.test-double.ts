import {ProductRepository} from "../../../../src/core/repositories/product.repository";
import Product from "../../../../src/core/models/product.model";

export class ProductRepositoryTestDouble implements ProductRepository {
    async find(): Promise<Product[]> {
        return [];
    }

    async findByUuid(uuid: string): Promise<Product | null> {
        return new Product(uuid);
    }
}