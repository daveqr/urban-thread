import CategoryModel from '../../domain/models/category.model';
import {CategoryTransformer} from '../../../transformers/category.transformer';
import {CategoryRepository} from "../../domain/repositories/CategoryRepository";

class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async getAllCategories(isDetailed: any) {

        if (isDetailed) {
            return await this.categoryRepository.findAll();
        }

        const categories = await CategoryModel.findWithMinProductsAndProductLinks();

        return categories.map((category: any) =>
            CategoryTransformer.transform(category));
    }

    async getCategoryById(categoryId: string) {
        try {
            const category = await this.categoryRepository.findByIdWithProductLinks(categoryId);

            if (!category) {
                return null;
            }

            return CategoryTransformer.transform(category);
        } catch (error) {
            throw error;
        }
    }
}

export default CategoryService;