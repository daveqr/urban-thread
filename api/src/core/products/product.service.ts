import Product from "../models/product.model";

interface ProductService {
    findAllProducts(isDetailed: boolean): Promise<Product[]>;
}

export default ProductService;
