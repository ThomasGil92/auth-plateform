/**
 * An array of routesthat are public and should be accessible to everyone
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The prefix for all API routes
 * @type {string}
 */
export const apiRoutesPrefix = "/api/auth";

/**
 * Route to redirect to after login
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
