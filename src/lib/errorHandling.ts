/**
 * Centralized error handling utilities for the application
 * Provides consistent error logging, formatting, and user-friendly messages
 */

export type ErrorSeverity = "info" | "warn" | "error" | "critical";

export interface AppError {
  code: string;
  message: string;
  userMessage: string;
  severity: ErrorSeverity;
  context?: Record<string, unknown>;
  timestamp: string;
}

// Error codes for consistent error identification
export const ErrorCodes = {
  // Authentication errors
  AUTH_INVALID_CREDENTIALS: "AUTH_001",
  AUTH_SESSION_EXPIRED: "AUTH_002",
  AUTH_UNAUTHORIZED: "AUTH_003",
  AUTH_EMAIL_NOT_CONFIRMED: "AUTH_004",
  
  // Database errors
  DB_CONNECTION_FAILED: "DB_001",
  DB_QUERY_FAILED: "DB_002",
  DB_RLS_VIOLATION: "DB_003",
  DB_NOT_FOUND: "DB_004",
  
  // Validation errors
  VALIDATION_FAILED: "VAL_001",
  VALIDATION_REQUIRED_FIELD: "VAL_002",
  VALIDATION_INVALID_FORMAT: "VAL_003",
  
  // AI/API errors
  AI_SERVICE_UNAVAILABLE: "AI_001",
  AI_RATE_LIMITED: "AI_002",
  AI_PAYMENT_REQUIRED: "AI_003",
  
  // Network errors
  NETWORK_TIMEOUT: "NET_001",
  NETWORK_OFFLINE: "NET_002",
  
  // General errors
  UNKNOWN_ERROR: "GEN_001",
  INTERNAL_ERROR: "GEN_002",
} as const;

// User-friendly error messages (Dutch)
const userMessages: Record<string, string> = {
  [ErrorCodes.AUTH_INVALID_CREDENTIALS]: "Ongeldige inloggegevens. Controleer je e-mail en wachtwoord.",
  [ErrorCodes.AUTH_SESSION_EXPIRED]: "Je sessie is verlopen. Log opnieuw in.",
  [ErrorCodes.AUTH_UNAUTHORIZED]: "Je hebt geen toegang tot deze functie.",
  [ErrorCodes.AUTH_EMAIL_NOT_CONFIRMED]: "Bevestig eerst je e-mailadres.",
  [ErrorCodes.DB_CONNECTION_FAILED]: "Verbinding met de server mislukt. Probeer het later opnieuw.",
  [ErrorCodes.DB_QUERY_FAILED]: "Er ging iets mis bij het ophalen van gegevens.",
  [ErrorCodes.DB_RLS_VIOLATION]: "Je hebt geen toestemming voor deze actie.",
  [ErrorCodes.DB_NOT_FOUND]: "Het gevraagde item is niet gevonden.",
  [ErrorCodes.VALIDATION_FAILED]: "Controleer de ingevoerde gegevens.",
  [ErrorCodes.VALIDATION_REQUIRED_FIELD]: "Vul alle verplichte velden in.",
  [ErrorCodes.VALIDATION_INVALID_FORMAT]: "Ongeldig formaat. Controleer de invoer.",
  [ErrorCodes.AI_SERVICE_UNAVAILABLE]: "AI-service tijdelijk niet beschikbaar.",
  [ErrorCodes.AI_RATE_LIMITED]: "Te veel verzoeken. Wacht even en probeer opnieuw.",
  [ErrorCodes.AI_PAYMENT_REQUIRED]: "AI-service niet beschikbaar.",
  [ErrorCodes.NETWORK_TIMEOUT]: "Verbinding timeout. Controleer je internetverbinding.",
  [ErrorCodes.NETWORK_OFFLINE]: "Je bent offline. Controleer je internetverbinding.",
  [ErrorCodes.UNKNOWN_ERROR]: "Er is een onverwachte fout opgetreden.",
  [ErrorCodes.INTERNAL_ERROR]: "Interne fout. Probeer het later opnieuw.",
};

