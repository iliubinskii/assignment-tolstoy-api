export const ERROR = {
  FailedToStartServer: "Failed to start server",
  InternalServerError: "Internal server error"
} as const;

export const HTTP_ERROR = {
  InternalServerError: {
    errorCode: "InternalServerError",
    errorMessage: "Internal Server Error"
  },
  NotFound: {
    errorCode: "NotFound",
    errorMessage: "Not Found"
  }
} as const;

export const HTTP_HEALTH_STATUS = {
  Ok: {
    description: "Server is healthy",
    status: "Ok"
  }
} as const;

export const SUCCESS = {
  ServerStarted: "Server started",
  ServerStartedOnPort: "Server started on port"
} as const;
