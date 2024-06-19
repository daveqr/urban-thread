import {combineLinks, createSelfLink} from "../../utils/linkUtils";
import {CATEGORY_BASE_URL} from "../../config/urls";
import {HighlightedCategory} from "../../core/models/highlighted-category.model";

export class HighlightedCategoryResponseTransformer {
    static transform(category: HighlightedCategory) {
        const selfLink = createSelfLink(CATEGORY_BASE_URL, category.uuid);
        const combinedLinks = combineLinks(selfLink);

        return {
            id: category.uuid,
            name: category.name,
            description: category.description,
            slug: category.slug,
            position: category.position,
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
