import ProductModel from "../../../domain/models/product.model";
import Product, {ProductInterface} from "../../../../schemas/product.schema";
import {ProductRepository} from "../../../domain/repositories/ProductRepository";

class MongoDBProductRepository implements ProductRepository {
    async create(productData: any): Promise<ProductModel> {
        const createdProduct = await Product.create(productData);
        return new ProductModel(createdProduct);
    }

    async find(): Promise<ProductModel[]> {
        const products = await Product.find();
        return products.map((product: ProductInterface) => new ProductModel(product));
    }

    async findById(productId: any): Promise<ProductModel | null> {
        const product = await Product.findById(productId);
        return product ? new ProductModel(product) : null;
    }
}

export default MongoDBProductRepository;