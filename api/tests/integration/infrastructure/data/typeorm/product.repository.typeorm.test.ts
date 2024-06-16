import {DataSource} from "typeorm";
import {CategoryEntity} from "../../../../../src/infrastructure/data/typeorm/entities/category.entity";
import {ProductEntity} from "../../../../../src/infrastructure/data/typeorm/entities/product.entity";
import TypeORMProductRepository from "../../../../../src/infrastructure/data/typeorm/product.repository.typeorm";

const testDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    entities: [CategoryEntity, ProductEntity],
    logging: false,
});

beforeAll(async () => {
    await testDataSource.initialize();
});

afterAll(async () => {
    await testDataSource.destroy();
});

beforeEach(async () => {
    await testDataSource.synchronize(true);
});

describe("SQLiteProductRepository", () => {
    let productRepository: TypeORMProductRepository;

    beforeEach(() => {
        productRepository = new TypeORMProductRepository(testDataSource);
    });


    it('should find products', async () => {
        // Given
        const category = new CategoryEntity();
        category.name = 'TestCategory';
        category.description = 'Test category description';
        category.slug = 'cat-slug';

        const product = new ProductEntity();
        product.name = 'Test Product';
        product.description = 'Test product description';
        product.categories = [category];
        product.slug = "the-slug";
        category.products = [product];

        await testDataSource.getRepository(ProductEntity).save(product);
        await testDataSource.getRepository(CategoryEntity).save(category);

        // When
        const products = await productRepository.find();

        // Then
        expect(products).toHaveLength(1);
        expect(products[0].name).toBe('Test Product');
        expect(products[0].description).toBe('Test product description');
        expect(products[0].categories).toHaveLength(1);
        expect(products[0].categories[0].name).toBe('TestCategory');
    });
});