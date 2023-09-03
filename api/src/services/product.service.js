
const Product = require('../schemas/product.schema');

class ProductService {
    async findById(productId) {
        return await Product.findById(productId);
    }

    async find() {
        return await Product.find();
    }

    // TODO implement this
    // async function getTransformedProducts(baseUrl) {
    //     const products = await productService.find();
    //     const categoryIds = Array.from(new Set(products.flatMap(product => product.categoryIds)));
    //     const categories = await categoryService.find(categoryIds);
    //     const categoryLinks = createCategoryLinksMap(categories);
    
    //     return Promise.all(products.map(async (product) => {
    //         const categoryIdsForProduct = product.categoryIds;
    //         const categoryLinksForProduct = categoryIdsForProduct.map(id => categoryLinks[id]);
    //         return detailedTransformer.transform(product, categoryLinksForProduct, baseUrl);
    //     }));
    // }    
}

module.exports = new ProductService();
