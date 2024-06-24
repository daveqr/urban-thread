import {injectable} from "tsyringe";
import axios from "axios";
import {CategoryService} from "../../core/services/category.service";
import Category from "../../core/models/category.model";
import {HighlightedCategory} from "../../core/models/highlighted-category.model";

@injectable()
export class CategoryRestService implements CategoryService {

    constructor() {
    }

    async findAllCategories(): Promise<Category[]> {
        const response = await axios.get('http://localhost:4000/categories');
        return response.data;
    }

    async findHighlightedCategories(): Promise<HighlightedCategory[]> {
        const response = await axios.get('http://localhost:4000/categories/highlighted');
        return response.data;
    }

    async findCategoryByUuid(uuid: string): Promise<Category | null> {
        const response = await axios.get(`http://localhost:4000/categories/highlighted/${uuid}`);
        return response.data;
    }
}
