
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const i18n = require('i18n-2');
const acceptLanguage = require('accept-language-parser');

const logger = require('./utils/logger');
require('./config/passport.config');
const connectDB = require('./config/db.config');
const routes = require('./config/routes.config');

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
app.use(helmet());
app.use(compression());
app.use((req, res, next) => {
  // Determine the user's preferred language based on the Accept-Language header
  const acceptedLanguages = req.headers['accept-language'];
  const languages = acceptLanguage.parse(acceptedLanguages);
  req.locale = languages.length > 0 ? languages[0].code : 'en';

  logger.debug(`Preferred locale: ${req.locale}`);
  next();
});

// i18n
i18n.expressBind(app, {
  locales: ['en', 'it'],
  directory: require('path').join(__dirname, 'locales')
});

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
app.use('/', routes);

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
