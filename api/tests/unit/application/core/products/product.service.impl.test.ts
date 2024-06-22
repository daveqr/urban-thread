import "reflect-metadata"
import ProductServiceImpl from "../../../../../src/core/products/product.service.impl";
import {ProductRepository} from "../../../../../src/core/repositories/product.repository";
import {createStubInstance, SinonStubbedInstance} from "sinon";
import {Product} from "../../../../../src/core/models/product.model";
import {ProductRepositoryTestDouble} from "../../../test-doubles/product.repository.test-double";

describe("ProductServiceImpl use case", () => {
    let productService: ProductServiceImpl;
    let productRepository: SinonStubbedInstance<ProductRepository>;

    beforeEach(() => {
        productRepository = createStubInstance<ProductRepository>(ProductRepositoryTestDouble as any);
        productService = new ProductServiceImpl(productRepository);
    });

    it("should find products", async () => {
        // Given
        productRepository.find.resolves([{
            uuid: "some-uuid",
        } as Product]);

        // When
        const foundProduct = await productService.findAllProducts();

        // Then
        expect(foundProduct).not.toBeNull();
        expect(foundProduct.length).toBe(1);
        expect(foundProduct[0].uuid).toBe("some-uuid");
    });

    it("should find product by uuid", async () => {
        // Given
        productRepository.findByUuid.withArgs('some-uuid').resolves({
            uuid: 'some-uuid',
        } as Product);

        // When
        const foundProduct = await productService.findProductByUuid('some-uuid');

        // Then
        expect(foundProduct).not.toBeNull();
        expect(foundProduct?.uuid).toBe('some-uuid');
    });

    it("should return null if no product found by uuid", async () => {
        // Given
        productRepository.findByUuid.withArgs('some-uuid').resolves(null);

        // When
        const foundProduct = await productService.findProductByUuid('some-uuid');

        // Then
        expect(foundProduct).toBeNull();
    });
});
