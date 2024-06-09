import {CategoryTransformer} from '../../../transformers/category.transformer';
import {CategoryRepository} from "../../domain/repositories/CategoryRepository";

class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async findAllCategories(isDetailed: any) {

        if (isDetailed) {
            return await this.categoryRepository.findAll();
        }

        const categories = await this.categoryRepository.findWithMinProductsAndProductLinks();

        return categories.map((category: any) =>
            CategoryTransformer.transform(category));
    }

    async findCategoryById(categoryId: string) {
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