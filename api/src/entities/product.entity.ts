import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {CategoryEntity} from "./category.entity";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true})
    name?: string;

    @Column({nullable: true})
    description?: string;

    @ManyToMany(() => CategoryEntity, category => category.products)
    @JoinTable()
    categories!: CategoryEntity[];

    // @ManyToOne(() => Edition, edition => edition.categories)
    // edition: Edition;
}
