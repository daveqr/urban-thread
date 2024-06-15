import CategoryUseCase, {HighlightedCategoryDto} from "../onion/application/usecases/category.usecase";
import {CategoryTransformer} from "../transformers/category.transformer";
import CategoryService from "../onion/domain/services/category.service";
import SQLiteCategoryRepository from "../onion/infrastructure/data/sqllite/category.repository.sqlite";

import express from 'express';
import {combineLinks, createSelfLink} from "../utils/linkUtils";
import {CATEGORY_BASE_URL} from "../config/urls";

const router = express.Router();
require('../schemas/edition.schema');

const categoryRepository = new SQLiteCategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryUseCase = new CategoryUseCase(categoryRepository, categoryService);

router.use((req: any, res: any, next: any) => {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/hal+json');
    }
    next();
});

router.get('/', async (req: any, res: any) => {
    try {
        const isDetailed = Boolean(req.query.detailed);

        let categories = await categoryUseCase.find(isDetailed);

        const transformedCategories = categories.map(CategoryTransformer.transform);
        res.json(transformedCategories);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to fetch categories'});
    }
});

router.get('/highlighted', async (req: any, res: any) => {
    try {
        let categories = await categoryUseCase.findHighlightedCategories()

        const transformedCategories = categories.map(HighlightedCategoryTransformer.transform);

        console.log(transformedCategories);
        
        res.json(transformedCategories);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to fetch categories'});
    }
});

router.get('/:id', async (req: any, res: any) => {
    try {
        const category = await categoryUseCase.findCategoryById(req.params.id);

        if (!category) {
            return res.status(404).json({message: 'Category not found'});
        }

        res.json(category);
    } catch (error: any) {
        res.status(500).json({message: 'Error fetching category: ' + error.message, error});
    }
});

class HighlightedCategoryTransformer {
    static transform(categoryDto: HighlightedCategoryDto) {
        const selfLink = createSelfLink(CATEGORY_BASE_URL, categoryDto.uuid);
        const combinedLinks = combineLinks(selfLink);

        return {
            id: categoryDto.uuid,
            name: categoryDto.name,
            description: categoryDto.description,
            slug: categoryDto.slug,
            position: categoryDto.position,
            editionName: categoryDto.editionName,
            products: categoryDto.products,
            editionDescription: categoryDto.editionDescription,
            _links: combinedLinks,
            _embedded: {
                // products: categoryDto.productLinks,
            },
        };
    }
}

module.exports = router;
