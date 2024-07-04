import express from "express";
import {
  ACCOUNTS_BASE_URL,
  CATEGORY_BASE_URL,
  PRODUCT_BASE_URL,
  USERS_BASE_URL,
} from "./urls";
import categoryRoutes from "./category/categories.routes";
import productRoutes from "./product/products.routes";
import userRoutes from "./user/users.routes";
import accountRoutes from "./account/accounts.routes";

export const app = express();

app.use(PRODUCT_BASE_URL, productRoutes);
app.use(CATEGORY_BASE_URL, categoryRoutes);
app.use(USERS_BASE_URL, userRoutes);
app.use(ACCOUNTS_BASE_URL, accountRoutes);

export default app;
