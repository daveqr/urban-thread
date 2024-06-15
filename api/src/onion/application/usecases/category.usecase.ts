import {CategoryRepository} from "../../domain/repositories/category.repository";
import {CategoryDto} from "../dtos/category.dto";
import CategoryService from "../../domain/services/category.service";
import Category from "../../domain/models/category.model";

class CategoryUseCase {
    private categoryRepository: CategoryRepository;
    private categoryService: CategoryService;

    constructor(categoryRepository: CategoryRepository, categoryService: CategoryService) {
        this.categoryRepository = categoryRepository;
        this.categoryService = categoryService;
    }

    async find(isDetailed: boolean): Promise<CategoryDto[]> {
        const categories: Category[] = await this.categoryService.findAllCategories(isDetailed);

        return categories.map(category => this.toCategoryDTO(category));
    }

    async findHighlightedCategories(): Promise<CategoryDto[]> {
        const categories: Category[] = await this.categoryService.findHighlightedCategories();

        return categories.map(category => this.toCategoryDTO(category));
    }

    async findCategoryById(categoryId: string): Promise<CategoryDto | null> {
        try {
            const category = await this.categoryRepository.findByIdWithProductLinks(categoryId);
            return category ? this.toCategoryDTO(category) : null;
        } catch (error) {
            throw error;
        }
    }

    private toCategoryDTO(category: any): CategoryDto {
        const categoryDto = new CategoryDto();
        categoryDto.id = category.id;
        categoryDto.name = category.name;
        categoryDto.slug = category.slug;
        categoryDto.description = category.description;
        categoryDto.products = category.products;

        // if (isDetailed) {
        //     categoryDTO.editionName = category.edition.name;
        //     categoryDTO.editionDescription = category.edition.description;
        //     categoryDTO.products = category.products.map(product => {
        //         const productDTO = new ProductDTO();
        //         productDTO.id = product._id;
        //         productDTO.name = product.name;
        //         return productDTO;
        //     });
        // }

        return categoryDto;
    }
}

export default CategoryUseCase;