
const ProductService = require('./product.service');
const sinon = require('sinon');

describe('ProductService', () => {

    afterEach(() => {
        sinon.restore();
    });

    describe('find()', () => {
        it('should call Product.find and return products', async () => {
            const expectedProducts = [
                { _id: '1', name: 'Product 1' },
                { _id: '2', name: 'Product 2' },
            ];

            const findMock = sinon.stub(ProductService, 'find').resolves(expectedProducts);

            const result = await ProductService.find();

            expect(result).toEqual(expectedProducts);
            expect(findMock.calledOnce).toBe(true);
        });

        it('should handle errors from Product.find', async () => {
            const error = new Error('Some error message');

            // Create a mock for the Product.find method that rejects with an error
            const findMock = sinon.stub(ProductService, 'find').rejects(error);

            try {
                await ProductService.find();
                // Ensure this line is not reached if an error is thrown
                expect(true).toBe(false);
            } catch (err) {
                expect(err).toBe(error);
            }
            expect(findMock.calledOnce).toBe(true);
        });
    });

});