/**
 * Create a structured application error
 */
export function createAppError(
  code: string,
  message: string,
  severity: ErrorSeverity = "error",
  context?: Record<string, unknown>
): AppError {
  return {
    code,
    message,
    userMessage: userMessages[code] || userMessages[ErrorCodes.UNKNOWN_ERROR],
    severity,
    context,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Log an error with consistent formatting
 */
export function logError(error: AppError): void {
  const logData = {
    ...error,
    // Sanitize context to remove sensitive data
    context: error.context ? sanitizeContext(error.context) : undefined,
  };

  switch (error.severity) {
    case "info":
      console.info(`[${error.code}]`, logData);
      break;
    case "warn":
      console.warn(`[${error.code}]`, logData);
      break;
    case "critical":
    case "error":
    default:
      console.error(`[${error.code}]`, logData);
  }
}

/**
 * Remove sensitive data from context before logging
 */
function sanitizeContext(context: Record<string, unknown>): Record<string, unknown> {
  const sensitiveKeys = ["password", "token", "apiKey", "secret", "authorization"];
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(context)) {
    if (sensitiveKeys.some((sk) => key.toLowerCase().includes(sk))) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeContext(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Parse Supabase error to AppError
 */
export function parseSupabaseError(error: unknown): AppError {
  if (!error || typeof error !== "object") {
    return createAppError(ErrorCodes.UNKNOWN_ERROR, "Unknown error occurred");
  }

  const err = error as { message?: string; code?: string; status?: number };
  const message = err.message || "Unknown Supabase error";

  // Map common Supabase errors
  if (message.includes("Invalid login credentials")) {
    return createAppError(ErrorCodes.AUTH_INVALID_CREDENTIALS, message);
  }
  if (message.includes("Email not confirmed")) {
    return createAppError(ErrorCodes.AUTH_EMAIL_NOT_CONFIRMED, message);
  }
  if (message.includes("JWT") || message.includes("session")) {
    return createAppError(ErrorCodes.AUTH_SESSION_EXPIRED, message);
  }
  if (message.includes("row-level security") || message.includes("RLS")) {
    return createAppError(ErrorCodes.DB_RLS_VIOLATION, message);
  }
  if (err.status === 404 || message.includes("not found")) {
    return createAppError(ErrorCodes.DB_NOT_FOUND, message);
  }

  return createAppError(ErrorCodes.DB_QUERY_FAILED, message);
}

/**
 * Parse network/fetch error to AppError
 */
export function parseNetworkError(error: unknown): AppError {
  if (error instanceof TypeError && error.message.includes("fetch")) {
    if (!navigator.onLine) {
      return createAppError(ErrorCodes.NETWORK_OFFLINE, "Network offline");
    }
    return createAppError(ErrorCodes.NETWORK_TIMEOUT, "Network request failed");
  }

  return createAppError(
    ErrorCodes.UNKNOWN_ERROR,
    error instanceof Error ? error.message : "Unknown network error"
  );
}

/**
 * Parse AI service error to AppError
 */
export function parseAIError(status: number, message?: string): AppError {
  if (status === 429) {
    return createAppError(ErrorCodes.AI_RATE_LIMITED, message || "Rate limited");
  }
  if (status === 402) {
    return createAppError(ErrorCodes.AI_PAYMENT_REQUIRED, message || "Payment required");
  }
  return createAppError(ErrorCodes.AI_SERVICE_UNAVAILABLE, message || "AI service error");
}

/**
 * Get user-friendly message for any error
 */
export function getUserMessage(error: unknown): string {
  if (error && typeof error === "object" && "userMessage" in error) {
    return (error as AppError).userMessage;
  }
  
  if (error instanceof Error) {
    // Check for common error patterns
    if (error.message.includes("network") || error.message.includes("fetch")) {
      return userMessages[ErrorCodes.NETWORK_TIMEOUT];
    }
  }

  return userMessages[ErrorCodes.UNKNOWN_ERROR];
}
