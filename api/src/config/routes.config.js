
const express = require('express');
const app = express();

const urls = require('./urls');
const productRoutes = require('../routes/products.route');
const categoryRoutes = require('../routes/categories.route');
const userRoutes = require('../routes/users.route');
const accountRoutes = require('../routes/accounts.route');

app.use(urls.PRODUCT_BASE_URL, productRoutes);
app.use(urls.CATEGORY_BASE_URL, categoryRoutes);
app.use(urls.USERS_BASE_URL, userRoutes);
app.use(urls.ACCOUNTS_BASE_URL, accountRoutes);

module.exports = app;
