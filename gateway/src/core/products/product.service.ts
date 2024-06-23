import {Product} from "../models/product.model";

interface ProductService {
    findAllProducts(): Promise<Product[]>;

    findProductByUuid(uuid: string): Promise<Product | null>;
}

export default ProductService;
