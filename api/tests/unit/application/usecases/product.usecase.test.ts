import ProductUseCase from "../../../../src/application/usecases/product.usecase";
import Product from "../../../../src/core/models/product.model";
import {CategoryRepository} from "../../../../src/core/repositories/category.repository";
import {ProductRepository} from "../../../../src/core/repositories/product.repository";
import ProductService from "../../../../src/core/services/product.service";
import sinon, {SinonStubbedInstance} from 'sinon';
import {ProductRepositoryTestDouble} from "./product.repository.test-double";

describe("Product use case", () => {
    let productService: ProductService;
    let categoryRepository: CategoryRepository;
    let productUseCase: ProductUseCase;
    let mockRepository: SinonStubbedInstance<ProductRepository>;

    beforeEach(() => {
        productService = sinon.createStubInstance(ProductService);

        categoryRepository = {} as CategoryRepository;
        mockRepository = sinon.createStubInstance<ProductRepository>(ProductRepositoryTestDouble);
        mockRepository.find.resolves([]);
        mockRepository.findByUuid.withArgs('some-uuid').resolves(new Product('some-uuid'));

        productUseCase = new ProductUseCase(productService, mockRepository, categoryRepository);
    });

    it('should find product by uuid', async () => {
        // When
        const foundProduct = await productUseCase.findByUuid('some-uuid');

        // Then
        expect(foundProduct).not.toBeNull();
        expect(foundProduct).toBeInstanceOf(Product);
        expect(foundProduct?.uuid).toBe('some-uuid');
    });
});
