import ProductServiceImpl from "../../../../../src/core/products/product.service.impl";
import {ProductRepository} from "../../../../../src/core/repositories/product.repository";
import sinon, {SinonStubbedInstance} from "sinon";
import {ProductRepositoryTestDouble} from "../../../test-doubles/product.repository.test-double";
import {Product} from "../../../../../src/core/models/product.model";

describe("ProductServiceImpl use case", () => {
    let productService: ProductServiceImpl;
    let productRepository: SinonStubbedInstance<ProductRepository>;

    beforeEach(() => {
        productRepository = sinon.createStubInstance<ProductRepository>(ProductRepositoryTestDouble);
        productService = new ProductServiceImpl(productRepository);
    });

    it('should find product by uuid', async () => {
        // Given
        productRepository.findByUuid.withArgs('some-uuid').resolves({
            uuid: 'some-uuid',
        } as Product);

        // When
        const foundProduct = await productRepository.findByUuid('some-uuid');

        // Then
        expect(foundProduct).not.toBeNull();
        expect(foundProduct?.uuid).toBe('some-uuid');
    });

    it('should return null if no product found by uuid', async () => {
        // Given
        productRepository.findByUuid.withArgs('some-uuid').resolves(null);

        // When
        const foundProduct = await productService.findByUuid('some-uuid');

        // Then
        expect(foundProduct).toBeNull();
    });
});
