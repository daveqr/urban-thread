import {CategoryRepository} from "../../../../src/core/repositories/category.repository";
import sinon, {SinonStubbedInstance} from 'sinon';
import CategoryServiceImpl from "../../../../src/core/categories/category.service.impl";
import CategoryUseCase from "../../../../src/application/usecases/category.usecase";
import {CategoryRepositoryTestDouble} from "../../test-doubles/category.repository.test-double";
import Category from "../../../../src/core/models/category.model";
import {CategoryDto} from "../../../../src/application/dtos/category.dto";

describe("Category use case", () => {
    let categoryService: CategoryServiceImpl;
    let categoryUseCase: CategoryUseCase;
    let categoryRepository: SinonStubbedInstance<CategoryRepository>;

    beforeEach(() => {
        categoryService = sinon.createStubInstance(CategoryServiceImpl);

        categoryRepository = sinon.createStubInstance<CategoryRepository>(CategoryRepositoryTestDouble);
        categoryRepository.find.resolves([]);
        categoryRepository.findByUuid.withArgs('some-uuid').resolves(new Category('some-uuid'));

        categoryUseCase = new CategoryUseCase(categoryRepository, categoryService);
    });

    it('should find product by uuid', async () => {
        // When
        const foundCategory = await categoryUseCase.findByUuid('some-uuid');

        // Then
        expect(foundCategory).not.toBeNull();
        expect(foundCategory).toBeInstanceOf(CategoryDto);
        expect(foundCategory?.uuid).toBe('some-uuid');
    });

    it('should return null when category with non-existent UUID is queried', async () => {
        // Given
        categoryRepository.findByUuid.withArgs('nonexistent').resolves(null);

        // When
        const foundCategory = await categoryUseCase.findByUuid('nonexistent');

        // Then
        expect(foundCategory).toBeNull();
    });
});
