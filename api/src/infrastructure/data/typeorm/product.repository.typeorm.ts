import {ProductRepository} from "../../../core/repositories/product.repository";
import {ProductEntity} from "./entities/product.entity";
import Category from "../../../core/models/category.model";
import {DataSource} from "typeorm";
import {Product} from "../../../core/models/product.model";

class TypeORMProductRepository implements ProductRepository {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async find(): Promise<Product[]> {
        const productRepository = this.dataSource.getRepository(ProductEntity);
        const products = await productRepository.find({relations: ["categories"]});

        return products.map((productEntity): Product => {
            const categories = productEntity.categories.map(categoryEntity =>
                new Category(categoryEntity.uuid, categoryEntity.name, categoryEntity.description)
            );

            return {
                ...productEntity,
                categories: categories
            };
        });
    }

    async findByUuid(uuid: string): Promise<Product | null> {
        const productRepository = this.dataSource.getRepository(ProductEntity);
        const productEntity = await productRepository.findOne({
            where: {uuid},
            relations: ["categories"]
        });

        return productEntity ? this.mapEntityToProduct(productEntity) : null;
    }

    private mapEntityToProduct(productEntity: ProductEntity): Product {
        const categories = productEntity.categories.map(categoryEntity => new Category(
            categoryEntity.uuid,
            categoryEntity.name,
        ));

        return {
            ...productEntity,
            categories: categories
        };
    }

}

export default TypeORMProductRepository;
