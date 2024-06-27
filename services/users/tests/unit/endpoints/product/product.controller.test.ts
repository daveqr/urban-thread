import "reflect-metadata"
import sinon, {SinonStubbedInstance} from 'sinon';
import ProductUseCaseImpl from "../../../../src/application/usecases/user.usecase";
import UserController from "../../../../src/endpoints/users/user.controller";
import {Product} from "../../../../src/core/models/product.model";

const httpMocks = require('node-mocks-http');

describe("Product controller", () => {
    let productUseCase: SinonStubbedInstance<ProductUseCaseImpl>;
    let productController: UserController;

    beforeEach(() => {
        productUseCase = sinon.createStubInstance(ProductUseCaseImpl as any);
        productController = new UserController(productUseCase);
    });

    it("should find all products", async () => {
        const request = httpMocks.createRequest();
        const response = httpMocks.createResponse();

        const mockProducts = [
            {uuid: "1"} as Product,
            {uuid: "2"} as Product
        ];
        productUseCase.findAllProducts.resolves(mockProducts);

        // Call the controller method
        await productController.findAllProducts(request, response);

        // Assertions
        const data = response._getJSONData();
        expect(data.length).toBe(2);
        expect(response.statusCode).toEqual(200);
    });

    it("should handle errors", async () => {
        const request = httpMocks.createRequest();
        const response = httpMocks.createResponse();

        // Stub the productUseCase.findAllProducts method to throw an error
        productUseCase.findAllProducts.rejects(new Error("Database error"));

        // Call the controller method
        await productController.findAllProducts(request, response);

        // Assertions
        const jsonResponse = response._getJSONData();
        expect(jsonResponse).toEqual({error: 'Failed to fetch products'});
        expect(response.statusCode).toEqual(500);
    });
});
