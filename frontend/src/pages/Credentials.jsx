import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEYS = {
  targetData: "nextpathTargetCareerData",
  verified: "nextpathVerifiedSkills",
  certificates: "nextpathCertificates",
  scores: "nextpathSkillScores",
  report: "nextpathAssessmentReport",
  projects: "nextpathProjects",
  currentUser: "nextpathCurrentUser",
};

const SAMPLE_CERTIFICATE = {
  id: "NP-SAMPLE-AI-001",
  skill: "Machine Learning",
  career: "AI Engineer",
  score: 8.6,
  required: 8.0,
  date: "2026-10-08",
  issuer: "NEXTPATH Project",
  type: "Project Skill Verification",
  isSample: true,
  verificationNote:
    "Sample certificate shown for demonstration. Real certificates are created after a successful reassessment.",
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

function displayName(user) {
  if (!user) {
    return "NEXTPATH Learner";
  }

  if (typeof user === "string") {
    return user;
  }

  return (
    user.name ||
    user.fullName ||
    user.username ||
    user.email ||
    "NEXTPATH Learner"
  );
}

function projectCompletion(project) {
  const checks = [
    Boolean(String(project.title || "").trim()),
    Boolean(String(project.description || "").trim()),
    Boolean(String(project.problem || "").trim()),
    Boolean(String(project.implementation || "").trim()),
    Boolean(String(project.result || "").trim()),
    Boolean(String(project.evidence || "").trim()),
  ];

  return (
    checks.filter(Boolean).length /
    checks.length
  ) * 100;
}

function statusFor(certificate) {
  if (certificate.isSample) {
    return {
      label: "Sample",
      tone: "sample",
    };
  }

  return {
    label: "Verified",
    tone: "verified",
  };
}

function certificateScorePercent(certificate) {
  return clamp(
    number(certificate.score) * 10,
    0,
    100
  );
}

function SummaryCard({
  label,
  value,
  note,
  accent = "#dc2626",
}) {
  return (
    <article
      className="cr-summary-card"
      style={{
        "--summary-accent": accent,
      }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function CertificateMiniCard({
  certificate,
  selected,
  onSelect,
}) {
  const status =
    statusFor(certificate);

  return (
    <button
      className={
        selected
          ? "cr-mini-card selected"
          : "cr-mini-card"
      }
      onClick={onSelect}
    >
      <div className="cr-mini-card-head">
        <span
          className={`cr-status ${status.tone}`}
        >
          {status.label}
        </span>

        <small>
          {formatDate(
            certificate.date
          )}
        </small>
      </div>

      <h3>
        {certificate.skill}
      </h3>

      <p>
        {certificate.career}
      </p>

      <div className="cr-mini-score">
        <span>
          Score
        </span>

        <strong>
          {number(
            certificate.score
          ).toFixed(
            1
          )}
          /10
        </strong>
      </div>
    </button>
  );
}

function CertificateDocument({
  certificate,
  learnerName,
  relatedProjects,
}) {
  const isSample =
    Boolean(
      certificate.isSample
    );

  return (
    <section
      id="nextpath-certificate"
      className="cr-certificate"
    >
      <div className="cr-certificate-frame">
        <div className="cr-certificate-top">
          <div>
            <span className="cr-brand-mark">
              NP
            </span>

            <div>
              <strong>
                NEXTPATH
              </strong>

              <small>
                Career Intelligence & Workforce Readiness
              </small>
            </div>
          </div>

          <span
            className={
              isSample
                ? "cr-cert-badge sample"
                : "cr-cert-badge"
            }
          >
            {isSample
              ? "SAMPLE"
              : "VERIFIED"}
          </span>
        </div>

        <div className="cr-certificate-body">
          <span className="cr-certificate-kicker">
            PROJECT SKILL VERIFICATION CERTIFICATE
          </span>

          <h1>
            Certificate of Skill Verification
          </h1>

          <p className="cr-presented">
            This certificate is presented to
          </p>

          <h2>
            {learnerName}
          </h2>

          <p className="cr-cert-text">
            for successfully demonstrating the required competency in
          </p>

          <h3>
            {certificate.skill}
          </h3>

          <p className="cr-cert-text">
            aligned with the target career
          </p>

          <h4>
            {certificate.career}
          </h4>

          <div className="cr-score-band">
            <div>
              <span>
                Verified Score
              </span>

              <strong>
                {number(
                  certificate.score
                ).toFixed(
                  1
                )}
                /10
              </strong>
            </div>

            <div>
              <span>
                Required Score
              </span>

              <strong>
                {number(
                  certificate.required
                ).toFixed(
                  1
                )}
                /10
              </strong>
            </div>

            <div>
              <span>
                Verification Result
              </span>

              <strong>
                {number(
                  certificate.score
                ) >=
                number(
                  certificate.required
                )
                  ? "PASS"
                  : "NOT VERIFIED"}
              </strong>
            </div>
          </div>

          <p className="cr-cert-description">
            The skill was verified through NEXTPATH's project assessment workflow,
            which may include knowledge questions, problem-solving evidence,
            practical/code evidence, project work, roadmap completion, and a
            reassessment score meeting or exceeding the configured career requirement.
          </p>

          {relatedProjects.length > 0 && (
            <div className="cr-project-proof">
              <span>
                RELATED PROJECT EVIDENCE
              </span>

              <strong>
                {relatedProjects[0].title}
              </strong>

              <small>
                {Math.round(
                  projectCompletion(
                    relatedProjects[0]
                  )
                )}
                % documented portfolio evidence
              </small>
            </div>
          )}
        </div>

        <div className="cr-certificate-footer">
          <div>
            <span>
              Certificate ID
            </span>

            <strong>
              {certificate.id}
            </strong>
          </div>

          <div>
            <span>
              Date
            </span>

            <strong>
              {formatDate(
                certificate.date
              )}
            </strong>
          </div>

          <div>
            <span>
              Issuer
            </span>

            <strong>
              {certificate.issuer ||
                "NEXTPATH Project"}
            </strong>
          </div>
        </div>

        {isSample && (
          <div className="cr-sample-watermark">
            SAMPLE CERTIFICATE
          </div>
        )}
      </div>
    </section>
  );
}

export default function Credentials() {
  const navigate =
    useNavigate();

  const career =
    readJSON(
      STORAGE_KEYS.targetData,
      null
    );

  const verified =
    readJSON(
      STORAGE_KEYS.verified,
      {}
    );

  const savedCertificates =
    readJSON(
      STORAGE_KEYS.certificates,
      []
    );

  const projects =
    readJSON(
      STORAGE_KEYS.projects,
      []
    );

  const currentUser =
    readJSON(
      STORAGE_KEYS.currentUser,
      null
    );

  const learnerName =
    displayName(
      currentUser
    );

  const certificates =
    Array.isArray(
      savedCertificates
    )
      ? savedCertificates
      : [];

  const displayCertificates =
    certificates.length
      ? certificates
      : [
          SAMPLE_CERTIFICATE,
        ];

  const [
    selectedId,
    setSelectedId,
  ] =
    useState(
      displayCertificates[0]
        ?.id ||
        SAMPLE_CERTIFICATE.id
    );

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    filter,
    setFilter,
  ] =
    useState("All");

  const selectedCertificate =
    displayCertificates.find(
      (certificate) =>
        certificate.id ===
        selectedId
    ) ||
    displayCertificates[0] ||
    SAMPLE_CERTIFICATE;

  const relatedProjects =
    useMemo(() => {
      if (
        !Array.isArray(
          projects
        )
      ) {
        return [];
      }

      return projects.filter(
        (project) => {
          const skills =
            Array.isArray(
              project.skills
            )
              ? project.skills
              : [];

          return (
            skills.includes(
              selectedCertificate.skill
            ) &&
            projectCompletion(
              project
            ) >=
              70
          );
        }
      );
    }, [
      projects,
      selectedCertificate,
    ]);

  const visibleCertificates =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return displayCertificates.filter(
        (certificate) => {
          const searchText =
            [
              certificate.skill,
              certificate.career,
              certificate.id,
              certificate.type,
            ]
              .join(" ")
              .toLowerCase();

          const matchesSearch =
            !query ||
            searchText.includes(
              query
            );

          const matchesFilter =
            filter === "All" ||
            (
              filter ===
                "Verified" &&
              !certificate.isSample
            ) ||
            (
              filter ===
                "Sample" &&
              certificate.isSample
            );

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );
    }, [
      displayCertificates,
      search,
      filter,
    ]);

  const verifiedCount =
    certificates.length;

  const averageScore =
    certificates.length
      ? certificates.reduce(
          (
            sum,
            certificate
          ) =>
            sum +
            number(
              certificate.score
            ),
          0
        ) /
        certificates.length
      : 0;

  const highestScore =
    certificates.length
      ? Math.max(
          ...certificates.map(
            (certificate) =>
              number(
                certificate.score
              )
          )
        )
      : 0;

  const verifiedSkillCount =
    Object.keys(
      verified
    ).length;

  const projectEvidenceCount =
    Array.isArray(
      projects
    )
      ? projects.filter(
          (project) =>
            projectCompletion(
              project
            ) >=
              80
        ).length
      : 0;

  function printCertificate() {
    window.print();
  }

  return (
    <main className="cr-page">
      <section className="cr-hero">
        <div className="cr-hero-copy">
          <span className="cr-kicker">
            VERIFIED CREDENTIALS
          </span>

          <h1>
            Turn successful reassessment into
            visible proof.
          </h1>

          <p>
            When you complete a roadmap and pass reassessment at or above the
            target-career requirement, NEXTPATH stores the skill as verified and
            generates a project credential. This page lets you review and print
            those credentials.
          </p>

          <div className="cr-flow">
            <span>
              Roadmap
            </span>

            <b>→</b>

            <span>
              Re-Assessment
            </span>

            <b>→</b>

            <span>
              PASS
            </span>

            <b>→</b>

            <span className="active">
              Credential
            </span>

            <b>→</b>

            <span>
              Opportunities
            </span>
          </div>
        </div>

        <div className="cr-hero-score">
          <div
            className="cr-score-ring"
            style={{
              background:
                `conic-gradient(#7c3aed ${
                  clamp(
                    (
                      selectedCertificate.score /
                      Math.max(
                        0.1,
                        selectedCertificate.required
                      )
                    ) *
                      100,
                    0,
                    100
                  ) * 3.6
                }deg,#e2e8f0 0deg)`,
            }}
          >
            <div>
              <strong>
                {number(
                  selectedCertificate.score
                ).toFixed(
                  1
                )}
              </strong>

              <small>
                /10
              </small>
            </div>
          </div>

          <div>
            <span>
              Current Credential
            </span>

            <strong>
              {selectedCertificate.skill}
            </strong>

            <small>
              {selectedCertificate.isSample
                ? "Sample preview"
                : "Verified skill"}
            </small>
          </div>
        </div>
      </section>

      <section className="cr-summary-grid">
        <SummaryCard
          label="Verified Credentials"
          value={
            verifiedCount
          }
          note="Generated after passing reassessment"
          accent="#7c3aed"
        />

        <SummaryCard
          label="Verified Skills"
          value={
            verifiedSkillCount
          }
          note="Stored in NEXTPATH profile"
          accent="#16a34a"
        />

        <SummaryCard
          label="Average Verified Score"
          value={
            certificates.length
              ? `${averageScore.toFixed(
                  1
                )}/10`
              : "—"
          }
          note="Across real credentials"
          accent="#2563eb"
        />

        <SummaryCard
          label="Highest Score"
          value={
            certificates.length
              ? `${highestScore.toFixed(
                  1
                )}/10`
              : "—"
          }
          note="Best verified result"
          accent="#ca8a04"
        />

        <SummaryCard
          label="Portfolio Evidence"
          value={
            projectEvidenceCount
          }
          note="Projects ≥80% documented"
          accent="#0891b2"
        />

        <SummaryCard
          label="Target Career"
          value={
            career?.name ||
            selectedCertificate.career
          }
          note="Career alignment"
          accent="#dc2626"
        />
      </section>

      {!certificates.length && (
        <section className="cr-sample-note">
          <div>
            <span className="cr-kicker">
              SAMPLE CERTIFICATE
            </span>

            <h2>
              This is what a passing reassessment credential will look like.
            </h2>

            <p>
              You do not have a real NEXTPATH credential yet. The certificate
              shown below is a sample only. A real credential is created by your
              Assessment page after a reassessment score meets or exceeds the
              required career score.
            </p>
          </div>

          <button
            onClick={() =>
              navigate(
                "/progress"
              )
            }
          >
            Go to Progress & Re-Assessment
          </button>
        </section>
      )}

      <section className="cr-controls">
        <label>
          <span>
            Search Credential
          </span>

          <input
            value={
              search
            }
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Machine Learning, AI Engineer, certificate ID..."
          />
        </label>

        <label>
          <span>
            Filter
          </span>

          <select
            value={
              filter
            }
            onChange={(event) =>
              setFilter(
                event.target.value
              )
            }
          >
            <option>
              All
            </option>

            <option>
              Verified
            </option>

            <option>
              Sample
            </option>
          </select>
        </label>

        <button
          className="cr-print-button"
          onClick={
            printCertificate
          }
        >
          Print Certificate
        </button>
      </section>

      <section className="cr-layout">
        <aside className="cr-sidebar">
          <div className="cr-sidebar-head">
            <span>
              CREDENTIALS
            </span>

            <strong>
              {visibleCertificates.length}
            </strong>
          </div>

          <div className="cr-mini-list">
            {visibleCertificates.length ? (
              visibleCertificates.map(
                (certificate) => (
                  <CertificateMiniCard
                    key={
                      certificate.id
                    }
                    certificate={
                      certificate
                    }
                    selected={
                      certificate.id ===
                      selectedCertificate.id
                    }
                    onSelect={() =>
                      setSelectedId(
                        certificate.id
                      )
                    }
                  />
                )
              )
            ) : (
              <div className="cr-empty-inline">
                No credentials match your filter.
              </div>
            )}
          </div>

          <div className="cr-sidebar-guide">
            <strong>
              Credential Rule
            </strong>

            <p>
              A real credential is created only when reassessment score ≥ career
              requirement.
            </p>
          </div>
        </aside>

        <section className="cr-main">
          <CertificateDocument
            certificate={
              selectedCertificate
            }
            learnerName={
              learnerName
            }
            relatedProjects={
              relatedProjects
            }
          />

          <section className="cr-credential-details">
            <article>
              <span>
                Verification Score
              </span>

              <strong>
                {number(
                  selectedCertificate.score
                ).toFixed(
                  1
                )}
                /10
              </strong>

              <small>
                {certificateScorePercent(
                  selectedCertificate
                ).toFixed(
                  0
                )}
                % score equivalent
              </small>
            </article>

            <article>
              <span>
                Career Requirement
              </span>

              <strong>
                {number(
                  selectedCertificate.required
                ).toFixed(
                  1
                )}
                /10
              </strong>

              <small>
                Configured target for the skill
              </small>
            </article>

            <article>
              <span>
                Result
              </span>

              <strong>
                {number(
                  selectedCertificate.score
                ) >=
                number(
                  selectedCertificate.required
                )
                  ? "PASS"
                  : "FAIL"}
              </strong>

              <small>
                Successful reassessment verification
              </small>
            </article>

            <article>
              <span>
                Related Projects
              </span>

              <strong>
                {relatedProjects.length}
              </strong>

              <small>
                Matching documented portfolio evidence
              </small>
            </article>
          </section>

          <section className="cr-verification-info">
            <div>
              <span className="cr-kicker">
                WHAT THIS CREDENTIAL MEANS
              </span>

              <h2>
                A NEXTPATH project verification, not an external accreditation.
              </h2>

              <p>
                This credential records that the learner met the configured skill
                threshold inside the NEXTPATH project workflow. It should not be
                represented as a university degree, government qualification, or
                independent professional certification.
              </p>
            </div>

            <div className="cr-verification-points">
              <article>
                <span>
                  01
                </span>

                <strong>
                  Roadmap completed
                </strong>
              </article>

              <article>
                <span>
                  02
                </span>

                <strong>
                  Re-assessment attempted
                </strong>
              </article>

              <article>
                <span>
                  03
                </span>

                <strong>
                  Score met requirement
                </strong>
              </article>

              <article>
                <span>
                  04
                </span>

                <strong>
                  Skill marked verified
                </strong>
              </article>
            </div>
          </section>
        </section>
      </section>

      <section className="cr-final-panel">
        <div>
          <span className="cr-kicker">
            USE YOUR VERIFIED PROFILE
          </span>

          <h2>
            Connect credentials to career opportunities.
          </h2>

          <p>
            Verified skills and project credentials feed into your NEXTPATH
            opportunity-match score together with demonstrated assessment scores
            and portfolio evidence.
          </p>
        </div>

        <div className="cr-final-actions">
          <button
            className="primary"
            onClick={() =>
              navigate(
                "/opportunities"
              )
            }
          >
            View Opportunities →
          </button>

          <button
            onClick={() =>
              navigate(
                "/projects"
              )
            }
          >
            Projects
          </button>

          <button
            onClick={() =>
              navigate(
                "/progress"
              )
            }
          >
            Progress
          </button>
        </div>
      </section>

      <footer className="cr-footer">
        NEXTPATH Credentials · Real certificates are generated only from the
        project's reassessment pass logic. Sample certificates are clearly marked
        and must not be presented as earned credentials.
      </footer>

      <style>{`
        .cr-page {
          max-width: 1360px;
          margin: 0 auto;
          padding: 24px;
          color: #0f172a;
        }

        .cr-kicker {
          display: inline-block;
          color: #dc2626;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.4px;
        }

        .cr-hero {
          display: grid;
          grid-template-columns:
            minmax(0,1.35fr)
            minmax(320px,.65fr);
          gap: 24px;
          padding: 34px;
          border: 1px solid #e2e8f0;
          border-radius: 27px;
          background:
            radial-gradient(
              circle at top right,
              rgba(124,58,237,.10),
              transparent 34%
            ),
            linear-gradient(
              135deg,
              #ffffff,
              #f8fafc
            );
          box-shadow:
            0 20px 55px
            rgba(15,23,42,.06);
        }

        .cr-hero h1 {
          margin: 10px 0 14px;
          max-width: 900px;
          font-size:
            clamp(
              38px,
              4vw,
              56px
            );
          line-height: 1.04;
          letter-spacing: -1.4px;
        }

        .cr-hero p {
          max-width: 850px;
          margin: 0;
          color: #64748b;
          line-height: 1.7;
        }

        .cr-flow {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
          margin-top: 17px;
        }

        .cr-flow span {
          padding: 5px 8px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          background: #ffffff;
          color: #475569;
          font-size: 8px;
          font-weight: 850;
        }

        .cr-flow span.active {
          border-color: #7c3aed;
          background: #7c3aed;
          color: #ffffff;
        }

        .cr-flow b {
          color: #94a3b8;
        }

        .cr-hero-score {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
        }

        .cr-score-ring {
          width: 116px;
          height: 116px;
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .cr-score-ring > div {
          width: 86px;
          height: 86px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%;
          background: #ffffff;
        }

        .cr-score-ring strong {
          font-size: 22px;
        }

        .cr-score-ring small {
          color: #64748b;
          font-size: 8px;
        }

        .cr-hero-score > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .cr-hero-score > div:last-child span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .cr-hero-score > div:last-child strong {
          margin: 4px 0;
          font-size: 17px;
        }

        .cr-hero-score > div:last-child small {
          color: #94a3b8;
        }

        .cr-summary-grid {
          display: grid;
          grid-template-columns:
            repeat(6,minmax(0,1fr));
          gap: 10px;
          margin: 18px 0;
        }

        .cr-summary-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 94px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
        }

        .cr-summary-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background:
            var(--summary-accent);
        }

        .cr-summary-card span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .cr-summary-card strong {
          margin: 5px 0;
          font-size: 18px;
        }

        .cr-summary-card small {
          margin-top: auto;
          color: #94a3b8;
        }

        .cr-sample-note {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
          margin-bottom: 14px;
          padding: 18px;
          border: 1px solid #fde68a;
          border-radius: 14px;
          background: #fffbeb;
        }

        .cr-sample-note h2 {
          margin: 5px 0;
        }

        .cr-sample-note p {
          max-width: 840px;
          margin: 0;
          color: #92400e;
          line-height: 1.5;
        }

        .cr-sample-note button {
          padding: 10px 12px;
          border: 1px solid #f59e0b;
          border-radius: 8px;
          background: #ffffff;
          color: #92400e;
          font-weight: 850;
          white-space: nowrap;
          cursor: pointer;
        }

        .cr-controls {
          display: grid;
          grid-template-columns:
            minmax(280px,1fr)
            180px
            auto;
          gap: 10px;
          align-items: end;
          margin-bottom: 14px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
        }

        .cr-controls label > span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .cr-controls input,
        .cr-controls select {
          width: 100%;
          box-sizing: border-box;
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
        }

        .cr-print-button {
          padding: 10px 12px;
          border: 0;
          border-radius: 8px;
          background: #7c3aed;
          color: #ffffff;
          font-weight: 850;
          cursor: pointer;
        }

        .cr-layout {
          display: grid;
          grid-template-columns:
            270px
            minmax(0,1fr);
          gap: 14px;
          align-items: start;
        }

        .cr-sidebar {
          position: sticky;
          top: 18px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .cr-sidebar-head {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid #e2e8f0;
        }

        .cr-sidebar-head span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .cr-sidebar-head strong {
          display: grid;
          place-items: center;
          width: 27px;
          height: 27px;
          border-radius: 50%;
          background: #ede9fe;
          color: #6d28d9;
        }

        .cr-mini-list {
          display: grid;
          gap: 7px;
          margin-top: 10px;
        }

        .cr-mini-card {
          width: 100%;
          padding: 11px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
          text-align: left;
          cursor: pointer;
        }

        .cr-mini-card:hover {
          background: #f8fafc;
        }

        .cr-mini-card.selected {
          border-color: #c4b5fd;
          background: #f5f3ff;
        }

        .cr-mini-card-head {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          align-items: center;
        }

        .cr-status {
          padding: 3px 6px;
          border-radius: 999px;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .cr-status.verified {
          background: #dcfce7;
          color: #166534;
        }

        .cr-status.sample {
          background: #fef3c7;
          color: #92400e;
        }

        .cr-mini-card-head small {
          color: #94a3b8;
          font-size: 7px;
        }

        .cr-mini-card h3 {
          margin: 7px 0 3px;
          font-size: 13px;
        }

        .cr-mini-card p {
          margin: 0;
          color: #64748b;
          font-size: 8px;
        }

        .cr-mini-score {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          align-items: center;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid #e2e8f0;
        }

        .cr-mini-score span {
          color: #94a3b8;
          font-size: 7px;
          text-transform: uppercase;
        }

        .cr-mini-score strong {
          font-size: 11px;
        }

        .cr-sidebar-guide {
          margin-top: 10px;
          padding: 10px;
          border-radius: 8px;
          background: #f8fafc;
        }

        .cr-sidebar-guide strong {
          font-size: 9px;
        }

        .cr-sidebar-guide p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 8px;
          line-height: 1.45;
        }

        .cr-certificate {
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
        }

        .cr-certificate-frame {
          position: relative;
          overflow: hidden;
          min-height: 720px;
          padding: 44px;
          border: 10px double #111827;
          background:
            radial-gradient(
              circle at top left,
              rgba(124,58,237,.06),
              transparent 28%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(37,99,235,.06),
              transparent 28%
            ),
            #ffffff;
        }

        .cr-certificate-top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
        }

        .cr-certificate-top > div:first-child {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .cr-brand-mark {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 11px;
          background: #111827;
          color: #ffffff;
          font-weight: 900;
        }

        .cr-certificate-top > div:first-child > div {
          display: flex;
          flex-direction: column;
        }

        .cr-certificate-top strong {
          font-size: 17px;
          letter-spacing: 1px;
        }

        .cr-certificate-top small {
          color: #64748b;
          font-size: 8px;
        }

        .cr-cert-badge {
          padding: 7px 10px;
          border-radius: 999px;
          background: #dcfce7;
          color: #166534;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .8px;
        }

        .cr-cert-badge.sample {
          background: #fef3c7;
          color: #92400e;
        }

        .cr-certificate-body {
          display: flex;
          align-items: center;
          flex-direction: column;
          padding: 62px 20px 30px;
          text-align: center;
        }

        .cr-certificate-kicker {
          color: #7c3aed;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.8px;
        }

        .cr-certificate-body h1 {
          margin: 12px 0 25px;
          font-size: 40px;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-weight: 500;
        }

        .cr-presented,
        .cr-cert-text {
          margin: 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.6;
        }

        .cr-certificate-body h2 {
          margin: 10px 0 15px;
          font-size: 32px;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-weight: 600;
          border-bottom: 1px solid #cbd5e1;
          padding: 0 24px 8px;
        }

        .cr-certificate-body h3 {
          margin: 10px 0;
          color: #6d28d9;
          font-size: 28px;
        }

        .cr-certificate-body h4 {
          margin: 9px 0 20px;
          font-size: 18px;
        }

        .cr-score-band {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 10px;
          width: min(760px,100%);
          margin: 18px 0;
        }

        .cr-score-band > div {
          display: flex;
          align-items: center;
          flex-direction: column;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #f8fafc;
        }

        .cr-score-band span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .cr-score-band strong {
          margin-top: 5px;
          font-size: 15px;
        }

        .cr-cert-description {
          max-width: 820px;
          margin: 12px auto 0;
          color: #64748b;
          font-size: 10px;
          line-height: 1.6;
        }

        .cr-project-proof {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 18px;
          padding: 11px 16px;
          border: 1px solid #bbf7d0;
          border-radius: 9px;
          background: #f0fdf4;
        }

        .cr-project-proof span {
          color: #15803d;
          font-size: 7px;
          font-weight: 900;
        }

        .cr-project-proof strong {
          margin: 4px 0;
          color: #166534;
          font-size: 11px;
        }

        .cr-project-proof small {
          color: #4d7c0f;
          font-size: 8px;
        }

        .cr-certificate-footer {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 10px;
          margin-top: 25px;
          padding-top: 18px;
          border-top: 1px solid #e2e8f0;
        }

        .cr-certificate-footer > div {
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .cr-certificate-footer span {
          color: #94a3b8;
          font-size: 7px;
          text-transform: uppercase;
        }

        .cr-certificate-footer strong {
          margin-top: 4px;
          font-size: 10px;
          text-align: center;
          word-break: break-all;
        }

        .cr-sample-watermark {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          pointer-events: none;
          color: rgba(220,38,38,.08);
          font-size: 74px;
          font-weight: 900;
          transform: rotate(-24deg);
          letter-spacing: 6px;
        }

        .cr-credential-details {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
          margin-top: 12px;
        }

        .cr-credential-details article {
          display: flex;
          flex-direction: column;
          padding: 11px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
        }

        .cr-credential-details span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .cr-credential-details strong {
          margin: 4px 0;
          font-size: 15px;
        }

        .cr-credential-details small {
          color: #94a3b8;
          line-height: 1.35;
        }

        .cr-verification-info {
          display: grid;
          grid-template-columns:
            minmax(0,1fr)
            minmax(440px,.8fr);
          gap: 14px;
          margin-top: 12px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #f8fafc;
        }

        .cr-verification-info h2 {
          margin: 5px 0;
        }

        .cr-verification-info p {
          margin: 0;
          color: #64748b;
          font-size: 10px;
          line-height: 1.5;
        }

        .cr-verification-points {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 8px;
        }

        .cr-verification-points article {
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #ffffff;
        }

        .cr-verification-points span {
          color: #7c3aed;
          font-size: 8px;
          font-weight: 900;
        }

        .cr-verification-points strong {
          display: block;
          margin-top: 4px;
          font-size: 9px;
        }

        .cr-final-panel {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          align-items: center;
          margin-top: 18px;
          padding: 24px;
          border-radius: 16px;
          background:
            linear-gradient(
              135deg,
              #111827,
              #0f172a
            );
          color: #ffffff;
        }

        .cr-final-panel h2 {
          margin: 6px 0;
        }

        .cr-final-panel p {
          max-width: 820px;
          margin: 0;
          color: #94a3b8;
          line-height: 1.55;
        }

        .cr-final-actions {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .cr-final-actions button {
          padding: 10px 12px;
          border: 1px solid #334155;
          border-radius: 8px;
          background: #111827;
          color: #cbd5e1;
          font-weight: 850;
          cursor: pointer;
        }

        .cr-final-actions button.primary {
          border-color: #7c3aed;
          background: #7c3aed;
          color: #ffffff;
        }

        .cr-empty-inline {
          padding: 14px;
          border: 1px dashed #cbd5e1;
          border-radius: 8px;
          color: #64748b;
          text-align: center;
          font-size: 8px;
        }

        .cr-footer {
          padding: 16px 2px 0;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.5;
        }

        @media(max-width: 1120px) {
          .cr-summary-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }

          .cr-layout {
            grid-template-columns: 1fr;
          }

          .cr-sidebar {
            position: static;
          }

          .cr-mini-list {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }
        }

        @media(max-width: 820px) {
          .cr-page {
            padding: 14px;
          }

          .cr-hero {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          .cr-sample-note,
          .cr-final-panel {
            align-items: stretch;
            flex-direction: column;
          }

          .cr-controls {
            grid-template-columns: 1fr;
          }

          .cr-certificate-frame {
            min-height: 0;
            padding: 24px;
          }

          .cr-certificate-body {
            padding: 42px 8px 22px;
          }

          .cr-certificate-body h1 {
            font-size: 30px;
          }

          .cr-score-band,
          .cr-certificate-footer,
          .cr-credential-details {
            grid-template-columns: 1fr;
          }

          .cr-verification-info {
            grid-template-columns: 1fr;
          }

          .cr-final-actions {
            justify-content: flex-start;
          }
        }

        @media(max-width: 560px) {
          .cr-summary-grid,
          .cr-mini-list,
          .cr-verification-points {
            grid-template-columns: 1fr;
          }

          .cr-hero-score {
            align-items: flex-start;
            flex-direction: column;
          }

          .cr-certificate-top {
            align-items: flex-start;
            flex-direction: column;
          }

          .cr-sample-watermark {
            font-size: 38px;
          }
        }

        @media print {
          body * {
            visibility: hidden;
          }

          #nextpath-certificate,
          #nextpath-certificate * {
            visibility: visible;
          }

          #nextpath-certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            border: 0;
          }

          .cr-certificate-frame {
            min-height: 0;
            border: 8px double #111827;
            box-shadow: none;
          }
        }
      `}</style>
    </main>
  );
}
