import {CATEGORY_BASE_URL} from '../../config/urls';
import {combineLinks, createSelfLink} from '../../utils/linkUtils';
import Category from "../../core/models/category.model";

export class CategoryResponseTransformer {
    static transform(category: Category) {
        const selfLink = createSelfLink(CATEGORY_BASE_URL, category.uuid);
        const combinedLinks = combineLinks(selfLink);

        return {
            id: category.uuid,
            name: category.name,
            description: category.description,
            slug: category.slug,
            editionName: category.editionName,
            products: category.products,
            editionDescription: category.editionDescription,
            _links: combinedLinks,
            _embedded: {
                // products: categoryDto.productLinks,
            },
        };
    }
}
