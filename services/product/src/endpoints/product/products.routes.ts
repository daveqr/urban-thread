import express from 'express';
import ProductControllerTemp from "./product.controller.temp";

const router = express.Router();
const productControllerTemp = new ProductControllerTemp();

router.use((req, res, next) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/', async (req, res) => {
    await productControllerTemp.findAllProducts(req, res);
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

export default router;
