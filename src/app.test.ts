import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "./consts/index.js";
import { describe, expect, it } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import { createApp } from "./app.js";
import request from "supertest";

describe("Express App", () => {
  it("should return 404 for an unknown route", async () => {
    const app = createApp();

    const response = await request(app).get("/unknown-route");

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toEqual(ERROR_RESPONSE.NotFound);
    expect(true).toBeTrue();
  });

  describe("GET /health", () => {
    it("should return 200 and the correct health status", async () => {
      const app = createApp();

      const response = await request(app).get("/health");

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(SUCCESS_RESPONSE.ServerIsHealthy);
    });
  });
});
