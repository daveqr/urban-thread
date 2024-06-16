import HighlightedCategoryDto from "../../application/dtos/highlighted-category.dto";
import {combineLinks, createSelfLink} from "../../utils/linkUtils";
import {CATEGORY_BASE_URL} from "../../config/urls";

export class HighlightedCategoryResponseTransformer {
    static transform(categoryDto: HighlightedCategoryDto) {
        const selfLink = createSelfLink(CATEGORY_BASE_URL, categoryDto.uuid);
        const combinedLinks = combineLinks(selfLink);

        return {
            id: categoryDto.uuid,
            name: categoryDto.name,
            description: categoryDto.description,
            slug: categoryDto.slug,
            position: categoryDto.position,
            editionName: categoryDto.editionName,
            products: categoryDto.products,
            editionDescription: categoryDto.editionDescription,
            _links: combinedLinks,
            _embedded: {
                // products: categoryDto.productLinks,
            },
        };
    }
}
