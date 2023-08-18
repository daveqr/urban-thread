const { faker } = require('@faker-js/faker');
const Edition = require('./models/edition');
const Item = require('./models/item');
const Category = require('./models/category');
const mongoose = require('mongoose');

/**
 * Generates seed item data.
 * @returns {Object[]} An array of item data objects.
 */
function createItemData() {
    return Array.from({ length: 10 }, (_) => ({
        description: faker.commerce.product(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        color: faker.color.human(),
    }));
}

/**
 * Generates seed category data.
 * @param {Object[]} editions - An array of edition objects.
 * @returns {Object[]} An array of category data objects.
 */
function createCategoryData(editions) {
    const categories = [
        {
            name: 'Silk Dresses',
            edition: editions[4]._id.toString(), // pre-fall
            description: 'Collection of silk dresses for Pre-fall season.',
        },
        {
            name: 'Suits',
            edition: editions[3]._id.toString(), // designer
            description: 'Collection of designer suits.',
        },
        {
            name: 'Festival',
            edition: editions[2]._id.toString(), // summer
            description: 'Collection of suits for the summer season.',
        },
        {
            name: 'Showroom',
            edition: editions[0]._id.toString(), // sale
            description: 'Collection of clothing on sale in our showroom.',
        },
    ];

    return categories;
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
 * Inserts item data into the database.
 * @returns {Promise<void>} A promise indicating the completion of item insertion.
 */
async function insertItems() {
    const itemData = createItemData();
    await Item.insertMany(itemData);
    console.log('Inserted items');
}

/**
 * Inserts category data into the database.
 * @param {Object[]} editions - An array of edition objects.
 * @returns {Promise<void>} A promise indicating the completion of category insertion.
 */
async function insertCategories(editions) {
    const categoryData = createCategoryData(editions);
    await Category.insertMany(categoryData);
    console.log('Inserted categories');
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

        // items
        await insertItems();

        // categories (must come after editions)
        await insertCategories(editions);
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
