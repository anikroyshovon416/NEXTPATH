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

function passwordStrength(password) {
  const value = String(password || "");

  let score = 0;

  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[a-z]/.test(value)) score += 1;
  if (/[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  if (!value) {
    return {
      score: 0,
      label: "No password",
      tone: "empty",
    };
  }

  if (score <= 2) {
    return {
      score,
      label: "Weak",
      tone: "weak",
    };
  }

  if (score <= 4) {
    return {
      score,
      label: "Good",
      tone: "good",
    };
  }

  return {
    score,
    label: "Strong",
    tone: "strong",
  };
}

function requirementState(password) {
  const value = String(password || "");

  return [
    {
      label: "At least 8 characters",
      met: value.length >= 8,
    },
    {
      label: "At least one uppercase letter",
      met: /[A-Z]/.test(value),
    },
    {
      label: "At least one lowercase letter",
      met: /[a-z]/.test(value),
    },
    {
      label: "At least one number",
      met: /[0-9]/.test(value),
    },
    {
      label: "At least one special character",
      met: /[^A-Za-z0-9]/.test(value),
    },
  ];
}

function createUserId() {
  return `np-user-${Date.now()}`;
}

function safeUser(user) {
  const {
    password,
    confirmPassword,
    ...rest
  } = user;

  return rest;
}

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    careerStage: "Student",
    studyField: "",
    preferredCareer: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const strength =
    useMemo(
      () =>
        passwordStrength(
          form.password
        ),
      [form.password]
    );

  const passwordRequirements =
    useMemo(
      () =>
        requirementState(
          form.password
        ),
      [form.password]
    );

  const allPasswordRequirementsMet =
    passwordRequirements.every(
      (item) => item.met
    );

  function updateField(field, value) {
    setForm(
      (current) => ({
        ...current,
        [field]: value,
      })
    );

    if (errors[field]) {
      setErrors(
        (current) => ({
          ...current,
          [field]: "",
        })
      );
    }
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName =
        "Please enter your full name.";
    } else if (
      form.fullName.trim().length < 2
    ) {
      nextErrors.fullName =
        "Name must contain at least 2 characters.";
    }

    if (!form.email.trim()) {
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

    if (!form.password) {
      nextErrors.password =
        "Please create a password.";
    } else if (
      !allPasswordRequirementsMet
    ) {
      nextErrors.password =
        "Password does not meet all security requirements.";
    }

    if (
      !form.confirmPassword
    ) {
      nextErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      form.password !==
      form.confirmPassword
    ) {
      nextErrors.confirmPassword =
        "Passwords do not match.";
    }

    if (
      !form.agreeTerms
    ) {
      nextErrors.agreeTerms =
        "Please accept the terms to continue.";
    }

    const users =
      readJSON(
        STORAGE_KEYS.users,
        []
      );

    const normalizedEmail =
      normalizeEmail(
        form.email
      );

    const alreadyExists =
      Array.isArray(users) &&
      users.some(
        (user) =>
          normalizeEmail(
            user.email
          ) ===
          normalizedEmail
      );

    if (alreadyExists) {
      nextErrors.email =
        "An account with this email already exists.";
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

  function handleSubmit(event) {
    event.preventDefault();

    setSuccessMessage("");

    const valid =
      validateForm();

    if (!valid) {
      return;
    }

    setSubmitting(true);

    try {
      const users =
        readJSON(
          STORAGE_KEYS.users,
          []
        );

      const normalizedUsers =
        Array.isArray(
          users
        )
          ? users
          : [];

      const newUser = {
        id:
          createUserId(),
        fullName:
          form.fullName.trim(),
        email:
          normalizeEmail(
            form.email
          ),
        password:
          form.password,
        careerStage:
          form.careerStage,
        studyField:
          form.studyField.trim(),
        preferredCareer:
          form.preferredCareer.trim(),
        createdAt:
          new Date()
            .toISOString(),
      };

      const nextUsers = [
        ...normalizedUsers,
        newUser,
      ];

      localStorage.setItem(
        STORAGE_KEYS.users,
        JSON.stringify(
          nextUsers
        )
      );

      localStorage.setItem(
        STORAGE_KEYS.loggedIn,
        "true"
      );

      localStorage.setItem(
        STORAGE_KEYS.currentUser,
        JSON.stringify(
          safeUser(
            newUser
          )
        )
      );

      setSuccessMessage(
        "Account created successfully. Redirecting to your dashboard..."
      );

      setTimeout(
        () => {
          navigate("/");
        },
        700
      );
    } catch {
      setErrors({
        general:
          "Could not create your account. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="rg-page">
      <section className="rg-shell">
        <aside className="rg-brand-panel">
          <div className="rg-brand-top">
            <div className="rg-brand-mark">
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

          <div className="rg-brand-copy">
            <span>
              CREATE YOUR CAREER PROFILE
            </span>

            <h1>
              Start building a career path
              based on evidence, not guesswork.
            </h1>

            <p>
              NEXTPATH connects your target career, required skills, assessment
              evidence, skill gaps, roadmap, projects, verified credentials and
              career opportunities in one workflow.
            </p>
          </div>

          <div className="rg-flow-card">
            <article>
              <span>
                01
              </span>

              <div>
                <strong>
                  Choose target career
                </strong>

                <small>
                  Explore demand, skills and opportunity.
                </small>
              </div>
            </article>

            <article>
              <span>
                02
              </span>

              <div>
                <strong>
                  Assess your skills
                </strong>

                <small>
                  Quiz, problem solving, practical work and projects.
                </small>
              </div>
            </article>

            <article>
              <span>
                03
              </span>

              <div>
                <strong>
                  Close the skill gap
                </strong>

                <small>
                  Get a personalized roadmap and learning resources.
                </small>
              </div>
            </article>

            <article>
              <span>
                04
              </span>

              <div>
                <strong>
                  Verify and apply
                </strong>

                <small>
                  Re-assess, earn project credentials and explore opportunities.
                </small>
              </div>
            </article>
          </div>

          <div className="rg-brand-footer">
            <strong>
              NEXTPATH Prototype
            </strong>

            <span>
              Built for career-readiness experimentation and hackathon demonstration.
            </span>
          </div>
        </aside>

        <section className="rg-form-panel">
          <div className="rg-form-wrap">
            <div className="rg-form-head">
              <span className="rg-kicker">
                CREATE ACCOUNT
              </span>

              <h2>
                Register for NEXTPATH
              </h2>

              <p>
                Create your profile to save your career journey in this browser.
              </p>
            </div>

            {errors.general && (
              <div className="rg-alert error">
                {errors.general}
              </div>
            )}

            {successMessage && (
              <div className="rg-alert success">
                {successMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="rg-form"
            >
              <label className="rg-field">
                <span>
                  Full Name
                </span>

                <input
                  type="text"
                  value={
                    form.fullName
                  }
                  onChange={(event) =>
                    updateField(
                      "fullName",
                      event.target.value
                    )
                  }
                  placeholder="Enter your full name"
                  autoComplete="name"
                />

                {errors.fullName && (
                  <small className="rg-error">
                    {errors.fullName}
                  </small>
                )}
              </label>

              <label className="rg-field">
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
                  <small className="rg-error">
                    {errors.email}
                  </small>
                )}
              </label>

              <div className="rg-two-fields">
                <label className="rg-field">
                  <span>
                    Career Stage
                  </span>

                  <select
                    value={
                      form.careerStage
                    }
                    onChange={(event) =>
                      updateField(
                        "careerStage",
                        event.target.value
                      )
                    }
                  >
                    <option>
                      Student
                    </option>

                    <option>
                      Fresher
                    </option>

                    <option>
                      Early Career
                    </option>

                    <option>
                      Working Professional
                    </option>

                    <option>
                      Career Switcher
                    </option>
                  </select>
                </label>

                <label className="rg-field">
                  <span>
                    Study / Work Field
                  </span>

                  <input
                    type="text"
                    value={
                      form.studyField
                    }
                    onChange={(event) =>
                      updateField(
                        "studyField",
                        event.target.value
                      )
                    }
                    placeholder="Example: CSE AIML"
                  />
                </label>
              </div>

              <label className="rg-field">
                <span>
                  Preferred Career
                  <em>
                    Optional
                  </em>
                </span>

                <input
                  type="text"
                  value={
                    form.preferredCareer
                  }
                  onChange={(event) =>
                    updateField(
                      "preferredCareer",
                      event.target.value
                    )
                  }
                  placeholder="Example: AI Engineer"
                />
              </label>

              <label className="rg-field">
                <span>
                  Password
                </span>

                <div className="rg-password-wrap">
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
                    placeholder="Create a strong password"
                    autoComplete="new-password"
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
                  <small className="rg-error">
                    {errors.password}
                  </small>
                )}
              </label>

              <section className="rg-password-strength">
                <div className="rg-strength-head">
                  <span>
                    Password Strength
                  </span>

                  <strong
                    className={
                      strength.tone
                    }
                  >
                    {strength.label}
                  </strong>
                </div>

                <div className="rg-strength-bars">
                  {[1, 2, 3, 4, 5].map(
                    (step) => (
                      <div
                        key={step}
                        className={
                          strength.score >=
                          step
                            ? `active ${strength.tone}`
                            : ""
                        }
                      />
                    )
                  )}
                </div>

                <div className="rg-password-requirements">
                  {passwordRequirements.map(
                    (item) => (
                      <div
                        key={
                          item.label
                        }
                        className={
                          item.met
                            ? "met"
                            : ""
                        }
                      >
                        <span>
                          {item.met
                            ? "✓"
                            : "○"}
                        </span>

                        <small>
                          {item.label}
                        </small>
                      </div>
                    )
                  )}
                </div>
              </section>

              <label className="rg-field">
                <span>
                  Confirm Password
                </span>

                <div className="rg-password-wrap">
                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      form.confirmPassword
                    }
                    onChange={(event) =>
                      updateField(
                        "confirmPassword",
                        event.target.value
                      )
                    }
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) =>
                          !current
                      )
                    }
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <small className="rg-error">
                    {errors.confirmPassword}
                  </small>
                )}
              </label>

              <label className="rg-terms">
                <input
                  type="checkbox"
                  checked={
                    form.agreeTerms
                  }
                  onChange={(event) =>
                    updateField(
                      "agreeTerms",
                      event.target.checked
                    )
                  }
                />

                <span>
                  I understand this hackathon version stores account data in
                  this browser using LocalStorage and is not production-grade
                  authentication.
                </span>
              </label>

              {errors.agreeTerms && (
                <small className="rg-error">
                  {errors.agreeTerms}
                </small>
              )}

              <button
                className="rg-submit"
                type="submit"
                disabled={
                  submitting
                }
              >
                {submitting
                  ? "Creating Account..."
                  : "Create NEXTPATH Account →"}
              </button>
            </form>

            <div className="rg-login-link">
              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Sign in
              </Link>
            </div>

            <div className="rg-security-note">
              <strong>
                Prototype security note
              </strong>

              <p>
                This version uses LocalStorage for demonstration, so passwords
                are not securely hashed or stored on a backend server. For
                production, replace this with backend authentication, hashed
                passwords, secure sessions or tokens, validation, rate limits
                and account recovery.
              </p>
            </div>
          </div>
        </section>
      </section>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .rg-page {
          min-height: 100vh;
          padding: 24px;
          background:
            radial-gradient(
              circle at top left,
              rgba(220,38,38,.08),
              transparent 28%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(37,99,235,.08),
              transparent 30%
            ),
            #f8fafc;
          color: #0f172a;
        }

        .rg-shell {
          max-width: 1280px;
          min-height: calc(
            100vh - 48px
          );
          margin: 0 auto;
          display: grid;
          grid-template-columns:
            minmax(380px,.9fr)
            minmax(520px,1.1fr);
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 28px;
          background: #ffffff;
          box-shadow:
            0 30px 80px
            rgba(15,23,42,.10);
        }

        .rg-brand-panel {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 38px;
          background:
            radial-gradient(
              circle at 15% 15%,
              rgba(220,38,38,.22),
              transparent 30%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(59,130,246,.16),
              transparent 30%
            ),
            #0f172a;
          color: #ffffff;
        }

        .rg-brand-panel::after {
          content: "";
          position: absolute;
          right: -120px;
          top: 160px;
          width: 280px;
          height: 280px;
          border: 1px solid
            rgba(255,255,255,.08);
          border-radius: 50%;
        }

        .rg-brand-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .rg-brand-mark {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          background: #dc2626;
          color: #ffffff;
          font-weight: 900;
          letter-spacing: .5px;
        }

        .rg-brand-top > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .rg-brand-top strong {
          font-size: 18px;
          letter-spacing: 1px;
        }

        .rg-brand-top small {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 8px;
        }

        .rg-brand-copy {
          position: relative;
          z-index: 1;
          margin-top: 70px;
        }

        .rg-brand-copy > span {
          color: #fca5a5;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        .rg-brand-copy h1 {
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

        .rg-brand-copy p {
          max-width: 600px;
          margin: 0;
          color: #94a3b8;
          line-height: 1.7;
        }

        .rg-flow-card {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 10px;
          margin-top: 36px;
        }

        .rg-flow-card article {
          display: flex;
          gap: 10px;
          padding: 13px;
          border: 1px solid
            rgba(255,255,255,.10);
          border-radius: 12px;
          background:
            rgba(255,255,255,.04);
          backdrop-filter:
            blur(8px);
        }

        .rg-flow-card article > span {
          width: 30px;
          height: 30px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background:
            rgba(220,38,38,.18);
          color: #fca5a5;
          font-size: 8px;
          font-weight: 900;
        }

        .rg-flow-card article > div {
          display: flex;
          flex-direction: column;
        }

        .rg-flow-card strong {
          font-size: 10px;
        }

        .rg-flow-card small {
          margin-top: 3px;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.4;
        }

        .rg-brand-footer {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          margin-top: auto;
          padding-top: 28px;
        }

        .rg-brand-footer strong {
          font-size: 9px;
        }

        .rg-brand-footer span {
          margin-top: 4px;
          color: #64748b;
          font-size: 8px;
        }

        .rg-form-panel {
          display: flex;
          justify-content: center;
          padding: 38px;
          background: #ffffff;
        }

        .rg-form-wrap {
          width: min(
            620px,
            100%
          );
          align-self: center;
        }

        .rg-form-head {
          margin-bottom: 22px;
        }

        .rg-kicker {
          color: #dc2626;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.3px;
        }

        .rg-form-head h2 {
          margin: 7px 0 5px;
          font-size: 32px;
          letter-spacing: -.6px;
        }

        .rg-form-head p {
          margin: 0;
          color: #64748b;
          line-height: 1.5;
        }

        .rg-alert {
          margin-bottom: 13px;
          padding: 11px 12px;
          border-radius: 9px;
          font-size: 9px;
          line-height: 1.4;
        }

        .rg-alert.error {
          border: 1px solid #fecaca;
          background: #fef2f2;
          color: #991b1b;
        }

        .rg-alert.success {
          border: 1px solid #bbf7d0;
          background: #f0fdf4;
          color: #166534;
        }

        .rg-form {
          display: grid;
          gap: 13px;
        }

        .rg-two-fields {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 10px;
        }

        .rg-field {
          display: block;
        }

        .rg-field > span {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 6px;
          color: #334155;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .4px;
        }

        .rg-field > span em {
          color: #94a3b8;
          font-size: 7px;
          font-style: normal;
          font-weight: 700;
        }

        .rg-field input,
        .rg-field select {
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

        .rg-field input:focus,
        .rg-field select:focus {
          border-color: #2563eb;
          box-shadow:
            0 0 0 3px
            rgba(37,99,235,.08);
        }

        .rg-password-wrap {
          position: relative;
        }

        .rg-password-wrap input {
          padding-right: 70px;
        }

        .rg-password-wrap button {
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

        .rg-error {
          display: block;
          margin-top: 5px;
          color: #dc2626;
          font-size: 8px;
          line-height: 1.35;
        }

        .rg-password-strength {
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
        }

        .rg-strength-head {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          align-items: center;
        }

        .rg-strength-head span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rg-strength-head strong {
          font-size: 9px;
        }

        .rg-strength-head strong.empty {
          color: #94a3b8;
        }

        .rg-strength-head strong.weak {
          color: #dc2626;
        }

        .rg-strength-head strong.good {
          color: #ca8a04;
        }

        .rg-strength-head strong.strong {
          color: #16a34a;
        }

        .rg-strength-bars {
          display: grid;
          grid-template-columns:
            repeat(5,minmax(0,1fr));
          gap: 4px;
          margin-top: 8px;
        }

        .rg-strength-bars > div {
          height: 5px;
          border-radius: 999px;
          background: #e2e8f0;
        }

        .rg-strength-bars > div.active.weak {
          background: #dc2626;
        }

        .rg-strength-bars > div.active.good {
          background: #ca8a04;
        }

        .rg-strength-bars > div.active.strong {
          background: #16a34a;
        }

        .rg-password-requirements {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 5px 10px;
          margin-top: 10px;
        }

        .rg-password-requirements > div {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #94a3b8;
        }

        .rg-password-requirements > div.met {
          color: #16a34a;
        }

        .rg-password-requirements span {
          font-size: 9px;
          font-weight: 900;
        }

        .rg-password-requirements small {
          font-size: 7px;
        }

        .rg-terms {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #f8fafc;
          cursor: pointer;
        }

        .rg-terms input {
          margin-top: 2px;
          accent-color: #2563eb;
        }

        .rg-terms span {
          color: #64748b;
          font-size: 8px;
          line-height: 1.45;
        }

        .rg-submit {
          margin-top: 3px;
          padding: 13px 16px;
          border: 0;
          border-radius: 9px;
          background:
            linear-gradient(
              135deg,
              #dc2626,
              #ef4444
            );
          color: #ffffff;
          font-weight: 900;
          cursor: pointer;
          box-shadow:
            0 10px 24px
            rgba(220,38,38,.20);
        }

        .rg-submit:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .rg-login-link {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 18px;
          color: #64748b;
          font-size: 9px;
        }

        .rg-login-link a {
          color: #2563eb;
          font-weight: 900;
          text-decoration: none;
        }

        .rg-security-note {
          margin-top: 18px;
          padding: 12px;
          border: 1px solid #fde68a;
          border-radius: 9px;
          background: #fffbeb;
        }

        .rg-security-note strong {
          color: #92400e;
          font-size: 8px;
          text-transform: uppercase;
        }

        .rg-security-note p {
          margin: 5px 0 0;
          color: #92400e;
          font-size: 8px;
          line-height: 1.45;
        }

        @media(max-width: 1020px) {
          .rg-shell {
            grid-template-columns: 1fr;
          }

          .rg-brand-panel {
            min-height: auto;
          }

          .rg-brand-copy {
            margin-top: 40px;
          }

          .rg-brand-footer {
            margin-top: 28px;
          }
        }

        @media(max-width: 680px) {
          .rg-page {
            padding: 10px;
          }

          .rg-shell {
            min-height: calc(
              100vh - 20px
            );
            border-radius: 18px;
          }

          .rg-brand-panel,
          .rg-form-panel {
            padding: 24px;
          }

          .rg-flow-card,
          .rg-two-fields,
          .rg-password-requirements {
            grid-template-columns: 1fr;
          }

          .rg-brand-copy h1 {
            font-size: 38px;
          }

          .rg-form-head h2 {
            font-size: 27px;
          }
        }
      `}</style>
    </main>
  );
}
