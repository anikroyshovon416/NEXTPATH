import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const STORAGE_KEYS = {
  users: "nextpathUsers",
  loggedIn: "nextpathLoggedIn",
  currentUser: "nextpathCurrentUser",
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeEmail(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    normalizeEmail(value)
  );
}

function safeUser(user) {
  if (!user || typeof user !== "object") {
    return null;
  }

  const {
    password,
    ...safe
  } = user;

  return safe;
}

function maskEmail(value) {
  const email = String(value || "");
  const [name, domain] = email.split("@");

  if (!domain) {
    return email;
  }

  const visible =
    name.length <= 2
      ? name.slice(0, 1)
      : name.slice(0, 2);

  return `${visible}${"*".repeat(
    Math.max(2, name.length - visible.length)
  )}@${domain}`;
}

function WelcomeStat({
  value,
  label,
}) {
  return (
    <article className="lg-stat">
      <strong>
        {value}
      </strong>

      <span>
        {label}
      </span>
    </article>
  );
}

export default function Login() {
  const navigate =
    useNavigate();

  const [
    form,
    setForm,
  ] =
    useState({
      email: "",
      password: "",
      rememberMe: true,
    });

  const [
    showPassword,
    setShowPassword,
  ] =
    useState(false);

  const [
    errors,
    setErrors,
  ] =
    useState({});

  const [
    submitting,
    setSubmitting,
  ] =
    useState(false);

  const [
    showAccounts,
    setShowAccounts,
  ] =
    useState(false);

  const [
    successMessage,
    setSuccessMessage,
  ] =
    useState("");

  const users =
    useMemo(() => {
      const stored =
        readJSON(
          STORAGE_KEYS.users,
          []
        );

      return Array.isArray(
        stored
      )
        ? stored
        : [];
    }, [
      successMessage,
    ]);

  function updateField(
    field,
    value
  ) {
    setForm(
      (current) => ({
        ...current,
        [field]: value,
      })
    );

    if (
      errors[
        field
      ]
    ) {
      setErrors(
        (current) => ({
          ...current,
          [field]: "",
          general: "",
        })
      );
    }
  }

  function validateForm() {
    const nextErrors =
      {};

    if (
      !form.email.trim()
    ) {
      nextErrors.email =
        "Please enter your email address.";
    } else if (
      !validateEmail(
        form.email
      )
    ) {
      nextErrors.email =
        "Please enter a valid email address.";
    }

    if (
      !form.password
    ) {
      nextErrors.password =
        "Please enter your password.";
    }

    setErrors(
      nextErrors
    );

    return (
      Object.keys(
        nextErrors
      ).length ===
      0
    );
  }

  function handleSubmit(
    event
  ) {
    event.preventDefault();

    setSuccessMessage(
      ""
    );

    if (
      !validateForm()
    ) {
      return;
    }

    setSubmitting(
      true
    );

    try {
      const storedUsers =
        readJSON(
          STORAGE_KEYS.users,
          []
        );

      const normalizedUsers =
        Array.isArray(
          storedUsers
        )
          ? storedUsers
          : [];

      const email =
        normalizeEmail(
          form.email
        );

      const user =
        normalizedUsers.find(
          (item) =>
            normalizeEmail(
              item.email
            ) ===
            email
        );

      if (!user) {
        setErrors({
          general:
            "No account was found with this email. Create an account first.",
        });

        setSubmitting(
          false
        );

        return;
      }

      if (
        user.password !==
        form.password
      ) {
        setErrors({
          password:
            "Incorrect password. Please try again.",
        });

        setSubmitting(
          false
        );

        return;
      }

      localStorage.setItem(
        STORAGE_KEYS.loggedIn,
        "true"
      );

      localStorage.setItem(
        STORAGE_KEYS.currentUser,
        JSON.stringify(
          safeUser(
            user
          )
        )
      );

      if (
        form.rememberMe
      ) {
        localStorage.setItem(
          "nextpathRememberedEmail",
          email
        );
      } else {
        localStorage.removeItem(
          "nextpathRememberedEmail"
        );
      }

      setSuccessMessage(
        "Login successful. Redirecting to your dashboard..."
      );

      setTimeout(
        () => {
          navigate("/");
        },
        650
      );
    } catch {
      setErrors({
        general:
          "Could not sign in. Please try again.",
      });
    } finally {
      setSubmitting(
        false
      );
    }
  }

  function fillAccount(
    user
  ) {
    setForm(
      (current) => ({
        ...current,
        email:
          user.email ||
          "",
        password:
          user.password ||
          "",
      })
    );

    setShowAccounts(
      false
    );

    setErrors(
      {}
    );
  }

  function clearPrototypeAccounts() {
    const confirmed =
      window.confirm(
        "Delete all NEXTPATH prototype accounts saved in this browser?"
      );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      STORAGE_KEYS.users
    );

    localStorage.removeItem(
      STORAGE_KEYS.loggedIn
    );

    localStorage.removeItem(
      STORAGE_KEYS.currentUser
    );

    localStorage.removeItem(
      "nextpathRememberedEmail"
    );

    setForm({
      email: "",
      password: "",
      rememberMe: true,
    });

    setErrors(
      {}
    );

    setSuccessMessage(
      "Prototype accounts cleared from this browser."
    );
  }

  const rememberedEmail =
    readJSON(
      "nextpathRememberedEmail",
      null
    ) ||
    localStorage.getItem(
      "nextpathRememberedEmail"
    );

  return (
    <main className="lg-page">
      <section className="lg-shell">
        <aside className="lg-brand-panel">
          <div className="lg-brand-top">
            <div className="lg-brand-mark">
              NP
            </div>

            <div>
              <strong>
                NEXTPATH
              </strong>

              <small>
                Career Intelligence & Workforce Readiness
              </small>
            </div>
          </div>

          <div className="lg-brand-copy">
            <span>
              WELCOME BACK
            </span>

            <h1>
              Continue building the career
              path you can prove.
            </h1>

            <p>
              Sign in to continue your NEXTPATH journey across target career,
              assessment, skill gap, roadmap, projects, re-assessment,
              credentials and opportunities.
            </p>
          </div>

          <section className="lg-stats">
            <WelcomeStat
              value="01"
              label="Target Career"
            />

            <WelcomeStat
              value="02"
              label="Assessment"
            />

            <WelcomeStat
              value="03"
              label="Roadmap"
            />

            <WelcomeStat
              value="04"
              label="Verification"
            />
          </section>

          <section className="lg-path">
            <article>
              <span>
                01
              </span>

              <div>
                <strong>
                  Assess your current skills
                </strong>

                <small>
                  Use evidence instead of self-rating alone.
                </small>
              </div>
            </article>

            <article>
              <span>
                02
              </span>

              <div>
                <strong>
                  Close the gaps
                </strong>

                <small>
                  Follow a personalized skill roadmap.
                </small>
              </div>
            </article>

            <article>
              <span>
                03
              </span>

              <div>
                <strong>
                  Re-assess and verify
                </strong>

                <small>
                  Turn learning into verified evidence.
                </small>
              </div>
            </article>

            <article>
              <span>
                04
              </span>

              <div>
                <strong>
                  Explore opportunities
                </strong>

                <small>
                  Match your verified profile to career roles.
                </small>
              </div>
            </article>
          </section>

          <div className="lg-brand-footer">
            <strong>
              NEXTPATH Prototype
            </strong>

            <span>
              Local browser authentication for hackathon demonstration.
            </span>
          </div>
        </aside>

        <section className="lg-form-panel">
          <div className="lg-form-wrap">
            <div className="lg-form-head">
              <span className="lg-kicker">
                SIGN IN
              </span>

              <h2>
                Login to NEXTPATH
              </h2>

              <p>
                Use the account you created in this browser.
              </p>
            </div>

            {rememberedEmail &&
              !form.email && (
                <button
                  className="lg-remembered"
                  type="button"
                  onClick={() =>
                    updateField(
                      "email",
                      rememberedEmail
                    )
                  }
                >
                  <div>
                    <span>
                      Remembered account
                    </span>

                    <strong>
                      {maskEmail(
                        rememberedEmail
                      )}
                    </strong>
                  </div>

                  <b>
                    Use →
                  </b>
                </button>
              )}

            {errors.general && (
              <div className="lg-alert error">
                {errors.general}
              </div>
            )}

            {successMessage && (
              <div className="lg-alert success">
                {successMessage}
              </div>
            )}

            <form
              onSubmit={
                handleSubmit
              }
              className="lg-form"
            >
              <label className="lg-field">
                <span>
                  Email Address
                </span>

                <input
                  type="email"
                  value={
                    form.email
                  }
                  onChange={(event) =>
                    updateField(
                      "email",
                      event.target.value
                    )
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                />

                {errors.email && (
                  <small className="lg-error">
                    {errors.email}
                  </small>
                )}
              </label>

              <label className="lg-field">
                <span>
                  Password
                </span>

                <div className="lg-password-wrap">
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      form.password
                    }
                    onChange={(event) =>
                      updateField(
                        "password",
                        event.target.value
                      )
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
                      )
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>

                {errors.password && (
                  <small className="lg-error">
                    {errors.password}
                  </small>
                )}
              </label>

              <div className="lg-login-options">
                <label>
                  <input
                    type="checkbox"
                    checked={
                      form.rememberMe
                    }
                    onChange={(event) =>
                      updateField(
                        "rememberMe",
                        event.target.checked
                      )
                    }
                  />

                  <span>
                    Remember my email
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Password recovery is not implemented in this LocalStorage prototype. In production, use a secure email-based reset flow."
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>

              <button
                className="lg-submit"
                type="submit"
                disabled={
                  submitting
                }
              >
                {submitting
                  ? "Signing In..."
                  : "Sign In to NEXTPATH →"}
              </button>
            </form>

            <div className="lg-divider">
              <span>
                OR
              </span>
            </div>

            <button
              className="lg-account-picker"
              type="button"
              onClick={() =>
                setShowAccounts(
                  (current) =>
                    !current
                )
              }
            >
              <div>
                <strong>
                  Prototype accounts in this browser
                </strong>

                <small>
                  {users.length} account
                  {users.length === 1
                    ? ""
                    : "s"}{" "}
                  found
                </small>
              </div>

              <b>
                {showAccounts
                  ? "−"
                  : "+"}
              </b>
            </button>

            {showAccounts && (
              <section className="lg-account-list">
                {users.length ? (
                  users.map(
                    (user) => (
                      <button
                        key={
                          user.id ||
                          user.email
                        }
                        type="button"
                        onClick={() =>
                          fillAccount(
                            user
                          )
                        }
                      >
                        <div className="lg-avatar">
                          {String(
                            user.fullName ||
                            user.email ||
                            "N"
                          )
                            .trim()
                            .slice(
                              0,
                              1
                            )
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {user.fullName ||
                              "NEXTPATH User"}
                          </strong>

                          <small>
                            {maskEmail(
                              user.email
                            )}
                          </small>
                        </div>

                        <span>
                          Use
                        </span>
                      </button>
                    )
                  )
                ) : (
                  <div className="lg-no-accounts">
                    <strong>
                      No local accounts found
                    </strong>

                    <p>
                      Create an account first using the Register page.
                    </p>
                  </div>
                )}
              </section>
            )}

            <div className="lg-register-link">
              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create account
              </Link>
            </div>

            <section className="lg-prototype-note">
              <div>
                <strong>
                  Prototype authentication
                </strong>

                <p>
                  Accounts are stored in LocalStorage on this browser only.
                  They will not automatically exist on another browser,
                  computer or device.
                </p>
              </div>

              {users.length > 0 && (
                <button
                  type="button"
                  onClick={
                    clearPrototypeAccounts
                  }
                >
                  Clear local accounts
                </button>
              )}
            </section>

            <section className="lg-security-note">
              <strong>
                Production security requirement
              </strong>

              <p>
                This hackathon login compares a plain-text LocalStorage password.
                For a real product, use a backend database, strong password hashing,
                secure sessions or tokens, HTTPS, email verification, rate limits,
                password reset, CSRF/XSS protections and proper authorization.
              </p>
            </section>
          </div>
        </section>
      </section>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .lg-page {
          min-height: 100vh;
          padding: 24px;
          background:
            radial-gradient(
              circle at top left,
              rgba(37,99,235,.09),
              transparent 28%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(220,38,38,.08),
              transparent 30%
            ),
            #f8fafc;
          color: #0f172a;
        }

        .lg-shell {
          max-width: 1260px;
          min-height:
            calc(
              100vh - 48px
            );
          margin: 0 auto;
          display: grid;
          grid-template-columns:
            minmax(390px,.95fr)
            minmax(500px,1.05fr);
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 28px;
          background: #ffffff;
          box-shadow:
            0 30px 80px
            rgba(15,23,42,.10);
        }

        .lg-brand-panel {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 40px;
          background:
            radial-gradient(
              circle at 15% 15%,
              rgba(37,99,235,.24),
              transparent 30%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(220,38,38,.14),
              transparent 30%
            ),
            #0f172a;
          color: #ffffff;
        }

        .lg-brand-panel::after {
          content: "";
          position: absolute;
          right: -110px;
          top: 180px;
          width: 280px;
          height: 280px;
          border: 1px solid
            rgba(255,255,255,.08);
          border-radius: 50%;
        }

        .lg-brand-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lg-brand-mark {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          background: #2563eb;
          color: #ffffff;
          font-weight: 900;
          letter-spacing: .6px;
        }

        .lg-brand-top > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .lg-brand-top strong {
          font-size: 18px;
          letter-spacing: 1px;
        }

        .lg-brand-top small {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 8px;
        }

        .lg-brand-copy {
          position: relative;
          z-index: 1;
          margin-top: 76px;
        }

        .lg-brand-copy > span {
          color: #93c5fd;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        .lg-brand-copy h1 {
          margin: 12px 0 16px;
          max-width: 590px;
          font-size:
            clamp(
              38px,
              4vw,
              58px
            );
          line-height: 1.03;
          letter-spacing: -1.5px;
        }

        .lg-brand-copy p {
          max-width: 590px;
          margin: 0;
          color: #94a3b8;
          line-height: 1.7;
        }

        .lg-stats {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
          margin-top: 32px;
        }

        .lg-stat {
          display: flex;
          flex-direction: column;
          padding: 11px;
          border: 1px solid
            rgba(255,255,255,.10);
          border-radius: 10px;
          background:
            rgba(255,255,255,.04);
        }

        .lg-stat strong {
          color: #93c5fd;
          font-size: 15px;
        }

        .lg-stat span {
          margin-top: 4px;
          color: #cbd5e1;
          font-size: 7px;
          line-height: 1.3;
        }

        .lg-path {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 9px;
          margin-top: 20px;
        }

        .lg-path article {
          display: flex;
          gap: 10px;
          padding: 12px;
          border: 1px solid
            rgba(255,255,255,.09);
          border-radius: 11px;
          background:
            rgba(255,255,255,.035);
        }

        .lg-path article > span {
          width: 29px;
          height: 29px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background:
            rgba(37,99,235,.20);
          color: #93c5fd;
          font-size: 8px;
          font-weight: 900;
        }

        .lg-path article > div {
          display: flex;
          flex-direction: column;
        }

        .lg-path strong {
          font-size: 10px;
        }

        .lg-path small {
          margin-top: 3px;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.4;
        }

        .lg-brand-footer {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          margin-top: auto;
          padding-top: 28px;
        }

        .lg-brand-footer strong {
          font-size: 9px;
        }

        .lg-brand-footer span {
          margin-top: 4px;
          color: #64748b;
          font-size: 8px;
        }

        .lg-form-panel {
          display: flex;
          justify-content: center;
          padding: 42px;
          background: #ffffff;
        }

        .lg-form-wrap {
          width:
            min(
              580px,
              100%
            );
          align-self: center;
        }

        .lg-form-head {
          margin-bottom: 22px;
        }

        .lg-kicker {
          color: #2563eb;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.3px;
        }

        .lg-form-head h2 {
          margin: 7px 0 5px;
          font-size: 32px;
          letter-spacing: -.6px;
        }

        .lg-form-head p {
          margin: 0;
          color: #64748b;
          line-height: 1.5;
        }

        .lg-remembered {
          width: 100%;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          margin-bottom: 13px;
          padding: 11px 12px;
          border: 1px solid #bfdbfe;
          border-radius: 9px;
          background: #eff6ff;
          color: #1e3a8a;
          text-align: left;
          cursor: pointer;
        }

        .lg-remembered > div {
          display: flex;
          flex-direction: column;
        }

        .lg-remembered span {
          color: #60a5fa;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .lg-remembered strong {
          margin-top: 3px;
          font-size: 10px;
        }

        .lg-remembered b {
          font-size: 9px;
        }

        .lg-alert {
          margin-bottom: 13px;
          padding: 11px 12px;
          border-radius: 9px;
          font-size: 9px;
          line-height: 1.4;
        }

        .lg-alert.error {
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
        }

        .lg-alert.success {
          border: 1px solid #bbf7d0;
          background: #f0fdf4;
          color: #166534;
        }

        .lg-form {
          display: grid;
          gap: 14px;
        }

        .lg-field {
          display: block;
        }

        .lg-field > span {
          display: block;
          margin-bottom: 6px;
          color: #334155;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .4px;
        }

        .lg-field input {
          width: 100%;
          padding: 12px 13px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          outline: none;
          background: #ffffff;
          color: #0f172a;
          font: inherit;
          transition:
            border-color .15s ease,
            box-shadow .15s ease;
        }

        .lg-field input:focus {
          border-color: #2563eb;
          box-shadow:
            0 0 0 3px
            rgba(37,99,235,.08);
        }

        .lg-password-wrap {
          position: relative;
        }

        .lg-password-wrap input {
          padding-right: 70px;
        }

        .lg-password-wrap button {
          position: absolute;
          right: 7px;
          top: 50%;
          transform:
            translateY(-50%);
          padding: 6px 8px;
          border: 0;
          border-radius: 6px;
          background: #f1f5f9;
          color: #475569;
          font-size: 8px;
          font-weight: 850;
          cursor: pointer;
        }

        .lg-error {
          display: block;
          margin-top: 5px;
          color: #dc2626;
          font-size: 8px;
          line-height: 1.35;
        }

        .lg-login-options {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
        }

        .lg-login-options label {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 8px;
          cursor: pointer;
        }

        .lg-login-options input {
          accent-color: #2563eb;
        }

        .lg-login-options > button {
          border: 0;
          background: transparent;
          color: #2563eb;
          font-size: 8px;
          font-weight: 850;
          cursor: pointer;
        }

        .lg-submit {
          padding: 13px 16px;
          border: 0;
          border-radius: 9px;
          background:
            linear-gradient(
              135deg,
              #2563eb,
              #3b82f6
            );
          color: #ffffff;
          font-weight: 900;
          cursor: pointer;
          box-shadow:
            0 10px 24px
            rgba(37,99,235,.20);
        }

        .lg-submit:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .lg-divider {
          position: relative;
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }

        .lg-divider::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          background: #e2e8f0;
        }

        .lg-divider span {
          position: relative;
          padding: 0 10px;
          background: #ffffff;
          color: #94a3b8;
          font-size: 7px;
          font-weight: 900;
        }

        .lg-account-picker {
          width: 100%;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          padding: 11px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #f8fafc;
          color: #334155;
          text-align: left;
          cursor: pointer;
        }

        .lg-account-picker > div {
          display: flex;
          flex-direction: column;
        }

        .lg-account-picker strong {
          font-size: 9px;
        }

        .lg-account-picker small {
          margin-top: 3px;
          color: #94a3b8;
          font-size: 7px;
        }

        .lg-account-picker b {
          display: grid;
          place-items: center;
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: #ffffff;
        }

        .lg-account-list {
          display: grid;
          gap: 6px;
          margin-top: 8px;
          padding: 8px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #f8fafc;
        }

        .lg-account-list > button {
          display: grid;
          grid-template-columns:
            34px
            minmax(0,1fr)
            auto;
          gap: 9px;
          align-items: center;
          padding: 8px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          text-align: left;
          cursor: pointer;
        }

        .lg-avatar {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          background: #dbeafe;
          color: #1d4ed8;
          font-weight: 900;
        }

        .lg-account-list > button > div:nth-child(2) {
          display: flex;
          flex-direction: column;
        }

        .lg-account-list strong {
          font-size: 9px;
        }

        .lg-account-list small {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 7px;
        }

        .lg-account-list > button > span {
          color: #2563eb;
          font-size: 8px;
          font-weight: 850;
        }

        .lg-no-accounts {
          padding: 13px;
          text-align: center;
        }

        .lg-no-accounts strong {
          font-size: 9px;
        }

        .lg-no-accounts p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 8px;
        }

        .lg-register-link {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 18px;
          color: #64748b;
          font-size: 9px;
        }

        .lg-register-link a {
          color: #2563eb;
          font-weight: 900;
          text-decoration: none;
        }

        .lg-prototype-note,
        .lg-security-note {
          margin-top: 16px;
          padding: 11px 12px;
          border-radius: 9px;
        }

        .lg-prototype-note {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .lg-prototype-note > div {
          display: flex;
          flex-direction: column;
        }

        .lg-prototype-note strong {
          font-size: 8px;
          text-transform: uppercase;
        }

        .lg-prototype-note p {
          margin: 4px 0 0;
          max-width: 360px;
          color: #64748b;
          font-size: 8px;
          line-height: 1.45;
        }

        .lg-prototype-note button {
          padding: 7px 8px;
          border: 1px solid #fecaca;
          border-radius: 7px;
          background: #ffffff;
          color: #b91c1c;
          font-size: 7px;
          font-weight: 850;
          white-space: nowrap;
          cursor: pointer;
        }

        .lg-security-note {
          border: 1px solid #fde68a;
          background: #fffbeb;
        }

        .lg-security-note strong {
          color: #92400e;
          font-size: 8px;
          text-transform: uppercase;
        }

        .lg-security-note p {
          margin: 5px 0 0;
          color: #92400e;
          font-size: 8px;
          line-height: 1.45;
        }

        @media(max-width: 1020px) {
          .lg-shell {
            grid-template-columns: 1fr;
          }

          .lg-brand-copy {
            margin-top: 42px;
          }

          .lg-brand-footer {
            margin-top: 28px;
          }
        }

        @media(max-width: 680px) {
          .lg-page {
            padding: 10px;
          }

          .lg-shell {
            min-height:
              calc(
                100vh - 20px
              );
            border-radius: 18px;
          }

          .lg-brand-panel,
          .lg-form-panel {
            padding: 24px;
          }

          .lg-brand-copy h1 {
            font-size: 38px;
          }

          .lg-stats,
          .lg-path {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .lg-form-head h2 {
            font-size: 27px;
          }

          .lg-login-options,
          .lg-prototype-note {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media(max-width: 420px) {
          .lg-stats,
          .lg-path {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
