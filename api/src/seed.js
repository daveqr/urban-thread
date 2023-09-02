const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

const connectDB = require('./db');
const Edition = require('./schemas/edition.schema');
const Product = require('./schemas/product.schema');
const Category = require('./schemas/category.schema');

const createProductData = () => ({
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    color: faker.color.human(),
});

const createCategoryData = (name, editionId, description, productIds) => ({
    name,
    edition: editionId,
    description,
    // the attribute is 'products' in the schema. calling it productIds here
    // because it's a list of IDs and not populated Products.
    products: productIds,
});

const createEditionData = () => [
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

const insertEditions = async () => {
    const editionsData = createEditionData();
    const editions = await Edition.insertMany(editionsData);
    console.log('Inserted editions');
    return editions;
};

const insertProduct = async (productData) => {
    const product = await Product.create(productData);
    return product;
};

const insertCategory = async (name, editionId, description, products) => {
    const productIds = products.map(product => product._id);
    const categoryData = createCategoryData(name, editionId, description, productIds);
    const category = await Category.create(categoryData);
    console.log('Inserted category: ' + category.name);

    for (const product of products) {
        product.categoryIds.push(category._id);
        await product.save();
    }

    return category;
}

const insertProducts = async () => {
    const retArr = [];
    for (i = 0; i < 8; i++) {
        const product = await insertProduct(createProductData());
        retArr.push(product);
    }

    console.log('Inserted products');

    return retArr;
}

const main = async () => {
    let connection;
    try {
        dotenv.config({ path: '.env.dev' });
        connection = await connectDB();

        // editions (must come before category)
        const editions = await insertEditions();

        // products (must come before category)
        const products = await insertProducts();

        // categories (must come after editions and products)
        await insertCategory('Silk Dresses', editions[4]._id.toString(), 'Collection of silk dresses for Pre-fall season.', products.slice(0, 1));
        await insertCategory('Suits', editions[3]._id.toString(), 'Collection of designer suits.', products.slice(0, 2));
        await insertCategory('Festival', editions[2]._id.toString(), 'Collection of suits for the summer season.', products.slice(2, 5));
        await insertCategory('Showroom', editions[0]._id.toString(), 'Collection of clothing on sale in our showroom.', products.slice(4, 8));

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        if (mongoose.connection) {
            console.log('Closing MongoDB connection...');
            await mongoose.connection.close();
            console.log('Closed MongoDB connection');
        }
    }
}

main();
