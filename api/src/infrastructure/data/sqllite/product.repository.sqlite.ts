import {ProductRepository} from "../../../core/repositories/product.repository";
import Product from "../../../core/models/product.model";
import {ProductEntity} from "./entities/product.entity";
import Category from "../../../core/models/category.model";
import {DataSource} from "typeorm";

class SQLiteProductRepository implements ProductRepository {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async find(): Promise<Product[]> {
        const repo = this.dataSource.getRepository(ProductEntity);
        const products = await repo.find({relations: ["categories"]});

        return products.map((productEntity) => {
            const categories = productEntity.categories.map(categoryEntity =>
                new Category(categoryEntity.uuid, categoryEntity.name, categoryEntity.description)
            );
            return new Product(productEntity.id, productEntity.name, productEntity.description, categories);
        });
    }

    async findById(id: any): Promise<Product | null> {
        // const categoryRepo = AppDataSource.getRepository(Category);
        // const category = await categoryRepo.findOne(categoryId, {relations: ["products", "edition"]});
        // return category ? new CategoryModel(category) : null;
        return null;
    }

}

export default SQLiteProductRepository;
