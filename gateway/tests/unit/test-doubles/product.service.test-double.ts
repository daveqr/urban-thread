import ProductService from "../../../src/core/products/product.service";
import {Product} from "../../../src/core/models/product.model";

export class ProductServiceTestDouble implements ProductService {
    findProductByUuid(uuid: string): Promise<Product | null> {
        return Promise.resolve(null);
    }

    findAllProducts(): Promise<Product[]> {
        return Promise.resolve([]);
    }

}