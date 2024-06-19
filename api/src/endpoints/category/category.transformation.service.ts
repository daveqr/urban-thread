import {CATEGORY_BASE_URL} from '../../config/urls';
import {createSelfLink} from '../../utils/linkUtils';
import Category from '../../core/models/category.model';
import {TransformationService} from '../transformation.service';

export class CategoryTransformationService implements TransformationService<Category, any> {
    transform(category: Category): any {
        return {
            ...category,
            _links: {
                self: createSelfLink(CATEGORY_BASE_URL, category.uuid),
            },
            _embedded: {
                // products: categoryDto.productLinks,
            },
        };
    }
}
