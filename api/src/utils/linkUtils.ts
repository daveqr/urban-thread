function createSelfLink(baseUrl: string, resourceId: string) {
    const selfLink = {
        self: {
            href: `${baseUrl}/${resourceId}`,
        },
    };
    return selfLink;
}

function combineLinks(...links: Record<string, any>[]) {
    return links.reduce((combined, link) => {
        return { ...combined, ...link };
    }, {});
}

function createCategoryLinks(categories: { id: string; name: string }[]) {
    const categoryLinks: Record<string, any> = {};
    for (const category of categories) {
        const categoryId: string = category.id;
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
    combineLinks,
    createCategoryLinks,
};
