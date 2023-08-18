const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const CategoryTransformer = require('../transformers/category.transformer');

router.get('/', async (req, res) => {
    try {
        const { full } = req.query;
        const categories = await Category.find().populate('edition');

        if (full) {
            res.json(categories);
        } else {
            // return simplified categories by default
            const simplifiedData = categories.map(category => CategoryTransformer.transform(category));
            res.json(simplifiedData);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});

module.exports = router;
