import express from 'express';
import TypeORMProductRepository from "../../infrastructure/data/typeorm/product.repository.typeorm";
import ProductServiceImpl from "../../core/products/product.service.impl";
import ProductController from './product.controller';
import {AppDataSource} from "../../data-source";
import ProductUseCase from "../../application/usecases/product.usecase";

const router = express.Router();
const productRepository = new TypeORMProductRepository(AppDataSource);
const productService = new ProductServiceImpl(productRepository);
const productUseCase = new ProductUseCase(productService);
const productController = new ProductController(productUseCase);

router.use((req, res, next) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/', async (req, res) => {
    await productController.getAllProducts(req, res);
});

router.get('/:id', async (req, res) => {
    await productController.getProductById(req, res);
});

export default router;
