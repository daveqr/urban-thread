import {ProductRepository} from "../../../domain/repositories/product.repository";
import Product from "../../../domain/models/product.model";
import {AppDataSource} from "../../../../data-source";
import {ProductEntity} from "../../../../entities/product.entity";

class SQLiteProductRepository implements ProductRepository {
    async find(): Promise<Product[]> {
        const repo = AppDataSource.getRepository(ProductEntity);
        const products = await repo.find();
        return products.map((product) => new Product(product));
    }

    async findById(id: any): Promise<Product | null> {
        // const categoryRepo = AppDataSource.getRepository(Category);
        // const category = await categoryRepo.findOne(categoryId, {relations: ["products", "edition"]});
        // return category ? new CategoryModel(category) : null;
        return null;
    }

}

export default SQLiteProductRepository;
