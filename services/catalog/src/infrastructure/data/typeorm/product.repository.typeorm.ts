import { ProductRepository } from "../../../core/repositories/product.repository";
import { ProductEntity } from "./entities/product.entity";
import { DataSource } from "typeorm";
import { Product } from "../../../core/models/product.model";
import { mapEntityToProduct, mapToDomainCategories } from "./mapper";
import { inject, injectable } from "tsyringe";

@injectable()
class TypeORMProductRepository implements ProductRepository {
  constructor(@inject("DataSource") private dataSource: DataSource) {}

  async find(): Promise<Product[]> {
    const productRepository = this.dataSource.getRepository(ProductEntity);
    const productEntities = await productRepository.find({
      relations: ["categories"],
    });

    // DFD add this to the mapper
    return productEntities.map((productEntity): Product => {
      return {
        ...productEntity,
        categories: mapToDomainCategories(productEntity.categories),
      } as Product;
    });
  }

  async findByUuid(uuid: string): Promise<Product | null> {
    const productRepository = this.dataSource.getRepository(ProductEntity);
    const productEntity = await productRepository.findOne({
      where: { uuid },
      relations: ["categories"],
    });

    return productEntity ? mapEntityToProduct(productEntity) : null;
  }
}

export default TypeORMProductRepository;
