import ProductModel from '../../domain/models/product.model';
import ProductTransformer from '../../../transformers/product.transformer';

import {createCategoryLinks} from '../../../utils/linkUtils';
import {ProductRepository} from "../../domain/repositories/ProductRepository";
import {CategoryRepository} from "../../domain/repositories/CategoryRepository";

class ProductService {
    private productRepository: ProductRepository;
    private categoryRepository: CategoryRepository;

    constructor(productRepository: ProductRepository, categoryRepository: CategoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    async getAllProducts() {
        const products = await this.productRepository.find();

        return this.transformProducts(products);
    }

    async getProductById(productId: string, extended?: boolean) {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            return null;
        }

        return await this.transformProduct(product, extended);
    }

    async getFullProductById(productId: string) {
        return await this.getProductById(productId, true);
    }

    async getBasicProductById(productId: string) {
        return await this.getProductById(productId, false);
    }

    async transformProduct(product: ProductModel, extended?: boolean) {
        const categories = await this.categoryRepository.findByIds(product.categoryIds);

        const categoryLinks = createCategoryLinks(categories);
        const categoryLinksForProduct = categories.map((category: { id: string; }) => categoryLinks[category.id]);

        return ProductTransformer.transform(product, categoryLinksForProduct, extended);
    }

    async transformProducts(products: ProductModel[]) {
        const categoryIds = Array.from(new Set(products.flatMap((product: {
            categoryIds: string[];
        }) => product.categoryIds)));
        const categories = await this.categoryRepository.findByIds(categoryIds);
        const categoryLinks = createCategoryLinks(categories);

        return await Promise.all(products.map(async (product: ProductModel) => {
            const categoryLinksForProduct = product.categoryIds.map((id: string) => categoryLinks[id]);

            return ProductTransformer.transform(product, categoryLinksForProduct);
        }));
    }
}

export default ProductService;