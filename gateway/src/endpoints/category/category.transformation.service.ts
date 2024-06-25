import {CATEGORY_BASE_URL} from '../urls';
import {createSelfLink} from '../../utils/linkUtils';
import Category from '../../core/models/category.model';
import {TransformationService} from '../transformation.service';
import {HighlightedCategory} from "../../core/models/highlighted-category.model";
import {injectable} from "tsyringe";

@injectable()
export class CategoryTransformationService implements TransformationService<Category, any> {
    transform(category: Category): any {
        return {
            ...category,
            _links: {
                self: createSelfLink(CATEGORY_BASE_URL, category.uuid),
            },
            _embedded: {
                // products: category.productLinks,
            },
        };
    }
}

@injectable()
export class HighlightedCategoryTransformationService extends CategoryTransformationService
    implements TransformationService<HighlightedCategory, any> {
    transform(category: HighlightedCategory): any {
        const transformedCategory = super.transform(category);
        return {
            ...transformedCategory,
            position: category.position,
        };
    }
}