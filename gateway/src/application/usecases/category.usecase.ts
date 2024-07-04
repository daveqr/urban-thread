import Category from "../../core/models/category.model";
import { HighlightedCategory } from "../../core/models/highlighted-category.model";
import { inject, injectable } from "tsyringe";
import { CategoryService } from "../../core/services/category.service";

export interface CategoryUseCase {
  findAllCategories(): Promise<Category[]>;

  findHighlightedCategories(): Promise<HighlightedCategory[]>;

  findByUuid(uuid: string): Promise<Category | null>;
}

@injectable()
class CategoryUseCaseImpl implements CategoryUseCase {
  constructor(
    @inject("CategoryService") private categoryService: CategoryService,
  ) {}

  async findAllCategories(): Promise<Category[]> {
    return await this.categoryService.findAllCategories();
  }

  async findHighlightedCategories(): Promise<HighlightedCategory[]> {
    return await this.categoryService.findHighlightedCategories();
  }

  async findByUuid(uuid: string): Promise<Category | null> {
    return await this.categoryService.findCategoryByUuid(uuid);
  }
}

export default CategoryUseCaseImpl;
