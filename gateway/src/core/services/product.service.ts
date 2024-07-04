import { Product } from "../models/product.model";

export interface ProductService {
  findAllProducts(): Promise<Product[]>;

  findProductByUuid(uuid: string): Promise<Product | null>;
}
