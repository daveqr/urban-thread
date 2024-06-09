import {CategoryRepository} from "../../../domain/repositories/CategoryRepository";
import CategoryModel from "../../../domain/models/category.model";
import Category, {CategoryInterface} from "../../../../schemas/category.schema";

class MongoDBCategoryRepository implements CategoryRepository {
    async findAll(): Promise<CategoryModel[]> {
        const categories = await Category.find();
        return categories.map((category: CategoryInterface) => new CategoryModel(category));
    }

    async findById(categoryId: string): Promise<CategoryModel | null> {
        const category = await Category.findById(categoryId);
        return category ? new CategoryModel(category) : null;
    }

    async findWithMinProductsAndProductLinks(): Promise<CategoryModel[]> {
        const categories = await Category.find().populate('products');
        return categories.map((category: CategoryInterface) => new CategoryModel(category));
    }

    async findByIdWithProductLinks(categoryId: string): Promise<CategoryModel | null> {
        const category = await Category.findById(categoryId).populate('products');
        return category ? new CategoryModel(category) : null;
    }
}

export default MongoDBCategoryRepository;
