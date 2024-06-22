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