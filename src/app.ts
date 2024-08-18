import { ERROR, HTTP_ERROR, HTTP_HEALTH_STATUS } from "./consts";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import express, { json } from "express";
import { logger } from "./services";

/**
 * Create the Express app.
 * @returns App.
 */
export function createApp(): express.Express {
  const app = express();

  app.use(json());

  app.post("/fetch-metadata", (req, res) => {
    res.json(req.body);
  });

  app.get("/health", (_req, res) => {
    res.json(HTTP_HEALTH_STATUS.Ok);
  });

  app.all("*", (_req, res) => {
    res.status(StatusCodes.NOT_FOUND).json(HTTP_ERROR.NotFound);
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
        .json(HTTP_ERROR.InternalServerError);
    }
  );

  return app;
}
