const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const itemRoutes = require('./routes/items');
const categoryRoutes = require('./routes/categories');

const app = express();

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/apparel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Allow cross-origin requests
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Routes
app.use('/items', itemRoutes);
app.use('/categories', categoryRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
