import {CATEGORY_BASE_URL} from '../../config/urls';
import {createSelfLink} from '../../utils/linkUtils';
import Category from '../../core/models/category.model';
import {TransformationService} from '../transformation.service';
import {HighlightedCategory} from "../../core/models/highlighted-category.model";

export class HighlightedCategoryTransformationService implements TransformationService<Category, any> {
    transform(category: HighlightedCategory): any {
        return {
            ...category,
            position: category.position,
            _links: {
                self: createSelfLink(CATEGORY_BASE_URL, category.uuid),
            },
            _embedded: {
                // products: categoryDto.productLinks,
            },
        };
    }
}
