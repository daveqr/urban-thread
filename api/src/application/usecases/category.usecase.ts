import {CategoryRepository} from "../../core/repositories/category.repository";
import Category from "../../core/models/category.model";
import CategoryService from "../../core/categories/category.service";
import {HighlightedCategory} from "../../core/models/highlighted-category.model";
import {inject, injectable} from "tsyringe";

@injectable()
class CategoryUseCase {

    constructor(
        @inject('CategoryRepository') private categoryRepository: CategoryRepository,
        @inject('CategoryRepository') private categoryService: CategoryService) {
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