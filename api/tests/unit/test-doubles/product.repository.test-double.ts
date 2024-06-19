import {ProductRepository} from "../../../src/core/repositories/product.repository";
import {Product} from "../../../src/core/models/product.model";

export class ProductRepositoryTestDouble implements ProductRepository {
    find(): Promise<Product[]> {
        return Promise.resolve([]);
    }

    findByUuid(uuid: string): Promise<Product | null> {
        return Promise.resolve(null);
    }

}