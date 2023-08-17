const dbFunctions = require('./db.js');
const { faker } = require('@faker-js/faker');

async function seedCollection(collectionName, createDataFunction) {
    const db = await dbFunctions.connectToDatabase();
    const collection = db.collection(collectionName);
    const seedData = createDataFunction();

    try {
        await collection.insertMany(seedData);
        console.log(`Seed data for ${collectionName} inserted successfully`);
    } catch (error) {
        console.error(`Error inserting seed data for ${collectionName}:`, error);
    } finally {
        dbFunctions.close(db);
    }
}

function createItemData() {
    return Array.from({ length: 10 }, (_, index) => ({
        description: faker.commerce.product(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        color: faker.color.human(),
    }));
}

async function seedItems() {
    await seedCollection('items', createItemData);
}

function createCategoryData() {
    const categories = [
        {
            name: 'Silk Dresses',
            collection: 'Pre-fall',
            description: 'Collection of silk dresses for Pre-fall season.',
        },
        {
            name: 'Suits',
            collection: 'Designers',
            description: 'Collection of suits from various designers.',
        },
        {
            name: 'Festival',
            collection: 'Summer',
            description: 'Collection of suits from various designers.',
        },
        {
            name: 'Showroom',
            collection: 'Sale',
            description: 'Collection of clothing on sale in our showroom.',
        },
    ];

    return categories;
}

async function seedCategories() {
    await seedCollection('categories', createCategoryData);
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

async function seedEditions() {
    await seedCollection('editions', createEditionData);
}

async function main() {
    await seedEditions();
    await seedItems();
    await seedCategories();
}

main();
