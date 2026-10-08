/**
 * ============================================================
 * NEXTPATH API SERVICE
 * ============================================================
 *
 * Central HTTP client for the NEXTPATH frontend.
 *
 * Responsibilities:
 * - Keep the backend base URL in one place.
 * - Provide consistent GET/POST/PUT/PATCH/DELETE helpers.
 * - Handle JSON and FormData safely.
 * - Add JWT access tokens when requested.
 * - Support request timeouts and safe retries.
 * - Normalize API errors.
 * - Preserve compatibility with the current public backend.
 * - Provide clean service functions for the production backend.
 *
 * Current deployed backend:
 * https://nextpath-api-wdww.onrender.com
 *
 * IMPORTANT:
 * Some /api/... functions below are prepared for the production
 * backend stage. They will only work after the matching FastAPI
 * endpoints are implemented.
 * ============================================================
 */

/* ============================================================
   01. BASE CONFIGURATION
   ============================================================ */

const FALLBACK_API_URL =
  "https://nextpath-api-wdww.onrender.com";

function normalizeBaseUrl(value) {
  return String(value || "")
    .trim()
    .replace(/\/+$/, "");
}

export const API_URL =
  normalizeBaseUrl(
    import.meta.env.VITE_API_URL ||
      FALLBACK_API_URL
  );

export const API_CONFIG = Object.freeze({
  baseUrl: API_URL,

  timeout:
    Number(
      import.meta.env
        .VITE_API_TIMEOUT_MS
    ) || 20000,

  retryCount:
    Number(
      import.meta.env
        .VITE_API_RETRY_COUNT
    ) || 1,

  retryDelay:
    Number(
      import.meta.env
        .VITE_API_RETRY_DELAY_MS
    ) || 700,

  accessTokenKey:
    "nextpathAccessToken",

  refreshTokenKey:
    "nextpathRefreshToken",

  currentUserKey:
    "nextpathCurrentUser",

  loggedInKey:
    "nextpathLoggedIn",
});

/* ============================================================
   02. CUSTOM API ERROR
   ============================================================ */

export class ApiError extends Error {
  constructor(
    message,
    {
      status = 0,
      statusText = "",
      data = null,
      url = "",
      method = "",
      code = "",
      cause = null,
    } = {}
  ) {
    super(
      message ||
        "An unexpected API error occurred."
    );

    this.name =
      "ApiError";

    this.status =
      status;

    this.statusText =
      statusText;

    this.data =
      data;

    this.url =
      url;

    this.method =
      method;

    this.code =
      code;

    this.cause =
      cause;
  }
}

/* ============================================================
   03. STORAGE HELPERS
   ============================================================ */

function canUseStorage() {
  return (
    typeof window !==
      "undefined" &&
    typeof window.localStorage !==
      "undefined"
  );
}

function getStorageItem(key) {
  if (!canUseStorage()) {
    return null;
  }

  try {
    return (
      window.localStorage.getItem(
        key
      )
    );
  } catch {
    return null;
  }
}

function setStorageItem(
  key,
  value
) {
  if (!canUseStorage()) {
    return;
  }

  try {
    if (
      value === null ||
      value === undefined
    ) {
      window.localStorage.removeItem(
        key
      );

      return;
    }

    window.localStorage.setItem(
      key,
      String(value)
    );
  } catch {
    // Storage may be unavailable
    // in private/restricted browser modes.
  }
}

function removeStorageItem(key) {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(
      key
    );
  } catch {
    // Ignore storage failures.
  }
}

export function getAccessToken() {
  return getStorageItem(
    API_CONFIG.accessTokenKey
  );
}

export function getRefreshToken() {
  return getStorageItem(
    API_CONFIG.refreshTokenKey
  );
}

export function setAuthTokens({
  accessToken,
  refreshToken,
} = {}) {
  if (accessToken) {
    setStorageItem(
      API_CONFIG.accessTokenKey,
      accessToken
    );
  }

  if (refreshToken) {
    setStorageItem(
      API_CONFIG.refreshTokenKey,
      refreshToken
    );
  }
}

