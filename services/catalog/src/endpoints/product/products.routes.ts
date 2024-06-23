import express from 'express';
import {container} from "tsyringe";
import ProductController from "./product.controller";

const router = express.Router();
const productController = container.resolve("ProductController") as ProductController;

router.use((req, res, next) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/products', async (req, res) => {
    await productController.findAllProducts(req, res);
});

export default router;
