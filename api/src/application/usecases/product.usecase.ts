import ProductService from "../../core/products/product.service";
import {Product} from "../../core/models/product.model";

class ProductUseCase {
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    async getAllProducts() {
        let products = await this.productService.findAllProducts(false);
        // const products = await this.productRepository.find();

        return products;
        // return this.transformProducts(products);
    }

    async findByUuid(uuid: string): Promise<Product | null> {
        return await this.productService.findByUuid(uuid);
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