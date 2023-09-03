
function createSelfLink(baseUrl, resourceId) {
    const selfLink = {
        self: {
            href: `${baseUrl}/${resourceId}`,
        },
    };
    return selfLink;
}

function combineLinks(...links) {
    return links.reduce((combined, link) => {
        return { ...combined, ...link };
    }, {});
}

function createCategoryLinks(categories) {
    const categoryLinks = {};
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

module.exports = {
    createSelfLink,
    combineLinks,
    createCategoryLinks,
};
