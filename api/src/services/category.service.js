
const CategoryModel = require('../models/category.model');
const CategoryTransformer = require('../transformers/category.transformer');

class CategoryService {
    static async getAllCategories(isDetailed, baseUrl) {

        if (isDetailed) {
            const categories = await CategoryModel.find();
            // TODO transform these categories
            return categories;
        }

        const categories = await CategoryModel.findWithMinProductsAndProductLinks();

        const transformedCategories = categories.map(category =>
            new CategoryTransformer(baseUrl).transform(category));

        return transformedCategories;
    }

    static async getCategoryById(categoryId, baseUrl) {
        try {
            const category = await CategoryModel.findByIdWithProductLinks(categoryId);

            if (!category) {
                return null;
            }

            const transformedCategory = new CategoryTransformer(baseUrl).transform(category);

            return transformedCategory;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CategoryService;
