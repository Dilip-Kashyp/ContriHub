/**
 * Standardized AI error codes shared with the backend.
 */
export const AI_ERROR_CODES = {
  RATE_LIMIT: "rate_limit_exceeded",
  UNAUTHORIZED: "unauthorized",
  NOT_FOUND: "not_found",
  SERVER: "server_error",
};

/**
 * Fallback user-friendly messages if the backend doesn't provide one.
 */
export const AI_ERROR_MESSAGES = {
  [AI_ERROR_CODES.RATE_LIMIT]: "Gibo is busy with too many requests. Please try again in a minute.",
  [AI_ERROR_CODES.UNAUTHORIZED]: "Your session has expired. Please login again.",
  [AI_ERROR_CODES.NOT_FOUND]: "The requested repository or resource was not found.",
  [AI_ERROR_CODES.SERVER]: "Gibo is having some technical difficulties. Please try again later.",
};
