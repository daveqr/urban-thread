import { CATEGORY_BASE_URL } from "../urls";
import { createSelfLink } from "../../utils/linkUtils";
import Category from "../../core/models/category.model";
import { TransformationService } from "../transformation.service";
import { HighlightedCategory } from "../../core/models/highlighted-category.model";
import { injectable } from "tsyringe";
import { Link } from "../hateoas.interfaces";

export interface TransformedCategory {
  _links: {
    self: Link;
  };
  _embedded?: Record<string, never>;
}

export interface TransformedHighlightedCategory extends TransformedCategory {
  position: number;
}

@injectable()
export class CategoryTransformationService
  implements TransformationService<Category, TransformedCategory>
{
  transform(category: Category): TransformedCategory {
    return {
      ...category,
      _links: {
        self: createSelfLink(CATEGORY_BASE_URL, category.uuid),
      },
      _embedded: {
        // products: category.productLinks,
      },
    } as TransformedCategory;
  }
}

@injectable()
export class HighlightedCategoryTransformationService
  extends CategoryTransformationService
  implements
    TransformationService<HighlightedCategory, TransformedHighlightedCategory>
{
  transform(category: HighlightedCategory): TransformedHighlightedCategory {
    const transformedCategory = super.transform(category);
    return {
      ...transformedCategory,
      position: category.position,
    } as TransformedHighlightedCategory;
  }
}
