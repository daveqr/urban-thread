import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoryEntity } from "./category.entity";

@Entity("highlighted_categories")
class HighlightedCategoryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  position!: number;

  @ManyToOne(() => CategoryEntity, { nullable: false })
  @JoinColumn({ name: "categoryId" })
  category: CategoryEntity;

  constructor(category: CategoryEntity) {
    this.category = category;
  }
}

export default HighlightedCategoryEntity;
