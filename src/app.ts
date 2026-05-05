import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { API_PREFIX } from "./config/constants";
import { env } from "./config/env";
import apiRoutes from "./routes";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { sendError } from "./shared/utils/apiResponse";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.corsOrigin === "*" ? true : env.corsOrigin,
      credentials: true
    })
  );
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 200
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (env.nodeEnv !== "test") {
    app.use(morgan("dev"));
  }

  app.use(API_PREFIX, apiRoutes);
  app.use((req, res) => sendError(res, `Route not found: ${req.originalUrl}`, 404));
  app.use(errorHandler);

  return app;
};

export default createApp();
