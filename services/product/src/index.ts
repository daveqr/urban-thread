import express from 'express';
import productRoutes from "./endpoints/product/products.routes";

const app = express();
app.use(express.json());
app.use('/', productRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});