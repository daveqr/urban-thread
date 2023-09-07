const CategoryModel = require('../models/category.model');
import ProductModel from '../models/product.model';
import { ProductTransformer } from '../transformers/product.transformer';

const linkUtils = require('../utils/linkUtils');

class ProductService {
    static async getAllProducts() {
        const products = await ProductModel.find();

        return await ProductService.transformProducts(products);
    }

    static async getProductById(productId: string) {
        const product = await ProductModel.findById(productId);

        if (!product) {
            return null;
        }

        return await ProductService.transformProduct(product);
    }

    static async transformProduct(product: any) {
        const categories = await CategoryModel.findByIds(product.categoryIds);
        const categoryLinks = linkUtils.createCategoryLinks(categories);
        const categoryLinksForProduct = categories.map((category: { id: string; }) => categoryLinks[category.id]);

        return ProductTransformer.transform(product, categoryLinksForProduct);
    }

    static async transformProducts(products: any) {
        const categoryIds = Array.from(new Set(products.flatMap((product: { categoryIds: any; }) => product.categoryIds)));
        const categories = await CategoryModel.findByIds(categoryIds);
        const categoryLinks = linkUtils.createCategoryLinks(categories);

        const transformedProducts = await Promise.all(products.map(async (product: any) => {
            const categoryLinksForProduct = product.categoryIds.map((id: string) => categoryLinks[id]);

            const retVal = ProductTransformer.transform(product, categoryLinksForProduct);

            return retVal;
        }));

        return transformedProducts;
    }
}

module.exports = ProductService;
