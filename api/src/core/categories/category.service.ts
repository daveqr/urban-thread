import Category from "../models/category.model";
import {HighlightedCategory} from "../models/highlighted-category.model";

interface CategoryService {
    findAllCategories(isDetailed: boolean): Promise<Category[]>;

    findHighlightedCategories(): Promise<HighlightedCategory[]>;
}

export default CategoryService;
