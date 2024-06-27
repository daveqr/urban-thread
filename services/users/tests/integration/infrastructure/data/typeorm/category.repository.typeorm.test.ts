import {CategoryEntity} from "../../../../../src/infrastructure/data/typeorm/entities/category.entity";
import {ProductEntity} from "../../../../../src/infrastructure/data/typeorm/entities/product.entity";
import HighlightedCategoryEntity
    from "../../../../../src/infrastructure/data/typeorm/entities/highlighted-category.entity";
import TypeORMCategoryRepository from "../../../../../src/infrastructure/data/typeorm/category.repository.typeorm";
import {faker} from "@faker-js/faker";
import {UuidIdGenerator} from "../../../../../src/utils/id-generator.util";
import {testDataSource} from "./test.data-source"

beforeAll(async () => {
    await testDataSource.initialize();
});

afterAll(async () => {
    await testDataSource.destroy();
});

beforeEach(async () => {
    await testDataSource.synchronize(true);
});

describe("TypeORMCategoryRepository", () => {
    let categoryRepository: TypeORMCategoryRepository;

    beforeEach(() => {
        categoryRepository = new TypeORMCategoryRepository(testDataSource);
    });

    async function populateSingleCategory() {
        const categoryEntity = new CategoryEntity();
        categoryEntity.name = faker.lorem.word();
        categoryEntity.description = faker.lorem.sentence();
        categoryEntity.slug = faker.lorem.slug();
        categoryEntity.uuid = new UuidIdGenerator().generateId()

        const productEntity = new ProductEntity();
        productEntity.name = faker.commerce.productName();
        productEntity.description = faker.lorem.paragraph();
        productEntity.categories = [categoryEntity];
        productEntity.slug = faker.lorem.slug();
        productEntity.uuid = new UuidIdGenerator().generateId()
        categoryEntity.products = [productEntity];

        await testDataSource.getRepository(ProductEntity).save(productEntity);
        await testDataSource.getRepository(CategoryEntity).save(categoryEntity);

        return categoryEntity;
    }

    it("should find categories", async () => {
        // Given
        const category1 = await populateSingleCategory();
        const category2 = await populateSingleCategory();

        // When
        const categories = await categoryRepository.find();

        // Then
        expect(categories.length).toBe(2);
        expect(categories[0].name).toBe(category1.name);
        expect(categories[1].name).toBe(category2.name);
        expect(categories[0]?.products?.length).toBe(1);
        expect(categories[0]?.products?.length).toBe(1);
        expect(categories[0]).toBeDefined();
        expect(categories[0].products).toBeDefined();
        // expect(categories[0].products[0]?.name).toBe(category1.products[0].name);

    });

    it("should find highlighted categories", async () => {
        // Given
        const category = await populateSingleCategory();
        const highlighted = new HighlightedCategoryEntity(category);
        highlighted.position = 1;

        await testDataSource.getRepository(HighlightedCategoryEntity as any).save(highlighted);

        // When
        const highlightedCategories = await categoryRepository.findHighlightedCategories();

        // Then
        expect(highlightedCategories.length).toBe(1);
        expect(highlightedCategories[0].name).toBe(category.name);
        expect(highlightedCategories[0].products!.length).toBe(1);
        expect(highlightedCategories[0].products![0].name).toBe(category.products[0].name);
        expect(highlightedCategories[0].position).toBe(1);
    });

    it('should find category by uuid', async () => {
        // Given
        const categoryEntity = await populateSingleCategory();

        // When
        const foundCategory = await categoryRepository.findByUuid(categoryEntity.uuid);

        // Then
        expect(foundCategory).not.toBeNull();
        expect(foundCategory!.uuid).toBe(foundCategory!.uuid);
        expect(foundCategory!.name).toBe(foundCategory!.name);
        expect(foundCategory!.description).toBe(foundCategory!.description);
        expect(foundCategory!.products).toHaveLength(1);
        // DFD
        expect(foundCategory!.products![0].name).toBe(foundCategory!.products![0].name);
    });

    it('should return null when category with non-existent UUID is queried', async () => {
        // Given
        await populateSingleCategory();

        // When
        const foundCategory = await categoryRepository.findByUuid("unknown");

        // Then
        expect(foundCategory).toBeNull();
    });
});