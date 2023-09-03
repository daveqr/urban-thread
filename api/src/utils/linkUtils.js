
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

function groupProductLinksByCategory(categories) {
    const result = {};

    for (const category of categories) {
        const categoryId = category.id;
        const hasNoProducts = !category.products || category.products.length === 0;

        if (hasNoProducts) {
            result[categoryId] = [];
        } else {
            const isNewCategory = !result[categoryId];

            if (isNewCategory) {
                result[categoryId] = [];
            }

            for (const product of category.products) {
                result[categoryId].push({
                    rel: 'product',
                    href: `/products/${product._id}`,
                    name: product.name,
                });
            }
        }
    }

    return result;
}

module.exports = {
    createSelfLink,
    combineLinks,
    createCategoryLinks,
    groupProductLinksByCategory
};
