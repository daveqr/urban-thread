import slugify from "slugify";

export const generateSlug = (inputString: string, options = {}) => {
    const defaultOptions = {
        replacement: "_",
        lower: true,
        ...options,
    };

    return slugify(inputString, defaultOptions);
};
