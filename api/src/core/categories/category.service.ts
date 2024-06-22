import Category from "../models/category.model";
import {HighlightedCategory} from "../models/highlighted-category.model";

interface CategoryService {
    findAllCategories(): Promise<Category[]>;

    findHighlightedCategories(): Promise<HighlightedCategory[]>;

    findCategoryByUuid(uuid: string): Promise<Category | null>;
}

export default CategoryService;
