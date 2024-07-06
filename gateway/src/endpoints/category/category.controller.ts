import { Request, Response } from "express";
import { CategoryUseCase } from "../../application/usecases/category.usecase";
import {
  CategoryTransformationService,
  HighlightedCategoryTransformationService,
} from "./category.transformation.service";
import { inject, injectable } from "tsyringe";
import { isAxiosError } from "axios";

@injectable()
class CategoryController {
  constructor(
    @inject("CategoryUseCase") private categoryUseCase: CategoryUseCase,
    @inject("CategoryTransformationService")
    private categoryTransformationService: CategoryTransformationService,
    @inject("HighlightedCategoryTransformationService")
    private highlightedCategoryTransformationService: HighlightedCategoryTransformationService,
  ) {}

  async getAllCategories(req: Request, res: Response) {
    try {
      // const isDetailed = Boolean(req.query.detailed);
      // const categoryService = container.resolve("CategoryService") as CategoryService;
      const categories = await this.categoryUseCase.findAllCategories();
      const transformedCategories = categories.map((category) =>
        this.categoryTransformationService.transform(category),
      );

      res.json(transformedCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  }

  async getHighlightedCategories(request: Request, response: Response) {
    try {
      const categories = await this.categoryUseCase.findHighlightedCategories();
      const transformedCategories = categories.map((category) =>
        this.highlightedCategoryTransformationService.transform(category),
      );
      response.json(transformedCategories);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        response.status(500).json({ error: "Failed to fetch categories" });
      }
    }
  }

  async getCategoryById(request: Request, response: Response) {
    try {
      const uuid = request.params.id;
      const category = await this.categoryUseCase.findByUuid(uuid);
      if (!category) {
        return response.status(404).json({ message: "Category not found" });
      }
      response.json(category);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        response.status(500).json({
          message: "Error fetching category: " + error.message,
          error,
        });
      }
    }
  }
}

export default CategoryController;
