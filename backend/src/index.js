const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/items');

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

// Use the item routes
app.use('/items', itemRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
