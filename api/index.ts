import type { Request, Response } from "express";
import { SUCCESS, createApp, logger } from "../src";
import type express from "express";

// Cache the app in serverless environments
let appCached: express.Express | undefined;

/**
 * Vercel serverless function for handling the request.
 * @param req - Request.
 * @param res - Response.
 */
export default function handler(req: Request, res: Response): void {
  if (appCached) appCached(req, res);
  else {
    appCached = createApp();
    logger.info(SUCCESS.ServerStarted);
    appCached(req, res);
  }
}
