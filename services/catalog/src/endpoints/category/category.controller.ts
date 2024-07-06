import { Request, Response } from "express";
import { CategoryUseCase } from "../../application/usecases/category.use.case";
import {
  CategoryTransformationService,
  HighlightedCategoryTransformationService,
} from "./category.transformation.service";
import { container, inject, injectable } from "tsyringe";
import { CategoryRepository } from "../../core/repositories/category.repository";
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
      const categoryRepository = container.resolve(
        "CategoryRepository",
      ) as CategoryRepository;
      const categories = await categoryRepository.find();
      const transformedCategories = categories.map((category) =>
        this.categoryTransformationService.transform(category),
      );

      res.json(transformedCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  }

  async getHighlightedCategories(req: Request, res: Response) {
    try {
      const categories = await this.categoryUseCase.findHighlightedCategories();
      const transformedCategories = categories.map((category) =>
        this.highlightedCategoryTransformationService.transform(category),
      );
      res.json(transformedCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const uuid = req.params.id;
      const category = await this.categoryUseCase.findByUuid(uuid);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        return res.status(500).json({
          message: "Error fetching category: " + error.message,
          error,
        });
      }
      return res.status(500);
    }
  }
}

export default CategoryController;
