import {Request, Response} from 'express';
import CategoryUseCase from "../../application/usecases/category.usecase";
import {CategoryTransformationService} from "./category.transformation.service";
import {HighlightedCategoryTransformationService} from "./highlighted-category.transformation.service";

class CategoryController {
    private categoryUseCase: CategoryUseCase;
    private categoryTransformationService: CategoryTransformationService;
    private highlightedCategoryTransformationService: HighlightedCategoryTransformationService;

    constructor(
        categoryUseCase: CategoryUseCase,
        categoryTransformationService: CategoryTransformationService,
        highlightedCategoryTransformationService: HighlightedCategoryTransformationService
    ) {
        this.categoryUseCase = categoryUseCase;
        this.categoryTransformationService = categoryTransformationService;
        this.highlightedCategoryTransformationService = highlightedCategoryTransformationService;
    }

    async getAllCategories(req: Request, res: Response) {
        try {
            const isDetailed = Boolean(req.query.detailed);
            const categories = await this.categoryUseCase.find(isDetailed);
            const transformedCategories = categories.map(category =>
                this.categoryTransformationService.transform(category)
            );

            res.json(transformedCategories);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Failed to fetch categories'});
        }
    }

    async getHighlightedCategories(req: Request, res: Response) {
        try {
            let categories = await this.categoryUseCase.findHighlightedCategories();
            const transformedCategories = categories.map(category =>
                this.highlightedCategoryTransformationService.transform(category));
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
