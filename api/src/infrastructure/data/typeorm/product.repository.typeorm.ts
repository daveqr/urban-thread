import {ProductRepository} from "../../../core/repositories/product.repository";
import {ProductEntity} from "./entities/product.entity";
import {DataSource} from "typeorm";
import {Product} from "../../../core/models/product.model";
import {mapEntityToProduct, mapToDomainCategories} from "./mapper";

class TypeORMProductRepository implements ProductRepository {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    async find(): Promise<Product[]> {
        const productRepository = this.dataSource.getRepository(ProductEntity);
        const productEntities = await productRepository.find({relations: ["categories"]});

        return productEntities.map((productEntity): Product => {
            return {
                ...productEntity,
                categories: mapToDomainCategories(productEntity.categories)
            } as Product;
        });
    }

    async findByUuid(uuid: string): Promise<Product | null> {
        const productRepository = this.dataSource.getRepository(ProductEntity);
        const productEntity = await productRepository.findOne({
            where: {uuid},
            relations: ["categories"]
        });

        return productEntity ? mapEntityToProduct(productEntity) : null;
    }
}

export default TypeORMProductRepository;
