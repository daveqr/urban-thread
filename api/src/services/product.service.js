
const Product = require('../schemas/product.schema');
const Category = require('../schemas/category.schema');
const categoryService = require('../services/category.service');
const linkUtils = require('../utils/linkUtils');
const detailedTransformer = require('../transformers/product.detailed.transformer');

class ProductService {
    async findById(productId) {
        return await Product.findById(productId);
    }

    async find() {
        return await Product.find();
    }

    async transformProducts(products, baseUrl) {
        const categoryIds = Array.from(new Set(products.flatMap(product => product.categoryIds)));
        const categories = await categoryService.find(categoryIds);
        const categoryLinks = linkUtils.createCategoryLinks(categories);

        const transformedProducts = await Promise.all(products.map(async (product) => {
            const categoryLinksForProduct = product.categoryIds.map(id => categoryLinks[id]);

            return detailedTransformer.transform(product, categoryLinksForProduct, baseUrl);
        }));

        return transformedProducts;
    }

    async transformProduct(product, baseUrl) {
        const categories = await Category.find({ _id: { $in: product.categoryIds } });
        const categoryLinks = linkUtils.createCategoryLinks(categories);
        const categoryLinksForProduct = categories.map(category => categoryLinks[category._id]);

        return detailedTransformer.transform(product, categoryLinksForProduct, baseUrl);
    }
}

module.exports = new ProductService();
