import {CategoryRepository} from "../../core/repositories/category.repository";
import Category from "../../core/models/category.model";
import HighlightedCategory from "../../core/models/highlighted-category.model";
import CategoryService from "../../core/services/category.service";

class CategoryServiceImpl implements CategoryService {
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async findAllCategories(isDetailed: boolean): Promise<Category[]> {
        return await this.categoryRepository.find();
        // return isDetailed
        //     ? await this.categoryRepository.findAll()
        //     : await this.categoryRepository.findWithMinProductsAndProductLinks();
    }

    async findHighlightedCategories(): Promise<HighlightedCategory[]> {
        return await this.categoryRepository.findHighlightedCategories();
    }
}

export default CategoryServiceImpl;