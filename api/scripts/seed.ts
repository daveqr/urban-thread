import dotenv from 'dotenv';
import mongoose, {Document, Schema} from 'mongoose';
import {ObjectId} from "mongodb";
//import faker from 'faker';
const {faker} = require('@faker-js/faker');

dotenv.config({path: '.env.dev'});


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/apparel", {
            // no user/password for now because this is a demo
            // user: process.env.DB_USERNAME,
            // pass: process.env.DB_PASSWORD,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};


interface EditionInterface extends Document {
    name: string;
    description: string;
}

const editionSchema = new Schema<EditionInterface>({
    name: {type: String, required: true},
    description: {type: String, required: true},
});

const Edition = mongoose.model<EditionInterface>('Edition', editionSchema);

interface ProductInterface extends Document {
    name: string;
    description: string;
    price: number;
    color: string;
    categoryIds: mongoose.Types.ObjectId[];
}

const productSchema = new Schema<ProductInterface>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    color: {type: String, required: true},
    categoryIds: [{type: Schema.Types.ObjectId, ref: 'Category'}],
});

const Product = mongoose.model<ProductInterface>('Product', productSchema);


interface CategoryInterface extends Document {
    name: string;
    edition: EditionInterface;
    description: string;
    products: ProductInterface[];
}

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    edition: {type: mongoose.Schema.Types.ObjectId, ref: 'Edition', required: true},
    description: {type: String, required: true},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
});

const Category = mongoose.model<CategoryInterface>('Category', categorySchema);


const createProductData = () => ({
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    //color: faker.commerce.color(),
    color: 'red'
});

const createCategoryData = (name: string, editionId: mongoose.Types.ObjectId, description: string, productIds: mongoose.Types.ObjectId[]) => ({
    name,
    edition: editionId,
    description,
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

const insertProduct = async (productData: any) => {
    const product = await Product.create(productData);
    return product;
};

const insertCategory = async (name: string, editionId: mongoose.Types.ObjectId, description: string, products: any[]) => {
    const productIds = products.map((product: any) => product._id);
    const categoryData = createCategoryData(name, editionId, description, productIds);

    const category = await Category.create(categoryData);
    console.log('Inserted category: ' + category.name);

    for (const product of products) {
        product.categoryIds.push(category._id);
        await product.save();
    }

    return category;
};

const insertProducts = async () => {
    const retArr: ProductInterface[] = [];
    for (let i = 0; i < 8; i++) {
        const product = await insertProduct(createProductData());
        retArr.push(product);
    }

    console.log('Inserted products');

    return retArr;
};

const main = async () => {
    let connection: any;
    try {
        connection = await connectDB();

        // editions (must come before category)
        const editions = await insertEditions();

        // products (must come before category)
        const products = await insertProducts();

        // categories (must come after editions and products)
        await insertCategory('Silk Dresses', new ObjectId(<number>editions[4]._id), 'Collection of silk dresses for Pre-fall season.', products.slice(0, 1));
        await insertCategory('Suits', new ObjectId(<number>editions[3]._id), 'Collection of designer suits.', products.slice(0, 2));
        // await insertCategory('Suits', editions[3]._id, 'Collection of designer suits.', products.slice(0, 2));
        await insertCategory('Festival', new ObjectId(<number>editions[2]._id), 'Collection of suits for the summer season.', products.slice(2, 5));
        await insertCategory('Showroom', new ObjectId(<number>editions[0]._id), 'Collection of clothing on sale in our showroom.', products.slice(4, 8));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        if (mongoose.connection) {
            console.log('Closing MongoDB connection...');
            await mongoose.connection.close();
            console.log('Closed MongoDB connection');
        }
    }
};

main();
