import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductEntity} from "./product.entity";
// import {Product} from "./Product";
// import {Edition} from "./Edition";

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false})
    name!: string;

    @Column({nullable: true})
    description?: string;

    @Column({nullable: false})
    slug!: string;

    @ManyToMany(() => ProductEntity, product => product.categories)
    products!: ProductEntity[];

    // @ManyToOne(() => Edition, edition => edition.categories)
    // edition: Edition;
}
