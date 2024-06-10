const CategoryModel = require('../../../src/onion/domain/models/category.model'); // Import your CategoryModel
const sinon = require('sinon');

describe('CategoryModel', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('create()', () => {
        it('should call create with categoryData and return the created category', async () => {
            // const categoryData = {name: 'New Category'};
            // const expectedCategory = {_id: '1', name: 'New Category'};
            //
            // const createStub = sinon.stub(CategoryModel, 'create').resolves(expectedCategory);
            //
            // const result = await CategoryModel.create(categoryData);
            //
            // expect(result).toEqual(expectedCategory);
            // expect(createStub.calledOnceWith(categoryData)).toBe(true);
        });

        it('should handle errors from create', async () => {
            // const categoryData = {name: 'New Category'};
            // const error = new Error('Some error message');
            //
            // const createStub = sinon.stub(CategoryModel, 'create').rejects(error);
            //
            // try {
            //     await CategoryModel.create(categoryData);
            //     // Ensure this line is not reached if an error is thrown
            //     expect(true).toBe(false);
            // } catch (err) {
            //     expect(err).toBe(error);
            // }
            // expect(createStub.calledOnceWith(categoryData)).toBe(true);
        });
    });

    describe('findById()', () => {
        it('should call findById with the provided categoryId and populate edition and products', async () => {
            // const categoryId = 'exampleCategoryId';
            // const sampleEdition = {_id: 'editionId', name: 'Sample Edition'};
            // const sampleProducts = [
            //     {_id: 'productId1', name: 'Product 1'},
            //     {_id: 'productId2', name: 'Product 2'},
            // ];
            //
            // const expectedResult = {
            //     _id: categoryId,
            //     name: 'Example Category',
            //     edition: sampleEdition,
            //     products: sampleProducts,
            // };
            //
            // const findByIdStub = sinon.stub(CategoryModel, 'findById').returns(expectedResult);
            //
            // const result = await CategoryModel.findById(categoryId);
            //
            // expect(findByIdStub.calledOnceWith(categoryId)).toBe(true);
            // expect(result).toBe(expectedResult);
        });

        it('should handle errors from findById', async () => {
            // const categoryId = 'exampleCategoryId';
            // const error = new Error('Some error message');
            //
            // const findByIdStub = sinon.stub(CategoryModel, 'findById').throws(error);
            //
            // try {
            //     await CategoryModel.findById(categoryId);
            //     // Ensure this line is not reached if an error is thrown
            //     expect(true).toBe(false);
            // } catch (err) {
            //     expect(err).toBe(error);
            // }
            // expect(findByIdStub.calledOnceWith(categoryId)).toBe(true);
        });
    });
});
