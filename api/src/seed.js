const { faker } = require('@faker-js/faker');
const Edition = require('./models/edition');
const Product = require('./models/product');
const Category = require('./models/category');
const mongoose = require('mongoose');

/**
 * Generates seed product data.
 * @returns {Object[]} An array of product data objects.
 */
function createProductData() {
    return Array.from({ length: 40 }, (_) => ({
        description: faker.commerce.product(),
        price: faker.commerce.price(),
        color: faker.color.human(),
    }));
}

/**
 * Generates seed category data.
 * @param {Object[]} editions - An array of edition objects.
 * @returns {Object[]} An array of category data objects.
 */
function createCategoryData(name, editionId, description, products) {
    const productIds = products.map(product => product._id.toString());

    return {
        name: name,
        edition: editionId, edition: editionId,
        description: description,
        products: productIds
    }
}

/**
 * Generates seed edition data.
 * @returns {Object[]} An array of edition data objects.
 */
function createEditionData() {
    const editions = [
        {
            name: 'Sale',
            description: 'Collection for the sale season.',
        },
        {
            name: 'Winter',
            description: 'Collection for the winter season.',
        },
        {
            name: 'Summer',
            description: 'Collection for the summer season.',
        },
        {
            name: 'Designer',
            description: 'Designer collection.',
        },
        {
            name: 'Pre-fall',
            description: 'Collection for the fall season.',
        },
    ];

    return editions;
}

/**
 * Inserts edition data into the database.
 * @returns {Promise<Object[]>} A promise resolving to an array of inserted edition objects.
 */
async function insertEditions() {
    const editionsData = createEditionData();
    const editions = await Edition.insertMany(editionsData);
    console.log('Inserted editions');
    return editions;
}

/**
 * Inserts product data into the database.
 * @returns {Promise<void>} A promise indicating the completion of product insertion.
 */
async function insertProducts() {
    const productData = createProductData();
    const products = await Product.insertMany(productData);
    console.log('Inserted products');
    return products;
}

/**
 * Inserts category data into the database.
 * @param {Object[]} editions - An array of edition objects.
 * @returns {Promise<void>} A promise indicating the completion of category insertion.
 */
async function insertCategory(name, editionId, description, products) {
    const categoryData = createCategoryData(name, editionId, description, products);
    await Category.insertMany(categoryData);
    console.log('Inserted category: ' +);
}

/**
 * Connects to MongoDB, inserts data, and handles disconnection.
 * @returns {Promise<void>} A promise indicating the completion of the main function.
 */
async function main() {
    let connection;
    try {
        connection = await mongoose.connect('mongodb://localhost:27017/apparel', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // editions (must come before category)
        const editions = await insertEditions();

        // products (must come before category)
        // creates 40 products (10 for each category)
        const products = await insertProducts();

        // categories (must come after editions and products)
        await insertCategory('Silk Dresses', editions[4]._id.toString(), 'Collection of silk dresses for Pre-fall season.', products.slice(0, 10));
        await insertCategory('Suits', editions[3]._id.toString(), 'Collection of designer suits.', products.slice(10, 20));
        await insertCategory('Festival', editions[2]._id.toString(), 'Collection of suits for the summer season.', products.slice(20, 30));
        await insertCategory('Showroom', editions[0]._id.toString(), 'Collection of clothing on sale in our showroom.', products.slice(30, 40));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        if (connection) {
            connection.disconnect();
            console.log('Closed connection');
        }
    }
}

main();
