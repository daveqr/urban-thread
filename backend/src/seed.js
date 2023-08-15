const dbFunctions = require('./db.js');
const { faker } = require('@faker-js/faker');


function createSeedData() {
    const seedData = Array.from({ length: 10 }, (_, index) => ({
        description: faker.commerce.product(),
        price: faker.commerce.price(),
        price: faker.commerce.department(),
        color: faker.color.human()
    }));

    return seedData;
}

async function seedDatabase() {
    const db = await dbFunctions.connectToDatabase();
    const collection = db.collection('items');
    const seedData = createSeedData()

    try {
        await collection.insertMany(seedData);
        console.log('Seed data inserted successfully');
        dbFunctions.close();

    } catch (error) {
        console.error('Error inserting seed data:', error);
    }
}

seedDatabase();