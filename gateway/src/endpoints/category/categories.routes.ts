import express, { NextFunction } from "express";
import CategoryController from "./category.controller";
import { container } from "tsyringe";
import { Request, Response } from "express";

const router = express.Router();
const categoryController = container.resolve(
  "CategoryController",
) as CategoryController;

router.use((request: Request, response: Response, next: NextFunction) => {
  if (request.method === "GET") {
    response.setHeader("Content-Type", "application/hal+json");
  }
  next();
});

router.get("/", categoryController.getAllCategories.bind(categoryController));
router.get(
  "/highlighted",
  categoryController.getHighlightedCategories.bind(categoryController),
);
router.get("/:id", categoryController.getCategoryById.bind(categoryController));

export default router;
