import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEYS = {
  target: "nextpathTargetCareer",
  targetData: "nextpathTargetCareerData",
  selectedSkills: "nextpathSelectedSkills",
  scores: "nextpathSkillScores",
  report: "nextpathAssessmentReport",
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

function skillPriority(required, demand) {
  const r = clamp(number(required, 7), 0, 10);
  const d = clamp(number(demand, 75), 0, 100);

  return Math.round(
    (
      (r / 10) * 0.65 +
      (d / 100) * 0.35
    ) *
      100
  );
}

function confidenceLabel(value) {
  const v = number(value);

  if (v >= 9) {
    return "Very Confident";
  }

  if (v >= 7) {
    return "Confident";
  }

  if (v >= 5) {
    return "Somewhat Confident";
  }

  if (v >= 3) {
    return "Beginner";
  }

  return "Low Confidence";
}

function confidenceTone(value) {
  const v = number(value);

  if (v >= 8) {
    return "strong";
  }

  if (v >= 5) {
    return "medium";
  }

  return "low";
}

function requirementLabel(score) {
  const s = number(score);

  if (s >= 9) {
    return "Critical";
  }

  if (s >= 8) {
    return "High";
  }

  if (s >= 7) {
    return "Important";
  }

  return "Supporting";
}

function demandLabel(score) {
  const s = number(score);

  if (s >= 90) {
    return "Very High";
  }

  if (s >= 80) {
    return "High";
  }

  if (s >= 70) {
    return "Moderate";
  }

  return "Emerging";
}

function clearAssessmentDownstream() {
  [
    STORAGE_KEYS.scores,
    STORAGE_KEYS.report,
    STORAGE_KEYS.gaps,
    STORAGE_KEYS.roadmap,
    STORAGE_KEYS.roadmapProgress,
    STORAGE_KEYS.verified,
    STORAGE_KEYS.certificates,
    STORAGE_KEYS.reassessmentSkills,
  ].forEach((key) =>
    localStorage.removeItem(key)
  );

  localStorage.setItem(
    STORAGE_KEYS.mode,
    "initial"
  );
}

function ProgressBar({
  value,
  accent = "#dc2626",
}) {
  const safe = clamp(number(value), 0, 100);

  return (
    <div className="rs-progress-track">
      <div
        className="rs-progress-fill"
        style={{
          width: `${safe}%`,
          background: accent,
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
      className="rs-summary-card"
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

function SkillCard({
  skill,
  selected,
  confidence,
  onToggle,
  onConfidence,
  rank,
}) {
  const priority =
    skillPriority(
      skill.required_score,
      skill.demand_score
    );

  const requiredPercent =
    clamp(
      number(
        skill.required_score,
        7
      ) * 10,
      0,
      100
    );

  const demandPercent =
    clamp(
      number(
        skill.demand_score,
        75
      ),
      0,
      100
    );

  return (
    <article
      className={
        selected
          ? "rs-skill-card selected"
          : "rs-skill-card"
      }
    >
      <div className="rs-card-head">
        <div className="rs-rank">
          #{String(rank).padStart(2, "0")}
        </div>

        <button
          className={
            selected
              ? "rs-select-toggle selected"
              : "rs-select-toggle"
          }
          onClick={onToggle}
        >
          {selected
            ? "✓ Selected"
            : "I know this skill"}
        </button>
      </div>

      <div className="rs-title-row">
        <div>
          <h3>{skill.name}</h3>

          <div className="rs-chip-row">
            <span className="requirement-chip">
              {requirementLabel(
                skill.required_score
              )} Requirement
            </span>

            <span className="demand-chip">
              {demandLabel(
                skill.demand_score
              )} Demand
            </span>
          </div>
        </div>

        <div className="rs-priority-score">
          <small>
            Priority
          </small>

          <strong>
            {priority}
          </strong>

          <span>/100</span>
        </div>
      </div>

      <div className="rs-skill-metrics">
        <div>
          <div className="rs-metric-head">
            <span>
              Career Requirement
            </span>

            <strong>
              {number(
                skill.required_score,
                7
              ).toFixed(1)}
              /10
            </strong>
          </div>

          <ProgressBar
            value={
              requiredPercent
            }
            accent="#dc2626"
          />
        </div>

        <div>
          <div className="rs-metric-head">
            <span>
              Skill Demand
            </span>

            <strong>
              {number(
                skill.demand_score,
                75
              ).toFixed(0)}
              /100
            </strong>
          </div>

          <ProgressBar
            value={
              demandPercent
            }
            accent="#16a34a"
          />
        </div>
      </div>

      {selected && (
        <div className="rs-confidence-panel">
          <div className="rs-confidence-head">
            <div>
              <span>
                YOUR CONFIDENCE
              </span>

              <strong>
                {confidenceLabel(
                  confidence
                )}
              </strong>
            </div>

            <div
              className={`rs-confidence-score ${confidenceTone(
                confidence
              )}`}
            >
              {confidence}/10
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={confidence}
            onChange={(event) =>
              onConfidence(
                number(
                  event.target.value,
                  5
                )
              )
            }
          />

          <div className="rs-range-labels">
            <span>
              Beginner
            </span>

            <span>
              Comfortable
            </span>

            <span>
              Expert
            </span>
          </div>

          <div className="rs-confidence-note">
            <strong>
              Important:
            </strong>{" "}
            this is only your self-confidence rating. It does not become your
            demonstrated skill score. The Assessment page will verify the skill
            using quiz, problem solving, practical/code and project evidence.
          </div>
        </div>
      )}

      {!selected && (
        <div className="rs-unselected-note">
          If you do not select this skill, NEXTPATH will treat your current
          demonstrated score as 0 for gap analysis until you later assess it.
        </div>
      )}
    </article>
  );
}

export default function RequiredSkills() {
  const navigate =
    useNavigate();

  const career =
    readJSON(
      STORAGE_KEYS.targetData,
      null
    );

  const savedSelections =
    readJSON(
      STORAGE_KEYS.selectedSkills,
      {}
    );

  const [
    selections,
    setSelections,
  ] =
    useState(
      savedSelections
    );

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    sortMode,
    setSortMode,
  ] =
    useState("priority");

  const [
    showOnlySelected,
    setShowOnlySelected,
  ] =
    useState(false);

  const skills =
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

  const filteredSkills =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      const filtered =
        skills.filter(
          (skill) => {
            const selected =
              selections[
                skill.name
              ] !==
              undefined;

            const searchMatch =
              !query ||
              [
                skill.name,
                requirementLabel(
                  skill.required_score
                ),
                demandLabel(
                  skill.demand_score
                ),
              ]
                .join(" ")
                .toLowerCase()
                .includes(
                  query
                );

            const selectionMatch =
              !showOnlySelected ||
              selected;

            return (
              searchMatch &&
              selectionMatch
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
            skillPriority(
              b.required_score,
              b.demand_score
            ) -
            skillPriority(
              a.required_score,
              a.demand_score
            )
        );
      } else if (
        sortMode ===
        "required"
      ) {
        sorted.sort(
          (a, b) =>
            number(
              b.required_score
            ) -
            number(
              a.required_score
            )
        );
      } else if (
        sortMode ===
        "demand"
      ) {
        sorted.sort(
          (a, b) =>
            number(
              b.demand_score
            ) -
            number(
              a.demand_score
            )
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
      skills,
      selections,
      search,
      sortMode,
      showOnlySelected,
    ]);

  const selectedNames =
    Object.keys(
      selections
    );

  const selectedCount =
    selectedNames.length;

  const averageConfidence =
    selectedCount
      ? selectedNames.reduce(
          (sum, skill) =>
            sum +
            number(
              selections[
                skill
              ],
              5
            ),
          0
        ) /
        selectedCount
      : 0;

  const averageRequirement =
    skills.length
      ? skills.reduce(
          (sum, skill) =>
            sum +
            number(
              skill.required_score,
              7
            ),
          0
        ) /
        skills.length
      : 0;

  const highPriorityCount =
    skills.filter(
      (skill) =>
        skillPriority(
          skill.required_score,
          skill.demand_score
        ) >= 80
    ).length;

  function toggleSkill(
    skillName
  ) {
    setSelections(
      (current) => {
        const next = {
          ...current,
        };

        if (
          next[
            skillName
          ] !==
          undefined
        ) {
          delete next[
            skillName
          ];
        } else {
          next[
            skillName
          ] = 5;
        }

        return next;
      }
    );
  }

  function setConfidence(
    skillName,
    value
  ) {
    setSelections(
      (current) => ({
        ...current,
        [skillName]:
          clamp(
            number(value, 5),
            1,
            10
          ),
      })
    );
  }

  function selectAll() {
    const next =
      {};

    skills.forEach(
      (skill) => {
        next[
          skill.name
        ] =
          selections[
            skill.name
          ] ??
          5;
      }
    );

    setSelections(
      next
    );
  }

  function clearAll() {
    setSelections(
      {}
    );
  }

  function continueToAssessment() {
    if (
      !career
    ) {
      navigate(
        "/target-career"
      );

      return;
    }

    if (
      selectedCount ===
      0
    ) {
      alert(
        "Select at least one skill that you already know before starting the assessment."
      );

      return;
    }

    const previous =
      readJSON(
        STORAGE_KEYS.selectedSkills,
        {}
      );

    const previousKeys =
      Object.keys(
        previous
      ).sort();

    const nextKeys =
      Object.keys(
        selections
      ).sort();

    const changed =
      JSON.stringify(
        previousKeys
      ) !==
        JSON.stringify(
          nextKeys
        ) ||
      nextKeys.some(
        (key) =>
          number(
            previous[
              key
            ]
          ) !==
          number(
            selections[
              key
            ]
          )
      );

    if (
      changed
    ) {
      clearAssessmentDownstream();
    }

    localStorage.setItem(
      STORAGE_KEYS.selectedSkills,
      JSON.stringify(
        selections
      )
    );

    localStorage.setItem(
      STORAGE_KEYS.mode,
      "initial"
    );

    navigate(
      "/assessment"
    );
  }

  if (!career) {
    return (
      <main className="rs-state">
        <div className="rs-state-icon">
          🎯
        </div>

        <h2>
          Choose your target career first
        </h2>

        <p>
          Required skills are generated from the target career profile, so
          NEXTPATH needs a selected career before this step.
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

  if (!skills.length) {
    return (
      <main className="rs-state">
        <div className="rs-state-icon">
          🧩
        </div>

        <h2>
          No required skills found
        </h2>

        <p>
          The selected career does not contain a valid skills array. Return to
          Target Career and select a configured career.
        </p>

        <button
          onClick={() =>
            navigate(
              "/target-career"
            )
          }
        >
          Back to Target Career
        </button>
      </main>
    );
  }

  return (
    <main className="rs-page">
      <section className="rs-hero">
        <div className="rs-hero-copy">
          <span className="rs-kicker">
            REQUIRED SKILLS
          </span>

          <h1>
            Tell NEXTPATH which{" "}
            {career.name} skills you already know.
          </h1>

          <p>
            The target career requires{" "}
            <strong>
              {skills.length}
            </strong>{" "}
            core skills. Select only the skills you have already studied or
            practiced. You will be assessed only on the skills you select.
            Unselected required skills remain visible later in Skill Gap with
            demonstrated score 0 until you assess them.
          </p>

          <div className="rs-career-pill">
            <span>
              Target Career
            </span>

            <strong>
              {career.icon || "🎯"}{" "}
              {career.name}
            </strong>

            <small>
              {career.category || "Career"}
            </small>
          </div>
        </div>

        <div className="rs-hero-summary">
          <SummaryCard
            label="Required Skills"
            value={skills.length}
            note="From target career"
            accent="#dc2626"
          />

          <SummaryCard
            label="Selected Skills"
            value={selectedCount}
            note="Will be assessed"
            accent="#2563eb"
          />

          <SummaryCard
            label="Avg Requirement"
            value={`${averageRequirement.toFixed(
              1
            )}/10`}
            note="Career target level"
            accent="#7c3aed"
          />

          <SummaryCard
            label="High Priority"
            value={highPriorityCount}
            note="Priority score ≥ 80"
            accent="#16a34a"
          />
        </div>
      </section>

      <section className="rs-flow-note">
        <div>
          <strong>
            NEXTPATH FLOW
          </strong>

          <span>
            Target Career
          </span>

          <b>→</b>

          <span className="active">
            Required Skills
          </span>

          <b>→</b>

          <span>
            Assessment
          </span>

          <b>→</b>

          <span>
            Assessment Report
          </span>

          <b>→</b>

          <span>
            Skill Gap
          </span>
        </div>

        <p>
          Confidence helps you describe how comfortable you feel. It does not
          replace assessment evidence.
        </p>
      </section>

      <section className="rs-selection-summary">
        <div>
          <span className="rs-kicker">
            YOUR CURRENT SELECTION
          </span>

          <h2>
            {selectedCount} of {skills.length} skills selected
          </h2>

          <p>
            Average self-confidence:{" "}
            <strong>
              {selectedCount
                ? averageConfidence.toFixed(
                    1
                  )
                : "0.0"}
              /10
            </strong>
          </p>
        </div>

        <div className="rs-selection-actions">
          <button
            onClick={selectAll}
          >
            Select All
          </button>

          <button
            onClick={clearAll}
          >
            Clear All
          </button>
        </div>
      </section>

      <section className="rs-controls">
        <label className="rs-search">
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
        </label>

        <label className="rs-sort">
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
              Career Priority
            </option>

            <option value="required">
              Required Score
            </option>

            <option value="demand">
              Skill Demand
            </option>

            <option value="name">
              Skill Name
            </option>
          </select>
        </label>

        <label className="rs-only-selected">
          <input
            type="checkbox"
            checked={
              showOnlySelected
            }
            onChange={(event) =>
              setShowOnlySelected(
                event.target.checked
              )
            }
          />

          <span>
            Show only selected
          </span>
        </label>
      </section>

      <section className="rs-skill-grid">
        {filteredSkills.map(
          (
            skill,
            index
          ) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              selected={
                selections[
                  skill.name
                ] !==
                undefined
              }
              confidence={
                selections[
                  skill.name
                ] ??
                5
              }
              onToggle={() =>
                toggleSkill(
                  skill.name
                )
              }
              onConfidence={(
                value
              ) =>
                setConfidence(
                  skill.name,
                  value
                )
              }
              rank={
                index + 1
              }
            />
          )
        )}
      </section>

      {!filteredSkills.length && (
        <section className="rs-empty">
          <div>
            🔍
          </div>

          <h2>
            No skills match your filter
          </h2>

          <p>
            Reset the search or turn off "Show only selected".
          </p>

          <button
            onClick={() => {
              setSearch("");
              setShowOnlySelected(
                false
              );
            }}
          >
            Reset Filters
          </button>
        </section>
      )}

      <section className="rs-assessment-preview">
        <div>
          <span className="rs-kicker">
            WHAT HAPPENS IN ASSESSMENT
          </span>

          <h2>
            Every selected skill gets four evidence checks.
          </h2>

          <p>
            Your confidence score is not used as the final demonstrated score.
            The next page evaluates actual evidence.
          </p>
        </div>

        <div className="rs-assessment-grid">
          <article>
            <span>
              01
            </span>

            <strong>
              Quiz
            </strong>

            <small>
              Objective knowledge
            </small>
          </article>

          <article>
            <span>
              02
            </span>

            <strong>
              Problem Solving
            </strong>

            <small>
              Reasoning and validation
            </small>
          </article>

          <article>
            <span>
              03
            </span>

            <strong>
              Code / Practical
            </strong>

            <small>
              Implementation evidence
            </small>
          </article>

          <article>
            <span>
              04
            </span>

            <strong>
              Project
            </strong>

            <small>
              Applied portfolio evidence
            </small>
          </article>
        </div>
      </section>

      <section className="rs-bottom-bar">
        <div>
          <span>
            Selected for assessment
          </span>

          <strong>
            {selectedCount}
            /
            {skills.length}
          </strong>

          <small>
            {selectedCount === 0
              ? "Choose at least one skill."
              : `${selectedCount} skill${
                  selectedCount === 1
                    ? ""
                    : "s"
                } will be assessed.`}
          </small>
        </div>

        <button
          className="rs-continue"
          disabled={
            selectedCount === 0
          }
          onClick={
            continueToAssessment
          }
        >
          Start Assessment →
        </button>
      </section>

      <footer className="rs-footer">
        The skill requirement and demand values come from the selected
        TargetCareer profile. Any fallback market-demand values used by the
        Target Career page are hackathon prototype estimates unless your backend
        provides validated market data.
      </footer>

      <style>{`
        .rs-page {
          max-width: 1320px;
          margin: 0 auto;
          padding: 24px;
          color: #0f172a;
        }

        .rs-kicker {
          display: inline-block;
          color: #dc2626;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.35px;
        }

        .rs-hero {
          display: grid;
          grid-template-columns:
            minmax(0,1.3fr)
            minmax(340px,.7fr);
          gap: 24px;
          padding: 34px;
          border: 1px solid #e2e8f0;
          border-radius: 27px;
          background:
            radial-gradient(
              circle at top right,
              rgba(220,38,38,.10),
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

        .rs-hero h1 {
          max-width: 900px;
          margin: 10px 0 14px;
          font-size:
            clamp(
              38px,
              4vw,
              56px
            );
          line-height: 1.04;
          letter-spacing: -1.4px;
        }

        .rs-hero p {
          max-width: 850px;
          margin: 0;
          color: #64748b;
          line-height: 1.7;
        }

        .rs-career-pill {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          flex-wrap: wrap;
          margin-top: 18px;
          padding: 9px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          background: #ffffff;
        }

        .rs-career-pill span {
          color: #94a3b8;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rs-career-pill strong {
          color: #111827;
        }

        .rs-career-pill small {
          color: #64748b;
        }

        .rs-hero-summary {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 10px;
          align-content: start;
        }

        .rs-summary-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 104px;
          padding: 15px;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .rs-summary-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background:
            var(--summary-accent);
        }

        .rs-summary-card span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rs-summary-card strong {
          margin: 6px 0;
          font-size: 23px;
        }

        .rs-summary-card small {
          margin-top: auto;
          color: #94a3b8;
          line-height: 1.35;
        }

        .rs-flow-note {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          margin: 17px 0;
          padding: 14px 16px;
          border: 1px solid #bfdbfe;
          border-radius: 13px;
          background: #eff6ff;
        }

        .rs-flow-note > div {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .rs-flow-note strong {
          color: #1d4ed8;
          font-size: 8px;
          letter-spacing: .7px;
        }

        .rs-flow-note span {
          padding: 5px 8px;
          border-radius: 999px;
          background: #ffffff;
          color: #475569;
          font-size: 9px;
          font-weight: 800;
        }

        .rs-flow-note span.active {
          background: #2563eb;
          color: #ffffff;
        }

        .rs-flow-note b {
          color: #60a5fa;
        }

        .rs-flow-note p {
          max-width: 340px;
          margin: 0;
          color: #475569;
          font-size: 9px;
          line-height: 1.45;
        }

        .rs-selection-summary {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          margin-bottom: 14px;
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .rs-selection-summary h2 {
          margin: 5px 0;
        }

        .rs-selection-summary p {
          margin: 0;
          color: #64748b;
        }

        .rs-selection-actions {
          display: flex;
          gap: 7px;
        }

        .rs-selection-actions button {
          padding: 9px 11px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          font-weight: 800;
          cursor: pointer;
        }

        .rs-controls {
          display: grid;
          grid-template-columns:
            minmax(260px,1fr)
            220px
            auto;
          gap: 10px;
          align-items: end;
          margin-bottom: 14px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
        }

        .rs-search > span,
        .rs-sort > span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rs-search input,
        .rs-sort select {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 11px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
        }

        .rs-only-selected {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          cursor: pointer;
        }

        .rs-only-selected span {
          color: #334155;
          font-size: 10px;
          font-weight: 800;
        }

        .rs-skill-grid {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 13px;
        }

        .rs-skill-card {
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: #ffffff;
          box-shadow:
            0 8px 24px
            rgba(15,23,42,.035);
          transition:
            transform .15s ease,
            border-color .15s ease,
            box-shadow .15s ease;
        }

        .rs-skill-card:hover {
          transform: translateY(-1px);
          box-shadow:
            0 14px 32px
            rgba(15,23,42,.06);
        }

        .rs-skill-card.selected {
          border: 2px solid #2563eb;
          box-shadow:
            0 14px 36px
            rgba(37,99,235,.09);
        }

        .rs-card-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
        }

        .rs-rank {
          color: #94a3b8;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .rs-select-toggle {
          padding: 7px 9px;
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          background: #ffffff;
          color: #475569;
          font-size: 9px;
          font-weight: 900;
          cursor: pointer;
        }

        .rs-select-toggle.selected {
          border-color: #bfdbfe;
          background: #eff6ff;
          color: #1d4ed8;
        }

        .rs-title-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
          margin-top: 12px;
        }

        .rs-title-row h3 {
          margin: 0;
          font-size: 21px;
        }

        .rs-chip-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 7px;
        }

        .rs-chip-row span {
          padding: 4px 7px;
          border-radius: 999px;
          font-size: 8px;
          font-weight: 850;
        }

        .requirement-chip {
          background: #fee2e2;
          color: #991b1b;
        }

        .demand-chip {
          background: #dcfce7;
          color: #166534;
        }

        .rs-priority-score {
          display: flex;
          align-items: baseline;
          gap: 2px;
          padding: 9px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
        }

        .rs-priority-score small {
          margin-right: 4px;
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rs-priority-score strong {
          font-size: 20px;
        }

        .rs-priority-score span {
          color: #94a3b8;
          font-size: 8px;
        }

        .rs-skill-metrics {
          display: grid;
          gap: 9px;
          margin-top: 14px;
        }

        .rs-metric-head {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          color: #64748b;
          font-size: 9px;
        }

        .rs-metric-head strong {
          color: #0f172a;
        }

        .rs-progress-track {
          height: 6px;
          margin-top: 5px;
          overflow: hidden;
          border-radius: 999px;
          background: #e2e8f0;
        }

        .rs-progress-fill {
          height: 100%;
          border-radius: 999px;
        }

        .rs-confidence-panel {
          margin-top: 15px;
          padding: 13px;
          border: 1px solid #bfdbfe;
          border-radius: 11px;
          background: #eff6ff;
        }

        .rs-confidence-head {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
        }

        .rs-confidence-head > div:first-child {
          display: flex;
          flex-direction: column;
        }

        .rs-confidence-head span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .rs-confidence-head strong {
          margin-top: 3px;
          font-size: 13px;
        }

        .rs-confidence-score {
          padding: 6px 9px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 900;
        }

        .rs-confidence-score.strong {
          background: #dcfce7;
          color: #166534;
        }

        .rs-confidence-score.medium {
          background: #fef3c7;
          color: #92400e;
        }

        .rs-confidence-score.low {
          background: #fee2e2;
          color: #991b1b;
        }

        .rs-confidence-panel input[type="range"] {
          width: 100%;
          margin-top: 11px;
          accent-color: #2563eb;
        }

        .rs-range-labels {
          display: flex;
          justify-content: space-between;
          color: #94a3b8;
          font-size: 7px;
        }

        .rs-confidence-note {
          margin-top: 9px;
          padding: 9px;
          border-radius: 8px;
          background: #ffffff;
          color: #475569;
          font-size: 8px;
          line-height: 1.45;
        }

        .rs-unselected-note {
          margin-top: 14px;
          padding: 10px;
          border-radius: 9px;
          background: #f8fafc;
          color: #64748b;
          font-size: 8px;
          line-height: 1.45;
        }

        .rs-empty {
          margin-top: 14px;
          padding: 38px;
          border: 1px dashed #cbd5e1;
          border-radius: 14px;
          text-align: center;
          background: #ffffff;
        }

        .rs-empty > div {
          font-size: 36px;
        }

        .rs-empty p {
          color: #64748b;
        }

        .rs-empty button {
          padding: 9px 12px;
          border: 0;
          border-radius: 8px;
          background: #111827;
          color: #ffffff;
          font-weight: 850;
          cursor: pointer;
        }

        .rs-assessment-preview {
          display: grid;
          grid-template-columns:
            minmax(0,.8fr)
            minmax(550px,1.2fr);
          gap: 18px;
          margin-top: 18px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: #f8fafc;
        }

        .rs-assessment-preview h2 {
          margin: 6px 0;
        }

        .rs-assessment-preview p {
          margin: 0;
          color: #64748b;
          line-height: 1.55;
        }

        .rs-assessment-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
        }

        .rs-assessment-grid article {
          display: flex;
          flex-direction: column;
          padding: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #ffffff;
        }

        .rs-assessment-grid span {
          color: #dc2626;
          font-size: 8px;
          font-weight: 900;
        }

        .rs-assessment-grid strong {
          margin: 4px 0;
          font-size: 11px;
        }

        .rs-assessment-grid small {
          color: #94a3b8;
          line-height: 1.35;
        }

        .rs-bottom-bar {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
          margin-top: 18px;
          padding: 20px;
          border-radius: 15px;
          background:
            linear-gradient(
              135deg,
              #111827,
              #0f172a
            );
          color: #ffffff;
        }

        .rs-bottom-bar > div {
          display: flex;
          flex-direction: column;
        }

        .rs-bottom-bar span {
          color: #94a3b8;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .rs-bottom-bar strong {
          margin: 3px 0;
          font-size: 23px;
        }

        .rs-bottom-bar small {
          color: #64748b;
        }

        .rs-continue {
          padding: 13px 18px;
          border: 0;
          border-radius: 9px;
          background: #dc2626;
          color: #ffffff;
          font-weight: 900;
          cursor: pointer;
        }

        .rs-continue:disabled {
          opacity: .45;
          cursor: not-allowed;
        }

        .rs-footer {
          padding: 16px 2px 0;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.5;
        }

        .rs-state {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 30px;
          text-align: center;
          color: #0f172a;
        }

        .rs-state-icon {
          font-size: 42px;
        }

        .rs-state p {
          max-width: 640px;
          color: #64748b;
          line-height: 1.55;
        }

        .rs-state button {
          padding: 10px 14px;
          border: 0;
          border-radius: 8px;
          background: #dc2626;
          color: #ffffff;
          font-weight: 900;
          cursor: pointer;
        }

        @media(max-width: 1080px) {
          .rs-hero {
            grid-template-columns: 1fr;
          }

          .rs-assessment-preview {
            grid-template-columns: 1fr;
          }

          .rs-controls {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }
        }

        @media(max-width: 800px) {
          .rs-page {
            padding: 14px;
          }

          .rs-hero {
            padding: 24px;
          }

          .rs-flow-note,
          .rs-selection-summary,
          .rs-bottom-bar {
            align-items: stretch;
            flex-direction: column;
          }

          .rs-flow-note p {
            max-width: none;
          }

          .rs-skill-grid {
            grid-template-columns: 1fr;
          }

          .rs-assessment-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .rs-controls {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width: 520px) {
          .rs-hero-summary {
            grid-template-columns: 1fr;
          }

          .rs-selection-actions {
            flex-direction: column;
          }

          .rs-assessment-grid {
            grid-template-columns: 1fr;
          }

          .rs-title-row {
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}
