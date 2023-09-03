
const Product = require('../schemas/product.schema');

class ProductService {
    async findById(productId) {
        return await Product.findById(productId);
    }

    async find() {
        return await Product.find();
    }
}

module.exports = new ProductService();
