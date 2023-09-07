
const Category = require('../schemas/category.schema');
// const ProductTransformer = require('../transformers/product.transformer');
import { ProductTransformer } from '../transformers/product.transformer';

class CategoryModel {
    category: any;
    productLinks: any[] = [];

    constructor(category: any) {
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

    static async create(categoryData: any) {
        const createdCategory = await Category.create(categoryData);
        return new CategoryModel(createdCategory);
    }

    static async findAll() {
        const categories = await Category.find()
            .populate('edition')
            .populate('products');

        return categories.map((category: any) => new CategoryModel(category));
    }

    static async findByIds(categoryIds: any) {
        const categories = await Category.find({ _id: { $in: categoryIds } });

        return categories.map((category: any) => new CategoryModel(category));
    }

    static async findById(categoryId: any) {
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

        return categories.map((category: any) => new CategoryModel(category));
    }

    static async findWithMinProductsAndProductLinks() {
        const categories = await CategoryModel.findWithMinProducts();

        const productLinksByCategory = ProductTransformer.groupProductLinksByCategory(categories);

        const categoriesWithProductLinks = categories.map((category: any) => {
            category.productLinks = productLinksByCategory[category.id];

            return category;
        });

        return categoriesWithProductLinks;
    }

    static async findByIdWithProductLinks(categoryId: any) {
        const category = await Category.findById(categoryId)
            .populate('edition')
            .populate('products');

        if (!category) {
            return null;
        }

        const productLinksByCategory = ProductTransformer.groupProductLinksByCategory([category]);

        const categoryModel = new CategoryModel(category);
        categoryModel.productLinks = productLinksByCategory[category._id];

        return categoryModel;
    }

}

module.exports = CategoryModel;
