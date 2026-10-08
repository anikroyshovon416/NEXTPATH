import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEYS = {
  target: "nextpathTargetCareer",
  targetData: "nextpathTargetCareerData",
  selectedSkills: "nextpathSelectedSkills",
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

function normalizeSkills(rawSkills) {
  if (Array.isArray(rawSkills)) {
    return rawSkills.map((skill) => {
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

  if (rawSkills && typeof rawSkills === "object") {
    return Object.entries(rawSkills).map(([name, score]) => ({
      name,
      required_score: number(score, 7),
      demand_score: 75,
    }));
  }

  return [];
}

function calculateGap(required, demonstrated) {
  const req = Math.max(0, number(required));
  const demo = Math.max(0, number(demonstrated));

  const gapScore =
    Math.max(
      0,
      req - demo
    );

  const gapPercentage =
    req > 0
      ? clamp(
          (
            gapScore /
            req
          ) *
            100,
          0,
          100
        )
      : 0;

  return {
    gapScore,
    gapPercentage,
  };
}

function priorityScore({
  gapPercentage,
  demandScore,
  requiredScore,
}) {
  const gapWeight =
    clamp(
      number(gapPercentage),
      0,
      100
    ) /
    100;

  const demandWeight =
    clamp(
      number(demandScore, 75),
      0,
      100
    ) /
    100;

  const requiredWeight =
    clamp(
      number(requiredScore, 7),
      0,
      10
    ) /
    10;

  return Math.round(
    (
      gapWeight * 0.55 +
      demandWeight * 0.25 +
      requiredWeight * 0.20
    ) *
      100
  );
}

function gapLabel(gapPercentage) {
  const gap =
    number(
      gapPercentage
    );

  if (gap <= 0) {
    return "No Gap";
  }

  if (gap <= 20) {
    return "Small Gap";
  }

  if (gap <= 40) {
    return "Moderate Gap";
  }

  if (gap <= 70) {
    return "High Gap";
  }

  return "Critical Gap";
}

function gapTone(gapPercentage) {
  const gap =
    number(
      gapPercentage
    );

  if (gap <= 0) {
    return "none";
  }

  if (gap <= 20) {
    return "small";
  }

  if (gap <= 40) {
    return "moderate";
  }

  if (gap <= 70) {
    return "high";
  }

  return "critical";
}

function readinessLabel(score, required) {
  const req =
    Math.max(
      0.1,
      number(
        required,
        7
      )
    );

  const ratio =
    number(score) /
    req;

  if (ratio >= 1) {
    return "Ready";
  }

  if (ratio >= 0.8) {
    return "Nearly Ready";
  }

  if (ratio >= 0.6) {
    return "Developing";
  }

  if (ratio > 0) {
    return "Early Stage";
  }

  return "Not Demonstrated";
}

function ScoreBar({
  value,
  max = 10,
  accent = "#dc2626",
}) {
  const percentage =
    max > 0
      ? clamp(
          (
            number(value) /
            max
          ) *
            100,
          0,
          100
        )
      : 0;

  return (
    <div className="sg-score-track">
      <div
        className="sg-score-fill"
        style={{
          width:
            `${percentage}%`,
          background:
            accent,
        }}
      />
    </div>
  );
}

function GapBar({
  value,
}) {
  const safe =
    clamp(
      number(value),
      0,
      100
    );

  return (
    <div className="sg-gap-track">
      <div
        className={`sg-gap-fill ${gapTone(
          safe
        )}`}
        style={{
          width:
            `${safe}%`,
        }}
      />
    </div>
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
      className="sg-summary-card"
      style={{
        "--summary-accent":
          accent,
      }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </article>
  );
}

function PriorityBadge({
  score,
}) {
  const value =
    number(score);

  let tone =
    "low";

  if (value >= 80) {
    tone =
      "critical";
  } else if (
    value >= 65
  ) {
    tone =
      "high";
  } else if (
    value >= 45
  ) {
    tone =
      "medium";
  }

  return (
    <div
      className={`sg-priority-badge ${tone}`}
    >
      <small>
        Priority
      </small>

      <strong>
        {value}
      </strong>

      <span>
        /100
      </span>
    </div>
  );
}

function SkillGapCard({
  item,
  expanded,
  onToggle,
  onReassess,
}) {
  const {
    name,
    requiredScore,
    demonstratedScore,
    gapScore,
    gapPercentage,
    demandScore,
    priority,
    selectedInitially,
    assessed,
    verified,
    projectScore,
    codingScore,
    problemScore,
    quizScore,
  } = item;

  return (
    <article className="sg-skill-card">
      <button
        className="sg-skill-summary"
        onClick={onToggle}
      >
        <div className="sg-skill-title">
          <div
            className={`sg-gap-status ${gapTone(
              gapPercentage
            )}`}
          >
            {gapPercentage <= 0
              ? "✓"
              : "!"}
          </div>

          <div>
            <span>
              {gapLabel(
                gapPercentage
              )}
            </span>

            <h3>
              {name}
            </h3>

            <small>
              {readinessLabel(
                demonstratedScore,
                requiredScore
              )}
              {verified
                ? " · Verified"
                : ""}
            </small>
          </div>
        </div>

        <div className="sg-summary-values">
          <div>
            <span>
              Demonstrated
            </span>

            <strong>
              {demonstratedScore.toFixed(
                1
              )}
              /10
            </strong>
          </div>

          <div>
            <span>
              Required
            </span>

            <strong>
              {requiredScore.toFixed(
                1
              )}
              /10
            </strong>
          </div>

          <div>
            <span>
              Gap
            </span>

            <strong>
              {gapPercentage.toFixed(
                0
              )}
              %
            </strong>
          </div>

          <PriorityBadge
            score={priority}
          />

          <b>
            {expanded
              ? "−"
              : "+"}
          </b>
        </div>
      </button>

      <div className="sg-bar-stack">
        <div>
          <div className="sg-bar-head">
            <span>
              Demonstrated
            </span>

            <strong>
              {demonstratedScore.toFixed(
                1
              )}
              /10
            </strong>
          </div>

          <ScoreBar
            value={
              demonstratedScore
            }
            accent="#2563eb"
          />
        </div>

        <div>
          <div className="sg-bar-head">
            <span>
              Required
            </span>

            <strong>
              {requiredScore.toFixed(
                1
              )}
              /10
            </strong>
          </div>

          <ScoreBar
            value={
              requiredScore
            }
            accent="#111827"
          />
        </div>

        <div>
          <div className="sg-bar-head">
            <span>
              Gap
            </span>

            <strong>
              {gapPercentage.toFixed(
                0
              )}
              %
            </strong>
          </div>

          <GapBar
            value={
              gapPercentage
            }
          />
        </div>
      </div>

      {expanded && (
        <div className="sg-skill-details">
          <section className="sg-detail-grid">
            <article>
              <span>
                Current Evidence
              </span>

              <strong>
                {assessed
                  ? "Assessment Score"
                  : "No Assessment Yet"}
              </strong>

              <small>
                {selectedInitially
                  ? "Originally selected for assessment"
                  : "Not selected in initial skill inventory"}
              </small>
            </article>

            <article>
              <span>
                Required Level
              </span>

              <strong>
                {requiredScore.toFixed(
                  1
                )}
                /10
              </strong>

              <small>
                From target career profile
              </small>
            </article>

            <article>
              <span>
                Market Skill Demand
              </span>

              <strong>
                {demandScore.toFixed(
                  0
                )}
                /100
              </strong>

              <small>
                Career-profile demand indicator
              </small>
            </article>

            <article>
              <span>
                Remaining Gap
              </span>

              <strong>
                {gapScore.toFixed(
                  1
                )}
              </strong>

              <small>
                Required − demonstrated
              </small>
            </article>
          </section>

          <section className="sg-evidence-grid">
            <article>
              <span>
                Quiz
              </span>

              <strong>
                {quizScore ===
                null
                  ? "—"
                  : `${quizScore.toFixed(
                      0
                    )}%`}
              </strong>
            </article>

            <article>
              <span>
                Problem Solving
              </span>

              <strong>
                {problemScore ===
                null
                  ? "—"
                  : `${problemScore.toFixed(
                      0
                    )}%`}
              </strong>
            </article>

            <article>
              <span>
                Code / Practical
              </span>

              <strong>
                {codingScore ===
                null
                  ? "—"
                  : `${codingScore.toFixed(
                      0
                    )}%`}
              </strong>
            </article>

            <article>
              <span>
                Project
              </span>

              <strong>
                {projectScore ===
                null
                  ? "—"
                  : `${projectScore.toFixed(
                      0
                    )}%`}
              </strong>
            </article>
          </section>

          <section className="sg-recommendation">
            <div>
              <span>
                NEXTPATH ACTION
              </span>

              <h4>
                {gapPercentage <=
                0
                  ? verified
                    ? "Maintain verified skill"
                    : "Maintain and strengthen evidence"
                  : priority >=
                    80
                  ? "Top roadmap priority"
                  : priority >=
                    60
                  ? "High roadmap priority"
                  : "Development priority"}
              </h4>

              <p>
                {gapPercentage <=
                0
                  ? verified
                    ? "This skill is verified. Keep it current with projects and interview practice."
                    : "You meet the configured target. Continue practicing and complete re-assessment if you want verification."
                  : assessed
                  ? "Use your assessment breakdown to focus learning on the weakest evidence areas, complete the roadmap topics, then re-assess."
                  : "This required skill has no demonstrated assessment score yet, so NEXTPATH currently treats it as 0. Learn the roadmap topics first, then assess the skill."}
              </p>
            </div>

            {assessed &&
              gapPercentage >
                0 && (
                <button
                  onClick={
                    onReassess
                  }
                >
                  Re-Assess Skill
                </button>
              )}
          </section>
        </div>
      )}
    </article>
  );
}

export default function SkillGap() {
  const navigate =
    useNavigate();

  const career =
    readJSON(
      STORAGE_KEYS.targetData,
      null
    );

  const report =
    readJSON(
      STORAGE_KEYS.report,
      null
    );

  const selectedSkills =
    readJSON(
      STORAGE_KEYS.selectedSkills,
      {}
    );

  const cumulativeScores =
    readJSON(
      STORAGE_KEYS.scores,
      {}
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
    filter,
    setFilter,
  ] =
    useState("All");

  const [
    sortMode,
    setSortMode,
  ] =
    useState("priority");

  const [
    expanded,
    setExpanded,
  ] =
    useState({});

  const careerSkills =
    useMemo(
      () =>
        normalizeSkills(
          career?.skills ||
          career?.required_skills ||
          career?.requiredSkills ||
          []
        ),
      [career]
    );

  const skillGapData =
    useMemo(() => {
      const detailed =
        report?.detailedResults ||
        {};

      const data =
        careerSkills.map(
          (skill) => {
            const reportResult =
              detailed[
                skill.name
              ] ||
              null;

            const hasAssessmentScore =
              cumulativeScores[
                skill.name
              ] !==
              undefined;

            const demonstratedScore =
              hasAssessmentScore
                ? number(
                    cumulativeScores[
                      skill.name
                    ]
                  )
                : 0;

            const requiredScore =
              number(
                skill.required_score,
                7
              );

            const demandScore =
              number(
                skill.demand_score,
                75
              );

            const {
              gapScore,
              gapPercentage,
            } =
              calculateGap(
                requiredScore,
                demonstratedScore
              );

            const priority =
              priorityScore({
                gapPercentage,
                demandScore,
                requiredScore,
              });

            return {
              name:
                skill.name,
              requiredScore,
              demandScore,
              demonstratedScore,
              gapScore,
              gapPercentage,
              priority,
              selectedInitially:
                selectedSkills[
                  skill.name
                ] !==
                undefined,
              assessed:
                hasAssessmentScore,
              verified:
                verified[
                  skill.name
                ] !==
                undefined,
              quizScore:
                reportResult
                  ? number(
                      reportResult.quiz
                    )
                  : null,
              problemScore:
                reportResult
                  ? number(
                      reportResult.problem
                    )
                  : null,
              codingScore:
                reportResult
                  ? number(
                      reportResult.coding
                    )
                  : null,
              projectScore:
                reportResult
                  ? number(
                      reportResult.project
                    )
                  : null,
            };
          }
        );

      localStorage.setItem(
        STORAGE_KEYS.gaps,
        JSON.stringify(
          data
        )
      );

      return data;
    }, [
      careerSkills,
      report,
      selectedSkills,
      cumulativeScores,
      verified,
    ]);

  const visibleSkills =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      const filtered =
        skillGapData.filter(
          (item) => {
            const matchesSearch =
              !query ||
              item.name
                .toLowerCase()
                .includes(
                  query
                );

            let matchesFilter =
              true;

            if (
              filter ===
              "Gap Only"
            ) {
              matchesFilter =
                item.gapPercentage >
                0;
            } else if (
              filter ===
              "No Gap"
            ) {
              matchesFilter =
                item.gapPercentage <=
                0;
            } else if (
              filter ===
              "Unassessed"
            ) {
              matchesFilter =
                !item.assessed;
            } else if (
              filter ===
              "Verified"
            ) {
              matchesFilter =
                item.verified;
            } else if (
              filter ===
              "Critical"
            ) {
              matchesFilter =
                item.gapPercentage >=
                70;
            }

            return (
              matchesSearch &&
              matchesFilter
            );
          }
        );

      const sorted =
        [...filtered];

      if (
        sortMode ===
        "priority"
      ) {
        sorted.sort(
          (a, b) =>
            b.priority -
            a.priority
        );
      } else if (
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
        "demand"
      ) {
        sorted.sort(
          (a, b) =>
            b.demandScore -
            a.demandScore
        );
      } else if (
        sortMode ===
        "score"
      ) {
        sorted.sort(
          (a, b) =>
            b.demonstratedScore -
            a.demonstratedScore
        );
      } else {
        sorted.sort(
          (a, b) =>
            a.name.localeCompare(
              b.name
            )
        );
      }

      return sorted;
    }, [
      skillGapData,
      search,
      filter,
      sortMode,
    ]);

  if (!career) {
    return (
      <main className="sg-state">
        <div>
          🎯
        </div>

        <h2>
          No target career selected
        </h2>

        <p>
          Choose a target career before calculating skill gaps.
        </p>

        <button
          onClick={() =>
            navigate(
              "/target-career"
            )
          }
        >
          Go to Target Career
        </button>
      </main>
    );
  }

  if (
    !careerSkills.length
  ) {
    return (
      <main className="sg-state">
        <div>
          🧩
        </div>

        <h2>
          No required skills found
        </h2>

        <p>
          The selected career does not contain a valid skill list.
        </p>

        <button
          onClick={() =>
            navigate(
              "/target-career"
            )
          }
        >
          Return to Target Career
        </button>
      </main>
    );
  }

  const totalSkills =
    skillGapData.length;

  const assessedCount =
    skillGapData.filter(
      (item) =>
        item.assessed
    ).length;

  const verifiedCount =
    skillGapData.filter(
      (item) =>
        item.verified
    ).length;

  const noGapCount =
    skillGapData.filter(
      (item) =>
        item.gapPercentage <=
        0
    ).length;

  const criticalCount =
    skillGapData.filter(
      (item) =>
        item.gapPercentage >=
        70
    ).length;

  const averageGap =
    totalSkills
      ? skillGapData.reduce(
          (
            sum,
            item
          ) =>
            sum +
            item.gapPercentage,
          0
        ) /
        totalSkills
      : 0;

  const readiness =
    totalSkills
      ? skillGapData.reduce(
          (
            sum,
            item
          ) => {
            const ratio =
              item.requiredScore >
              0
                ? clamp(
                    item.demonstratedScore /
                      item.requiredScore,
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

  const topPriority =
    [...skillGapData]
      .sort(
        (a, b) =>
          b.priority -
          a.priority
      )[0];

  const strongest =
    [...skillGapData]
      .sort(
        (a, b) =>
          b.demonstratedScore -
          a.demonstratedScore
      )[0];

  function toggleExpanded(
    skill
  ) {
    setExpanded(
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
    setExpanded(
      Object.fromEntries(
        skillGapData.map(
          (item) => [
            item.name,
            true,
          ]
        )
      )
    );
  }

  function collapseAll() {
    setExpanded(
      {}
    );
  }

  function reassessSkill(
    skillName
  ) {
    localStorage.setItem(
      STORAGE_KEYS.mode,
      "reassessment"
    );

    localStorage.setItem(
      STORAGE_KEYS.reassessmentSkills,
      JSON.stringify([
        skillName,
      ])
    );

    navigate(
      "/assessment"
    );
  }

  function generateRoadmap() {
    localStorage.setItem(
      STORAGE_KEYS.gaps,
      JSON.stringify(
        skillGapData
      )
    );

    navigate(
      "/roadmap"
    );
  }

  return (
    <main className="sg-page">
      <section className="sg-hero">
        <div className="sg-hero-copy">
          <span className="sg-kicker">
            CAREER SKILL GAP
          </span>

          <h1>
            See exactly what stands
            between you and{" "}
            {career.name}.
          </h1>

          <p>
            NEXTPATH compares the target career requirement for every skill
            against your demonstrated assessment score. Required skills that
            you did not assess yet are treated as demonstrated score 0, so the
            roadmap can still cover the complete career profile.
          </p>

          <div className="sg-formula">
            <strong>
              Gap Formula
            </strong>

            <code>
              gap = max(0, required − demonstrated)
            </code>

            <code>
              gap% = gap / required × 100
            </code>
          </div>
        </div>

        <div className="sg-hero-score">
          <div
            className="sg-readiness-ring"
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

          <div>
            <span>
              Target Career
            </span>

            <strong>
              {career.icon ||
                "🎯"}{" "}
              {career.name}
            </strong>

            <small>
              {career.category ||
                "Career"}
            </small>
          </div>
        </div>
      </section>

      <section className="sg-summary-grid">
        <SummaryCard
          label="Required Skills"
          value={totalSkills}
          note="Complete career profile"
          accent="#dc2626"
        />

        <SummaryCard
          label="Assessed Skills"
          value={`${assessedCount}/${totalSkills}`}
          note="Have demonstrated scores"
          accent="#2563eb"
        />

        <SummaryCard
          label="No-Gap Skills"
          value={noGapCount}
          note="Meet configured requirement"
          accent="#16a34a"
        />

        <SummaryCard
          label="Verified Skills"
          value={verifiedCount}
          note="Passed re-assessment"
          accent="#7c3aed"
        />

        <SummaryCard
          label="Average Gap"
          value={`${averageGap.toFixed(
            0
          )}%`}
          note="Across all required skills"
          accent="#ea580c"
        />

        <SummaryCard
          label="Critical Gaps"
          value={criticalCount}
          note="Gap ≥ 70%"
          accent="#991b1b"
        />
      </section>

      <section className="sg-insights">
        <article>
          <span>
            TOP ROADMAP PRIORITY
          </span>

          <h3>
            {topPriority
              ?.name ||
              "No data"}
          </h3>

          <p>
            {topPriority
              ? `Priority ${topPriority.priority}/100 · ${topPriority.gapPercentage.toFixed(
                  0
                )}% gap · ${topPriority.demandScore.toFixed(
                  0
                )}/100 demand.`
              : "No priority data available."}
          </p>
        </article>

        <article>
          <span>
            STRONGEST DEMONSTRATED SKILL
          </span>

          <h3>
            {strongest
              ?.name ||
              "No data"}
          </h3>

          <p>
            {strongest
              ? `${strongest.demonstratedScore.toFixed(
                  1
                )}/10 demonstrated against ${strongest.requiredScore.toFixed(
                  1
                )}/10 required.`
              : "No score available."}
          </p>
        </article>

        <article>
          <span>
            ROADMAP LOGIC
          </span>

          <h3>
            Largest gaps first
          </h3>

          <p>
            Priority combines gap severity, skill demand and career-required
            level so the roadmap can focus on the most valuable weaknesses.
          </p>
        </article>
      </section>

      <section className="sg-controls">
        <label>
          <span>
            Search Skill
          </span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="SQL, Python, Machine Learning..."
          />
        </label>

        <label>
          <span>
            Filter
          </span>

          <select
            value={filter}
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
              Gap Only
            </option>

            <option>
              No Gap
            </option>

            <option>
              Critical
            </option>

            <option>
              Unassessed
            </option>

            <option>
              Verified
            </option>
          </select>
        </label>

        <label>
          <span>
            Sort By
          </span>

          <select
            value={sortMode}
            onChange={(event) =>
              setSortMode(
                event.target.value
              )
            }
          >
            <option value="priority">
              Roadmap Priority
            </option>

            <option value="gap">
              Largest Gap
            </option>

            <option value="demand">
              Skill Demand
            </option>

            <option value="score">
              Demonstrated Score
            </option>

            <option value="name">
              Skill Name
            </option>
          </select>
        </label>

        <div className="sg-control-actions">
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

      <section className="sg-skill-list">
        {visibleSkills.length ? (
          visibleSkills.map(
            (item) => (
              <SkillGapCard
                key={item.name}
                item={item}
                expanded={
                  Boolean(
                    expanded[
                      item.name
                    ]
                  )
                }
                onToggle={() =>
                  toggleExpanded(
                    item.name
                  )
                }
                onReassess={() =>
                  reassessSkill(
                    item.name
                  )
                }
              />
            )
          )
        ) : (
          <div className="sg-empty">
            <div>
              🔍
            </div>

            <h2>
              No skills match the current filters
            </h2>

            <button
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <section className="sg-roadmap-panel">
        <div>
          <span className="sg-kicker">
            NEXT STEP
          </span>

          <h2>
            Turn these gaps into a personalized roadmap.
          </h2>

          <p>
            The Roadmap page can now use the full skill-gap dataset, rank the
            largest priorities first, and allocate learning topics according to
            your goal duration and weekly study hours.
          </p>
        </div>

        <div className="sg-roadmap-actions">
          <button
            className="primary"
            onClick={
              generateRoadmap
            }
          >
            Build My Roadmap →
          </button>

          <button
            onClick={() =>
              navigate(
                "/assessment-report"
              )
            }
          >
            Assessment Report
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

      <section className="sg-methodology-note">
        <strong>
          How unassessed skills are handled
        </strong>

        <p>
          A skill is assessed when a demonstrated score exists in
          nextpathSkillScores. If no demonstrated score exists, NEXTPATH uses 0
          for the current score regardless of the confidence rating from the
          Required Skills page. This keeps self-confidence separate from
          verified assessment evidence.
        </p>
      </section>

      <footer className="sg-footer">
        NEXTPATH Skill Gap · Target Career: {career.name} · Gap priority is a
        project scoring model based on gap severity, career demand and required
        competency.
      </footer>

      <style>{`
        .sg-page {
          max-width: 1320px;
          margin: 0 auto;
          padding: 24px;
          color: #0f172a;
        }

        .sg-kicker {
          display: inline-block;
          color: #dc2626;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.4px;
        }

        .sg-hero {
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
              rgba(37,99,235,.10),
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

        .sg-hero h1 {
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

        .sg-hero p {
          max-width: 850px;
          margin: 0;
          color: #64748b;
          line-height: 1.7;
        }

        .sg-formula {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 17px;
        }

        .sg-formula strong {
          color: #334155;
          font-size: 9px;
        }

        .sg-formula code {
          padding: 6px 8px;
          border: 1px solid #e2e8f0;
          border-radius: 7px;
          background: #ffffff;
          color: #475569;
          font-size: 9px;
        }

        .sg-hero-score {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
        }

        .sg-readiness-ring {
          width: 116px;
          height: 116px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .sg-readiness-ring > div {
          width: 86px;
          height: 86px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%;
          background: #ffffff;
        }

        .sg-readiness-ring strong {
          font-size: 23px;
        }

        .sg-readiness-ring span {
          color: #64748b;
          font-size: 8px;
          text-align: center;
        }

        .sg-hero-score > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .sg-hero-score > div:last-child span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .sg-hero-score > div:last-child strong {
          margin: 4px 0;
          font-size: 18px;
        }

        .sg-hero-score > div:last-child small {
          color: #94a3b8;
        }

        .sg-summary-grid {
          display: grid;
          grid-template-columns:
            repeat(6,minmax(0,1fr));
          gap: 10px;
          margin: 18px 0;
        }

        .sg-summary-card {
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

        .sg-summary-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background:
            var(--summary-accent);
        }

        .sg-summary-card span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .sg-summary-card strong {
          margin: 5px 0;
          font-size: 20px;
        }

        .sg-summary-card small {
          margin-top: auto;
          color: #94a3b8;
          line-height: 1.35;
        }

        .sg-insights {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 10px;
          margin-bottom: 18px;
        }

        .sg-insights article {
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #f8fafc;
        }

        .sg-insights span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .8px;
        }

        .sg-insights h3 {
          margin: 6px 0;
        }

        .sg-insights p {
          margin: 0;
          color: #64748b;
          font-size: 10px;
          line-height: 1.5;
        }

        .sg-controls {
          display: grid;
          grid-template-columns:
            minmax(250px,1fr)
            180px
            190px
            auto;
          gap: 10px;
          align-items: end;
          margin-bottom: 12px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
        }

        .sg-controls label > span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .sg-controls input,
        .sg-controls select {
          width: 100%;
          box-sizing: border-box;
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
        }

        .sg-control-actions {
          display: flex;
          gap: 6px;
        }

        .sg-control-actions button {
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          font-weight: 800;
          cursor: pointer;
        }

        .sg-skill-list {
          display: grid;
          gap: 11px;
        }

        .sg-skill-card {
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .sg-skill-summary {
          width: 100%;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 16px;
          border: 0;
          background: #ffffff;
          text-align: left;
          cursor: pointer;
        }

        .sg-skill-title {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .sg-gap-status {
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 50%;
          font-weight: 900;
        }

        .sg-gap-status.none {
          background: #dcfce7;
          color: #166534;
        }

        .sg-gap-status.small {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .sg-gap-status.moderate {
          background: #fef3c7;
          color: #92400e;
        }

        .sg-gap-status.high {
          background: #ffedd5;
          color: #c2410c;
        }

        .sg-gap-status.critical {
          background: #fee2e2;
          color: #991b1b;
        }

        .sg-skill-title span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .sg-skill-title h3 {
          margin: 3px 0;
          font-size: 18px;
        }

        .sg-skill-title small {
          color: #94a3b8;
        }

        .sg-summary-values {
          display: grid;
          grid-template-columns:
            repeat(3,95px)
            auto
            28px;
          gap: 8px;
          align-items: center;
        }

        .sg-summary-values > div:not(.sg-priority-badge) {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }

        .sg-summary-values span {
          color: #94a3b8;
          font-size: 7px;
          text-transform: uppercase;
        }

        .sg-summary-values strong {
          margin-top: 2px;
          font-size: 13px;
        }

        .sg-summary-values > b {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #475569;
        }

        .sg-priority-badge {
          display: flex;
          align-items: baseline;
          gap: 2px;
          padding: 7px 9px;
          border-radius: 8px;
        }

        .sg-priority-badge small {
          margin-right: 3px;
          font-size: 6px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .sg-priority-badge strong {
          font-size: 15px;
        }

        .sg-priority-badge span {
          font-size: 7px;
        }

        .sg-priority-badge.low {
          background: #f1f5f9;
          color: #475569;
        }

        .sg-priority-badge.medium {
          background: #fef3c7;
          color: #92400e;
        }

        .sg-priority-badge.high {
          background: #ffedd5;
          color: #c2410c;
        }

        .sg-priority-badge.critical {
          background: #fee2e2;
          color: #991b1b;
        }

        .sg-bar-stack {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 10px;
          padding: 0 16px 16px;
        }

        .sg-bar-head {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          color: #64748b;
          font-size: 8px;
        }

        .sg-bar-head strong {
          color: #0f172a;
        }

        .sg-score-track,
        .sg-gap-track {
          height: 6px;
          margin-top: 5px;
          overflow: hidden;
          border-radius: 999px;
          background: #e2e8f0;
        }

        .sg-score-fill,
        .sg-gap-fill {
          height: 100%;
          border-radius: 999px;
        }

        .sg-gap-fill.none {
          background: #16a34a;
        }

        .sg-gap-fill.small {
          background: #2563eb;
        }

        .sg-gap-fill.moderate {
          background: #ca8a04;
        }

        .sg-gap-fill.high {
          background: #ea580c;
        }

        .sg-gap-fill.critical {
          background: #dc2626;
        }

        .sg-skill-details {
          padding: 17px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .sg-detail-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
        }

        .sg-detail-grid article,
        .sg-evidence-grid article {
          display: flex;
          flex-direction: column;
          padding: 11px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
        }

        .sg-detail-grid span,
        .sg-evidence-grid span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .sg-detail-grid strong,
        .sg-evidence-grid strong {
          margin: 4px 0;
          font-size: 14px;
        }

        .sg-detail-grid small {
          color: #94a3b8;
          line-height: 1.3;
        }

        .sg-evidence-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
          margin-top: 9px;
        }

        .sg-recommendation {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          margin-top: 10px;
          padding: 13px;
          border: 1px solid #bfdbfe;
          border-radius: 10px;
          background: #eff6ff;
        }

        .sg-recommendation span {
          color: #1d4ed8;
          font-size: 7px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .sg-recommendation h4 {
          margin: 4px 0;
        }

        .sg-recommendation p {
          max-width: 830px;
          margin: 0;
          color: #475569;
          font-size: 10px;
          line-height: 1.5;
        }

        .sg-recommendation button {
          padding: 9px 11px;
          border: 0;
          border-radius: 8px;
          background: #2563eb;
          color: #ffffff;
          font-weight: 850;
          white-space: nowrap;
          cursor: pointer;
        }

        .sg-empty {
          padding: 35px;
          border: 1px dashed #cbd5e1;
          border-radius: 13px;
          text-align: center;
          background: #ffffff;
        }

        .sg-empty > div {
          font-size: 36px;
        }

        .sg-empty button {
          padding: 9px 12px;
          border: 0;
          border-radius: 8px;
          background: #111827;
          color: #ffffff;
          font-weight: 850;
          cursor: pointer;
        }

        .sg-roadmap-panel {
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

        .sg-roadmap-panel h2 {
          margin: 6px 0;
        }

        .sg-roadmap-panel p {
          max-width: 820px;
          margin: 0;
          color: #94a3b8;
          line-height: 1.55;
        }

        .sg-roadmap-actions {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .sg-roadmap-actions button {
          padding: 10px 12px;
          border: 1px solid #334155;
          border-radius: 8px;
          background: #111827;
          color: #cbd5e1;
          font-weight: 850;
          cursor: pointer;
        }

        .sg-roadmap-actions button.primary {
          border-color: #dc2626;
          background: #dc2626;
          color: #ffffff;
        }

        .sg-methodology-note {
          margin-top: 14px;
          padding: 14px;
          border: 1px solid #fde68a;
          border-radius: 11px;
          background: #fffbeb;
        }

        .sg-methodology-note strong {
          color: #92400e;
          font-size: 9px;
          text-transform: uppercase;
        }

        .sg-methodology-note p {
          margin: 5px 0 0;
          color: #92400e;
          font-size: 9px;
          line-height: 1.5;
        }

        .sg-footer {
          padding: 16px 2px 0;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.5;
        }

        .sg-state {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 30px;
          text-align: center;
          color: #0f172a;
        }

        .sg-state > div {
          font-size: 42px;
        }

        .sg-state p {
          max-width: 620px;
          color: #64748b;
        }

        .sg-state button {
          padding: 10px 14px;
          border: 0;
          border-radius: 8px;
          background: #dc2626;
          color: #ffffff;
          font-weight: 900;
          cursor: pointer;
        }

        @media(max-width: 1100px) {
          .sg-summary-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }

          .sg-controls {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .sg-detail-grid,
          .sg-evidence-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }
        }

        @media(max-width: 820px) {
          .sg-page {
            padding: 14px;
          }

          .sg-hero {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          .sg-summary-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .sg-insights {
            grid-template-columns: 1fr;
          }

          .sg-skill-summary {
            flex-direction: column;
          }

          .sg-summary-values {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
            width: 100%;
          }

          .sg-summary-values > div:not(.sg-priority-badge) {
            align-items: flex-start;
          }

          .sg-summary-values > b {
            display: none;
          }

          .sg-bar-stack {
            grid-template-columns: 1fr;
          }

          .sg-recommendation {
            align-items: stretch;
            flex-direction: column;
          }

          .sg-roadmap-panel {
            align-items: stretch;
            flex-direction: column;
          }

          .sg-roadmap-actions {
            justify-content: flex-start;
          }
        }

        @media(max-width: 520px) {
          .sg-summary-grid,
          .sg-controls,
          .sg-detail-grid,
          .sg-evidence-grid {
            grid-template-columns: 1fr;
          }

          .sg-hero-score {
            align-items: flex-start;
            flex-direction: column;
          }

          .sg-control-actions {
            width: 100%;
          }

          .sg-control-actions button {
            flex: 1;
          }
        }
      `}</style>
    </main>
  );
}
