import {CategoryRepository} from "../repositories/CategoryRepository";
import NewCategoryModel from "../models/newcategory.model";

class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async findAllCategories(isDetailed: boolean): Promise<NewCategoryModel[]> {
        return await this.categoryRepository.findAll();
        // return isDetailed
        //     ? await this.categoryRepository.findAll()
        //     : await this.categoryRepository.findWithMinProductsAndProductLinks();
    }

}

export default CategoryService;