import ProductUseCase from "../../../../src/application/usecases/product.usecase";
import Product from "../../../../src/core/models/product.model";
import {CategoryRepository} from "../../../../src/core/repositories/category.repository";
import {ProductRepository} from "../../../../src/core/repositories/product.repository";
import ProductServiceImpl from "../../../../src/application/services/product.service.impl";
import sinon, {SinonStubbedInstance} from 'sinon';
import {ProductRepositoryTestDouble} from "./product.repository.test-double";

describe("Product use case", () => {
    let productService: ProductServiceImpl;
    let categoryRepository: CategoryRepository;
    let productUseCase: ProductUseCase;
    let productRepository: SinonStubbedInstance<ProductRepository>;

    beforeEach(() => {
        productService = sinon.createStubInstance(ProductServiceImpl);

        categoryRepository = {} as CategoryRepository;
        productRepository = sinon.createStubInstance<ProductRepository>(ProductRepositoryTestDouble);
        productRepository.find.resolves([]);
        productRepository.findByUuid.withArgs('some-uuid').resolves(new Product('some-uuid'));

        productUseCase = new ProductUseCase(productService, productRepository, categoryRepository);
    });

    it('should find product by uuid', async () => {
        // When
        const foundProduct = await productUseCase.findByUuid('some-uuid');

        // Then
        expect(foundProduct).not.toBeNull();
        expect(foundProduct).toBeInstanceOf(Product);
        expect(foundProduct?.uuid).toBe('some-uuid');
    });

    it('should return null when product with non-existent UUID is queried', async () => {
        // Given
        productRepository.findByUuid.withArgs('nonexistent').resolves(null);

        // When
        const foundCategory = await productUseCase.findByUuid('nonexistent');

        // Then
        expect(foundCategory).toBeNull();
    });
});
