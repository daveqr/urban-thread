
const CategoryModel = require('../models/category.model');
import { CategoryTransformer } from '../transformers/category.transformer';

class CategoryService {
    static async getAllCategories(isDetailed: any) {

        if (isDetailed) {
            const categories = await CategoryModel.findAll();
            // TODO transform these categories
            return categories;
        }

        const categories = await CategoryModel.findWithMinProductsAndProductLinks();

        const transformedCategories = categories.map((category: any) =>
            CategoryTransformer.transform(category));

        return transformedCategories;
    }

    static async getCategoryById(categoryId: any) {
        try {
            const category = await CategoryModel.findByIdWithProductLinks(categoryId);

            if (!category) {
                return null;
            }

            const transformedCategory = CategoryTransformer.transform(category);

            return transformedCategory;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CategoryService;
