import { ERROR, ERROR_RESPONSE } from "../consts";
import type { FetchMetadataResponse } from "../schema";
import fetch from "node-fetch";
import { load } from "cheerio";
import { logger } from "./logger";

/**
 * Fetch metadata for a URL.
 * @param url - URL.
 * @returns Metadata.
 */
export async function fetchMetadata(
  url: string
): Promise<FetchMetadataResponse> {
  try {
    const response = await fetch(url);

    const html = await response.text();

    const $ = load(html);

    const title =
      $('meta[property="og:title"]').attr("content") ?? $("title").text();

    const description =
      $('meta[property="og:description"]').attr("content") ??
      $('meta[name="description"]').attr("content");

    const imageUrl = $('link[rel="icon"]').attr("href");

    return {
      description,
      imageUrl,
      title,
      url
    };
  } catch (err) {
    logger.warn(ERROR.MetadataFetchingError, err);

    return err instanceof Error
      ? {
          errorCode: ERROR_RESPONSE.MetadataFetchingError.errorCode,
          errorMessage: err.message,
          url
        }
      : {
          ...ERROR_RESPONSE.MetadataFetchingError,
          url
        };
  }
}

/**
 * Fetch metadata for a list of URLs.
 * @param urls - URLs.
 * @returns Metadata.
 */
export async function fetchMetadataBatch(
  urls: readonly string[]
): Promise<readonly FetchMetadataResponse[]> {
  return Promise.all(urls.map(async url => fetchMetadata(url)));
}
