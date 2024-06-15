import {CATEGORY_BASE_URL} from '../config/urls';
import {combineLinks, createSelfLink} from '../utils/linkUtils';
import {CategoryDto} from "../onion/application/dtos/category.dto";

export class CategoryTransformer {
    static transform(categoryDto: CategoryDto) {
        const selfLink = createSelfLink(CATEGORY_BASE_URL, categoryDto.id);
        const combinedLinks = combineLinks(selfLink);

        return {
            id: categoryDto.id,
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
