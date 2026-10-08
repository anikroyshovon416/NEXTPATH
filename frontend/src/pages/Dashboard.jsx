import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEYS = {
  currentUser: "nextpathCurrentUser",
  targetData: "nextpathTargetCareerData",
  selectedSkills: "nextpathSelectedSkills",
  report: "nextpathAssessmentReport",
  scores: "nextpathSkillScores",
  gaps: "nextpathSkillGaps",
  roadmapPreferences: "nextpathRoadmapPreferences",
  roadmapPlan: "nextpathRoadmapPlan",
  roadmapProgress: "nextpathRoadmapProgress",
  verified: "nextpathVerifiedSkills",
  certificates: "nextpathCertificates",
  projects: "nextpathProjects",
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
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function getName(user) {
  if (!user) return "Learner";
  if (typeof user === "string") return user;

  return (
    user.fullName ||
    user.name ||
    user.username ||
    user.email?.split("@")[0] ||
    "Learner"
  );
}

function getInitials(name) {
  return String(name || "N")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase();
}

function normalizeCareerSkills(career) {
  const source =
    career?.skills ||
    career?.required_skills ||
    career?.requiredSkills ||
    [];

  if (Array.isArray(source)) {
    return source.map((skill) => {
      if (typeof skill === "string") {
        return {
          name: skill,
          required_score: 7,
          demand_score: 75,
        };
      }

      return {
        ...skill,
        name:
          skill.name ||
          skill.skill ||
          skill.skillName ||
          "Unknown Skill",
        required_score: number(
          skill.required_score ??
            skill.requiredScore ??
            skill.score ??
            7,
          7
        ),
        demand_score: number(
          skill.demand_score ??
            skill.skill_demand ??
            skill.market_demand ??
            75,
          75
        ),
      };
    });
  }

  if (source && typeof source === "object") {
    return Object.entries(source).map(
      ([name, score]) => ({
        name,
        required_score: number(score, 7),
        demand_score: 75,
      })
    );
  }

  return [];
}

function roadmapCompletion(plan, progress) {
  const items =
    Array.isArray(plan) ? plan : [];

  let total = 0;
  let completed = 0;

  items.forEach((item) => {
    const topics =
      Array.isArray(item.topics)
        ? item.topics
        : [];

    topics.forEach((topic) => {
      total += 1;

      if (progress?.[topic.id]) {
        completed += 1;
      }
    });
  });

  return {
    total,
    completed,
    percentage:
      total > 0
        ? (completed / total) * 100
        : 0,
  };
}

function projectCompletion(project) {
  const checks = [
    Boolean(String(project?.title || "").trim()),
    Boolean(String(project?.description || "").trim()),
    Boolean(String(project?.problem || "").trim()),
    Boolean(String(project?.implementation || "").trim()),
    Boolean(String(project?.result || "").trim()),
    Boolean(String(project?.evidence || "").trim()),
  ];

  return (
    checks.filter(Boolean).length /
    checks.length
  ) * 100;
}

function skillGapInfo(skill, scores) {
  const required =
    number(skill.required_score, 7);

  const demonstrated =
    scores?.[skill.name] !== undefined
      ? number(scores[skill.name])
      : 0;

  const gapScore =
    Math.max(
      0,
      required - demonstrated
    );

  const gapPercentage =
    required > 0
      ? clamp(
          (
            gapScore /
            required
          ) * 100,
          0,
          100
        )
      : 0;

  return {
    name: skill.name,
    required,
    demonstrated,
    gapScore,
    gapPercentage,
    demandScore:
      number(
        skill.demand_score,
        75
      ),
  };
}

function calculateReadiness(skills, scores) {
  if (!skills.length) {
    return 0;
  }

  const total =
    skills.reduce(
      (sum, skill) => {
        const required =
          Math.max(
            0.1,
            number(
              skill.required_score,
              7
            )
          );

        const demonstrated =
          scores?.[skill.name] !== undefined
            ? number(
                scores[skill.name]
              )
            : 0;

        return (
          sum +
          clamp(
            demonstrated / required,
            0,
            1
          ) * 100
        );
      },
      0
    );

  return total / skills.length;
}

function greetingForHour() {
  const hour =
    new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

function MetricCard({
  icon,
  label,
  value,
  note,
  accent = "#2563eb",
  onClick,
}) {
  return (
    <button
      className="db-metric-card"
      style={{
        "--metric-accent": accent,
      }}
      onClick={onClick}
      type="button"
    >
      <div className="db-metric-icon">
        {icon}
      </div>

      <div className="db-metric-copy">
        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

        <small>
          {note}
        </small>
      </div>

      <div className="db-metric-arrow">
        →
      </div>
    </button>
  );
}

function MiniBar({
  value,
  accent = "#2563eb",
}) {
  const safe =
    clamp(
      number(value),
      0,
      100
    );

  return (
    <div className="db-mini-track">
      <div
        style={{
          width: `${safe}%`,
          background: accent,
        }}
      />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  action,
  onAction,
}) {
  return (
    <div className="db-section-head">
      <div>
        <span>
          {eyebrow}
        </span>

        <h2>
          {title}
        </h2>
      </div>

      {action && (
        <button
          type="button"
          onClick={onAction}
        >
          {action} →
        </button>
      )}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  text,
  action,
  onAction,
}) {
  return (
    <div className="db-empty">
      <div>
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

      <button
        type="button"
        onClick={onAction}
      >
        {action}
      </button>
    </div>
  );
}

export default function Dashboard() {
  const navigate =
    useNavigate();

  const user =
    readJSON(
      STORAGE_KEYS.currentUser,
      null
    );

  const career =
    readJSON(
      STORAGE_KEYS.targetData,
      null
    );

  const selectedSkills =
    readJSON(
      STORAGE_KEYS.selectedSkills,
      {}
    );

  const report =
    readJSON(
      STORAGE_KEYS.report,
      null
    );

  const scores =
    readJSON(
      STORAGE_KEYS.scores,
      {}
    );

  const gapData =
    readJSON(
      STORAGE_KEYS.gaps,
      []
    );

  const roadmapPreferences =
    readJSON(
      STORAGE_KEYS.roadmapPreferences,
      {}
    );

  const roadmapPlan =
    readJSON(
      STORAGE_KEYS.roadmapPlan,
      []
    );

  const roadmapProgress =
    readJSON(
      STORAGE_KEYS.roadmapProgress,
      {}
    );

  const verified =
    readJSON(
      STORAGE_KEYS.verified,
      {}
    );

  const certificates =
    readJSON(
      STORAGE_KEYS.certificates,
      []
    );

  const projects =
    readJSON(
      STORAGE_KEYS.projects,
      []
    );

  const [
    activeSkillFilter,
    setActiveSkillFilter,
  ] =
    useState("Priority");

  const learnerName =
    getName(user);

  const careerSkills =
    useMemo(
      () =>
        normalizeCareerSkills(
          career
        ),
      [career]
    );

  const skillRows =
    useMemo(() => {
      const fromSaved =
        Array.isArray(gapData) &&
        gapData.length
          ? gapData.map(
              (item) => ({
                name:
                  item.name ||
                  item.skill,
                required:
                  number(
                    item.requiredScore ??
                      item.required_score,
                    7
                  ),
                demonstrated:
                  number(
                    item.demonstratedScore,
                    scores?.[
                      item.name ||
                      item.skill
                    ] ||
                      0
                  ),
                gapPercentage:
                  number(
                    item.gapPercentage,
                    0
                  ),
                demandScore:
                  number(
                    item.demandScore,
                    75
                  ),
                priority:
                  number(
                    item.priority,
                    0
                  ),
              })
            )
          : careerSkills.map(
              (skill) => {
                const gap =
                  skillGapInfo(
                    skill,
                    scores
                  );

                return {
                  ...gap,
                  priority:
                    Math.round(
                      gap.gapPercentage *
                        0.6 +
                      gap.demandScore *
                        0.4
                    ),
                };
              }
            );

      const sorted =
        [...fromSaved];

      if (
        activeSkillFilter ===
        "Gap"
      ) {
        sorted.sort(
          (a, b) =>
            b.gapPercentage -
            a.gapPercentage
        );
      } else if (
        activeSkillFilter ===
        "Demand"
      ) {
        sorted.sort(
          (a, b) =>
            b.demandScore -
            a.demandScore
        );
      } else {
        sorted.sort(
          (a, b) =>
            b.priority -
            a.priority
        );
      }

      return sorted;
    }, [
      gapData,
      careerSkills,
      scores,
      activeSkillFilter,
    ]);

  const roadmap =
    roadmapCompletion(
      roadmapPlan,
      roadmapProgress
    );

  const readiness =
    calculateReadiness(
      careerSkills,
      scores
    );

  const verifiedCount =
    Object.keys(
      verified || {}
    ).length;

  const selectedCount =
    Array.isArray(
      selectedSkills
    )
      ? selectedSkills.length
      : Object.keys(
          selectedSkills || {}
        ).length;

  const assessedCount =
    Object.keys(
      scores || {}
    ).length;

  const activeGaps =
    skillRows.filter(
      (item) =>
        item.gapPercentage > 0
    ).length;

  const completeProjects =
    Array.isArray(
      projects
    )
      ? projects.filter(
          (project) =>
            projectCompletion(
              project
            ) >= 80
        ).length
      : 0;

  const readyForReassessment =
    Array.isArray(
      roadmapPlan
    )
      ? roadmapPlan.filter(
          (item) => {
            const topics =
              Array.isArray(
                item.topics
              )
                ? item.topics
                : [];

            return (
              topics.length > 0 &&
              topics.every(
                (topic) =>
                  Boolean(
                    roadmapProgress[
                      topic.id
                    ]
                  )
              ) &&
              verified?.[
                item.skill
              ] === undefined
            );
          }
        )
      : [];

  const topGap =
    [...skillRows]
      .sort(
        (a, b) =>
          b.gapPercentage -
          a.gapPercentage
      )[0];

  const strongestSkill =
    [...skillRows]
      .sort(
        (a, b) =>
          b.demonstrated -
          a.demonstrated
      )[0];

  const latestCredential =
    Array.isArray(
      certificates
    ) &&
    certificates.length
      ? certificates[
          certificates.length -
            1
        ]
      : null;

  const nextRoadmapSkill =
    Array.isArray(
      roadmapPlan
    )
      ? roadmapPlan.find(
          (item) => {
            const topics =
              Array.isArray(
                item.topics
              )
                ? item.topics
                : [];

            return topics.some(
              (topic) =>
                !roadmapProgress[
                  topic.id
                ]
            );
          }
        )
      : null;

  const recentProjects =
    Array.isArray(
      projects
    )
      ? [...projects]
          .sort(
            (a, b) =>
              new Date(
                b.updatedAt ||
                  b.createdAt ||
                  0
              ) -
              new Date(
                a.updatedAt ||
                  a.createdAt ||
                  0
              )
          )
          .slice(0, 3)
      : [];

  const journeySteps = [
    {
      label:
        "Target Career",
      route:
        "/target-career",
      complete:
        Boolean(
          career
        ),
      note:
        career
          ? career.name
          : "Choose your career",
    },
    {
      label:
        "Required Skills",
      route:
        "/required-skills",
      complete:
        selectedCount >
        0,
      note:
        selectedCount
          ? `${selectedCount} selected`
          : "Select known skills",
    },
    {
      label:
        "Assessment",
      route:
        "/assessment",
      complete:
        Boolean(
          report
        ),
      note:
        report
          ? "Completed"
          : "Verify current ability",
    },
    {
      label:
        "Skill Gap",
      route:
        "/skill-gap",
      complete:
        skillRows.length >
        0,
      note:
        skillRows.length
          ? `${activeGaps} active gaps`
          : "Analyze gaps",
    },
    {
      label:
        "Roadmap",
      route:
        "/roadmap",
      complete:
        Array.isArray(
          roadmapPlan
        ) &&
        roadmapPlan.length >
          0,
      note:
        roadmap.total
          ? `${roadmap.percentage.toFixed(
              0
            )}% complete`
          : "Generate study plan",
    },
    {
      label:
        "Re-Assessment",
      route:
        "/progress",
      complete:
        verifiedCount >
        0,
      note:
        readyForReassessment.length
          ? `${readyForReassessment.length} ready`
          : verifiedCount
          ? `${verifiedCount} verified`
          : "Complete roadmap",
    },
  ];

  const completedJourneySteps =
    journeySteps.filter(
      (step) =>
        step.complete
    ).length;

  const journeyPercent =
    (
      completedJourneySteps /
      journeySteps.length
    ) * 100;

  return (
    <main className="db-page">
      <section className="db-topbar">
        <div className="db-welcome">
          <div className="db-avatar">
            {getInitials(
              learnerName
            )}
          </div>

          <div>
            <span>
              {greetingForHour()}
            </span>

            <h1>
              {learnerName}
            </h1>

            <p>
              {career
                ? `Your NEXTPATH profile is focused on becoming a ${career.name}.`
                : "Start by choosing the career you want NEXTPATH to optimize for."}
            </p>
          </div>
        </div>

        <div className="db-top-actions">
          <button
            className="ghost"
            type="button"
            onClick={() =>
              navigate(
                "/projects"
              )
            }
          >
            Projects
          </button>

          <button
            className="primary"
            type="button"
            onClick={() =>
              navigate(
                career
                  ? "/progress"
                  : "/target-career"
              )
            }
          >
            {career
              ? "Continue Journey"
              : "Choose Career"}{" "}
            →
          </button>
        </div>
      </section>

      <section className="db-hero">
        <div className="db-hero-left">
          <span className="db-kicker">
            CAREER READINESS OVERVIEW
          </span>

          <h2>
            Build the skills that matter.
            Prove the progress that counts.
          </h2>

          <p>
            NEXTPATH turns your career goal into an evidence-based journey:
            assess skills, close gaps, complete projects, re-assess and build a
            verified career profile.
          </p>

          <div className="db-career-chip">
            <div>
              {career?.icon ||
                "🎯"}
            </div>

            <div>
              <span>
                Target Career
              </span>

              <strong>
                {career?.name ||
                  "Not selected"}
              </strong>

              <small>
                {career?.category ||
                  "Choose a target career to personalize NEXTPATH"}
              </small>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/target-career"
                )
              }
            >
              {career
                ? "Change"
                : "Choose"}
            </button>
          </div>
        </div>

        <div className="db-hero-right">
          <div
            className="db-readiness-ring"
            style={{
              background:
                `conic-gradient(#2563eb ${readiness * 3.6}deg,#e2e8f0 0deg)`,
            }}
          >
            <div>
              <strong>
                {readiness.toFixed(
                  0
                )}
                %
              </strong>

              <span>
                Career
                Readiness
              </span>
            </div>
          </div>

          <div className="db-hero-score-copy">
            <span>
              PROFILE STATUS
            </span>

            <strong>
              {readiness >= 85
                ? "Strong Readiness"
                : readiness >=
                  65
                ? "Developing Well"
                : readiness >
                  0
                ? "Building Evidence"
                : "Getting Started"}
            </strong>

            <small>
              Based on demonstrated assessment scores compared with career
              requirements.
            </small>
          </div>
        </div>
      </section>

      <section className="db-metrics">
        <MetricCard
          icon="✓"
          label="Verified Skills"
          value={verifiedCount}
          note="Passed re-assessment"
          accent="#16a34a"
          onClick={() =>
            navigate(
              "/credentials"
            )
          }
        />

        <MetricCard
          icon="↗"
          label="Active Skill Gaps"
          value={activeGaps}
          note="Skills still below target"
          accent="#dc2626"
          onClick={() =>
            navigate(
              "/skill-gap"
            )
          }
        />

        <MetricCard
          icon="▦"
          label="Roadmap Progress"
          value={`${roadmap.percentage.toFixed(
            0
          )}%`}
          note={`${roadmap.completed}/${roadmap.total} topics complete`}
          accent="#2563eb"
          onClick={() =>
            navigate(
              "/roadmap"
            )
          }
        />

        <MetricCard
          icon="◆"
          label="Portfolio Ready"
          value={completeProjects}
          note="Projects ≥80% documented"
          accent="#7c3aed"
          onClick={() =>
            navigate(
              "/projects"
            )
          }
        />
      </section>

      <section className="db-main-grid">
        <section className="db-panel db-journey-panel">
          <SectionHeader
            eyebrow="YOUR NEXTPATH JOURNEY"
            title="Career readiness workflow"
          />

          <div className="db-journey-progress">
            <div className="db-journey-progress-head">
              <span>
                Overall Journey
              </span>

              <strong>
                {journeyPercent.toFixed(
                  0
                )}
                %
              </strong>
            </div>

            <MiniBar
              value={
                journeyPercent
              }
              accent="#2563eb"
            />
          </div>

          <div className="db-journey-list">
            {journeySteps.map(
              (
                step,
                index
              ) => (
                <button
                  type="button"
                  key={
                    step.label
                  }
                  className={
                    step.complete
                      ? "complete"
                      : ""
                  }
                  onClick={() =>
                    navigate(
                      step.route
                    )
                  }
                >
                  <div className="db-step-index">
                    {step.complete
                      ? "✓"
                      : String(
                          index +
                            1
                        ).padStart(
                          2,
                          "0"
                        )}
                  </div>

                  <div className="db-step-copy">
                    <strong>
                      {step.label}
                    </strong>

                    <small>
                      {step.note}
                    </small>
                  </div>

                  <span>
                    →
                  </span>
                </button>
              )
            )}
          </div>
        </section>

        <section className="db-panel db-next-panel">
          <SectionHeader
            eyebrow="NEXT BEST ACTION"
            title="What should you do now?"
          />

          {readyForReassessment.length >
          0 ? (
            <div className="db-next-card ready">
              <span>
                READY FOR RE-ASSESSMENT
              </span>

              <h3>
                Verify{" "}
                {
                  readyForReassessment[0]
                    .skill
                }
              </h3>

              <p>
                All roadmap topics for this skill are complete. Start a new
                assessment and try to meet the required career score.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/progress"
                  )
                }
              >
                Start Re-Assessment →
              </button>
            </div>
          ) : nextRoadmapSkill ? (
            <div className="db-next-card learning">
              <span>
                CONTINUE LEARNING
              </span>

              <h3>
                {
                  nextRoadmapSkill.skill
                }
              </h3>

              <p>
                Continue the roadmap topics for this skill. Your progress is
                saved automatically.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/roadmap"
                  )
                }
              >
                Continue Roadmap →
              </button>
            </div>
          ) : !career ? (
            <div className="db-next-card start">
              <span>
                START HERE
              </span>

              <h3>
                Choose your target career
              </h3>

              <p>
                NEXTPATH needs a target career before it can calculate required
                skills and personalize the rest of your journey.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/target-career"
                  )
                }
              >
                Choose Target Career →
              </button>
            </div>
          ) : !report ? (
            <div className="db-next-card start">
              <span>
                ASSESS CURRENT ABILITY
              </span>

              <h3>
                Complete your assessment
              </h3>

              <p>
                Select the skills you already know and let NEXTPATH establish
                demonstrated scores before calculating the gap.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/required-skills"
                  )
                }
              >
                Continue to Skills →
              </button>
            </div>
          ) : (
            <div className="db-next-card done">
              <span>
                PROFILE ACTIVE
              </span>

              <h3>
                Keep strengthening evidence
              </h3>

              <p>
                Review projects, verified skills and opportunities to improve
                your overall career profile.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/opportunities"
                  )
                }
              >
                View Opportunities →
              </button>
            </div>
          )}

          <div className="db-quick-grid">
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/assessment-report"
                )
              }
            >
              <span>
                Assessment
              </span>

              <strong>
                {report
                  ? `${number(
                      report.overallScore,
                      0
                    ).toFixed(
                      1
                    )}/10`
                  : "Not done"}
              </strong>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/skill-gap"
                )
              }
            >
              <span>
                Largest Gap
              </span>

              <strong>
                {topGap
                  ? `${topGap.name} · ${topGap.gapPercentage.toFixed(
                      0
                    )}%`
                  : "No data"}
              </strong>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/credentials"
                )
              }
            >
              <span>
                Credentials
              </span>

              <strong>
                {Array.isArray(
                  certificates
                )
                  ? certificates.length
                  : 0}
              </strong>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/projects"
                )
              }
            >
              <span>
                Projects
              </span>

              <strong>
                {Array.isArray(
                  projects
                )
                  ? projects.length
                  : 0}
              </strong>
            </button>
          </div>
        </section>
      </section>

      <section className="db-lower-grid">
        <section className="db-panel">
          <SectionHeader
            eyebrow="SKILL INTELLIGENCE"
            title="Career skill priorities"
            action="View Skill Gap"
            onAction={() =>
              navigate(
                "/skill-gap"
              )
            }
          />

          {skillRows.length ? (
            <>
              <div className="db-skill-tabs">
                {[
                  "Priority",
                  "Gap",
                  "Demand",
                ].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      className={
                        activeSkillFilter ===
                        item
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setActiveSkillFilter(
                          item
                        )
                      }
                    >
                      {item}
                    </button>
                  )
                )}
              </div>

              <div className="db-skill-table">
                {skillRows
                  .slice(
                    0,
                    6
                  )
                  .map(
                    (item) => (
                      <article
                        key={
                          item.name
                        }
                      >
                        <div className="db-skill-name">
                          <strong>
                            {item.name}
                          </strong>

                          <small>
                            Required{" "}
                            {item.required.toFixed(
                              1
                            )}
                            /10
                          </small>
                        </div>

                        <div className="db-skill-score">
                          <span>
                            Current
                          </span>

                          <strong>
                            {item.demonstrated.toFixed(
                              1
                            )}
                          </strong>
                        </div>

                        <div className="db-skill-score">
                          <span>
                            Gap
                          </span>

                          <strong>
                            {item.gapPercentage.toFixed(
                              0
                            )}
                            %
                          </strong>
                        </div>

                        <div className="db-skill-bar">
                          <MiniBar
                            value={
                              100 -
                              item.gapPercentage
                            }
                            accent={
                              item.gapPercentage <=
                              20
                                ? "#16a34a"
                                : item.gapPercentage <=
                                  50
                                ? "#ca8a04"
                                : "#dc2626"
                            }
                          />
                        </div>
                      </article>
                    )
                  )}
              </div>
            </>
          ) : (
            <EmptyState
              icon="🧠"
              title="No skill-gap data yet"
              text="Complete your target career and assessment to see skill intelligence."
              action="Start Assessment"
              onAction={() =>
                navigate(
                  "/required-skills"
                )
              }
            />
          )}
        </section>

        <section className="db-panel">
          <SectionHeader
            eyebrow="LEARNING PROGRESS"
            title="Roadmap momentum"
            action="Open Roadmap"
            onAction={() =>
              navigate(
                "/roadmap"
              )
            }
          />

          {roadmap.total ? (
            <div className="db-roadmap-overview">
              <div className="db-roadmap-main">
                <div
                  className="db-roadmap-ring"
                  style={{
                    background:
                      `conic-gradient(#16a34a ${roadmap.percentage * 3.6}deg,#e2e8f0 0deg)`,
                  }}
                >
                  <div>
                    <strong>
                      {roadmap.percentage.toFixed(
                        0
                      )}
                      %
                    </strong>

                    <small>
                      Complete
                    </small>
                  </div>
                </div>

                <div>
                  <span>
                    STUDY PLAN
                  </span>

                  <strong>
                    {number(
                      roadmapPreferences.weeklyHours,
                      0
                    )}
                    h / week
                  </strong>

                  <small>
                    {number(
                      roadmapPreferences.months,
                      0
                    )}{" "}
                    month goal
                  </small>
                </div>
              </div>

              <div className="db-roadmap-stats">
                <article>
                  <span>
                    Completed Topics
                  </span>

                  <strong>
                    {roadmap.completed}
                  </strong>
                </article>

                <article>
                  <span>
                    Remaining Topics
                  </span>

                  <strong>
                    {Math.max(
                      0,
                      roadmap.total -
                        roadmap.completed
                    )}
                  </strong>
                </article>

                <article>
                  <span>
                    Ready to Re-Assess
                  </span>

                  <strong>
                    {
                      readyForReassessment.length
                    }
                  </strong>
                </article>
              </div>
            </div>
          ) : (
            <EmptyState
              icon="🗺️"
              title="No roadmap generated"
              text="Generate a roadmap after Skill Gap to receive prioritized learning topics."
              action="Build Roadmap"
              onAction={() =>
                navigate(
                  "/roadmap"
                )
              }
            />
          )}
        </section>
      </section>

      <section className="db-lower-grid">
        <section className="db-panel">
          <SectionHeader
            eyebrow="PORTFOLIO"
            title="Recent projects"
            action="View Projects"
            onAction={() =>
              navigate(
                "/projects"
              )
            }
          />

          {recentProjects.length ? (
            <div className="db-project-list">
              {recentProjects.map(
                (project) => {
                  const completion =
                    projectCompletion(
                      project
                    );

                  return (
                    <button
                      key={
                        project.id ||
                        project.title
                      }
                      type="button"
                      onClick={() =>
                        navigate(
                          "/projects"
                        )
                      }
                    >
                      <div className="db-project-icon">
                        ◆
                      </div>

                      <div className="db-project-copy">
                        <strong>
                          {project.title}
                        </strong>

                        <small>
                          {(project.skills || [])
                            .slice(
                              0,
                              3
                            )
                            .join(
                              " · "
                            ) ||
                            "Career project"}
                        </small>
                      </div>

                      <div className="db-project-progress">
                        <span>
                          {completion.toFixed(
                            0
                          )}
                          %
                        </span>

                        <MiniBar
                          value={
                            completion
                          }
                          accent="#7c3aed"
                        />
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          ) : (
            <EmptyState
              icon="🛠️"
              title="Build your first project"
              text="Projects turn roadmap learning into portfolio evidence."
              action="Open Projects"
              onAction={() =>
                navigate(
                  "/projects"
                )
              }
            />
          )}
        </section>

        <section className="db-panel">
          <SectionHeader
            eyebrow="VERIFICATION"
            title="Verified profile"
            action="Credentials"
            onAction={() =>
              navigate(
                "/credentials"
              )
            }
          />

          <div className="db-verification">
            <div className="db-verification-grid">
              <article>
                <span>
                  Verified Skills
                </span>

                <strong>
                  {verifiedCount}
                </strong>
              </article>

              <article>
                <span>
                  Credentials
                </span>

                <strong>
                  {Array.isArray(
                    certificates
                  )
                    ? certificates.length
                    : 0}
                </strong>
              </article>

              <article>
                <span>
                  Assessed Skills
                </span>

                <strong>
                  {assessedCount}
                </strong>
              </article>

              <article>
                <span>
                  Strongest Skill
                </span>

                <strong className="small-value">
                  {strongestSkill?.name ||
                    "—"}
                </strong>
              </article>
            </div>

            {latestCredential ? (
              <div className="db-latest-cert">
                <span>
                  LATEST CREDENTIAL
                </span>

                <h3>
                  {latestCredential.skill}
                </h3>

                <p>
                  Score{" "}
                  {number(
                    latestCredential.score
                  ).toFixed(
                    1
                  )}
                  /10 · Issued{" "}
                  {formatDate(
                    latestCredential.date
                  )}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/credentials"
                    )
                  }
                >
                  View Certificate →
                </button>
              </div>
            ) : (
              <div className="db-latest-cert empty">
                <span>
                  NO VERIFIED CREDENTIAL YET
                </span>

                <h3>
                  Complete and pass a re-assessment.
                </h3>

                <p>
                  Finish roadmap topics for a skill, then meet the required score
                  in re-assessment to generate a NEXTPATH credential.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/progress"
                    )
                  }
                >
                  Open Progress →
                </button>
              </div>
            )}
          </div>
        </section>
      </section>

      <section className="db-opportunity-banner">
        <div>
          <span className="db-kicker">
            OPPORTUNITY READINESS
          </span>

          <h2>
            Your evidence becomes more valuable when it connects to roles.
          </h2>

          <p>
            Explore roles based on verified skills, demonstrated assessment
            scores, target-career alignment and project evidence.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/opportunities"
            )
          }
        >
          Explore Opportunities →
        </button>
      </section>

      <footer className="db-footer">
        NEXTPATH Dashboard · Career readiness values are internal project
        estimates based on configured career requirements and the learner's
        saved NEXTPATH evidence.
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .db-page {
          max-width: 1380px;
          margin: 0 auto;
          padding: 24px;
          color: #0f172a;
        }

        button {
          font: inherit;
        }

        .db-topbar {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
          margin-bottom: 18px;
        }

        .db-welcome {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .db-avatar {
          width: 48px;
          height: 48px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background:
            linear-gradient(
              135deg,
              #111827,
              #334155
            );
          color: #ffffff;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .db-welcome > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .db-welcome span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .7px;
        }

        .db-welcome h1 {
          margin: 2px 0;
          font-size: 20px;
        }

        .db-welcome p {
          margin: 0;
          color: #94a3b8;
          font-size: 9px;
        }

        .db-top-actions {
          display: flex;
          gap: 8px;
        }

        .db-top-actions button {
          padding: 9px 12px;
          border-radius: 8px;
          font-weight: 850;
          cursor: pointer;
        }

        .db-top-actions button.ghost {
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
        }

        .db-top-actions button.primary {
          border: 1px solid #111827;
          background: #111827;
          color: #ffffff;
        }

        .db-kicker {
          display: inline-block;
          color: #2563eb;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.35px;
        }

        .db-hero {
          display: grid;
          grid-template-columns:
            minmax(0,1.4fr)
            minmax(330px,.6fr);
          gap: 24px;
          padding: 32px;
          border: 1px solid #e2e8f0;
          border-radius: 25px;
          background:
            radial-gradient(
              circle at top right,
              rgba(37,99,235,.11),
              transparent 34%
            ),
            radial-gradient(
              circle at bottom left,
              rgba(124,58,237,.07),
              transparent 30%
            ),
            #ffffff;
          box-shadow:
            0 20px 55px
            rgba(15,23,42,.055);
        }

        .db-hero h2 {
          max-width: 900px;
          margin: 8px 0 13px;
          font-size:
            clamp(
              36px,
              4vw,
              54px
            );
          line-height: 1.03;
          letter-spacing: -1.5px;
        }

        .db-hero p {
          max-width: 840px;
          margin: 0;
          color: #64748b;
          line-height: 1.65;
        }

        .db-career-chip {
          display: grid;
          grid-template-columns:
            38px
            minmax(0,1fr)
            auto;
          gap: 10px;
          align-items: center;
          max-width: 620px;
          margin-top: 18px;
          padding: 11px;
          border: 1px solid #dbeafe;
          border-radius: 12px;
          background: #eff6ff;
        }

        .db-career-chip > div:first-child {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #ffffff;
          font-size: 18px;
        }

        .db-career-chip > div:nth-child(2) {
          display: flex;
          flex-direction: column;
        }

        .db-career-chip span {
          color: #60a5fa;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .db-career-chip strong {
          margin: 2px 0;
          color: #1e3a8a;
          font-size: 12px;
        }

        .db-career-chip small {
          color: #64748b;
          font-size: 7px;
        }

        .db-career-chip button {
          padding: 7px 9px;
          border: 1px solid #bfdbfe;
          border-radius: 7px;
          background: #ffffff;
          color: #1d4ed8;
          font-size: 8px;
          font-weight: 850;
          cursor: pointer;
        }

        .db-hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: rgba(255,255,255,.78);
          backdrop-filter: blur(8px);
        }

        .db-readiness-ring {
          width: 130px;
          height: 130px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .db-readiness-ring > div {
          width: 98px;
          height: 98px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%;
          background: #ffffff;
        }

        .db-readiness-ring strong {
          font-size: 28px;
        }

        .db-readiness-ring span {
          color: #64748b;
          font-size: 8px;
          text-align: center;
        }

        .db-hero-score-copy {
          display: flex;
          flex-direction: column;
        }

        .db-hero-score-copy > span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .db-hero-score-copy > strong {
          margin: 5px 0;
          font-size: 16px;
        }

        .db-hero-score-copy > small {
          max-width: 220px;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.4;
        }

        .db-metrics {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 10px;
          margin: 16px 0;
        }

        .db-metric-card {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns:
            42px
            minmax(0,1fr)
            auto;
          gap: 10px;
          align-items: center;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
          color: inherit;
          text-align: left;
          cursor: pointer;
          transition:
            transform .15s ease,
            box-shadow .15s ease;
        }

        .db-metric-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background:
            var(--metric-accent);
        }

        .db-metric-card:hover {
          transform:
            translateY(-2px);
          box-shadow:
            0 12px 28px
            rgba(15,23,42,.06);
        }

        .db-metric-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #f8fafc;
          color:
            var(--metric-accent);
          font-size: 16px;
          font-weight: 900;
        }

        .db-metric-copy {
          display: flex;
          flex-direction: column;
        }

        .db-metric-copy span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .db-metric-copy strong {
          margin: 3px 0;
          font-size: 19px;
        }

        .db-metric-copy small {
          color: #94a3b8;
          font-size: 7px;
        }

        .db-metric-arrow {
          color: #94a3b8;
        }

        .db-main-grid,
        .db-lower-grid {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 14px;
          margin-bottom: 14px;
        }

        .db-panel {
          padding: 17px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: #ffffff;
          box-shadow:
            0 8px 24px
            rgba(15,23,42,.025);
        }

        .db-section-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 13px;
        }

        .db-section-head > div {
          display: flex;
          flex-direction: column;
        }

        .db-section-head span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          letter-spacing: .75px;
        }

        .db-section-head h2 {
          margin: 4px 0 0;
          font-size: 17px;
        }

        .db-section-head button {
          border: 0;
          background: transparent;
          color: #2563eb;
          font-size: 8px;
          font-weight: 850;
          cursor: pointer;
        }

        .db-journey-progress {
          padding: 11px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #f8fafc;
        }

        .db-journey-progress-head {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          align-items: center;
          margin-bottom: 6px;
        }

        .db-journey-progress-head span {
          color: #64748b;
          font-size: 8px;
        }

        .db-journey-progress-head strong {
          font-size: 10px;
        }

        .db-mini-track {
          height: 6px;
          overflow: hidden;
          border-radius: 999px;
          background: #e2e8f0;
        }

        .db-mini-track > div {
          height: 100%;
          border-radius: 999px;
        }

        .db-journey-list {
          display: grid;
          gap: 6px;
          margin-top: 10px;
        }

        .db-journey-list button {
          width: 100%;
          display: grid;
          grid-template-columns:
            32px
            minmax(0,1fr)
            auto;
          gap: 9px;
          align-items: center;
          padding: 9px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
          color: inherit;
          text-align: left;
          cursor: pointer;
        }

        .db-journey-list button:hover {
          border-color: #bfdbfe;
          background: #eff6ff;
        }

        .db-journey-list button.complete {
          border-color: #dcfce7;
        }

        .db-step-index {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: #f1f5f9;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
        }

        .db-journey-list button.complete .db-step-index {
          background: #dcfce7;
          color: #166534;
        }

        .db-step-copy {
          display: flex;
          flex-direction: column;
        }

        .db-step-copy strong {
          font-size: 10px;
        }

        .db-step-copy small {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 7px;
        }

        .db-journey-list button > span {
          color: #94a3b8;
        }

        .db-next-card {
          padding: 16px;
          border-radius: 12px;
        }

        .db-next-card.ready {
          border: 1px solid #bfdbfe;
          background: #eff6ff;
        }

        .db-next-card.learning {
          border: 1px solid #bbf7d0;
          background: #f0fdf4;
        }

        .db-next-card.start {
          border: 1px solid #fde68a;
          background: #fffbeb;
        }

        .db-next-card.done {
          border: 1px solid #ddd6fe;
          background: #f5f3ff;
        }

        .db-next-card > span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          letter-spacing: .75px;
        }

        .db-next-card h3 {
          margin: 5px 0;
          font-size: 17px;
        }

        .db-next-card p {
          margin: 0;
          color: #64748b;
          font-size: 9px;
          line-height: 1.5;
        }

        .db-next-card button {
          margin-top: 12px;
          padding: 8px 10px;
          border: 0;
          border-radius: 7px;
          background: #111827;
          color: #ffffff;
          font-size: 8px;
          font-weight: 850;
          cursor: pointer;
        }

        .db-quick-grid {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 7px;
          margin-top: 10px;
        }

        .db-quick-grid button {
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #ffffff;
          color: inherit;
          text-align: left;
          cursor: pointer;
        }

        .db-quick-grid button:hover {
          background: #f8fafc;
        }

        .db-quick-grid span {
          color: #94a3b8;
          font-size: 7px;
          text-transform: uppercase;
        }

        .db-quick-grid strong {
          margin-top: 4px;
          font-size: 10px;
        }

        .db-skill-tabs {
          display: flex;
          gap: 6px;
          margin-bottom: 9px;
        }

        .db-skill-tabs button {
          padding: 5px 8px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          background: #ffffff;
          color: #64748b;
          font-size: 7px;
          font-weight: 850;
          cursor: pointer;
        }

        .db-skill-tabs button.active {
          border-color: #111827;
          background: #111827;
          color: #ffffff;
        }

        .db-skill-table {
          display: grid;
          gap: 6px;
        }

        .db-skill-table article {
          display: grid;
          grid-template-columns:
            minmax(150px,1fr)
            65px
            65px
            minmax(90px,.8fr);
          gap: 8px;
          align-items: center;
          padding: 9px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
        }

        .db-skill-name {
          display: flex;
          flex-direction: column;
        }

        .db-skill-name strong {
          font-size: 9px;
        }

        .db-skill-name small {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 7px;
        }

        .db-skill-score {
          display: flex;
          flex-direction: column;
        }

        .db-skill-score span {
          color: #94a3b8;
          font-size: 6px;
          text-transform: uppercase;
        }

        .db-skill-score strong {
          margin-top: 2px;
          font-size: 9px;
        }

        .db-roadmap-overview {
          display: grid;
          gap: 11px;
        }

        .db-roadmap-main {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
        }

        .db-roadmap-ring {
          width: 94px;
          height: 94px;
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .db-roadmap-ring > div {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%;
          background: #ffffff;
        }

        .db-roadmap-ring strong {
          font-size: 17px;
        }

        .db-roadmap-ring small {
          color: #64748b;
          font-size: 7px;
        }

        .db-roadmap-main > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .db-roadmap-main > div:last-child span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
        }

        .db-roadmap-main > div:last-child strong {
          margin: 5px 0;
          font-size: 15px;
        }

        .db-roadmap-main > div:last-child small {
          color: #94a3b8;
          font-size: 8px;
        }

        .db-roadmap-stats {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 7px;
        }

        .db-roadmap-stats article {
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #ffffff;
        }

        .db-roadmap-stats span {
          color: #64748b;
          font-size: 7px;
        }

        .db-roadmap-stats strong {
          margin-top: 4px;
          font-size: 14px;
        }

        .db-project-list {
          display: grid;
          gap: 7px;
        }

        .db-project-list > button {
          width: 100%;
          display: grid;
          grid-template-columns:
            36px
            minmax(0,1fr)
            100px;
          gap: 9px;
          align-items: center;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
          color: inherit;
          text-align: left;
          cursor: pointer;
        }

        .db-project-list > button:hover {
          background: #f8fafc;
        }

        .db-project-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          background: #ede9fe;
          color: #7c3aed;
        }

        .db-project-copy {
          display: flex;
          flex-direction: column;
        }

        .db-project-copy strong {
          font-size: 10px;
        }

        .db-project-copy small {
          margin-top: 3px;
          color: #94a3b8;
          font-size: 7px;
        }

        .db-project-progress {
          display: grid;
          gap: 4px;
        }

        .db-project-progress span {
          color: #64748b;
          font-size: 7px;
          text-align: right;
        }

        .db-verification {
          display: grid;
          gap: 10px;
        }

        .db-verification-grid {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 7px;
        }

        .db-verification-grid article {
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
        }

        .db-verification-grid span {
          color: #64748b;
          font-size: 7px;
        }

        .db-verification-grid strong {
          margin-top: 4px;
          font-size: 15px;
        }

        .db-verification-grid strong.small-value {
          font-size: 10px;
        }

        .db-latest-cert {
          padding: 13px;
          border: 1px solid #ddd6fe;
          border-radius: 9px;
          background: #f5f3ff;
        }

        .db-latest-cert.empty {
          border-color: #e2e8f0;
          background: #ffffff;
        }

        .db-latest-cert > span {
          color: #7c3aed;
          font-size: 7px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .db-latest-cert h3 {
          margin: 5px 0;
        }

        .db-latest-cert p {
          margin: 0;
          color: #64748b;
          font-size: 8px;
          line-height: 1.45;
        }

        .db-latest-cert button {
          margin-top: 9px;
          padding: 7px 9px;
          border: 0;
          border-radius: 7px;
          background: #7c3aed;
          color: #ffffff;
          font-size: 8px;
          font-weight: 850;
          cursor: pointer;
        }

        .db-empty {
          padding: 24px;
          border: 1px dashed #cbd5e1;
          border-radius: 10px;
          text-align: center;
          background: #f8fafc;
        }

        .db-empty > div {
          font-size: 30px;
        }

        .db-empty h3 {
          margin: 7px 0;
        }

        .db-empty p {
          max-width: 460px;
          margin: 0 auto;
          color: #64748b;
          font-size: 8px;
          line-height: 1.45;
        }

        .db-empty button {
          margin-top: 10px;
          padding: 7px 9px;
          border: 0;
          border-radius: 7px;
          background: #111827;
          color: #ffffff;
          font-size: 8px;
          font-weight: 850;
          cursor: pointer;
        }

        .db-opportunity-banner {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          align-items: center;
          margin-top: 4px;
          padding: 24px;
          border-radius: 16px;
          background:
            radial-gradient(
              circle at right,
              rgba(37,99,235,.22),
              transparent 36%
            ),
            #0f172a;
          color: #ffffff;
        }

        .db-opportunity-banner h2 {
          margin: 6px 0;
        }

        .db-opportunity-banner p {
          max-width: 800px;
          margin: 0;
          color: #94a3b8;
          line-height: 1.55;
        }

        .db-opportunity-banner button {
          padding: 10px 13px;
          border: 1px solid #3b82f6;
          border-radius: 8px;
          background: #2563eb;
          color: #ffffff;
          font-weight: 850;
          white-space: nowrap;
          cursor: pointer;
        }

        .db-footer {
          padding: 16px 2px 0;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.5;
        }

        @media(max-width: 1120px) {
          .db-hero {
            grid-template-columns: 1fr;
          }

          .db-metrics {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }
        }

        @media(max-width: 860px) {
          .db-page {
            padding: 14px;
          }

          .db-topbar,
          .db-opportunity-banner {
            align-items: stretch;
            flex-direction: column;
          }

          .db-hero {
            padding: 24px;
          }

          .db-main-grid,
          .db-lower-grid {
            grid-template-columns: 1fr;
          }

          .db-top-actions {
            justify-content: flex-start;
          }

          .db-opportunity-banner button {
            align-self: flex-start;
          }
        }

        @media(max-width: 560px) {
          .db-metrics {
            grid-template-columns: 1fr;
          }

          .db-hero-right {
            align-items: flex-start;
            flex-direction: column;
          }

          .db-career-chip {
            grid-template-columns:
              38px
              minmax(0,1fr);
          }

          .db-career-chip button {
            grid-column:
              1 / -1;
          }

          .db-skill-table article {
            grid-template-columns:
              minmax(120px,1fr)
              55px
              55px;
          }

          .db-skill-bar {
            grid-column:
              1 / -1;
          }

          .db-project-list > button {
            grid-template-columns:
              36px
              minmax(0,1fr);
          }

          .db-project-progress {
            grid-column:
              1 / -1;
          }

          .db-roadmap-stats {
            grid-template-columns: 1fr;
          }

          .db-quick-grid,
          .db-verification-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
