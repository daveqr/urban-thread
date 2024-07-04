import { injectable } from "tsyringe";
import { Product } from "../../core/models/product.model";
import axios from "axios";
import { ProductService } from "../../core/services/product.service";

@injectable()
export class ProductRestService implements ProductService {
  constructor() {}

  async findAllProducts(): Promise<Product[]> {
    const response = await axios.get("http://localhost:4000/products");
    return response.data;
  }

  async findProductByUuid(uuid: string): Promise<Product | null> {
    const response = await axios.get("http://localhost:4000/products/" + uuid);
    return response.data;
  }
}
