import {Product} from "../models/product.model";

interface ProductService {
    findAllProducts(isDetailed: boolean): Promise<Product[]>;

    findByUuid(uuid: string): Promise<Product | null>;
}

export default ProductService;
