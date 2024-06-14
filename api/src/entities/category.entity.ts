import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
// import {Product} from "./Product";
// import {Edition} from "./Edition";

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    // @OneToMany(() => Product, product => product.category)
    // products: Product[];

    // @ManyToOne(() => Edition, edition => edition.categories)
    // edition: Edition;
}
