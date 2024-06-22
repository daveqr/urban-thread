import {CategoryRepository} from "../repositories/category.repository";
import Category from "../models/category.model";
import CategoryService from "./category.service";
import {HighlightedCategory} from "../models/highlighted-category.model";
import {inject, injectable} from "tsyringe";

@injectable()
class CategoryServiceImpl implements CategoryService {

    constructor(
        @inject('CategoryRepository') private categoryRepository: CategoryRepository) {
    }

    async findAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findHighlightedCategories(): Promise<HighlightedCategory[]> {
        return await this.categoryRepository.findHighlightedCategories();
    }

    async findCategoryByUuid(uuid: string): Promise<Category | null> {
        return await this.categoryRepository.findByUuid(uuid);
    }
}

export default CategoryServiceImpl;