import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
// import {Product} from "./Product";
// import {Edition} from "./Edition";

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: true})
    name?: string;

    @Column({nullable: true})
    description?: string;

    // @OneToMany(() => Product, product => product.category)
    // products: Product[];

    // @ManyToOne(() => Edition, edition => edition.categories)
    // edition: Edition;
}
