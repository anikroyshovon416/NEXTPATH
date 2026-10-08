import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEYS = {
  target: "nextpathTargetCareer",
  targetData: "nextpathTargetCareerData",
  report: "nextpathAssessmentReport",
  scores: "nextpathSkillScores",
  gaps: "nextpathSkillGaps",
  roadmap: "nextpathRoadmapPlan",
  roadmapProgress: "nextpathRoadmapProgress",
  verified: "nextpathVerifiedSkills",
  certificates: "nextpathCertificates",
  mode: "nextpathAssessmentMode",
  reassessmentSkills: "nextpathReassessmentSkills",
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

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusFor(result, verified) {
  if (verified) {
    return {
      label: "Verified",
      tone: "verified",
      icon: "✓",
    };
  }

  if (number(result.final) >= number(result.required)) {
    return {
      label: "Requirement Met",
      tone: "met",
      icon: "✓",
    };
  }

  if (number(result.final) >= number(result.required) * 0.7) {
    return {
      label: "Near Target",
      tone: "near",
      icon: "↗",
    };
  }

  return {
    label: "Gap Remaining",
    tone: "gap",
    icon: "!",
  };
}

function scoreToLabel(score) {
  const value = number(score);

  if (value >= 9) {
    return "Excellent";
  }

  if (value >= 8) {
    return "Strong";
  }

  if (value >= 7) {
    return "Good";
  }

  if (value >= 5) {
    return "Developing";
  }

  return "Needs Improvement";
}

function percentToLabel(score) {
  const value = number(score);

  if (value >= 90) {
    return "Excellent";
  }

  if (value >= 75) {
    return "Strong";
  }

  if (value >= 60) {
    return "Good";
  }

  if (value >= 40) {
    return "Developing";
  }

  return "Needs Improvement";
}

function MetricCard({
  label,
  value,
  note,
  accent,
}) {
  return (
    <article
      className="ar-metric-card"
      style={{
        "--metric-accent": accent || "#dc2626",
      }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </article>
  );
}

function ScoreBar({
  label,
  value,
  accent = "#dc2626",
  suffix = "%",
}) {
  const safe = clamp(number(value), 0, 100);

  return (
    <div className="ar-score-bar">
      <div className="ar-score-bar-head">
        <span>{label}</span>

        <strong>
          {safe.toFixed(0)}
          {suffix}
        </strong>
      </div>

      <div className="ar-score-track">
        <div
          className="ar-score-fill"
          style={{
            width: `${safe}%`,
            background: accent,
          }}
        />
      </div>
    </div>
  );
}

function CircularScore({
  value,
  max = 10,
  label,
  accent = "#dc2626",
}) {
  const numeric = number(value);
  const percentage =
    max > 0
      ? clamp((numeric / max) * 100, 0, 100)
      : 0;

  return (
    <div
      className="ar-circle"
      style={{
        background:
          `conic-gradient(${accent} ${percentage * 3.6}deg,#e2e8f0 0deg)`,
      }}
    >
      <div>
        <strong>
          {numeric.toFixed(1)}
        </strong>

        <span>
          /{max}
        </span>

        <small>
          {label}
        </small>
      </div>
    </div>
  );
}

function BreakdownCard({
  title,
  score,
  weight,
  icon,
  accent,
}) {
  const safe = clamp(number(score), 0, 100);

  return (
    <article className="ar-breakdown-card">
      <div
        className="ar-breakdown-icon"
        style={{
          background: `${accent}15`,
          color: accent,
        }}
      >
        {icon}
      </div>

      <div className="ar-breakdown-main">
        <div>
          <span>{title}</span>
          <small>
            Weight {weight}
          </small>
        </div>

        <strong>
          {safe.toFixed(0)}%
        </strong>
      </div>

      <div className="ar-breakdown-track">
        <div
          style={{
            width: `${safe}%`,
            background: accent,
          }}
        />
      </div>

      <small className="ar-breakdown-label">
        {percentToLabel(safe)}
      </small>
    </article>
  );
}

function ProjectEvidence({
  projectSubmission,
  score,
}) {
  if (!projectSubmission) {
    return (
      <div className="ar-empty-block">
        No project submission information is available for this skill.
      </div>
    );
  }

  return (
    <section className="ar-project-evidence">
      <div className="ar-project-evidence-head">
        <div>
          <span>
            PROJECT EVIDENCE
          </span>

          <h4>
            {projectSubmission.title || "Applied Project"}
          </h4>
        </div>

        <strong>
          {number(score).toFixed(0)}%
        </strong>
      </div>

      <p className="ar-project-brief">
        {projectSubmission.brief || "No project brief stored."}
      </p>

      <div className="ar-project-evidence-grid">
        <article>
          <small>
            Submission Description
          </small>

          <p>
            {projectSubmission.description ||
              "No project description submitted."}
          </p>
        </article>

        <article>
          <small>
            Repository
          </small>

          {projectSubmission.repository ? (
            <a
              href={projectSubmission.repository}
              target="_blank"
              rel="noreferrer"
            >
              Open Repository ↗
            </a>
          ) : (
            <p>
              No repository link submitted.
            </p>
          )}
        </article>

        <article>
          <small>
            Evidence
          </small>

          {projectSubmission.evidence ? (
            /^https?:\/\//i.test(projectSubmission.evidence) ? (
              <a
                href={projectSubmission.evidence}
                target="_blank"
                rel="noreferrer"
              >
                Open Evidence ↗
              </a>
            ) : (
              <p>
                {projectSubmission.evidence}
              </p>
            )
          ) : (
            <p>
              No additional evidence submitted.
            </p>
          )}
        </article>
      </div>
    </section>
  );
}

function SkillResultCard({
  skill,
  result,
  verifiedScore,
  expanded,
  onToggle,
}) {
  const required = number(result.required, 7);
  const final = number(result.final);
  const gap = Math.max(0, required - final);
  const gapPercentage =
    required > 0
      ? clamp((gap / required) * 100, 0, 100)
      : 0;

  const verified =
    verifiedScore !== undefined;

  const status =
    statusFor(
      result,
      verified
    );

  return (
    <article className="ar-skill-card">
      <button
        className="ar-skill-summary"
        onClick={onToggle}
      >
        <div className="ar-skill-summary-left">
          <div
            className={`ar-status-icon ${status.tone}`}
          >
            {status.icon}
          </div>

          <div>
            <span>
              {status.label}
            </span>

            <h3>
              {skill}
            </h3>

            <small>
              {scoreToLabel(final)} performance
            </small>
          </div>
        </div>

        <div className="ar-skill-summary-right">
          <div>
            <span>
              Score
            </span>

            <strong>
              {final.toFixed(1)}/10
            </strong>
          </div>

          <div>
            <span>
              Required
            </span>

            <strong>
              {required.toFixed(1)}/10
            </strong>
          </div>

          <div>
            <span>
              Gap
            </span>

            <strong>
              {gapPercentage.toFixed(0)}%
            </strong>
          </div>

          <b>
            {expanded ? "−" : "+"}
          </b>
        </div>
      </button>

      <div className="ar-main-progress">
        <div
          className="ar-current-score"
          style={{
            width:
              `${clamp((final / 10) * 100, 0, 100)}%`,
          }}
        />

        <div
          className="ar-required-marker"
          style={{
            left:
              `${clamp((required / 10) * 100, 0, 100)}%`,
          }}
        >
          <span>
            Target
          </span>
        </div>
      </div>

      {expanded && (
        <div className="ar-skill-details">
          <section className="ar-score-breakdown">
            <BreakdownCard
              title="Knowledge Quiz"
              score={result.quiz}
              weight="20%"
              icon="🧠"
              accent="#7c3aed"
            />

            <BreakdownCard
              title="Problem Solving"
              score={result.problem}
              weight="25%"
              icon="🧩"
              accent="#2563eb"
            />

            <BreakdownCard
              title="Code / Practical"
              score={result.coding}
              weight="35%"
              icon="💻"
              accent="#0891b2"
            />

            <BreakdownCard
              title="Project"
              score={result.project}
              weight="20%"
              icon="🛠️"
              accent="#16a34a"
            />
          </section>

          <section className="ar-evidence-summary">
            <article>
              <span>
                Weighted Percentage
              </span>

              <strong>
                {number(result.weightedPercent).toFixed(1)}%
              </strong>

              <small>
                Combined evidence before conversion to /10
              </small>
            </article>

            <article>
              <span>
                Final Demonstrated Score
              </span>

              <strong>
                {final.toFixed(1)}/10
              </strong>

              <small>
                Stored in nextpathSkillScores
              </small>
            </article>

            <article>
              <span>
                Remaining Gap
              </span>

              <strong>
                {gap.toFixed(1)}
              </strong>

              <small>
                Required − demonstrated
              </small>
            </article>

            <article>
              <span>
                Question Set
              </span>

              <strong>
                {result.questionSetId || "N/A"}
              </strong>

              <small>
                {result.difficulty || "General"} difficulty
              </small>
            </article>
          </section>

          <ProjectEvidence
            projectSubmission={result.projectSubmission}
            score={result.project}
          />

          <section className="ar-skill-recommendation">
            <strong>
              NEXTPATH Recommendation
            </strong>

            {verified ? (
              <p>
                This skill is verified. Keep it current by applying it in
                projects, interview practice and real-world work.
              </p>
            ) : final >= required ? (
              <p>
                You currently meet the configured career requirement. Continue
                building portfolio evidence and complete the roadmap if you want
                stronger verification through re-assessment.
              </p>
            ) : gapPercentage <= 30 ? (
              <p>
                You are close to the target. Focus on the weakest evidence
                section and complete the related roadmap topics before
                re-assessment.
              </p>
            ) : (
              <p>
                A meaningful gap remains. Prioritize this skill in your roadmap,
                complete the recommended topics and project, then re-assess with
                a new question set.
              </p>
            )}
          </section>
        </div>
      )}
    </article>
  );
}

export default function AssessmentReport() {
  const navigate =
    useNavigate();

  const report =
    readJSON(
      STORAGE_KEYS.report,
      null
    );

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

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] =
    useState("All");

  const [
    sortMode,
    setSortMode,
  ] =
    useState("gap");

  const [
    expandedSkills,
    setExpandedSkills,
  ] =
    useState({});

  const detailedResults =
    report?.detailedResults ||
    {};

  const skillEntries =
    useMemo(() => {
      const entries =
        Object.entries(
          detailedResults
        ).map(
          ([skill, result]) => {
            const required =
              number(
                result.required,
                7
              );

            const final =
              number(
                result.final
              );

            const gap =
              Math.max(
                0,
                required -
                  final
              );

            const gapPercentage =
              required > 0
                ? clamp(
                    (
                      gap /
                      required
                    ) *
                      100,
                    0,
                    100
                  )
                : 0;

            const isVerified =
              verified[skill] !==
              undefined;

            const status =
              statusFor(
                result,
                isVerified
              );

            return {
              skill,
              result,
              required,
              final,
              gap,
              gapPercentage,
              isVerified,
              status,
            };
          }
        );

      const query =
        search
          .trim()
          .toLowerCase();

      const filtered =
        entries.filter(
          (item) => {
            const matchesSearch =
              !query ||
              item.skill
                .toLowerCase()
                .includes(
                  query
                );

            const matchesStatus =
              statusFilter ===
                "All" ||
              item.status.label ===
                statusFilter;

            return (
              matchesSearch &&
              matchesStatus
            );
          }
        );

      const sorted =
        [...filtered];

      if (
        sortMode ===
        "gap"
      ) {
        sorted.sort(
          (a, b) =>
            b.gapPercentage -
            a.gapPercentage
        );
      } else if (
        sortMode ===
        "score"
      ) {
        sorted.sort(
          (a, b) =>
            b.final -
            a.final
        );
      } else if (
        sortMode ===
        "required"
      ) {
        sorted.sort(
          (a, b) =>
            b.required -
            a.required
        );
      } else {
        sorted.sort(
          (a, b) =>
            a.skill.localeCompare(
              b.skill
            )
        );
      }

      return sorted;
    }, [
      detailedResults,
      verified,
      search,
      statusFilter,
      sortMode,
    ]);

  if (!report) {
    return (
      <main className="ar-state">
        <div>
          📊
        </div>

        <h2>
          No Assessment Report Found
        </h2>

        <p>
          Complete your assessment first to generate a detailed report.
        </p>

        <button
          onClick={() =>
            navigate(
              "/assessment"
            )
          }
        >
          Go to Assessment
        </button>
      </main>
    );
  }

  const allEntries =
    Object.entries(
      detailedResults
    );

  const totalSkills =
    allEntries.length;

  const passedSkills =
    allEntries.filter(
      ([skill, result]) =>
        number(
          result.final
        ) >=
          number(
            result.required
          ) ||
        verified[skill] !==
          undefined
    ).length;

  const verifiedCount =
    allEntries.filter(
      ([skill]) =>
        verified[skill] !==
        undefined
    ).length;

  const averageGap =
    totalSkills
      ? allEntries.reduce(
          (
            sum,
            [, result]
          ) => {
            const required =
              number(
                result.required,
                7
              );

            const final =
              number(
                result.final
              );

            const gap =
              Math.max(
                0,
                required -
                  final
              );

            return (
              sum +
              (
                required > 0
                  ? (
                      gap /
                      required
                    ) *
                    100
                  : 0
              )
            );
          },
          0
        ) /
        totalSkills
      : 0;

  const readiness =
    totalSkills
      ? allEntries.reduce(
          (
            sum,
            [, result]
          ) => {
            const required =
              number(
                result.required,
                7
              );

            const final =
              number(
                result.final
              );

            const ratio =
              required > 0
                ? clamp(
                    final /
                      required,
                    0,
                    1
                  )
                : 0;

            return (
              sum +
              ratio * 100
            );
          },
          0
        ) /
        totalSkills
      : 0;

  const strongest =
    [...allEntries]
      .sort(
        (a, b) =>
          number(
            b[1].final
          ) -
          number(
            a[1].final
          )
      )[0];

  const largestGap =
    [...allEntries]
      .map(
        ([skill, result]) => {
          const required =
            number(
              result.required,
              7
            );

          const final =
            number(
              result.final
            );

          const gap =
            Math.max(
              0,
              required -
                final
            );

          return {
            skill,
            gap,
            gapPercentage:
              required > 0
                ? (
                    gap /
                    required
                  ) *
                  100
                : 0,
          };
        }
      )
      .sort(
        (a, b) =>
          b.gapPercentage -
          a.gapPercentage
      )[0];

  const weights =
    report.weights || {
      quiz: 0.20,
      problem: 0.25,
      coding: 0.35,
      project: 0.20,
    };

  function toggleExpanded(
    skill
  ) {
    setExpandedSkills(
      (current) => ({
        ...current,
        [skill]:
          !current[
            skill
          ],
      })
    );
  }

  function expandAll() {
    setExpandedSkills(
      Object.fromEntries(
        Object.keys(
          detailedResults
        ).map(
          (skill) => [
            skill,
            true,
          ]
        )
      )
    );
  }

  function collapseAll() {
    setExpandedSkills(
      {}
    );
  }

  function goToSkillGap() {
    navigate(
      "/skill-gap"
    );
  }

  function goToProgress() {
    navigate(
      "/progress"
    );
  }

  function goToCredentials() {
    navigate(
      "/credentials"
    );
  }

  function printReport() {
    window.print();
  }

  return (
    <main className="ar-page">
      <section className="ar-hero">
        <div className="ar-hero-copy">
          <span className="ar-kicker">
            {report.mode ===
            "reassessment"
              ? "RE-ASSESSMENT REPORT"
              : "ASSESSMENT REPORT"}
          </span>

          <h1>
            Your evidence-based
            skill report.
          </h1>

          <p>
            Target career:{" "}
            <strong>
              {report.targetCareer ||
                career?.name ||
                "Not available"}
            </strong>.
            This report combines quiz, problem solving, code/practical work,
            and project evidence into demonstrated skill scores.
          </p>

          <div className="ar-report-meta">
            <span>
              Completed{" "}
              {formatDate(
                report.completedAt
              )}
            </span>

            <span>
              {totalSkills} skill
              {totalSkills === 1
                ? ""
                : "s"}{" "}
              assessed
            </span>
          </div>
        </div>

        <div className="ar-hero-score">
          <CircularScore
            value={
              number(
                report.overallScore
              )
            }
            max={10}
            label="Overall"
            accent="#dc2626"
          />

          <div>
            <span>
              Overall Performance
            </span>

            <strong>
              {scoreToLabel(
                number(
                  report.overallScore
                )
              )}
            </strong>

            <small>
              Career readiness is based on each score relative to its requirement.
            </small>
          </div>
        </div>
      </section>

      <section className="ar-summary-grid">
        <MetricCard
          label="Overall Score"
          value={`${number(
            report.overallScore
          ).toFixed(1)}/10`}
          note={scoreToLabel(
            number(
              report.overallScore
            )
          )}
          accent="#dc2626"
        />

        <MetricCard
          label="Career Readiness"
          value={`${readiness.toFixed(
            0
          )}%`}
          note="Requirement-adjusted"
          accent="#2563eb"
        />

        <MetricCard
          label="Requirements Met"
          value={`${passedSkills}/${totalSkills}`}
          note="Current assessment evidence"
          accent="#16a34a"
        />

        <MetricCard
          label="Verified Skills"
          value={verifiedCount}
          note="Passed re-assessment"
          accent="#ca8a04"
        />

        <MetricCard
          label="Average Gap"
          value={`${averageGap.toFixed(
            0
          )}%`}
          note="Across assessed skills"
          accent="#ea580c"
        />

        <MetricCard
          label="Strongest Skill"
          value={
            strongest
              ? strongest[0]
              : "N/A"
          }
          note={
            strongest
              ? `${number(
                  strongest[1]
                    .final
                ).toFixed(
                  1
                )}/10`
              : ""
          }
          accent="#7c3aed"
        />
      </section>

      <section className="ar-insight-panel">
        <article>
          <span>
            TOP STRENGTH
          </span>

          <h3>
            {strongest
              ? strongest[0]
              : "No data"}
          </h3>

          <p>
            {strongest
              ? `Your highest demonstrated score is ${number(
                  strongest[1].final
                ).toFixed(
                  1
                )}/10.`
              : "No skill result is available."}
          </p>
        </article>

        <article>
          <span>
            LARGEST PRIORITY GAP
          </span>

          <h3>
            {largestGap
              ? largestGap.skill
              : "No gap"}
          </h3>

          <p>
            {largestGap &&
            largestGap.gapPercentage >
              0
              ? `${largestGap.gapPercentage.toFixed(
                  0
                )}% of the configured requirement remains.`
              : "No remaining gap is detected in the assessed skills."}
          </p>
        </article>

        <article>
          <span>
            RECOMMENDED NEXT STEP
          </span>

          <h3>
            {averageGap > 0
              ? "Build Skill-Gap Roadmap"
              : verifiedCount <
                totalSkills
              ? "Complete Verification"
              : "Explore Opportunities"}
          </h3>

          <p>
            {averageGap > 0
              ? "Use the Skill Gap page to prioritize your learning roadmap."
              : verifiedCount <
                totalSkills
              ? "Continue roadmap progress and re-assess skills for verification."
              : "Use your verified profile to explore matching opportunities."}
          </p>
        </article>
      </section>

      <section className="ar-scoring-model">
        <div>
          <span className="ar-kicker">
            SCORING MODEL
          </span>

          <h2>
            How your final score was calculated
          </h2>

          <p>
            The advanced assessment uses four evidence layers. Objective quiz
            scoring is deterministic, while open-response, code/practical and
            project scoring in this hackathon build use prototype heuristics.
          </p>
        </div>

        <div className="ar-weight-grid">
          <MetricCard
            label="Quiz"
            value={`${Math.round(
              number(
                weights.quiz,
                0.2
              ) * 100
            )}%`}
            note="Knowledge"
            accent="#7c3aed"
          />

          <MetricCard
            label="Problem"
            value={`${Math.round(
              number(
                weights.problem,
                0.25
              ) * 100
            )}%`}
            note="Reasoning"
            accent="#2563eb"
          />

          <MetricCard
            label="Practical"
            value={`${Math.round(
              number(
                weights.coding,
                0.35
              ) * 100
            )}%`}
            note="Implementation"
            accent="#0891b2"
          />

          <MetricCard
            label="Project"
            value={`${Math.round(
              number(
                weights.project,
                0.2
              ) * 100
            )}%`}
            note="Applied evidence"
            accent="#16a34a"
          />
        </div>
      </section>

      <section className="ar-controls">
        <div className="ar-search-wrap">
          <span>
            Search skill
          </span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="SQL, Python, Power BI..."
          />
        </div>

        <label>
          <span>
            Status
          </span>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
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
              Requirement Met
            </option>

            <option>
              Near Target
            </option>

            <option>
              Gap Remaining
            </option>
          </select>
        </label>

        <label>
          <span>
            Sort
          </span>

          <select
            value={sortMode}
            onChange={(event) =>
              setSortMode(
                event.target.value
              )
            }
          >
            <option value="gap">
              Largest Gap
            </option>

            <option value="score">
              Highest Score
            </option>

            <option value="required">
              Highest Requirement
            </option>

            <option value="name">
              Skill Name
            </option>
          </select>
        </label>

        <div className="ar-control-buttons">
          <button
            onClick={expandAll}
          >
            Expand All
          </button>

          <button
            onClick={collapseAll}
          >
            Collapse
          </button>
        </div>
      </section>

      <section className="ar-skill-list">
        {skillEntries.length ? (
          skillEntries.map(
            ({
              skill,
              result,
            }) => (
              <SkillResultCard
                key={skill}
                skill={skill}
                result={result}
                verifiedScore={
                  verified[skill]
                }
                expanded={
                  Boolean(
                    expandedSkills[
                      skill
                    ]
                  )
                }
                onToggle={() =>
                  toggleExpanded(
                    skill
                  )
                }
              />
            )
          )
        ) : (
          <div className="ar-empty-block">
            No skills match the current search and status filters.
          </div>
        )}
      </section>

      <section className="ar-next-step">
        <div>
          <span className="ar-kicker">
            WHAT HAPPENS NEXT
          </span>

          <h2>
            Turn assessment evidence into improvement.
          </h2>

          <p>
            NEXTPATH uses these demonstrated scores in the Skill Gap engine.
            Skills below the career requirement become roadmap priorities.
            After roadmap completion, re-assessment can convert improvement into
            a verified skill and project credential.
          </p>
        </div>

        <div className="ar-next-actions">
          <button
            className="primary"
            onClick={
              goToSkillGap
            }
          >
            View Skill Gap →
          </button>

          <button
            onClick={
              goToProgress
            }
          >
            Progress
          </button>

          <button
            onClick={
              goToCredentials
            }
          >
            Credentials
          </button>

          <button
            onClick={
              printReport
            }
          >
            Print Report
          </button>
        </div>
      </section>

      <section className="ar-methodology-note">
        <strong>
          Prototype scoring note
        </strong>

        <p>
          Quiz answers are objectively keyed. Problem solving, practical/code
          responses and project descriptions currently use lightweight
          heuristic scoring based on relevant concepts, completeness and
          reasoning signals. A production assessment should add secure code
          execution, test cases, rubric-based evaluation, project/evidence
          verification and expert review where appropriate.
        </p>
      </section>

      <footer className="ar-footer">
        NEXTPATH Assessment Report · Target Career:{" "}
        {report.targetCareer ||
          career?.name ||
          "Not available"}{" "}
        · Generated from locally stored project assessment evidence.
      </footer>

      <style>{`
        .ar-page {
          max-width: 1260px;
          margin: 0 auto;
          padding: 24px;
          color: #0f172a;
        }

        .ar-kicker {
          display: inline-block;
          color: #dc2626;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.4px;
        }

        .ar-hero {
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
              rgba(220,38,38,.10),
              transparent 33%
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

        .ar-hero h1 {
          margin: 10px 0 14px;
          font-size:
            clamp(
              38px,
              4vw,
              55px
            );
          line-height: 1.04;
          letter-spacing: -1.4px;
        }

        .ar-hero p {
          max-width: 820px;
          margin: 0;
          color: #64748b;
          line-height: 1.7;
        }

        .ar-report-meta {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .ar-report-meta span {
          padding: 6px 9px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          background: #ffffff;
          color: #64748b;
          font-size: 9px;
          font-weight: 800;
        }

        .ar-hero-score {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 17px;
          background: #ffffff;
        }

        .ar-circle {
          width: 118px;
          height: 118px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .ar-circle > div {
          width: 88px;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%;
          background: #ffffff;
        }

        .ar-circle strong {
          font-size: 22px;
        }

        .ar-circle span {
          color: #64748b;
          font-size: 10px;
        }

        .ar-circle small {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 8px;
          text-transform: uppercase;
        }

        .ar-hero-score > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .ar-hero-score > div:last-child span {
          color: #64748b;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .ar-hero-score > div:last-child strong {
          margin: 4px 0;
          font-size: 19px;
        }

        .ar-hero-score > div:last-child small {
          max-width: 180px;
          color: #94a3b8;
          line-height: 1.4;
        }

        .ar-summary-grid {
          display: grid;
          grid-template-columns:
            repeat(6,minmax(0,1fr));
          gap: 10px;
          margin: 18px 0;
        }

        .ar-metric-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 96px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
        }

        .ar-metric-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background:
            var(--metric-accent);
        }

        .ar-metric-card span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .5px;
        }

        .ar-metric-card strong {
          margin: 5px 0;
          font-size: 19px;
          line-height: 1.1;
        }

        .ar-metric-card small {
          margin-top: auto;
          color: #94a3b8;
          line-height: 1.35;
        }

        .ar-insight-panel {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 10px;
          margin-bottom: 18px;
        }

        .ar-insight-panel article {
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #f8fafc;
        }

        .ar-insight-panel span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .8px;
        }

        .ar-insight-panel h3 {
          margin: 6px 0;
        }

        .ar-insight-panel p {
          margin: 0;
          color: #64748b;
          font-size: 10px;
          line-height: 1.5;
        }

        .ar-scoring-model {
          display: grid;
          grid-template-columns:
            minmax(0,1fr)
            minmax(500px,1fr);
          gap: 20px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
        }

        .ar-scoring-model h2 {
          margin: 6px 0;
        }

        .ar-scoring-model p {
          margin: 0;
          color: #64748b;
          line-height: 1.55;
        }

        .ar-weight-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
        }

        .ar-controls {
          display: grid;
          grid-template-columns:
            minmax(240px,1fr)
            180px
            190px
            auto;
          gap: 10px;
          align-items: end;
          margin: 18px 0 12px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
        }

        .ar-controls label,
        .ar-search-wrap {
          display: block;
        }

        .ar-controls label > span,
        .ar-search-wrap > span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .ar-controls input,
        .ar-controls select {
          width: 100%;
          box-sizing: border-box;
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
        }

        .ar-control-buttons {
          display: flex;
          gap: 6px;
        }

        .ar-control-buttons button {
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          font-weight: 800;
          cursor: pointer;
        }

        .ar-skill-list {
          display: grid;
          gap: 11px;
        }

        .ar-skill-card {
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .ar-skill-summary {
          width: 100%;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 17px;
          border: 0;
          background: #ffffff;
          text-align: left;
          cursor: pointer;
        }

        .ar-skill-summary-left {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .ar-status-icon {
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 50%;
          font-weight: 900;
        }

        .ar-status-icon.verified,
        .ar-status-icon.met {
          background: #dcfce7;
          color: #166534;
        }

        .ar-status-icon.near {
          background: #fef3c7;
          color: #92400e;
        }

        .ar-status-icon.gap {
          background: #fee2e2;
          color: #991b1b;
        }

        .ar-skill-summary-left span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .ar-skill-summary-left h3 {
          margin: 3px 0;
          font-size: 18px;
        }

        .ar-skill-summary-left small {
          color: #94a3b8;
        }

        .ar-skill-summary-right {
          display: grid;
          grid-template-columns:
            repeat(3,90px)
            28px;
          gap: 8px;
          align-items: center;
        }

        .ar-skill-summary-right > div {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }

        .ar-skill-summary-right span {
          color: #94a3b8;
          font-size: 7px;
          text-transform: uppercase;
        }

        .ar-skill-summary-right strong {
          margin-top: 2px;
          font-size: 13px;
        }

        .ar-skill-summary-right b {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #475569;
        }

        .ar-main-progress {
          position: relative;
          height: 7px;
          background: #e2e8f0;
        }

        .ar-current-score {
          height: 100%;
          background:
            linear-gradient(
              90deg,
              #dc2626,
              #f97316
            );
        }

        .ar-required-marker {
          position: absolute;
          top: -4px;
          bottom: -4px;
          width: 2px;
          background: #111827;
        }

        .ar-required-marker span {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 2px 5px;
          border-radius: 4px;
          background: #111827;
          color: #ffffff;
          font-size: 6px;
          font-weight: 900;
        }

        .ar-skill-details {
          padding: 18px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .ar-score-breakdown {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 9px;
        }

        .ar-breakdown-card {
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #ffffff;
        }

        .ar-breakdown-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          font-size: 16px;
        }

        .ar-breakdown-main {
          display: flex;
          justify-content: space-between;
          gap: 9px;
          align-items: end;
          margin-top: 8px;
        }

        .ar-breakdown-main > div {
          display: flex;
          flex-direction: column;
        }

        .ar-breakdown-main span {
          font-size: 10px;
          font-weight: 850;
        }

        .ar-breakdown-main small {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 7px;
        }

        .ar-breakdown-main strong {
          font-size: 17px;
        }

        .ar-breakdown-track {
          height: 5px;
          margin-top: 8px;
          overflow: hidden;
          border-radius: 999px;
          background: #e2e8f0;
        }

        .ar-breakdown-track > div {
          height: 100%;
          border-radius: 999px;
        }

        .ar-breakdown-label {
          display: block;
          margin-top: 5px;
          color: #64748b;
          font-size: 7px;
        }

        .ar-evidence-summary {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
          margin-top: 10px;
        }

        .ar-evidence-summary article {
          display: flex;
          flex-direction: column;
          padding: 11px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
        }

        .ar-evidence-summary span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .ar-evidence-summary strong {
          margin: 4px 0;
          font-size: 14px;
          word-break: break-word;
        }

        .ar-evidence-summary small {
          color: #94a3b8;
          line-height: 1.3;
        }

        .ar-project-evidence {
          margin-top: 10px;
          padding: 14px;
          border: 1px solid #bbf7d0;
          border-radius: 11px;
          background: #f0fdf4;
        }

        .ar-project-evidence-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .ar-project-evidence-head span {
          color: #15803d;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .8px;
        }

        .ar-project-evidence-head h4 {
          margin: 4px 0;
        }

        .ar-project-evidence-head > strong {
          color: #166534;
          font-size: 20px;
        }

        .ar-project-brief {
          margin: 8px 0 0;
          color: #4d7c0f;
          font-size: 10px;
          line-height: 1.5;
        }

        .ar-project-evidence-grid {
          display: grid;
          grid-template-columns:
            2fr
            1fr
            1fr;
          gap: 8px;
          margin-top: 10px;
        }

        .ar-project-evidence-grid article {
          padding: 10px;
          border: 1px solid #dcfce7;
          border-radius: 8px;
          background: #ffffff;
        }

        .ar-project-evidence-grid small {
          display: block;
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .ar-project-evidence-grid p {
          margin: 5px 0 0;
          color: #475569;
          font-size: 9px;
          line-height: 1.45;
          white-space: pre-wrap;
        }

        .ar-project-evidence-grid a {
          display: inline-block;
          margin-top: 6px;
          color: #2563eb;
          font-size: 9px;
          font-weight: 850;
          text-decoration: none;
          word-break: break-all;
        }

        .ar-skill-recommendation {
          margin-top: 10px;
          padding: 12px;
          border: 1px solid #bfdbfe;
          border-radius: 9px;
          background: #eff6ff;
        }

        .ar-skill-recommendation strong {
          color: #1d4ed8;
          font-size: 9px;
        }

        .ar-skill-recommendation p {
          margin: 5px 0 0;
          color: #475569;
          font-size: 10px;
          line-height: 1.5;
        }

        .ar-next-step {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          align-items: center;
          margin-top: 20px;
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

        .ar-next-step h2 {
          margin: 6px 0;
        }

        .ar-next-step p {
          max-width: 820px;
          margin: 0;
          color: #94a3b8;
          line-height: 1.55;
        }

        .ar-next-actions {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .ar-next-actions button {
          padding: 10px 12px;
          border: 1px solid #334155;
          border-radius: 8px;
          background: #111827;
          color: #cbd5e1;
          font-weight: 850;
          cursor: pointer;
        }

        .ar-next-actions button.primary {
          border-color: #dc2626;
          background: #dc2626;
          color: #ffffff;
        }

        .ar-methodology-note {
          margin-top: 14px;
          padding: 14px;
          border: 1px solid #fde68a;
          border-radius: 11px;
          background: #fffbeb;
        }

        .ar-methodology-note strong {
          color: #92400e;
          font-size: 9px;
          text-transform: uppercase;
        }

        .ar-methodology-note p {
          margin: 5px 0 0;
          color: #92400e;
          font-size: 9px;
          line-height: 1.5;
        }

        .ar-empty-block {
          padding: 28px;
          border: 1px dashed #cbd5e1;
          border-radius: 11px;
          background: #ffffff;
          color: #64748b;
          text-align: center;
        }

        .ar-footer {
          padding: 16px 2px 0;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.5;
        }

        .ar-state {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 30px;
          text-align: center;
          color: #0f172a;
        }

        .ar-state > div {
          font-size: 42px;
        }

        .ar-state p {
          max-width: 600px;
          color: #64748b;
        }

        .ar-state button {
          padding: 10px 14px;
          border: 0;
          border-radius: 8px;
          background: #dc2626;
          color: #ffffff;
          font-weight: 900;
          cursor: pointer;
        }

        .ar-score-bar {
          padding: 9px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
        }

        .ar-score-bar-head {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          font-size: 9px;
        }

        .ar-score-track {
          height: 5px;
          margin-top: 6px;
          overflow: hidden;
          border-radius: 999px;
          background: #e2e8f0;
        }

        .ar-score-fill {
          height: 100%;
          border-radius: 999px;
        }

        @media(max-width: 1100px) {
          .ar-summary-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }

          .ar-scoring-model {
            grid-template-columns: 1fr;
          }

          .ar-controls {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .ar-score-breakdown,
          .ar-evidence-summary {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }
        }

        @media(max-width: 800px) {
          .ar-page {
            padding: 14px;
          }

          .ar-hero {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          .ar-summary-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .ar-insight-panel {
            grid-template-columns: 1fr;
          }

          .ar-weight-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .ar-skill-summary {
            flex-direction: column;
          }

          .ar-skill-summary-right {
            grid-template-columns:
              repeat(3,minmax(0,1fr))
              28px;
            width: 100%;
          }

          .ar-skill-summary-right > div {
            align-items: flex-start;
          }

          .ar-project-evidence-grid {
            grid-template-columns: 1fr;
          }

          .ar-next-step {
            align-items: stretch;
            flex-direction: column;
          }

          .ar-next-actions {
            justify-content: flex-start;
          }
        }

        @media(max-width: 520px) {
          .ar-summary-grid,
          .ar-weight-grid,
          .ar-controls,
          .ar-score-breakdown,
          .ar-evidence-summary {
            grid-template-columns: 1fr;
          }

          .ar-hero-score {
            align-items: flex-start;
            flex-direction: column;
          }

          .ar-skill-summary-right {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .ar-control-buttons {
            width: 100%;
          }

          .ar-control-buttons button {
            flex: 1;
          }
        }

        @media print {
          .ar-controls,
          .ar-next-actions,
          .ar-methodology-note {
            display: none !important;
          }

          .ar-page {
            max-width: none;
            padding: 0;
          }

          .ar-hero,
          .ar-skill-card,
          .ar-scoring-model,
          .ar-summary-grid,
          .ar-insight-panel {
            break-inside: avoid;
          }

          .ar-skill-details {
            display: block !important;
          }
        }
      `}</style>
    </main>
  );
}
