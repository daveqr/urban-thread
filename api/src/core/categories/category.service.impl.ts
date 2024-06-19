import {CategoryRepository} from "../repositories/category.repository";
import Category from "../models/category.model";
import CategoryService from "./category.service";
import {HighlightedCategoryx} from "../models/blah";

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

    async findHighlightedCategories(): Promise<HighlightedCategoryx[]> {
        return await this.categoryRepository.findHighlightedCategories();
    }
}

export default CategoryServiceImpl;