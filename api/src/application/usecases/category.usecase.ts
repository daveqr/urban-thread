import {CategoryRepository} from "../../core/repositories/category.repository";
import Category from "../../core/models/category.model";
import HighlightedCategory from "../../core/models/highlighted-category.model";
import CategoryService from "../../core/categories/category.service";

class CategoryUseCase {
    private categoryRepository: CategoryRepository;
    private categoryService: CategoryService;

    constructor(categoryRepository: CategoryRepository, categoryService: CategoryService) {
        this.categoryRepository = categoryRepository;
        this.categoryService = categoryService;
    }

    async find(isDetailed: boolean): Promise<Category[]> {
        return await this.categoryService.findAllCategories(isDetailed);
    }

    async findHighlightedCategories(): Promise<HighlightedCategory[]> {
        return await this.categoryService.findHighlightedCategories();
    }

    async findByUuid(uuid: string): Promise<Category | null> {
        return await this.categoryRepository.findByUuid(uuid);
    }
}

export default CategoryUseCase;