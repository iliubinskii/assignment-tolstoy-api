/* eslint-disable no-process-env -- Ok */

import { cleanEnv, num } from "envalid";
import { config } from "dotenv";

config();

export const { PORT, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } = cleanEnv(
  process.env,
  {
    PORT: num({ default: 3000 }),
    RATE_LIMIT_MAX: num({ default: 5 }),
    RATE_LIMIT_WINDOW_MS: num({ default: 1000 })
  }
);
