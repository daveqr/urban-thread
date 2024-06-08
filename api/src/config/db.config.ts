const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // Remove useNewUrlParser and useUnifiedTopology
            // They are no longer needed in newer versions of the MongoDB Node.js Driver
            // useNewUrlParser: true,
            // useUnifiedTopology: true,

            // Optionally, you can add other connection options here if needed
            // For example, authentication options like user and pass
            // user: process.env.DB_USERNAME,
            // pass: process.env.DB_PASSWORD,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};


export default connectDB;
