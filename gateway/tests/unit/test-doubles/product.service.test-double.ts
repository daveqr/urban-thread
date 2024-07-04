import { Product } from "../../../src/core/models/product.model";
import { ProductService } from "../../../src/core/services/product.service";

export class ProductServiceTestDouble implements ProductService {
  findProductByUuid(uuid: string): Promise<Product | null> {
    return Promise.resolve(null);
  }

  findAllProducts(): Promise<Product[]> {
    return Promise.resolve([]);
  }
}
