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

module.exports = {
    createSelfLink,
    combineLinks
};
