import {CategoryRepository} from "../../core/repositories/category.repository";
import Category from "../../core/models/category.model";
import CategoryService from "../../core/categories/category.service";
import {HighlightedCategoryx} from "../../core/models/blah";

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

    async findHighlightedCategories(): Promise<HighlightedCategoryx[]> {
        return await this.categoryService.findHighlightedCategories();
    }

    async findByUuid(uuid: string): Promise<Category | null> {
        return await this.categoryRepository.findByUuid(uuid);
    }
}

export default CategoryUseCase;