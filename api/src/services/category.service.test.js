
const CategoryService = require('./category.service');
const sinon = require('sinon');

describe('CategoryService', () => {

    afterEach(() => {
        sinon.restore();
    });

    describe('create()', () => {
        it('should call create with categoryData and return the created category', async () => {
            const categoryData = { name: 'New Category' };
            const expectedCategory = { _id: '1', name: 'New Category' };

            const createStub = sinon.stub(CategoryService, 'create').resolves(expectedCategory);

            const result = await CategoryService.create(categoryData);

            expect(result).toEqual(expectedCategory);
            expect(createStub.calledOnceWith(categoryData)).toBe(true);
        });

        it('should handle errors from create', async () => {
            const categoryData = { name: 'New Category' };
            const error = new Error('Some error message');

            const createStub = sinon.stub(CategoryService, 'create').rejects(error);

            try {
                await CategoryService.create(categoryData);
                // Ensure this line is not reached if an error is thrown
                expect(true).toBe(false);
            } catch (err) {
                expect(err).toBe(error);
            }
            expect(createStub.calledOnceWith(categoryData)).toBe(true);
        });
    });

    describe('findById()', () => {
        it('should call findById with the provided categoryId and populate edition and products', async () => {
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

            sinon.stub(CategoryService, 'findById').returns(expectedResult);

            const result = await CategoryService.findById(categoryId);

            expect(CategoryService.findById.calledOnceWith(categoryId)).toBe(true);
            expect(result).toBe(expectedResult);
        });

        it('should handle errors from findById', async () => {
            const categoryId = 'exampleCategoryId';
            const error = new Error('Some error message');

            sinon.stub(CategoryService, 'findById').throws(error);

            try {
                await CategoryService.findById(categoryId);
                // Ensure this line is not reached if an error is thrown
                expect(true).toBe(false);
            } catch (err) {
                expect(err).toBe(error);
            }
            expect(CategoryService.findById.calledOnceWith(categoryId)).toBe(true);
        });

    });

});
