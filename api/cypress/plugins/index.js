
const mongoose = require('mongoose');
const Category = require('../../src/schemas/category.schema');
const Product = require('../../src/schemas/product.schema');

// TODO implement this
module.exports = (on, config) => {
    on('task', {
        // Seed the database with test data
        seedDatabase: async () => {
            try {
                await mongoose.connect('mongodb://localhost:27017/apparel', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                const category = new Category();
                return await category.save();
            } finally {
                mongoose.disconnect();
            }
        },

        // Query the database
        queryDatabase: async () => {
            try {
                await mongoose.connect('mongodb://localhost:27017/apparel', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                return Category.findOnefind({ _id: '1234' });
            } finally {
                mongoose.disconnect();
            }
        },
    });
};
