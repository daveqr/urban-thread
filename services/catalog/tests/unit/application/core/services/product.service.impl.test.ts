import "reflect-metadata";
import { ProductRepository } from "../../../../../src/core/repositories/product.repository";
import { createStubInstance, SinonStubbedInstance } from "sinon";
import { Product } from "../../../../../src/core/models/product.model";
import { ProductRepositoryTestDouble } from "../../../test-doubles/product.repository.test-double";
import { ProductServiceImpl } from "../../../../../src/core/services/product.service";

describe("ProductServiceImpl use case", () => {
  let productRepository: SinonStubbedInstance<ProductRepository>;
  let productService: ProductServiceImpl;

  beforeEach(() => {
    productRepository = createStubInstance<ProductRepository>(
      ProductRepositoryTestDouble,
    );
    productService = new ProductServiceImpl(productRepository);
  });

  it("should find products", async () => {
    // Given
    productRepository.find.resolves([
      {
        uuid: "some-uuid",
      } as Product,
    ]);

    // When
    const products = await productService.findAllProducts();

    // Then
    expect(products).not.toBeNull();
    expect(products.length).toBe(1);
    expect(products[0].uuid).toBe("some-uuid");
  });

  it("should find a product by uuid", async () => {
    // Given
    productRepository.findByUuid.withArgs("some-uuid").resolves({
      uuid: "some-uuid",
    } as Product);

    // When
    const product = await productService.findProductByUuid("some-uuid");

    // Then
    expect(product).not.toBeNull();
    expect(product?.uuid).toBe("some-uuid");
  });

  it("should return null if no product is found by uuid", async () => {
    // Given
    productRepository.findByUuid.withArgs("some-uuid").resolves(null);

    // When
    const foundProduct = await productService.findProductByUuid("some-uuid");

    // Then
    expect(foundProduct).toBeNull();
  });
});
