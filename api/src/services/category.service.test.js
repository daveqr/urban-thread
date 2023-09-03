
const Category = require('../schemas/category.schema');
const categoryService = require('./category.service');
const sinon = require('sinon');

describe('CategoryService', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('create()', () => {
        it('should call Category.create with categoryData and return the created category', async () => {
            const categoryData = { name: 'New Category' };
            const expectedCategory = { _id: '1', name: 'New Category' };

            // Create a mock for the Category.create method
            const createMock = sinon.stub(Category, 'create').resolves(expectedCategory);

            const result = await categoryService.create(categoryData);

            expect(result).toEqual(expectedCategory);
            expect(createMock.calledOnceWith(categoryData)).toBe(true);
        });

        it('should handle errors from Category.create', async () => {
            const categoryData = { name: 'New Category' };
            const error = new Error('Some error message');

            // Create a mock for the Category.create method that rejects with an error
            const createMock = sinon.stub(Category, 'create').rejects(error);

            try {
                await categoryService.create(categoryData);
                // Ensure this line is not reached if an error is thrown
                expect(true).toBe(false);
            } catch (err) {
                expect(err).toBe(error);
            }
            expect(createMock.calledOnceWith(categoryData)).toBe(true);
        });
    });

    describe('findById()', () => {
        it('should call Category.findById with the provided categoryId and populate edition and products', async () => {
            const categoryId = 'exampleCategoryId';
            const sampleEdition = { _id: 'editionId', name: 'Sample Edition' };
            const sampleProducts = [
                { _id: 'productId1', name: 'Product 1' },
                { _id: 'productId2', name: 'Product 2' },
            ];

            const expectedResult = {
                _id: categoryId,
                name: 'Example Category',
                edition: sampleEdition,
                products: sampleProducts,
            }

            const findByIdStub = sinon.stub(Category, 'findById').returns({
                populate: sinon.stub().returns({
                    populate: sinon.stub().returns(expectedResult)
                })
            })

            const result = await categoryService.findById(categoryId);

            expect(Category.findById.calledOnceWith(categoryId)).toBe(true);
            sinon.assert.calledOnce(findByIdStub);
            sinon.assert.calledOnce(findByIdStub().populate);
            sinon.assert.calledOnce(findByIdStub().populate().populate);
            expect(result).toBe(expectedResult);
        });

        it('should handle errors from Category.findById', async () => {
            const categoryId = 'exampleCategoryId';
            const error = new Error('Some error message');

            // Create a mock for the Category.findById method that throws an error
            const findByIdMock = sinon.stub(Category, 'findById').throws(error);

            try {
                await categoryService.findById(categoryId);
                // Ensure this line is not reached if an error is thrown
                expect(true).toBe(false);
            } catch (err) {
                expect(err).toBe(error);
            }
            expect(findByIdMock.calledOnceWith(categoryId)).toBe(true);
        });

    });
});
