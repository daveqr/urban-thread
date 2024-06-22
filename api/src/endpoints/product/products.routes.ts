import express from 'express';
import ProductController from './product.controller';
import {container} from "tsyringe";

const router = express.Router();
const productController = container.resolve("ProductController") as ProductController;

router.use((req, res, next) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/', async (req, res) => {
    await productController.findAllProducts(req, res);
});

router.get('/:id', async (req, res) => {
    await productController.getProductById(req, res);
});

export default router;
