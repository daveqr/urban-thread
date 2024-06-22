import "reflect-metadata"
import {createStubInstance, SinonStubbedInstance} from "sinon";
import CategoryServiceImpl from "../../../../../src/core/categories/category.service.impl";
import {CategoryRepository} from "../../../../../src/core/repositories/category.repository";
import {CategoryRepositoryTestDouble} from "../../../test-doubles/category.repository.test-double";
import Category from "../../../../../src/core/models/category.model";


describe("CategoryServiceImpl tests", () => {
    let categoryRepository: SinonStubbedInstance<CategoryRepository>;
    let categoryService: CategoryServiceImpl;

    beforeEach(() => {
        categoryRepository = createStubInstance<CategoryRepository>(CategoryRepositoryTestDouble as any);
        categoryService = new CategoryServiceImpl(categoryRepository);
    });

    describe("findAllCategories", () => {
        it("should find categories", async () => {
            // Given
            categoryRepository.find.resolves([{
                uuid: "some-uuid",
            } as Category]);

            // When
            const categories = await categoryService.findAllCategories();

            // Then
            expect(categories).not.toBeNull();
            expect(categories.length).toBe(1);
            expect(categories[0].uuid).toBe("some-uuid");
        });
    });

    it("should find a category by uuid", async () => {
        // Given
        categoryRepository.findByUuid.withArgs('some-uuid').resolves({
            uuid: 'some-uuid',
        } as Category);

        // When
        const category = await categoryService.findCategoryByUuid('some-uuid');

        // Then
        expect(category).not.toBeNull();
        expect(category?.uuid).toBe('some-uuid');
    });

    it("should return null if no category is found by uuid", async () => {
        // Given
        categoryRepository.findByUuid.withArgs('some-uuid').resolves(null);

        // When
        const foundProduct = await categoryService.findCategoryByUuid('some-uuid');

        // Then
        expect(foundProduct).toBeNull();
    });
});
