import { Product } from "./product.model";

interface Category {
  uuid: string;
  name?: string;
  description?: string;
  products?: Product[];
  editionName?: string;
  editionDescription?: string;
  slug: string;
}

export default Category;
