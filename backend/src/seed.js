const { faker } = require('@faker-js/faker');
const Edition = require('./models/edition');
const Item = require('./models/item');
const Category = require('./models/category');
const mongoose = require('mongoose');

function createItemData() {
    return Array.from({ length: 10 }, (_, index) => ({
        description: faker.commerce.product(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        color: faker.color.human(),
    }));
}

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
            description: 'Collection of suits from various designers.',
        },
        {
            name: 'Festival',
            edition: editions[2]._id.toString(), // summer
            description: 'Collection of suits from various designers.',
        },
        {
            name: 'Showroom',
            edition: editions[0]._id.toString(), // sale
            description: 'Collection of clothing on sale in our showroom.',
        },
    ];

    return categories;
}

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

async function insertEditions() {
    const editionsData = createEditionData();
    const editions = await Edition.insertMany(editionsData);
    console.log('Inserted editions');
    return editions;
}

async function insertItems() {
    const itemData = createItemData();
    await Item.insertMany(itemData);
    console.log('Inserted items');
}

async function insertCategories(editions) {
    const categoryData = createCategoryData(editions);
    await Category.insertMany(categoryData);
    console.log('Inserted categories');
}

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
