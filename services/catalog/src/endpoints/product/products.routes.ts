import express from "express";
import { container } from "tsyringe";
import ProductController from "./product.controller";

const router = express.Router();
const productController = container.resolve(
  "ProductController",
) as ProductController;

router.get("/", async (req, res) => {
  await productController.findAllProducts(req, res);
});

export default router;
