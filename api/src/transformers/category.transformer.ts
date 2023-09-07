import { CATEGORY_BASE_URL } from '../config/urls';
import * as linkUtils from '../utils/linkUtils';

interface CategoryModel {
  id: string;
  name: string;
  description: string;
  category: {
    edition: {
      name: string;
      description: string;
    };
  };
  productLinks: any[];
}

export class CategoryTransformer {
  static transform(categoryModel: CategoryModel) {
    const selfLink = linkUtils.createSelfLink(CATEGORY_BASE_URL, categoryModel.id);
    const combinedLinks = linkUtils.combineLinks(selfLink);

    return {
      id: categoryModel.id,
      name: categoryModel.name,
      description: categoryModel.description,
      editionName: categoryModel.category.edition.name,
      editionDescription: categoryModel.category.edition.description,
      _links: combinedLinks,
      _embedded: {
        products: categoryModel.productLinks,
      },
    };
  }
}
