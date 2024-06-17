import {ProductRepository} from "../../../core/repositories/product.repository";
import Product from "../../../core/models/product.model";
import {ProductEntity} from "./entities/product.entity";
import Category from "../../../core/models/category.model";
import {DataSource} from "typeorm";

class TypeORMProductRepository implements ProductRepository {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async find(): Promise<Product[]> {
        const productRepository = this.dataSource.getRepository(ProductEntity);
        const products = await productRepository.find({relations: ["categories"]});

        return products.map((productEntity) => {
            const categories = productEntity.categories.map(categoryEntity =>
                new Category(categoryEntity.uuid, categoryEntity.name, categoryEntity.description)
            );
            return new Product(productEntity.uuid, productEntity.name, productEntity.description, categories);
        });
    }

    async findByUuid(uuid: string): Promise<Product | null> {
        const productRepository = this.dataSource.getRepository(ProductEntity);
        const productEntity = await productRepository.findOne({
            where: {uuid},
            relations: ["categories"]
        });

        if (!productEntity) {
            return null;
        }

        return this.mapEntityToProduct(productEntity);
    }

    private mapEntityToProduct(productEntity: ProductEntity): Product {
        const categories = productEntity.categories.map(categoryEntity => new Category(
            categoryEntity.uuid,
            categoryEntity.name,
        ));

        return new Product(
            productEntity.uuid,
            productEntity.name,
            productEntity.description,
            categories,
            productEntity.slug
        );
    }

}

export default TypeORMProductRepository;
