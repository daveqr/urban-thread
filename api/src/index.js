const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('./logger');
require('./passport-config');
const connectDB = require('./db');

const productRoutes = require('./routes/products.route');
const categoryRoutes = require('./routes/categories.route');
const authRoutes = require('./routes/auth.route');

// Create the express app
const app = express();

// Load environment variables
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.dev' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.prod' });
}

// Connect to the MongoDB database
connectDB();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Express Session
// TODO replace with Redis
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Allow cross-origin requests
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
