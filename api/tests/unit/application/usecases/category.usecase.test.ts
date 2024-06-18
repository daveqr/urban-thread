import {CategoryRepository} from "../../../../src/core/repositories/category.repository";
import sinon, {SinonStubbedInstance} from 'sinon';
import CategoryService from "../../../../src/core/services/category.service";
import CategoryUseCase from "../../../../src/application/usecases/category.usecase";
import {CategoryRepositoryTestDouble} from "./category.repository.test-double";
import Category from "../../../../src/core/models/category.model";
import {CategoryDto} from "../../../../src/application/dtos/category.dto";

describe("Category use case", () => {
    let categoryService: CategoryService;
    let categoryUseCase: CategoryUseCase;
    let productRepository: SinonStubbedInstance<CategoryRepository>;

    beforeEach(() => {
        categoryService = sinon.createStubInstance(CategoryService);

        productRepository = sinon.createStubInstance<CategoryRepository>(CategoryRepositoryTestDouble);
        productRepository.find.resolves([]);
        productRepository.findByUuid.withArgs('some-uuid').resolves(new Category('some-uuid'));

        categoryUseCase = new CategoryUseCase(productRepository, categoryService);
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
        productRepository.findByUuid.withArgs('nonexistent').resolves(null);

        // When
        const foundCategory = await categoryUseCase.findByUuid('nonexistent');

        // Then
        expect(foundCategory).toBeNull();
    });
});
