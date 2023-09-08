import { CATEGORY_BASE_URL } from '../config/urls';
import { createSelfLink, combineLinks } from '../utils/linkUtils';
import CategoryModel from '../models/category.model';

export class CategoryTransformer {
  static transform(categoryModel: CategoryModel) {
    const selfLink = createSelfLink(CATEGORY_BASE_URL, categoryModel.id);
    const combinedLinks = combineLinks(selfLink);

    return {
      id: categoryModel.id,
      name: categoryModel.name,
      description: categoryModel.description,
      editionName: categoryModel.editionName,
      editionDescription: categoryModel.editionDescription,
      _links: combinedLinks,
      _embedded: {
        products: categoryModel.productLinks,
      },
    };
  }
}
