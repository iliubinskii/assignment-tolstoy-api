import { cleanEnv, num, str } from "envalid";
import { config } from "dotenv";

config();

export const { CORS_ORIGIN, PORT, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } =
  // eslint-disable-next-line no-process-env -- Ok
  cleanEnv(process.env, {
    CORS_ORIGIN: str({ default: "http://localhost:5173" }),
    PORT: num({ default: 3000 }),
    RATE_LIMIT_MAX: num({ default: 5 }),
    RATE_LIMIT_WINDOW_MS: num({ default: 1000 })
  });
