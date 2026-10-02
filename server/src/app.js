import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import routes from "./routes/index.js";
import notFound from "./middlewares/not-found.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import env from "./config/env.js";

const app = express();

const allowedOrigins = env.CLIENT_URL
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(helmet());

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/api/v1", routes);

app.use(notFound);

app.use(errorMiddleware);

export default app;
