import { Navigate, useLocation } from "react-router-dom";

/**
 * ============================================================
 * NEXTPATH PROTECTED ROUTE
 * ============================================================
 *
 * This component protects private pages such as:
 *
 * - Dashboard
 * - Profile
 * - Assessment
 * - Roadmap
 * - Projects
 * - Credentials
 * - Opportunities
 *
 * It currently supports the authentication data already used
 * by the NEXTPATH frontend:
 *
 * nextpathLoggedIn
 * nextpathAccessToken
 * nextpathCurrentUser
 *
 * During the current transition to real backend authentication,
 * either a valid login flag OR an access token can identify an
 * authenticated user.
 *
 * When the FastAPI JWT authentication backend is complete, you
 * can make the token the primary authentication requirement.
 * ============================================================
 */

const AUTH_KEYS = Object.freeze({
  loggedIn: "nextpathLoggedIn",
  accessToken: "nextpathAccessToken",
  refreshToken: "nextpathRefreshToken",
  currentUser: "nextpathCurrentUser",
});

/**
 * Safely read localStorage.
 */
function getStorageItem(key) {
  if (
    typeof window === "undefined" ||
    !window.localStorage
  ) {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Check whether a usable current-user record exists.
 */
function hasCurrentUser() {
  const raw = getStorageItem(
    AUTH_KEYS.currentUser
  );

  if (!raw) {
    return false;
  }

  try {
    const user = JSON.parse(raw);

    return Boolean(
      user &&
      typeof user === "object" &&
      (
        user.id ||
        user.email ||
        user.fullName ||
        user.name
      )
    );
  } catch {
    return false;
  }
}

/**
 * Current NEXTPATH authentication check.
 *
 * This intentionally supports BOTH:
 *
 * 1. Existing localStorage login:
 *    nextpathLoggedIn === "true"
 *
 * 2. Future backend JWT login:
 *    nextpathAccessToken exists
 *
 * This lets you upgrade the backend without breaking the
 * current frontend during development.
 */
export function isAuthenticated() {
  const loginFlag =
    getStorageItem(
      AUTH_KEYS.loggedIn
    ) === "true";

  const accessToken =
    getStorageItem(
      AUTH_KEYS.accessToken
    );

  const userExists =
    hasCurrentUser();

  /**
   * Existing NEXTPATH localStorage login.
   */
  if (
    loginFlag &&
    userExists
  ) {
    return true;
  }

  /**
   * Future backend JWT authentication.
   *
   * Once your real authentication backend is complete,
   * this token-based path becomes the main method.
   */
  if (
    Boolean(accessToken)
  ) {
    return true;
  }

  return false;
}

/**
 * Return the saved user if available.
 */
export function getAuthenticatedUserFromStorage() {
  const raw = getStorageItem(
    AUTH_KEYS.currentUser
  );

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Clear local authentication state.
 *
 * Use this after logout or when the backend reports that the
 * user's authentication session is invalid.
 */
export function clearAuthenticationState() {
  if (
    typeof window === "undefined" ||
    !window.localStorage
  ) {
    return;
  }

  try {
    window.localStorage.removeItem(
      AUTH_KEYS.loggedIn
    );

    window.localStorage.removeItem(
      AUTH_KEYS.accessToken
    );

    window.localStorage.removeItem(
      AUTH_KEYS.refreshToken
    );

    window.localStorage.removeItem(
      AUTH_KEYS.currentUser
    );
  } catch {
    // Ignore storage errors.
  }
}

/**
 * ============================================================
 * PROTECTED ROUTE
 * ============================================================
 *
 * Example:
 *
 * <Route
 *   path="/profile"
 *   element={
 *     <ProtectedRoute>
 *       <Profile />
 *     </ProtectedRoute>
 *   }
 * />
 */
export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}) {
  const location =
    useLocation();

  const authenticated =
    isAuthenticated();

  if (!authenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{
          from:
            location.pathname +
            location.search +
            location.hash,

          reason:
            "authentication-required",
        }}
      />
    );
  }

  return children;
}

/**
 * ============================================================
 * PUBLIC ONLY ROUTE
 * ============================================================
 *
 * Login and Register should normally not be shown to a user
 * who is already authenticated.
 *
 * Example:
 *
 * <Route
 *   path="/login"
 *   element={
 *     <PublicOnlyRoute>
 *       <Login />
 *     </PublicOnlyRoute>
 *   }
 * />
 */
export function PublicOnlyRoute({
  children,
  redirectTo = "/",
}) {
  const authenticated =
    isAuthenticated();

  if (authenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  return children;
}

/**
 * ============================================================
 * AUTHENTICATION STORAGE CONSTANTS
 * ============================================================
 *
 * Exported so Login, Logout and future AuthContext code can
 * use the same keys without repeating strings everywhere.
 */
export { AUTH_KEYS };
