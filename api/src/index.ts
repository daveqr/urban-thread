import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
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
import routes from './config/routes.config';

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

export type Language = 'en' | 'it';
export interface LanguageRequest extends Request {
  i18n: typeof i18n,
  locale: Language
}

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

app.use((req: LanguageRequest, res: any, next: any) => {
  // Determine the user's preferred language based on the Accept-Language header
  const acceptedLanguages = req.headers['accept-language'];
  const languages = acceptLanguage.parse(acceptedLanguages);
  req.locale = languages.length > 0 ? languages[0].code : 'en';

  req.i18n = i18n;
  logger.debug(`Preferred locale: ${req.locale}`);
  next();
});

// Error handling
const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
};

app.use(errorHandler);

app.use((err: any, req: any, res: Response, next: NextFunction) => {
  // Handle the error here
  logger.error(err.stack);
  res.status(500).json({ error: req.i18n.__('Internal server error') });
});

// TODO add content type check
// app.use((req, res, next) => {
//   if (req.get('Content-Type') !== 'application/json') {
//     return res.status(415).json({ error: 'Unsupported Media Type' });
//   }
//   next();
// });
// TODO add security header check
// app.use((req, res, next) => {
//   res.header('Content-Security-Policy', "default-src 'self'");
//   res.header('X-Content-Type-Options', 'nosniff');
//   res.header('X-Frame-Options', 'DENY');
//   next();
// });

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
