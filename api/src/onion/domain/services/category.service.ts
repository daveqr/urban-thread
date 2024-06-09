import {CategoryRepository} from "../../domain/repositories/CategoryRepository";
import CategoryModel from "../models/category.model";

class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async findAllCategories(isDetailed: boolean): Promise<CategoryModel[]> {
        return isDetailed
            ? await this.categoryRepository.findAll()
            : await this.categoryRepository.findWithMinProductsAndProductLinks();
    }

}

export default CategoryService;