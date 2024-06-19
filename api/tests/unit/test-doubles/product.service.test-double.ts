import ProductService from "../../../src/core/products/product.service";
import {Product} from "../../../src/core/models/product.model";

export class ProductServiceTestDouble implements ProductService {
    findByUuid(uuid: string): Promise<Product | null> {
        return Promise.resolve(null);
    }

    findAllProducts(isDetailed: boolean): Promise<Product[]> {
        return Promise.resolve([]);
    }

}