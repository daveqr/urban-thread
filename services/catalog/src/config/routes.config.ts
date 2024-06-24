import express from 'express';
import {CATEGORY_BASE_URL, PRODUCT_BASE_URL,} from './urls';
import categoryRoutes from "../endpoints/category/categories.routes";
import productRoutes from "../endpoints/product/products.routes";

export const app = express();

app.use(PRODUCT_BASE_URL, productRoutes);
app.use(CATEGORY_BASE_URL, categoryRoutes);

export default app;
