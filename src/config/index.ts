/* eslint-disable no-process-env -- Ok */

import { config } from "dotenv";

config();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, no-type-assertion/no-type-assertion -- Ok
export const PORT = Number.parseInt(process.env["PORT"]!, 10);
