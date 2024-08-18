/**
 * Fetch metadata for a URL.
 * @param url - URL.
 * @returns Metadata.
 */
// eslint-disable-next-line @typescript-eslint/require-await -- Temp
export async function fetchMetadata(
  url: string
): Promise<FetchMetadataResponse> {
  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Implement fetching metadata
  return {
    description: "Description",
    imageUrl: "http://image.url",
    title: "Title",
    url
  };
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
  readonly error: string;
}

export type FetchMetadataResponse = Metadata | FetchMetadataError;

export interface Metadata {
  readonly description: string;
  readonly imageUrl: string;
  readonly title: string;
  readonly url: string;
}
