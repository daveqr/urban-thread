import Category from "../models/category.model";
import {HighlightedCategoryx} from "../models/blah";

interface CategoryService {
    findAllCategories(isDetailed: boolean): Promise<Category[]>;

    findHighlightedCategories(): Promise<HighlightedCategoryx[]>;
}

export default CategoryService;
