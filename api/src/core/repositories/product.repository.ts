import Product from "../models/product.model";

export interface ProductRepository {
    // create(productData: any): Promise<Product>;

    find(): Promise<Product[]>;

    findByUuid(uuid: string): Promise<Product | null>;
}
