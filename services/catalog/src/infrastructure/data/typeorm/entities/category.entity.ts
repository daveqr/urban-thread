import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity("categories")
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  uuid!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false, unique: true })
  slug!: string;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products!: ProductEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  ensureProducts() {
    if (!this.products) {
      this.products = [];
    }
  }

  // @ManyToOne(() => Edition, edition => edition.categories)
  // edition: Edition;
}
