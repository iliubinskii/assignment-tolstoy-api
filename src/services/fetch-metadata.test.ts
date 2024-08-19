import { ERROR, ERROR_RESPONSE } from "../consts/index.js";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fetchMetadataBatch } from "./fetch-metadata.js";
import fetchMock from "jest-fetch-mock";
import { logger } from "./logger.js";

fetchMock.default.enableMocks();

describe("fetchMetadataBatch", () => {
  beforeEach(() => {
    fetchMock.default.resetMocks();
  });

  it("should fetch and return metadata", async () => {
    const mockHtml = `
      <html>
        <head>
          <title>Test Title</title>
          <meta name="description" content="Test Description" />
          <link rel="icon" href="/favicon.ico" />
        </head>
      </html>
    `;

    fetchMock.default.mockResponseOnce(mockHtml);

    const result = await fetchMetadataBatch(["http://example.com"]);

    expect(result).toEqual([
      {
        description: "Test Description",
        imageUrl: "http://example.com/favicon.ico",
        title: "Test Title",
        url: "http://example.com"
      }
    ]);
  });

  it("should handle fetch errors and log them", async () => {
    const mockError = new Error("Failed to fetch");

    fetchMock.default.mockRejectOnce(mockError);

    const warnSpy = jest.spyOn(logger, "warn");

    warnSpy.mockReturnValueOnce(undefined);

    const result = await fetchMetadataBatch(["http://example.com"]);

    expect(warnSpy).toHaveBeenCalledWith(
      ERROR.MetadataFetchingError,
      mockError
    );

    expect(result).toEqual([
      {
        errorCode: ERROR_RESPONSE.MetadataFetchingError.errorCode,
        errorMessage: "Failed to fetch",
        url: "http://example.com"
      }
    ]);
  });
});
