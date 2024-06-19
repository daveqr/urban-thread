import {Link, ResourceLinks} from "../endpoints/hateoas.interfaces";

function createSelfLink(baseUrl: string, resourceId: string | undefined): Link {
    const href = `${baseUrl}/${resourceId}`;
    return {href};
}

// function combineLinks(...links: Link[]): ResourceLinks {
//     const combined: ResourceLinks = links.reduce((acc, link) => {
//         return {...acc, ...link};
//     }, {self: {href: ''}} as ResourceLinks);
//     return combined;
// }

function createCategoryLinks(categories: { id: string; name: string }[]): ResourceLinks {
    const categoryLinks: ResourceLinks = {self: {href: ''}};
    for (const category of categories) {
        const categoryId = category.id;
        categoryLinks[categoryId] = {
            rel: 'category',
            href: `/categories/${categoryId}`,
            name: category.name,
        };
    }
    return categoryLinks;
}

export {
    createSelfLink,
    // combineLinks,
    createCategoryLinks,
};
