import "reflect-metadata";
import "./di";
import express, { ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import routes from "./endpoints/routes.config";
import { AppDataSource } from "./data-source";
import helmet from "helmet";
import { container } from "tsyringe";

import session from "express-session";

import cors from "cors";

import compression from "compression";
import { CentralLogger } from "shared/lib/logger/central.logger";

const logger = container.resolve<CentralLogger>("CentralLogger");
// // const i18n = require("i18n-2");
// const acceptLanguage = require("accept-language-parser");

require("./config/passport.config");

const app = express();

// Load environment variables
// if (process.env.NODE_ENV === 'development') {
dotenv.config({ path: ".env.dev" });
// } else if (process.env.NODE_ENV === 'production') {
//   dotenv.config({ path: '.env.prod' });
// }

// const root: string = path.resolve(__dirname, "..");

// TODO i18n
// export type Language = "en" | "it";
// export interface LanguageRequest extends Request {
//   i18n: typeof i18n;
//   locale: Language;
// }

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

//TODO i18n
// app.use((req: LanguageRequest, res: any, next: any) => {
//   // Determine the user's preferred language based on the Accept-Language header
//   const acceptedLanguages = req.headers["accept-language"];
//   const languages = acceptLanguage.parse(acceptedLanguages);
//   req.locale = languages.length > 0 ? languages[0].code : "en";
//
//   req.i18n = i18n;
//   logger.debug(`Preferred locale: ${req.locale}`);
//   next();
// });

// Error handling
const errorHandler: ErrorRequestHandler = (err: Error) => {
  console.error(err);
};

app.use(errorHandler);

//TODO fix i18n error response
// app.use((err: any, req: any, res: Response) => {
//   // Handle the error here
//   logger.error(err.stack);
//   res.status(500).json({ error: req.i18n.__("Internal server error") });
// });

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

// TODO i18n
// i18n.expressBind(app, {
//   locales: ["en", "it"],
//   directory: require("path").join(__dirname, "locales"),
// });

// Configure Express Session
// TODO replace with Redis
app.use(
  session({
    // TODO: Use environment variable for session secret
    // secret: process.env.SESSION_SECRET,
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  }),
);

// Allow cross-origin requests
const corsOptionsAngular = {
  origin: process.env.CORS_ORIGIN_ANGULAR,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true,
};
app.use(cors(corsOptionsAngular));

const corsOptionsReact = {
  origin: process.env.CORS_ORIGIN_REACT,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptionsReact));
app.use("/", routes);
app.get("/cart");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

async function main() {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .then(() => {
      console.log("UrbanThread Gateway is ready.");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
}

main().catch(console.error);
