const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const CategoryTransformer = require('../transformers/category.transformer');
const Edition = require('../models/edition');

router.post('/', async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
});

router.get('/', async (req, res) => {
    try {
        const { full } = req.query;

        if (full) {
            const categories = await Category.find().populate('edition');
            res.json(categories);
          } else {
            const categories = await Category.find().populate('edition');
            const simplifiedData = categories.map(category => CategoryTransformer.transformCategory(category));
            res.json(simplifiedData);
          }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});

module.exports = router;
