import CategoryModel from '../../domain/models/category.model';
import ProductModel from '../../domain/models/product.model';
import ProductTransformer from '../../../transformers/product.transformer';

import {createCategoryLinks} from '../../../utils/linkUtils';
import {ProductRepository} from "../../domain/repositories/ProductRepository";

class ProductService {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async getAllProducts() {
        const products = await this.productRepository.find();

        return ProductService.transformProducts(products);
    }

    async getProductById(productId: string, extended?: boolean) {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            return null;
        }

        return await ProductService.transformProduct(product, extended);
    }

    async getFullProductById(productId: string) {
        return await this.getProductById(productId, true);
    }

    async getBasicProductById(productId: string) {
        return await this.getProductById(productId, false);
    }

    static async transformProduct(product: ProductModel, extended?: boolean) {
        const categories = await CategoryModel.findByIds(product.categoryIds);

        const categoryLinks = createCategoryLinks(categories);
        const categoryLinksForProduct = categories.map((category: { id: string; }) => categoryLinks[category.id]);

        return ProductTransformer.transform(product, categoryLinksForProduct, extended);
    }

    static async transformProducts(products: ProductModel[]) {
        const categoryIds = Array.from(new Set(products.flatMap((product: {
            categoryIds: string[];
        }) => product.categoryIds)));
        const categories = await CategoryModel.findByIds(categoryIds);
        const categoryLinks = createCategoryLinks(categories);

        const transformedProducts = await Promise.all(products.map(async (product: ProductModel) => {
            const categoryLinksForProduct = product.categoryIds.map((id: string) => categoryLinks[id]);

            const retVal = ProductTransformer.transform(product, categoryLinksForProduct);

            return retVal;
        }));

        return transformedProducts;
    }
}

export default ProductService;