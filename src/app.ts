import { CORS_ORIGIN, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "./config";
import { ERROR, ERROR_RESPONSE, SUCCESS_RESPONSE } from "./consts";
import type { NextFunction, Request, Response } from "express";
import { fetchMetadataBatch, logger } from "./services";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import zod from "zod";

/**
 * Create the Express app.
 * @returns App.
 */
export function createApp(): express.Express {
  const app = express();

  app.use(
    rateLimit({
      legacyHeaders: false,
      max: RATE_LIMIT_MAX,
      message: ERROR_RESPONSE.ToManyRequests,
      standardHeaders: true,
      windowMs: RATE_LIMIT_WINDOW_MS
    })
  );
  app.use(json());
  app.use(
    cors({
      optionsSuccessStatus: StatusCodes.OK,
      origin: CORS_ORIGIN
    })
  );
  app.use(helmet());
  app.use(express.static("public"));

  app.post(
    "/fetch-metadata",
    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- Ok
    async (req, res, next) => {
      try {
        const urls = FetchMetadataRequestValidationSchema.safeParse(req.body);

        if (urls.success) {
          const metadata = await fetchMetadataBatch(urls.data);

          res.json(metadata);
        } else
          res.status(StatusCodes.BAD_REQUEST).json({
            ...ERROR_RESPONSE.InvalidData,
            details: urls.error.formErrors
          });
      } catch (err) {
        next(err);
      }
    }
  );

  app.get("/health", (_req, res) => {
    res.json(SUCCESS_RESPONSE.ServerIsHealthy);
  });

  app.all("*", (_req, res) => {
    res.status(StatusCodes.NOT_FOUND).json(ERROR_RESPONSE.NotFound);
  });

  app.use(
    (
      err: unknown,
      _req: Request,
      res: Response,
      // Error handler must have 4 parameters
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Ok
      _next: NextFunction
    ) => {
      logger.error(ERROR.InternalServerError, err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ERROR_RESPONSE.InternalServerError);
    }
  );

  return app;
}

const FetchMetadataRequestValidationSchema = zod
  .array(zod.string().url(), {
    errorMap: () => {
      return {
        message: ERROR.UrlListIsNotProvided
      };
    }
  })
  .nonempty(ERROR.UrlListIsEmpty);
