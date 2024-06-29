import Category from '../../core/models/category.model';
import {TransformationService} from '../transformation.service';
import {HighlightedCategory} from "../../core/models/highlighted-category.model";
import {injectable} from "tsyringe";
import {createSelfLink} from "../../utils/linkUtils";

@injectable()
export class CategoryTransformationService implements TransformationService<Category, any> {
    transform(category: Category): any {
        return {
            ...category,
            _links: {
                self: createSelfLink("/categories", category.uuid),
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