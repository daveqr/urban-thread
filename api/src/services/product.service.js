
const Product = require('../schemas/product.schema');

class ProductService {
    // async createCategory(categoryData) {
    //     return await Category.create(categoryData);
    // }

    // async getCategoryById(categoryId) {
    //     return await Category.findById(categoryId)
    //         .populate('edition')
    //         .populate('products');
    // }

    // async getCategoriesWithMinProducts() {
    //     let query = Category.find();
    //     query.populate('products', '_id name');
    //     query.populate('edition');

    //     return await query.exec();
    // }

    // async getCategories() {
    //     let query = Category.find();
    //     query.populate('products');
    //     query.populate('edition');

    //     return await query.exec();
    // }
}

module.exports = new ProductService();
