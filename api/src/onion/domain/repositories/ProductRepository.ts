import ProductModel from "../models/product.model";

export interface ProductRepository {
    create(productData: any): Promise<ProductModel>;

    find(): Promise<ProductModel[]>;

    findById(productId: any): Promise<ProductModel | null>;
}
