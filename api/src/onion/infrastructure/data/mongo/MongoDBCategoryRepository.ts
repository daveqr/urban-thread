import {CategoryRepository} from "../../../domain/repositories/CategoryRepository";
import CategoryModel from "../../../domain/models/category.model";
import Category, {CategoryInterface} from "../../../../schemas/category.schema";
import ProductTransformer from "../../../../transformers/product.transformer";

class MongoDBCategoryRepository implements CategoryRepository {
    async findAll(): Promise<CategoryModel[]> {
        const categories = await Category.find();
        return categories.map((category: CategoryInterface) => new CategoryModel(category));
    }

    async findByIdWithProductLinks(categoryId: string): Promise<CategoryModel | null> {
        const category = await Category.findById(categoryId)
            .populate('products')
            .populate('edition');

        return category ? new CategoryModel(category) : null;
    }

    async findWithMinProducts(): Promise<CategoryModel[]> {
        const categories = await Category.find()
            .populate('products', '_id name')
            .populate('edition');

        return categories.map((category: CategoryInterface) => new CategoryModel(category));
    }

    async findWithMinProductsAndProductLinks(): Promise<CategoryModel[]> {
        const categories = await this.findWithMinProducts();

        const productLinksByCategory = ProductTransformer.groupProductLinksByCategory(categories);

        return categories.map((category: CategoryModel) => {
            category.productLinks = productLinksByCategory[category.id];

            return category;
        });
    }

    async findByIds(categoryIds: string[]): Promise<CategoryModel[]> {
        const categories = await Category.find({_id: {$in: categoryIds}});

        return categories.map((category: any) => new CategoryModel(category));
    }

    async findById(categoryId: any): Promise<CategoryModel | null> {
        const category = await Category.findById(categoryId)
            .populate('edition')
            .populate('products');

        if (!category) {
            return null;
        }

        return new CategoryModel(category);
    }
}

export default MongoDBCategoryRepository;
