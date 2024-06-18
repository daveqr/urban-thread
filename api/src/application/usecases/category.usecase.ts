import {CategoryRepository} from "../../core/repositories/category.repository";
import {CategoryDto} from "../dtos/category.dto";
import CategoryService from "../../core/services/category.service";
import Category from "../../core/models/category.model";
import HighlightedCategory from "../../core/models/highlighted-category.model";
import HighlightedCategoryDto from "../dtos/highlighted-category.dto";

class CategoryUseCase {
    private categoryRepository: CategoryRepository;
    private categoryService: CategoryService;

    constructor(categoryRepository: CategoryRepository, categoryService: CategoryService) {
        this.categoryRepository = categoryRepository;
        this.categoryService = categoryService;
    }

    async find(isDetailed: boolean): Promise<CategoryDto[]> {
        const categories: Category[] = await this.categoryService.findAllCategories(isDetailed);

        return categories.map(category => this.toCategoryDto(category));
    }

    async findHighlightedCategories(): Promise<HighlightedCategoryDto[]> {
        const categories: HighlightedCategory[] = await this.categoryService.findHighlightedCategories();

        return categories.map(category => this.toHighlightedCategoryDto(category));
    }

    async findByUuid(uuid: string): Promise<CategoryDto | null> {
        let category = await this.categoryRepository.findByUuid(uuid);
        return category ? this.toCategoryDto(category) : null;
    }

    private toHighlightedCategoryDto(category: HighlightedCategory): HighlightedCategoryDto {
        const categoryDto = new HighlightedCategoryDto();

        categoryDto.uuid = category.uuid;
        categoryDto.name = category.name;
        categoryDto.slug = category.slug;
        categoryDto.position = category.position;
        categoryDto.description = category.description;
        categoryDto.products = category.products;

        return categoryDto;
    }

    private toCategoryDto(category: Category): CategoryDto {
        const categoryDto = new CategoryDto();

        categoryDto.uuid = category.uuid;
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