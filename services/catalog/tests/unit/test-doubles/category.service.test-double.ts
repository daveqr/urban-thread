import Category from "../../../src/core/models/category.model";
import { HighlightedCategory } from "../../../src/core/models/highlighted-category.model";
import { CategoryService } from "../../../src/core/services/category.service";

export class CategoryServiceTestDouble implements CategoryService {
  findCategoryByUuid(uuid: string): Promise<Category | null> {
    return Promise.resolve(null);
  }

  findAllCategories(): Promise<Category[]> {
    return Promise.resolve([]);
  }

  findHighlightedCategories(): Promise<HighlightedCategory[]> {
    return Promise.resolve([]);
  }
}
