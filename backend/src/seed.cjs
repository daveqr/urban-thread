import dbFunctions from './db.js';
import faker from 'faker';

const seedData = [
    { id: 1, text: 'Learn Node.js' },
    { id: 2, text: 'Build REST API' }
];

async function seedDatabase() {
    const db = await dbFunctions.connectToDatabase();
    const collection = db.collection('todos');

    try {
        await collection.insertMany(seedData);
        console.log('Seed data inserted successfully');
        dbFunctions.close();

    } catch (error) {
        console.error('Error inserting seed data:', error);
    }
}

seedDatabase();