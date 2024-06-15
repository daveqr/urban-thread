import {ProductRepository} from "../../../domain/repositories/product.repository";
import Product from "../../../domain/models/product.model";
import {AppDataSource} from "../../../../data-source";
import {ProductEntity} from "../../../../entities/product.entity";
import Category from "../../../domain/models/category.model";

class SQLiteProductRepository implements ProductRepository {
    async find(): Promise<Product[]> {
        const repo = AppDataSource.getRepository(ProductEntity);
        const products = await repo.find({relations: ["categories"]});

        return products.map((productEntity) => {
            const categories = productEntity.categories.map(categoryEntity =>
                new Category(categoryEntity.id, categoryEntity.name, categoryEntity.description)
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
