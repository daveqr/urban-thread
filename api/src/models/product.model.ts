import mongoose from 'mongoose';
import { productSchema } from '../schemas/product.schema';

class ProductModel {
    private static Product = mongoose.model('Product', productSchema);
    product: mongoose.Document<any, any, any>;

    constructor(product: mongoose.Document) {
        this.product = product;
    }

    get id() {
        return this.product._id;
    }

    get name() {
        return this.product.get('name');
    }

    get description() {
        return this.product.get('description');
    }

    get price() {
        return this.product.get('price');
    }

    get color() {
        return this.product.get('color');
    }

    get categoryIds() {
        return this.product.get('categoryIds');
    }

    static async create(productData: any) {
        const createdProduct = await ProductModel.Product.create(productData);
        return new ProductModel(createdProduct);
    }

    static async find() {
        const products = await ProductModel.Product.find();
        return products.map(product => new ProductModel(product));
    }

    static async findById(productId: any) {
        const product = await ProductModel.Product.findById(productId);
        if (!product) {
            return null;
        }
        return new ProductModel(product);
    }
}

export default ProductModel;
