export const ERROR = {
  FailedToStartServer: "Failed to start server",
  InternalServerError: "Internal server error",
  InvalidData: "Invalid data",
  MetadataFetchingError: "Failed to fetch metadata",
  NotFound: "Not found",
  UrlListIsEmpty: "URL list is empty",
  UrlListIsNotProvided: "URL list is not provided"
} as const;

export const ERROR_RESPONSE = {
  InternalServerError: {
    errorCode: "InternalServerError",
    errorMessage: ERROR.InternalServerError
  },
  InvalidData: {
    errorCode: "InvalidData",
    errorMessage: ERROR.InvalidData
  },
  MetadataFetchingError: {
    errorCode: "MetadataFetchingError",
    errorMessage: ERROR.MetadataFetchingError
  },
  NotFound: {
    errorCode: "NotFound",
    errorMessage: ERROR.NotFound
  }
} as const;

export const SUCCESS = {
  ServerIsHealthy: "Server is healthy",
  ServerStarted: "Server started",
  ServerStartedOnPort: "Server started on port"
} as const;

export const SUCCESS_RESPONSE = {
  ServerIsHealthy: {
    description: SUCCESS.ServerIsHealthy,
    status: "ServerIsHealthy"
  }
} as const;
