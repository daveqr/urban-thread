import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoryEntity } from "./category.entity";

@Entity("products")
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  uuid!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  slug!: string;

  @ManyToMany(() => CategoryEntity, (categoryEntity) => categoryEntity.products)
  @JoinTable()
  categories!: CategoryEntity[];

  // @ManyToOne(() => Edition, edition => edition.categories)
  // edition: Edition;
}
