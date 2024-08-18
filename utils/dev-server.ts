import { ERROR, PORT, SUCCESS, createApp, logger } from "../src";

try {
  startServer();
} catch (err) {
  logger.error(ERROR.FailedToStartServer, err);
}

/**
 * Start the server.
 */
function startServer(): void {
  const app = createApp();

  app.listen(PORT, () => {
    logger.info(`${SUCCESS.ServerStartedOnPort} ${PORT}`);
  });
}
