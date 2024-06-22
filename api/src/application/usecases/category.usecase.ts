import Category from "../../core/models/category.model";
import CategoryService from "../../core/categories/category.service";
import {HighlightedCategory} from "../../core/models/highlighted-category.model";
import {inject, injectable} from "tsyringe";

@injectable()
class CategoryUseCase {

    constructor(
        @inject('CategoryService') private categoryService: CategoryService) {
    }

    async find(isDetailed: boolean): Promise<Category[]> {
        return await this.categoryService.findAllCategories();
    }

    async findHighlightedCategories(): Promise<HighlightedCategory[]> {
        return await this.categoryService.findHighlightedCategories();
    }

    async findByUuid(uuid: string): Promise<Category | null> {
        return await this.categoryService.findCategoryByUuid(uuid);
    }
}

export default CategoryUseCase;