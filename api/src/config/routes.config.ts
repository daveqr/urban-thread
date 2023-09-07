import express from 'express';

export const app = express();

import {
    PRODUCT_BASE_URL,
    CATEGORY_BASE_URL,
    USERS_BASE_URL,
    ACCOUNTS_BASE_URL,
} from './urls';

const productRoutes = require('../routes/products.route');
const categoryRoutes = require('../routes/categories.route');
const userRoutes = require('../routes/users.route');
const accountRoutes = require('../routes/accounts.route');

app.use(PRODUCT_BASE_URL, productRoutes);
app.use(CATEGORY_BASE_URL, categoryRoutes);
app.use(USERS_BASE_URL, userRoutes);
app.use(ACCOUNTS_BASE_URL, accountRoutes);


export default app;
