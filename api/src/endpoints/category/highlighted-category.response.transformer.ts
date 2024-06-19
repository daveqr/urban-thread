import {createSelfLink} from "../../utils/linkUtils";
import {CATEGORY_BASE_URL} from "../../config/urls";
import {HighlightedCategory} from "../../core/models/highlighted-category.model";
import {ResourceLinks} from "../hateoas.interfaces";

export class HighlightedCategoryResponseTransformer {
    static transform(category: HighlightedCategory): any {
        const selfLink = createSelfLink(CATEGORY_BASE_URL, category.uuid);
        // const combinedLinks = combineLinks(selfLink);

        const links: ResourceLinks = {
            self: selfLink,
        };

        return {
            id: category.uuid,
            name: category.name,
            description: category.description,
            slug: category.slug,
            editionName: category.editionName,
            products: category.products,
            position: category.position,
            editionDescription: category.editionDescription,
            _links: links,
            _embedded: {
                // products: categoryDto.productLinks,
            },
        };
    }
}
