
const Category = require('../schemas/category.schema');
const linkUtils = require('../utils/linkUtils');

class CategoryModel {
    constructor(category) {
        this.category = category;
    }

    get id() {
        return this.category._id;
    }

    get name() {
        return this.category.name;
    }

    get description() {
        return this.category.description;
    }

    get editionName() {
        return this.category.edition.name;
    }

    get editionDescription() {
        return this.category.edition.description;
    }

    get products() {
        return this.category.products;
    }

    static async create(categoryData) {
        const createdCategory = await Category.create(categoryData);
        return new CategoryModel(createdCategory);
    }

    static async find() {
        const categories = await Category.find()
            .populate('edition')
            .populate('products');

        return categories.map(category => new CategoryModel(category));
    }

    static async find(categoryIds) {
        const categories = await Category.find({ _id: { $in: categoryIds } });

        return categories.map(category => new CategoryModel(category));
    }

    static async findById(categoryId) {
        const category = await Category.findById(categoryId)
            .populate('edition')
            .populate('products');

        if (!category) {
            return null;
        }

        return new CategoryModel(category);
    }

    static async findWithMinProducts() {
        const categories = await Category.find()
            .populate('products', '_id name')
            .populate('edition');

        return categories.map(category => new CategoryModel(category));
    }

    static async findWithMinProductsAndProductLinks() {
        const categories = await CategoryModel.findWithMinProducts();

        const productLinksByCategory = linkUtils.groupProductLinksByCategory(categories);

        const categoriesWithProductLinks = categories.map(category => {
            category.productLinks = productLinksByCategory[category.id];

            return category;
        });

        return categoriesWithProductLinks;
    }

    static async findByIdWithProductLinks(categoryId) {
        const category = await Category.findById(categoryId)
            .populate('edition')
            .populate('products');

        if (!category) {
            return null;
        }

        const productLinksByCategory = linkUtils.groupProductLinksByCategory([category]);

        const categoryModel = new CategoryModel(category);
        categoryModel.productLinks = productLinksByCategory[category._id];

        return categoryModel;
    }

}

module.exports = CategoryModel;
