import { ERROR, HTTP_ERROR } from "../consts";
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

    const imageUrl =
      $('meta[property="og:image"]').attr("content") ??
      $('link[rel="icon"]').attr("href") ??
      $('link[rel="shortcut icon"]').attr("href") ??
      $('link[rel="apple-touch-icon"]').attr("href");

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
          errorCode: HTTP_ERROR.MetadataFetchingError.errorCode,
          errorMessage: err.message
        }
      : HTTP_ERROR.MetadataFetchingError;
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

export interface FetchMetadataError {
  readonly errorCode: string;
  readonly errorMessage: string;
}

export type FetchMetadataResponse = Metadata | FetchMetadataError;

export interface Metadata {
  readonly description?: string | undefined;
  readonly imageUrl?: string | undefined;
  readonly title?: string | undefined;
  readonly url: string;
}
