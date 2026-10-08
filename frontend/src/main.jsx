import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

/**
 * =========================================================
 * NEXTPATH FRONTEND ENTRY POINT
 * =========================================================
 *
 * Responsibilities of main.jsx:
 * 1. Mount the React application.
 * 2. Enable React StrictMode during development.
 * 3. Provide BrowserRouter to the full application.
 * 4. Catch unexpected rendering errors.
 *
 * Business logic, authentication logic, API calls and
 * application routes should stay outside this file.
 * =========================================================
 */

/**
 * A small production-safe Error Boundary.
 *
 * If one page crashes because of an unexpected runtime error,
 * the user gets a controlled recovery screen instead of a
 * completely blank application.
 */
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Keep useful development information in the console.
    // Later, this can be connected to a service such as Sentry.
    console.error(
      "[NEXTPATH] Unhandled React error:",
      error,
      errorInfo
    );
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const isDevelopment =
      import.meta.env.DEV;

    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          background:
            "radial-gradient(circle at top right, rgba(37, 99, 235, 0.10), transparent 34%), #f8fafc",
          color: "#0f172a",
        }}
      >
        <section
          style={{
            width: "min(620px, 100%)",
            padding: "32px",
            border: "1px solid #e2e8f0",
            borderRadius: "20px",
            background: "#ffffff",
            boxShadow:
              "0 20px 55px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              display: "grid",
              placeItems: "center",
              marginBottom: "18px",
              borderRadius: "14px",
              background: "#fee2e2",
              color: "#b91c1c",
              fontSize: "22px",
              fontWeight: 900,
            }}
          >
            !
          </div>

          <p
            style={{
              margin: 0,
              color: "#2563eb",
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "0.1em",
            }}
          >
            NEXTPATH
          </p>

          <h1
            style={{
              margin: "8px 0 10px",
              fontSize: "30px",
              lineHeight: 1.15,
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              lineHeight: 1.7,
            }}
          >
            NEXTPATH encountered an unexpected interface error.
            Your saved browser data has not been intentionally
            removed. Reload the application or return to the
            dashboard.
          </p>

          {isDevelopment &&
            this.state.error && (
              <pre
                style={{
                  marginTop: "18px",
                  padding: "14px",
                  overflowX: "auto",
                  border: "1px solid #fecaca",
                  borderRadius: "10px",
                  background: "#fef2f2",
                  color: "#991b1b",
                  fontSize: "12px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {String(
                  this.state.error?.stack ||
                    this.state.error?.message ||
                    this.state.error
                )}
              </pre>
            )}

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "22px",
            }}
          >
            <button
              type="button"
              onClick={
                this.handleReload
              }
              style={{
                minHeight: "42px",
                padding: "10px 15px",
                border: "1px solid #2563eb",
                borderRadius: "9px",
                background: "#2563eb",
                color: "#ffffff",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Reload NEXTPATH
            </button>

            <button
              type="button"
              onClick={
                this.handleGoHome
              }
              style={{
                minHeight: "42px",
                padding: "10px 15px",
                border: "1px solid #cbd5e1",
                borderRadius: "9px",
                background: "#ffffff",
                color: "#334155",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </section>
      </main>
    );
  }
}

/**
 * Get the root element created by Vite in index.html.
 */
const rootElement =
  document.getElementById("root");

/**
 * Fail clearly during development if index.html is damaged
 * or the required #root element is missing.
 */
if (!rootElement) {
  throw new Error(
    'NEXTPATH could not start because the element with id="root" was not found in index.html.'
  );
}

/**
 * Create the React root once.
 */
const root =
  ReactDOM.createRoot(
    rootElement
  );

/**
 * Application bootstrap.
 *
 * BrowserRouter belongs here so every page and component can
 * use React Router hooks such as:
 *
 * - useNavigate()
 * - useLocation()
 * - useParams()
 * - useSearchParams()
 */
root.render(
  <StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppErrorBoundary>
  </StrictMode>
);
