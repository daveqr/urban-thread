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

router.get('/test', async (req, res) => {
    try {
        const response = await fetch('http://localhost:4000/test');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({error: 'Failed to fetch data from localhost:4000/test'});
    }
});

router.get('/:id', async (req, res) => {
    await productController.getProductById(req, res);
});

export default router;
