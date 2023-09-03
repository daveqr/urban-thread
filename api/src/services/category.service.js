
const Category = require('../schemas/category.schema');

class CategoryService {
    async create(categoryData) {
        return await Category.create(categoryData);
    }

    async findById(categoryId) {
        return await Category.findById(categoryId)
            .populate('edition')
            .populate('products');
    }

    async findWithMinProducts() {
        let query = Category.find();
        query.populate('products', '_id name');
        query.populate('edition');

        return await query.exec();
    }

    async find() {
        let query = Category.find();
        query.populate('products');
        query.populate('edition');

        return await query.exec();
    }

    async find(categoryIds) {
        return await Category.find({ _id: { $in: categoryIds } });
    }
}




module.exports = new CategoryService();
