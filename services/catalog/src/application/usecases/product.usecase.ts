import { Product } from "../../core/models/product.model";
import { inject, injectable } from "tsyringe";
import { ProductService } from "../../core/services/product.service";
import { Logger } from "shared/lib/logger.util";

export interface ProductUseCase {
  findAllProducts(): Promise<Product[]>;

  findProductByUuid(uuid: string): Promise<Product | null>;

  findFullProductById(productId: string): Promise<Product | null>;

  findBasicProductById(productId: string): Promise<Product | null>;
}

@injectable()
class ProductUseCaseImpl implements ProductUseCase {
  constructor(
    @inject("ProductService") private productService: ProductService,
    @inject("CentralLogger") private logger: Logger,
  ) {}

  async findAllProducts() {
    const products = await this.productService.findAllProducts();
    this.logger.debug(`Found ${products.length} products`);

    return products;
  }

  async findProductByUuid(uuid: string): Promise<Product | null> {
    return await this.productService.findProductByUuid(uuid);
  }

  async findFullProductById(productId: string) {
    return await this.findProductByUuid(productId);
  }

  async findBasicProductById(productId: string) {
    return await this.findProductByUuid(productId);
  }
}

export default ProductUseCaseImpl;
