import {Request, Response} from 'express';
import CategoryUseCase from "../../application/usecases/category.usecase";
import {CategoryResponseTransformer} from "./category.response.transformer";
import {HighlightedCategoryResponseTransformer} from "./highlighted-category.response.transformer";

class CategoryController {
    private categoryUseCase: CategoryUseCase;

    constructor(categoryUseCase: CategoryUseCase) {
        this.categoryUseCase = categoryUseCase;
    }

    async getAllCategories(req: Request, res: Response) {
        try {
            const isDetailed = Boolean(req.query.detailed);
            let categories = await this.categoryUseCase.find(isDetailed);
            const transformedCategories = categories.map(CategoryResponseTransformer.transform);
            res.json(transformedCategories);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Failed to fetch categories'});
        }
    }

    async getHighlightedCategories(req: Request, res: Response) {
        try {
            let categories = await this.categoryUseCase.findHighlightedCategories();
            const transformedCategories = categories.map(HighlightedCategoryResponseTransformer.transform);
            res.json(transformedCategories);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Failed to fetch categories'});
        }
    }

    async getCategoryById(req: Request, res: Response) {
        try {
            let uuid = req.params.id;
            const category = await this.categoryUseCase.findByUuid(uuid);
            if (!category) {
                return res.status(404).json({message: 'Category not found'});
            }
            res.json(category);
        } catch (error: any) {
            res.status(500).json({message: 'Error fetching category: ' + error.message, error});
        }
    }
}

export default CategoryController;
