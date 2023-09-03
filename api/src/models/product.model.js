
const Product = require('../schemas/product.schema')

class ProductModel {
    constructor(product) {
        this.product = product;
    }

    get id() {
        return this.product._id;
    }

    get name() {
        return this.product.name;
    }

    get description() {
        return this.product.description;
    }

    get price() {
        return this.product.price;
    }

    get color() {
        return this.product.color;
    }

    get categoryIds() {
        return this.product.categoryIds;
    }

    static async create(productData) {
        const createdProduct = await Product.create(productData);
        return new ProductModel(createdProduct);
    }

    static async find() {
        const products = await Product.find();
        return products.map(product => new ProductModel(product));
    }

    static async findById(productId) {
        const product = await Product.findById(productId);
        if (!product) {
            return null;
        }
        return new ProductModel(product);
    }

}

module.exports = ProductModel;
