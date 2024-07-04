import Category from "./category.model";

export interface Product {
  productLinks?: any[];
  uuid: string;
  description?: string;
  name?: string;
  slug?: string;
  categories?: Category[];
  editionName?: string;
  editionDescription?: string;
}
