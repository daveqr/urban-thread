
const CategoryModel = require('../models/category.model');
const ProductModel = require('../models/product.model');
const ProductTransformer = require('../transformers/product.transformer');
const linkUtils = require('../utils/linkUtils');

class ProductService {
    static async getAllProducts() {
        const products = await ProductModel.find();

        return await ProductService.transformProducts(products);
    }

    static async getProductById(productId) {
        const product = await ProductModel.findById(productId);

        if (!product) {
            return null;
        }

        return await ProductService.transformProduct(product);
    }

    static async transformProduct(product) {
        const categories = await CategoryModel.find(product.categoryIds);
        const categoryLinks = linkUtils.createCategoryLinks(categories);
        const categoryLinksForProduct = categories.map(category => categoryLinks[category.id]);

        return ProductTransformer.transform(product, categoryLinksForProduct);
    }

    static async transformProducts(products) {
        const categoryIds = Array.from(new Set(products.flatMap(product => product.categoryIds)));
        const categories = await CategoryModel.find(categoryIds);
        const categoryLinks = linkUtils.createCategoryLinks(categories);

        const transformedProducts = await Promise.all(products.map(async (product) => {
            const categoryLinksForProduct = product.categoryIds.map(id => categoryLinks[id]);

            const retVal = ProductTransformer.transform(product, categoryLinksForProduct);

            return retVal;
        }));

        return transformedProducts;
    }
}

module.exports = ProductService;
