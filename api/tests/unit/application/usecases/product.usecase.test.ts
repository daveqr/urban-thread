import "reflect-metadata"
import sinon, {SinonStubbedInstance} from 'sinon';
import ProductService from "../../../../src/core/products/product.service";
import {ProductServiceTestDouble} from "../../test-doubles/product.service.test-double";
import {Product} from "../../../../src/core/models/product.model";
import ProductUseCase from "../../../../src/application/usecases/product.usecase";

describe("Product use case", () => {
    let productService: SinonStubbedInstance<ProductService>;
    let productUseCase: ProductUseCase;

    beforeEach(() => {
        productService = sinon.createStubInstance<ProductService>(ProductServiceTestDouble as any);
        productUseCase = new ProductUseCase(productService);
    });

    it('should find all products', async () => {
        // Given
        productService.findAllProducts.resolves([{
            uuid: 'some-uuid',
        } as Product]);

        // When
        const foundProducts = await productUseCase.findAllProducts();

        // Then
        expect(foundProducts).not.toBeNull();
        expect(foundProducts.length).toBe(1);
    });

    it('should find product by uuid', async () => {
        productService.findProductByUuid.withArgs('some-uuid').resolves({
            uuid: 'some-uuid',
        } as Product);

        // When
        const foundProduct = await productUseCase.findProductByUuid('some-uuid');

        // Then
        expect(foundProduct).not.toBeNull();
        expect(foundProduct?.uuid).toBe('some-uuid');
    });

    it('should return null when product with non-existent UUID is queried', async () => {
        // Given
        productService.findProductByUuid.withArgs('nonexistent').resolves(null);

        // When
        const foundCategory = await productUseCase.findProductByUuid('nonexistent');

        // Then
        expect(foundCategory).toBeNull();
    });
});
