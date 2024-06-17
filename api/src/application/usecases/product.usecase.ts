import {ProductRepository} from "../../core/repositories/product.repository";
import {CategoryRepository} from "../../core/repositories/category.repository";
import ProductService from "../../core/services/product.service";

class ProductUseCase {
    private productRepository: ProductRepository;
    private categoryRepository: CategoryRepository;
    private productService: ProductService;

    constructor(productService: ProductService, productRepository: ProductRepository, categoryRepository: CategoryRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    async getAllProducts() {
        let products = await this.productService.findAllProducts(false);
        // const products = await this.productRepository.find();

        return products;
        // return this.transformProducts(products);
    }

    async findByUuid(productId: string) {
        return await this.productRepository.findByUuid(productId);
    }

    async getFullProductById(productId: string) {
        return await this.findByUuid(productId);
    }

    async getBasicProductById(productId: string) {
        return await this.findByUuid(productId);
    }

    // async transformProduct(product: ProductModel, extended?: boolean) {
    //     const categories = await this.categoryRepository.findByIds(product.categoryIds);
    //
    //     const categoryLinks = createCategoryLinks(categories);
    //     const categoryLinksForProduct = categories.map((category: { id: string; }) => categoryLinks[category.id]);
    //
    //     return ProductTransformer.transform(product, categoryLinksForProduct, extended);
    // }

    // async transformProducts(products: ProductModel[]) {
    //     const categoryIds = Array.from(new Set(products.flatMap((product: {
    //         categoryIds: string[];
    //     }) => product.categoryIds)));
    //     const categories = await this.categoryRepository.findByIds(categoryIds);
    //     const categoryLinks = createCategoryLinks(categories);
    //
    //     return await Promise.all(products.map(async (product: ProductModel) => {
    //         const categoryLinksForProduct = product.categoryIds.map((id: string) => categoryLinks[id]);
    //
    //         return ProductTransformer.transform(product, categoryLinksForProduct);
    //     }));
    // }
}

export default ProductUseCase;