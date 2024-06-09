import {List} from 'immutable';

import Category, {CategoryInterface} from '../schemas/category.schema';
import ProductTransformer from '../transformers/product.transformer';
import ProductModel from '../onion/domain/models/product.model';

class CategoryModel {
    productLinks: any[] = [];
    private category: CategoryInterface;

    private constructor(category: CategoryInterface) {
        this.category = category;
    }

    get id(): string {
        return <string>this.category._id;
    }

    get name(): string {
        return this.category.name;
    }

    get description(): string {
        return this.category.description;
    }

    get editionName(): string {
        return this.category.edition.name;
    }

    get editionDescription(): string {
        return this.category.edition.description;
    }

    get products() {
        return this.category.products.map(product => new ProductModel(product));
    }

    static async create(categoryData: any): Promise<CategoryModel> {
        const createdCategory = await Category.create(categoryData);
        return new CategoryModel(createdCategory);
    }

    static async findAll(): Promise<List<CategoryModel>> {
        const categories = await Category.find()
            .populate('edition')
            .populate('products');

        return List(categories).map((category: CategoryInterface) => new CategoryModel(category));
    }

    static async findByIds(categoryIds: string[]): Promise<CategoryModel[]> {
        const categories = await Category.find({_id: {$in: categoryIds}});

        return categories.map((category: any) => new CategoryModel(category));
    }

    static async findById(categoryId: any): Promise<CategoryModel | null> {
        const category = await Category.findById(categoryId)
            .populate('edition')
            .populate('products');

        if (!category) {
            return null;
        }

        return new CategoryModel(category);
    }

    static async findWithMinProducts(): Promise<CategoryModel[]> {
        const categories = await Category.find()
            .populate('products', '_id name')
            .populate('edition');

        return categories.map((category: CategoryInterface) => new CategoryModel(category));
    }

    static async findWithMinProductsAndProductLinks(): Promise<CategoryModel[]> {
        const categories = await CategoryModel.findWithMinProducts();

        const productLinksByCategory = ProductTransformer.groupProductLinksByCategory(categories);

        return categories.map((category: CategoryModel) => {
            category.productLinks = productLinksByCategory[category.id];

            return category;
        });
    }

    static async findByIdWithProductLinks(categoryId: string) {
        const categoryModel = await CategoryModel.findById(categoryId);

        if (!categoryModel) {
            return null;
        }

        const productLinksByCategory = ProductTransformer.groupProductLinksByCategory([categoryModel]);

        categoryModel.productLinks = productLinksByCategory[categoryModel.id];

        return categoryModel;
    }

}

export default CategoryModel;
