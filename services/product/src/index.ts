import express from 'express';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, Product Service!');
});

app.listen(port, () => {
    console.log(`Product service is running on port ${port}`);
});
