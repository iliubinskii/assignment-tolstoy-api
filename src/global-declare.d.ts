/* eslint import/no-extraneous-dependencies: ["warn", { "devDependencies": true }] -- Ok */

import type jestExtended from "jest-extended";

type JestExtended = typeof jestExtended;

declare module "@jest/expect" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Ok
  export interface Matchers<R> extends JestExtended {}
}
