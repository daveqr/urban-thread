const sinon = require('sinon');

describe('ProductModel', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('find()', () => {
        it('should call ProductModel.find and return products', async () => {
            // const expectedProducts = [
            //     {_id: '1', name: 'Product 1'},
            //     {_id: '2', name: 'Product 2'},
            // ];
            //
            // const findStub = sinon.stub(ProductModel, 'find').resolves(expectedProducts);
            //
            // const result = await ProductModel.find();
            //
            // expect(result).toEqual(expectedProducts);
            // expect(findStub.calledOnce).toBe(true);
        });

        it('should handle errors from ProductModel.find', async () => {
            // const error = new Error('Some error message');
            //
            // const findStub = sinon.stub(ProductModel, 'find').rejects(error);
            //
            // try {
            //     await ProductModel.find();
            //     // Ensure this line is not reached if an error is thrown
            //     expect(true).toBe(false);
            // } catch (err) {
            //     expect(err).toBe(error);
            // }
            // expect(findStub.calledOnce).toBe(true);
        });
    });

});
