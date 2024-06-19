import sinon, {SinonStubbedInstance} from 'sinon';
import ProductService from "../../../../src/core/products/product.service";
import {ProductServiceTestDouble} from "../../test-doubles/product.service.test-double";
import {Product} from "../../../../src/core/models/product.model";

describe("Product use case", () => {
    let productService: SinonStubbedInstance<ProductService>;

    beforeEach(() => {
        productService = sinon.createStubInstance<ProductService>(ProductServiceTestDouble);
        productService.findByUuid.withArgs('some-uuid').resolves({
            uuid: 'some-uuid',
        } as Product);
    });

    it('should find product by uuid', async () => {
        // When
        const foundProduct = await productService.findByUuid('some-uuid');

        // Then
        expect(foundProduct).not.toBeNull();
        expect(foundProduct?.uuid).toBe('some-uuid');
    });

    it('should return null when product with non-existent UUID is queried', async () => {
        // Given
        productService.findByUuid.withArgs('nonexistent').resolves(null);

        // When
        const foundCategory = await productService.findByUuid('nonexistent');

        // Then
        expect(foundCategory).toBeNull();
    });
});
