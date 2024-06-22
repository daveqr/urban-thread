import "reflect-metadata"
import sinon, {SinonStubbedInstance} from 'sinon';
import Category from "../../../../src/core/models/category.model";
import {CategoryServiceTestDouble} from "../../test-doubles/category'.service.test-double";
import {CategoryService} from "../../../../src/core/services/category.service";
import CategoryUseCase from "../../../../src/application/usecases/category.usecase";

describe("CategoryUseCase tests", () => {
    let categoryService: SinonStubbedInstance<CategoryService>;
    let categoryUseCase: CategoryUseCase;

    beforeEach(() => {
        categoryService = sinon.createStubInstance<CategoryService>(CategoryServiceTestDouble as any);
        categoryUseCase = new CategoryUseCase(categoryService);
    });

    it('should find a category by uuid', async () => {
        // Given
        categoryService.findCategoryByUuid.withArgs('some-uuid').resolves(
            {
                uuid: 'some-uuid'
            } as Category
        );

        // When
        const foundCategory = await categoryUseCase.findByUuid('some-uuid');

        // Then
        expect(foundCategory).not.toBeNull();
        expect(foundCategory?.uuid).toBe('some-uuid');
    });

    it('should return null when category with non-existent UUID is queried', async () => {
        // Given
        categoryService.findCategoryByUuid.withArgs('nonexistent').resolves(null);

        // When
        const category = await categoryUseCase.findByUuid('nonexistent');

        // Then
        expect(category).toBeNull();
    });
});
