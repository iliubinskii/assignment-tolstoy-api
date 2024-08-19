import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "./consts/index.js";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import type { FetchMetadataResponse } from "./schema/index.js";
import { StatusCodes } from "http-status-codes";
import { createApp } from "./app.js";
import { fetchMetadataBatch } from "./services/index.js";
import request from "supertest";

jest.mock("./services/index.js", () => {
  return {
    fetchMetadataBatch: jest.fn(),
    logger: {
      warn: jest.fn()
    }
  };
});

// eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
const fetchMetadataBatchMock = fetchMetadataBatch as jest.MockedFunction<
  typeof fetchMetadataBatch
>;

describe("Express App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 404 for an unknown route", async () => {
    const app = createApp();

    const response = await request(app).get("/unknown-route");

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toEqual(ERROR_RESPONSE.NotFound);
    expect(true).toBeTrue();
  });

  describe("POST /fetch-metadata", () => {
    it("should return metadata for valid URLs", async () => {
      const app = createApp();

      const urls = ["http://example.com"] as const;

      const metadata: readonly FetchMetadataResponse[] = [
        {
          description: "Example Description",
          imageUrl: "http://example.com/image.jpg",
          title: "Example Title",
          url: "http://example.com"
        }
      ];

      fetchMetadataBatchMock.mockResolvedValueOnce(metadata);

      const response = await request(app).post("/fetch-metadata").send(urls);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(metadata);
    });

    it("should return 400 for invalid URLs", async () => {
      const app = createApp();

      const urls = ["invalid-url"] as const;

      const response = await request(app).post("/fetch-metadata").send(urls);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toEqual({
        details: {
          fieldErrors: {
            0: ["Invalid url"]
          },
          formErrors: []
        },
        errorCode: "InvalidData",
        errorMessage: "Invalid data"
      });
    });
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
