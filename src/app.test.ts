import { HTTP_ERROR, HTTP_HEALTH_STATUS } from "./consts";
import { describe, expect, it } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import { createApp } from "./app";
import request from "supertest";

describe("Express App", () => {
  it("should return 404 for an unknown route", async () => {
    const app = createApp();

    const response = await request(app).get("/unknown-route");

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toEqual(HTTP_ERROR.NotFound);
    expect(true).toBeTrue();
  });

  describe("GET /health", () => {
    it("should return 200 and the correct health status", async () => {
      const app = createApp();

      const response = await request(app).get("/health");

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(HTTP_HEALTH_STATUS.Ok);
    });
  });
});
