import { AI_STRINGS } from "./aiStrings";

/**
 * Standardized AI error codes shared with the backend.
 */
export const AI_ERROR_CODES = {
  RATE_LIMIT:   "rate_limit_exceeded",
  UNAUTHORIZED: "unauthorized",
  NOT_FOUND:    "not_found",
  SERVER:       "server_error",
};

/**
 * Fallback user-friendly messages — sourced from AI_STRINGS so renaming
 * the assistant only requires changing AI_NAME in aiStrings.js.
 */
export const AI_ERROR_MESSAGES = {
  [AI_ERROR_CODES.RATE_LIMIT]:   AI_STRINGS.RATE_LIMIT_ERROR,
  [AI_ERROR_CODES.UNAUTHORIZED]: "Your session has expired. Please login again.",
  [AI_ERROR_CODES.NOT_FOUND]:    "The requested repository or resource was not found.",
  [AI_ERROR_CODES.SERVER]:       AI_STRINGS.SERVER_ERROR,
};