export function clearAuthTokens() {
  removeStorageItem(
    API_CONFIG.accessTokenKey
  );

  removeStorageItem(
    API_CONFIG.refreshTokenKey
  );
}

export function saveCurrentUser(
  user
) {
  if (!canUseStorage()) {
    return;
  }

  try {
    if (!user) {
      window.localStorage.removeItem(
        API_CONFIG.currentUserKey
      );

      return;
    }

    window.localStorage.setItem(
      API_CONFIG.currentUserKey,
      JSON.stringify(user)
    );
  } catch {
    // Ignore storage failure.
  }
}

export function getCurrentUser() {
  const raw =
    getStorageItem(
      API_CONFIG.currentUserKey
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

export function markLoggedIn(
  value
) {
  setStorageItem(
    API_CONFIG.loggedInKey,
    value
      ? "true"
      : "false"
  );
}

export function clearAuthSession() {
  clearAuthTokens();

  removeStorageItem(
    API_CONFIG.currentUserKey
  );

  removeStorageItem(
    API_CONFIG.loggedInKey
  );
}

/* ============================================================
   04. SMALL UTILITY HELPERS
   ============================================================ */

function sleep(milliseconds) {
  return new Promise(
    (resolve) => {
      window.setTimeout(
        resolve,
        milliseconds
      );
    }
  );
}

function isAbsoluteUrl(value) {
  return /^https?:\/\//i.test(
    String(value || "")
  );
}

function joinUrl(
  base,
  path
) {
  if (isAbsoluteUrl(path)) {
    return path;
  }

  const normalizedPath =
    String(path || "")
      .trim()
      .replace(/^\/+/, "");

  return normalizedPath
    ? `${base}/${normalizedPath}`
    : base;
}

function isFormData(value) {
  return (
    typeof FormData !==
      "undefined" &&
    value instanceof FormData
  );
}

function isBlob(value) {
  return (
    typeof Blob !==
      "undefined" &&
    value instanceof Blob
  );
}

function isUrlSearchParams(
  value
) {
  return (
    typeof URLSearchParams !==
      "undefined" &&
    value instanceof URLSearchParams
  );
}

function isPlainObject(value) {
  if (
    !value ||
    typeof value !==
      "object"
  ) {
    return false;
  }

  const prototype =
    Object.getPrototypeOf(
      value
    );

  return (
    prototype ===
      Object.prototype ||
    prototype === null
  );
}

function encodeQueryValue(
  value
) {
  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  if (
    value instanceof Date
  ) {
    return value.toISOString();
  }

  if (
    typeof value ===
      "boolean"
  ) {
    return value
      ? "true"
      : "false";
  }

  return String(value);
}

/* ============================================================
   05. QUERY STRING BUILDER
   ============================================================ */

export function buildQueryString(
  params = {}
) {
  if (
    !params ||
    typeof params !==
      "object"
  ) {
    return "";
  }

  const searchParams =
    new URLSearchParams();

  Object.entries(
    params
  ).forEach(
    ([key, value]) => {
      if (
        value ===
          undefined ||
        value === null ||
        value === ""
      ) {
        return;
      }

      if (
        Array.isArray(
          value
        )
      ) {
        value.forEach(
          (item) => {
            const encoded =
              encodeQueryValue(
                item
              );

            if (
              encoded !==
              null
            ) {
              searchParams.append(
                key,
                encoded
              );
            }
          }
        );

        return;
      }

      const encoded =
        encodeQueryValue(
          value
        );

      if (
        encoded !== null
      ) {
        searchParams.set(
          key,
          encoded
        );
      }
    }
  );

  const query =
    searchParams.toString();

  return query
    ? `?${query}`
    : "";
}

/* ============================================================
   06. REQUEST BODY PREPARATION
   ============================================================ */

function prepareBody(
  body,
  headers
) {
  if (
    body === undefined ||
    body === null
  ) {
    return undefined;
  }

  if (
    isFormData(body) ||
    isBlob(body) ||
    isUrlSearchParams(body) ||
    typeof body ===
      "string"
  ) {
    return body;
  }

  if (
    isPlainObject(body) ||
    Array.isArray(body)
  ) {
    if (
      !headers.has(
        "Content-Type"
      )
    ) {
      headers.set(
        "Content-Type",
        "application/json"
      );
    }

    return JSON.stringify(
      body
    );
  }

  return body;
}

/* ============================================================
   07. RESPONSE PARSING
   ============================================================ */

async function parseResponse(
  response
) {
  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  if (
    response.status ===
      204 ||
    response.status ===
      205
  ) {
    return null;
  }

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  if (
    contentType.includes(
      "application/pdf"
    ) ||
    contentType.includes(
      "application/octet-stream"
    ) ||
    contentType.startsWith(
      "image/"
    )
  ) {
    return await response.blob();
  }

  try {
    return await response.text();
  } catch {
    return null;
  }
}

/* ============================================================
   08. ERROR MESSAGE NORMALIZATION
   ============================================================ */

function getErrorMessage(
  data,
  response
) {
  if (
    typeof data ===
      "string" &&
    data.trim()
  ) {
    return data.trim();
  }

  if (
    data &&
    typeof data ===
      "object"
  ) {
    if (
      typeof data.detail ===
        "string"
    ) {
      return data.detail;
    }

    if (
      typeof data.message ===
        "string"
    ) {
      return data.message;
    }

    if (
      typeof data.error ===
        "string"
    ) {
      return data.error;
    }

    if (
      Array.isArray(
        data.detail
      )
    ) {
      const first =
        data.detail[0];

      if (
        first &&
        typeof first.msg ===
          "string"
      ) {
        return first.msg;
      }
    }
  }

  return (
    response.statusText ||
    `Request failed with status ${response.status}`
  );
}

/* ============================================================
   09. UNAUTHORIZED EVENT
   ============================================================ */

function emitUnauthorizedEvent(
  detail = {}
) {
  if (
    typeof window ===
      "undefined"
  ) {
    return;
  }

  try {
    window.dispatchEvent(
      new CustomEvent(
        "nextpath:unauthorized",
        {
          detail,
        }
      )
    );
  } catch {
    // Older environments may
    // not support CustomEvent.
  }
}

/* ============================================================
   10. RETRY RULES
   ============================================================ */

const RETRYABLE_METHODS =
  new Set([
    "GET",
    "HEAD",
    "OPTIONS",
  ]);

const RETRYABLE_STATUS_CODES =
  new Set([
    408,
    425,
    429,
    500,
    502,
    503,
    504,
  ]);

function shouldRetry({
  attempt,
  retryCount,
  method,
  status,
  error,
}) {
  if (
    attempt >=
    retryCount
  ) {
    return false;
  }

  if (
    !RETRYABLE_METHODS.has(
      method
    )
  ) {
    return false;
  }

  if (
    status &&
    RETRYABLE_STATUS_CODES.has(
      status
    )
  ) {
    return true;
  }

  if (
    error &&
    (
      error.name ===
        "TypeError" ||
      error.code ===
        "NETWORK_ERROR"
    )
  ) {
    return true;
  }

  return false;
}

/* ============================================================
   11. REQUEST TIMEOUT
   ============================================================ */

function createRequestController(
  timeout
) {
  const controller =
    new AbortController();

  const timer =
    window.setTimeout(
      () => {
        controller.abort();
      },
      timeout
    );

  return {
    controller,
    clear() {
      window.clearTimeout(
        timer
      );
    },
  };
}

/* ============================================================
   12. CORE API REQUEST
   ============================================================ */

export async function apiRequest(
  path,
  {
    method = "GET",
    body,
    query,
    headers = {},
    auth = false,
    timeout =
      API_CONFIG.timeout,
    retries =
      API_CONFIG.retryCount,
    retryDelay =
      API_CONFIG.retryDelay,
    credentials = "same-origin",
    signal,
    onResponse,
  } = {}
) {
  const normalizedMethod =
    String(method)
      .toUpperCase();

  const queryString =
    buildQueryString(
      query
    );

  const url =
    `${joinUrl(
      API_CONFIG.baseUrl,
      path
    )}${queryString}`;

  let attempt = 0;

  while (
    attempt <= retries
  ) {
    const requestHeaders =
      new Headers(
        headers || {}
      );

    if (
      !requestHeaders.has(
        "Accept"
      )
    ) {
      requestHeaders.set(
        "Accept",
        "application/json"
      );
    }

    if (auth) {
      const token =
        getAccessToken();

      if (token) {
        requestHeaders.set(
          "Authorization",
          `Bearer ${token}`
        );
      }
    }

    const preparedBody =
      prepareBody(
        body,
        requestHeaders
      );

    const {
      controller,
      clear,
    } =
      createRequestController(
        timeout
      );

    let abortListener =
      null;

    if (signal) {
      if (signal.aborted) {
        controller.abort();
      } else {
        abortListener =
          () => {
            controller.abort();
          };

        signal.addEventListener(
          "abort",
          abortListener,
          {
            once: true,
          }
        );
      }
    }

    try {
      const response =
        await fetch(
          url,
          {
            method:
              normalizedMethod,

            headers:
              requestHeaders,

            body:
              preparedBody,

            credentials,

            signal:
              controller.signal,
          }
        );

      clear();

      if (
        signal &&
        abortListener
      ) {
        signal.removeEventListener(
          "abort",
          abortListener
        );
      }

      const data =
        await parseResponse(
          response
        );

      if (
        typeof onResponse ===
          "function"
      ) {
        onResponse(
          response,
          data
        );
      }

      if (
        response.ok
      ) {
        return data;
      }

      if (
        response.status ===
          401 &&
        auth
      ) {
        emitUnauthorizedEvent({
          url,
          method:
            normalizedMethod,
          data,
        });
      }

      const apiError =
        new ApiError(
          getErrorMessage(
            data,
            response
          ),
          {
            status:
              response.status,

            statusText:
              response.statusText,

            data,

            url,

            method:
              normalizedMethod,

            code:
              `HTTP_${response.status}`,
          }
        );

      if (
        shouldRetry({
          attempt,
          retryCount:
            retries,
          method:
            normalizedMethod,
          status:
            response.status,
          error:
            apiError,
        })
      ) {
        attempt += 1;

        await sleep(
          retryDelay *
            attempt
        );

        continue;
      }

      throw apiError;
    } catch (error) {
      clear();

      if (
        signal &&
        abortListener
      ) {
        signal.removeEventListener(
          "abort",
          abortListener
        );
      }

      if (
        error instanceof
          ApiError
      ) {
        throw error;
      }

      if (
        error?.name ===
          "AbortError"
      ) {
        throw new ApiError(
          "The request took too long or was cancelled.",
          {
            status: 0,
            data: null,
            url,
            method:
              normalizedMethod,
            code:
              "REQUEST_ABORTED",
            cause: error,
          }
        );
      }

      const networkError =
        new ApiError(
          "Unable to connect to the NEXTPATH server. Please check your internet connection and try again.",
          {
            status: 0,
            data: null,
            url,
            method:
              normalizedMethod,
            code:
              "NETWORK_ERROR",
            cause: error,
          }
        );

      if (
        shouldRetry({
          attempt,
          retryCount:
            retries,
          method:
            normalizedMethod,
          status: 0,
          error:
            networkError,
        })
      ) {
        attempt += 1;

        await sleep(
          retryDelay *
            attempt
        );

        continue;
      }

      throw networkError;
    }
  }

  throw new ApiError(
    "The request could not be completed.",
    {
      url,
      method:
        normalizedMethod,
      code:
        "REQUEST_FAILED",
    }
  );
}

/* ============================================================
   13. HTTP METHOD HELPERS
   ============================================================ */

export function apiGet(
  path,
  options = {}
) {
  return apiRequest(
    path,
    {
      ...options,
      method: "GET",
    }
  );
}

export function apiPost(
  path,
  body,
  options = {}
) {
  return apiRequest(
    path,
    {
      ...options,
      method: "POST",
      body,
    }
  );
}

export function apiPut(
  path,
  body,
  options = {}
) {
  return apiRequest(
    path,
    {
      ...options,
      method: "PUT",
      body,
    }
  );
}

export function apiPatch(
  path,
  body,
  options = {}
) {
  return apiRequest(
    path,
    {
      ...options,
      method: "PATCH",
      body,
    }
  );
}

export function apiDelete(
  path,
  options = {}
) {
  return apiRequest(
    path,
    {
      ...options,
      method: "DELETE",
    }
  );
}

/* ============================================================
   14. CURRENT PUBLIC BACKEND
   ============================================================ */

export function getRoot() {
  return apiGet("/");
}

export function getHealth() {
  return apiGet(
    "/health"
  );
}

export function getCareerMarket(
  query = {}
) {
  return apiGet(
    "/career-market",
    {
      query,
    }
  );
}

export function getCareerByName(
  careerName
) {
  return apiGet(
    `/career-market/${encodeURIComponent(
      careerName
    )}`
  );
}

export function getLearningResources(
  query = {}
) {
  return apiGet(
    "/learning-resources",
    {
      query,
    }
  );
}

export function getLearningResourcesBySkill(
  skillName
) {
  return apiGet(
    `/learning-resources/${encodeURIComponent(
      skillName
    )}`
  );
}

/* ============================================================
   15. AUTHENTICATION API
   Production backend stage
   ============================================================ */

export async function registerUser(
  payload
) {
  return apiPost(
    "/api/auth/register",
    payload,
    {
      retries: 0,
    }
  );
}

export async function loginUser(
  payload
) {
  const data =
    await apiPost(
      "/api/auth/login",
      payload,
      {
        retries: 0,
      }
    );

  const accessToken =
    data?.access_token ||
    data?.accessToken ||
    data?.token;

  const refreshToken =
    data?.refresh_token ||
    data?.refreshToken;

  if (accessToken) {
    setAuthTokens({
      accessToken,
      refreshToken,
    });

    markLoggedIn(
      true
    );
  }

  if (data?.user) {
    saveCurrentUser(
      data.user
    );
  }

  return data;
}

export async function logoutUser({
  callServer = true,
} = {}) {
  try {
    if (
      callServer &&
      getAccessToken()
    ) {
      await apiPost(
        "/api/auth/logout",
        undefined,
        {
          auth: true,
          retries: 0,
        }
      );
    }
  } catch {
    // Local logout should still
    // work even if the server
    // is unavailable.
  } finally {
    clearAuthSession();
  }
}

export function getAuthenticatedUser() {
  return apiGet(
    "/api/auth/me",
    {
      auth: true,
    }
  );
}

export function refreshAccessToken() {
  const refreshToken =
    getRefreshToken();

  if (!refreshToken) {
    throw new ApiError(
      "No refresh token is available.",
      {
        code:
          "NO_REFRESH_TOKEN",
      }
    );
  }

  return apiPost(
    "/api/auth/refresh",
    {
      refresh_token:
        refreshToken,
    },
    {
      retries: 0,
    }
  );
}

export function requestPasswordReset(
  email
) {
  return apiPost(
    "/api/auth/forgot-password",
    {
      email,
    },
    {
      retries: 0,
    }
  );
}

export function resetPassword(
  payload
) {
  return apiPost(
    "/api/auth/reset-password",
    payload,
    {
      retries: 0,
    }
  );
}

export function changePassword(
  payload
) {
  return apiPost(
    "/api/auth/change-password",
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

/* ============================================================
   16. PROFILE API
   ============================================================ */

export function getMyProfile() {
  return apiGet(
    "/api/profile",
    {
      auth: true,
    }
  );
}

export function updateMyProfile(
  payload
) {
  return apiPut(
    "/api/profile",
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function deleteMyProfile() {
  return apiDelete(
    "/api/profile",
    {
      auth: true,
      retries: 0,
    }
  );
}

export function uploadProfilePhoto(
  file
) {
  if (!file) {
    throw new ApiError(
      "Please choose a profile image.",
      {
        code:
          "MISSING_FILE",
      }
    );
  }

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  return apiPost(
    "/api/profile/photo",
    formData,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function deleteProfilePhoto() {
  return apiDelete(
    "/api/profile/photo",
    {
      auth: true,
      retries: 0,
    }
  );
}

/* ============================================================
   17. PROFILE SKILLS API
   ============================================================ */

export function getProfileSkills() {
  return apiGet(
    "/api/profile/skills",
    {
      auth: true,
    }
  );
}

export function addProfileSkill(
  payload
) {
  return apiPost(
    "/api/profile/skills",
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function updateProfileSkill(
  skillId,
  payload
) {
  return apiPut(
    `/api/profile/skills/${encodeURIComponent(
      skillId
    )}`,
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function deleteProfileSkill(
  skillId
) {
  return apiDelete(
    `/api/profile/skills/${encodeURIComponent(
      skillId
    )}`,
    {
      auth: true,
      retries: 0,
    }
  );
}

/* ============================================================
   18. EDUCATION API
   ============================================================ */

export function getEducationRecords() {
  return apiGet(
    "/api/profile/education",
    {
      auth: true,
    }
  );
}

export function addEducationRecord(
  payload
) {
  return apiPost(
    "/api/profile/education",
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function updateEducationRecord(
  educationId,
  payload
) {
  return apiPut(
    `/api/profile/education/${encodeURIComponent(
      educationId
    )}`,
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function deleteEducationRecord(
  educationId
) {
  return apiDelete(
    `/api/profile/education/${encodeURIComponent(
      educationId
    )}`,
    {
      auth: true,
      retries: 0,
    }
  );
}

/* ============================================================
   19. ACHIEVEMENTS API
   ============================================================ */

export function getAchievements() {
  return apiGet(
    "/api/profile/achievements",
    {
      auth: true,
    }
  );
}

export function addAchievement(
  payload
) {
  return apiPost(
    "/api/profile/achievements",
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function updateAchievement(
  achievementId,
  payload
) {
  return apiPut(
    `/api/profile/achievements/${encodeURIComponent(
      achievementId
    )}`,
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function deleteAchievement(
  achievementId
) {
  return apiDelete(
    `/api/profile/achievements/${encodeURIComponent(
      achievementId
    )}`,
    {
      auth: true,
      retries: 0,
    }
  );
}

/* ============================================================
   20. TARGET CAREER API
   ============================================================ */

export function getMyTargetCareer() {
  return apiGet(
    "/api/target-career",
    {
      auth: true,
    }
  );
}

export function setMyTargetCareer(
  payload
) {
  return apiPut(
    "/api/target-career",
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

/* ============================================================
   21. ASSESSMENT API
   ============================================================ */

export function createAssessment(
  payload
) {
  return apiPost(
    "/api/assessments",
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function getMyAssessments(
  query = {}
) {
  return apiGet(
    "/api/assessments",
    {
      auth: true,
      query,
    }
  );
}

export function getAssessment(
  assessmentId
) {
  return apiGet(
    `/api/assessments/${encodeURIComponent(
      assessmentId
    )}`,
    {
      auth: true,
    }
  );
}

export function submitAssessment(
  assessmentId,
  payload
) {
  return apiPost(
    `/api/assessments/${encodeURIComponent(
      assessmentId
    )}/submit`,
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function getAssessmentReport(
  assessmentId
) {
  return apiGet(
    `/api/assessments/${encodeURIComponent(
      assessmentId
    )}/report`,
    {
      auth: true,
    }
  );
}

/* ============================================================
   22. SKILL GAP API
   ============================================================ */

export function getMySkillGaps() {
  return apiGet(
    "/api/skill-gaps",
    {
      auth: true,
    }
  );
}

export function recalculateSkillGaps() {
  return apiPost(
    "/api/skill-gaps/recalculate",
    undefined,
    {
      auth: true,
      retries: 0,
    }
  );
}

/* ============================================================
   23. ROADMAP API
   ============================================================ */

export function createRoadmap(
  payload
) {
  return apiPost(
    "/api/roadmaps",
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function getMyRoadmap() {
  return apiGet(
    "/api/roadmaps/current",
    {
      auth: true,
    }
  );
}

export function updateRoadmapPreferences(
  payload
) {
  return apiPut(
    "/api/roadmaps/current/preferences",
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function updateRoadmapTopic(
  topicId,
  payload
) {
  return apiPatch(
    `/api/roadmaps/topics/${encodeURIComponent(
      topicId
    )}`,
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function getMyProgress() {
  return apiGet(
    "/api/progress",
    {
      auth: true,
    }
  );
}

/* ============================================================
   24. REASSESSMENT API
   ============================================================ */

export function getReassessmentEligibility() {
  return apiGet(
    "/api/reassessments/eligibility",
    {
      auth: true,
    }
  );
}

export function createReassessment(
  payload
) {
  return apiPost(
    "/api/reassessments",
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function submitReassessment(
  reassessmentId,
  payload
) {
  return apiPost(
    `/api/reassessments/${encodeURIComponent(
      reassessmentId
    )}/submit`,
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

/* ============================================================
   25. PROJECTS API
   ============================================================ */

export function getMyProjects(
  query = {}
) {
  return apiGet(
    "/api/projects",
    {
      auth: true,
      query,
    }
  );
}

export function getProject(
  projectId
) {
  return apiGet(
    `/api/projects/${encodeURIComponent(
      projectId
    )}`,
    {
      auth: true,
    }
  );
}

export function createProject(
  payload
) {
  return apiPost(
    "/api/projects",
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function updateProject(
  projectId,
  payload
) {
  return apiPut(
    `/api/projects/${encodeURIComponent(
      projectId
    )}`,
    payload,
    {
      auth: true,
      retries: 0,
    }
  );
}

export function deleteProject(
  projectId
) {
  return apiDelete(
    `/api/projects/${encodeURIComponent(
      projectId
    )}`,
    {
      auth: true,
      retries: 0,
    }
  );
}

/* ============================================================
   26. VERIFIED SKILLS API
   ============================================================ */

export function getVerifiedSkills() {
  return apiGet(
    "/api/verified-skills",
    {
      auth: true,
    }
  );
}

/* ============================================================
   27. CREDENTIALS API
   ============================================================ */

export function getMyCredentials(
  query = {}
) {
  return apiGet(
    "/api/credentials",
    {
      auth: true,
      query,
    }
  );
}

export function getCredential(
  credentialId
) {
  return apiGet(
    `/api/credentials/${encodeURIComponent(
      credentialId
    )}`,
    {
      auth: true,
    }
  );
}

export function verifyCredential(
  credentialId
) {
  return apiGet(
    `/api/credentials/verify/${encodeURIComponent(
      credentialId
    )}`
  );
}

/* ============================================================
   28. OPPORTUNITIES API
   ============================================================ */

export function getOpportunities(
  query = {}
) {
  return apiGet(
    "/api/opportunities",
    {
      auth: true,
      query,
    }
  );
}

export function getOpportunityRecommendations(
  query = {}
) {
  return apiGet(
    "/api/opportunities/recommended",
    {
      auth: true,
      query,
    }
  );
}

/* ============================================================
   29. DASHBOARD API
   ============================================================ */

export function getDashboardSummary() {
  return apiGet(
    "/api/dashboard",
    {
      auth: true,
    }
  );
}

/* ============================================================
   30. NOTIFICATIONS API
   ============================================================ */

export function getNotifications(
  query = {}
) {
  return apiGet(
    "/api/notifications",
    {
      auth: true,
      query,
    }
  );
}

export function markNotificationRead(
  notificationId
) {
  return apiPatch(
    `/api/notifications/${encodeURIComponent(
      notificationId
    )}`,
    {
      read: true,
    },
    {
      auth: true,
      retries: 0,
    }
  );
}

/* ============================================================
   31. API HEALTH HELPERS
   ============================================================ */

export async function checkApiConnection() {
  const startedAt =
    performance.now();

  try {
    const data =
      await getHealth();

    const endedAt =
      performance.now();

    return {
      online: true,
      latencyMs:
        Math.round(
          endedAt -
            startedAt
        ),
      data,
    };
  } catch (error) {
    return {
      online: false,
      latencyMs: null,
      error,
    };
  }
}

/* ============================================================
   32. FRIENDLY ERROR HELPER
   ============================================================ */

export function getFriendlyApiError(
  error
) {
  if (!error) {
    return "Something went wrong.";
  }

  if (
    error instanceof
      ApiError
  ) {
    if (
      error.code ===
        "NETWORK_ERROR"
    ) {
      return "Unable to reach the NEXTPATH server. Check your internet connection and try again.";
    }

    if (
      error.code ===
        "REQUEST_ABORTED"
    ) {
      return "The request took too long. Please try again.";
    }

    if (
      error.status ===
        400
    ) {
      return (
        error.message ||
        "Please check the information you entered."
      );
    }

    if (
      error.status ===
        401
    ) {
      return "Your session is not valid. Please sign in again.";
    }

    if (
      error.status ===
        403
    ) {
      return "You do not have permission to perform this action.";
    }

    if (
      error.status ===
        404
    ) {
      return "The requested NEXTPATH resource could not be found.";
    }

    if (
      error.status ===
        409
    ) {
      return (
        error.message ||
        "This action conflicts with an existing record."
      );
    }

    if (
      error.status ===
        422
    ) {
      return (
        error.message ||
        "Some submitted information is invalid."
      );
    }

    if (
      error.status ===
        429
    ) {
      return "Too many requests were sent. Please wait a moment and try again.";
    }

    if (
      error.status >=
        500
    ) {
      return "The NEXTPATH server encountered a problem. Please try again shortly.";
    }

    return (
      error.message ||
      "The request could not be completed."
    );
  }

  return (
    error.message ||
    "Something went wrong."
  );
}

/* ============================================================
   33. DEFAULT CLIENT EXPORT
   ============================================================ */

const api = {
  url: API_URL,
  config: API_CONFIG,

  request:
    apiRequest,

  get:
    apiGet,

  post:
    apiPost,

  put:
    apiPut,

  patch:
    apiPatch,

  delete:
    apiDelete,

  health:
    getHealth,

  careers: {
    list:
      getCareerMarket,

    get:
      getCareerByName,
  },

  learning: {
    list:
      getLearningResources,

    getBySkill:
      getLearningResourcesBySkill,
  },

  auth: {
    register:
      registerUser,

    login:
      loginUser,

    logout:
      logoutUser,

    me:
      getAuthenticatedUser,

    refresh:
      refreshAccessToken,

    forgotPassword:
      requestPasswordReset,

    resetPassword,

    changePassword,
  },

  profile: {
    get:
      getMyProfile,

    update:
      updateMyProfile,

    remove:
      deleteMyProfile,

    uploadPhoto:
      uploadProfilePhoto,

    deletePhoto:
      deleteProfilePhoto,

    skills: {
      list:
        getProfileSkills,

      create:
        addProfileSkill,

      update:
        updateProfileSkill,

      remove:
        deleteProfileSkill,
    },

    education: {
      list:
        getEducationRecords,

      create:
        addEducationRecord,

      update:
        updateEducationRecord,

      remove:
        deleteEducationRecord,
    },

    achievements: {
      list:
        getAchievements,

      create:
        addAchievement,

      update:
        updateAchievement,

      remove:
        deleteAchievement,
    },
  },

  assessments: {
    create:
      createAssessment,

    list:
      getMyAssessments,

    get:
      getAssessment,

    submit:
      submitAssessment,

    report:
      getAssessmentReport,
  },

  skillGaps: {
    get:
      getMySkillGaps,

    recalculate:
      recalculateSkillGaps,
  },

  roadmap: {
    create:
      createRoadmap,

    current:
      getMyRoadmap,

    updatePreferences:
      updateRoadmapPreferences,

    updateTopic:
      updateRoadmapTopic,
  },

  reassessment: {
    eligibility:
      getReassessmentEligibility,

    create:
      createReassessment,

    submit:
      submitReassessment,
  },

  projects: {
    list:
      getMyProjects,

    get:
      getProject,

    create:
      createProject,

    update:
      updateProject,

    remove:
      deleteProject,
  },

  credentials: {
    list:
      getMyCredentials,

    get:
      getCredential,

    verify:
      verifyCredential,
  },

  opportunities: {
    list:
      getOpportunities,

    recommended:
      getOpportunityRecommendations,
  },

  dashboard: {
    summary:
      getDashboardSummary,
  },
};

export default api;
