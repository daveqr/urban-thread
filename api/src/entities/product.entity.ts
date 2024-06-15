import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ProductEntity {
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
