import {CATEGORY_BASE_URL} from '../../config/urls';
import {combineLinks, createSelfLink} from '../../utils/linkUtils';
import {CategoryDto} from "../../application/dtos/category.dto";

export class CategoryResponseTransformer {
    static transform(categoryDto: CategoryDto) {
        const selfLink = createSelfLink(CATEGORY_BASE_URL, categoryDto.uuid);
        const combinedLinks = combineLinks(selfLink);

        return {
            id: categoryDto.uuid,
            name: categoryDto.name,
            description: categoryDto.description,
            slug: categoryDto.slug,
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
