import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEYS = {
  target: "nextpathTargetCareer",
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
  });
}

function skillProgress(item, progress) {
  const topics =
    Array.isArray(item?.topics)
      ? item.topics
      : [];

  if (!topics.length) {
    return {
      completed: 0,
      total: 0,
      percentage: 0,
    };
  }

  const completed =
    topics.filter(
      (topic) =>
        Boolean(
          progress[
            topic.id
          ]
        )
    ).length;

  return {
    completed,
    total: topics.length,
    percentage:
      (
        completed /
        topics.length
      ) *
      100,
  };
}

function currentGap(item, scores) {
  const demonstrated =
    scores[
      item.skill
    ] !== undefined
      ? number(
          scores[
            item.skill
          ]
        )
      : number(
          item.demonstratedScore
        );

  const required =
    number(
      item.requiredScore,
      7
    );

  const gap =
    Math.max(
      0,
      required -
        demonstrated
    );

  return {
    demonstrated,
    required,
    gap,
    gapPercentage:
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
        : 0,
  };
}

function statusFor({
  progressPercentage,
  gapPercentage,
  verified,
}) {
  if (verified) {
    return {
      label: "Verified",
      tone: "verified",
      action: "Maintain Skill",
    };
  }

  if (progressPercentage >= 100) {
    return {
      label: "Ready to Re-Assess",
      tone: "ready",
      action: "Re-Assess Now",
    };
  }

  if (progressPercentage > 0) {
    return {
      label: "Learning in Progress",
      tone: "progress",
      action: "Continue Learning",
    };
  }

  if (gapPercentage <= 0) {
    return {
      label: "Target Met",
      tone: "met",
      action: "Practice More",
    };
  }

  return {
    label: "Not Started",
    tone: "not-started",
    action: "Start Roadmap",
  };
}

function SummaryCard({
  label,
  value,
  note,
  accent = "#dc2626",
}) {
  return (
    <article
      className="pg-summary-card"
      style={{
        "--summary-accent":
          accent,
      }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function ProgressRing({
  value,
  label,
  accent = "#16a34a",
}) {
  const safe =
    clamp(
      number(value),
      0,
      100
    );

  return (
    <div
      className="pg-ring"
      style={{
        background:
          `conic-gradient(${accent} ${safe * 3.6}deg,#e2e8f0 0deg)`,
      }}
    >
      <div>
        <strong>
          {safe.toFixed(0)}%
        </strong>

        <small>
          {label}
        </small>
      </div>
    </div>
  );
}

function TopicChecklist({
  item,
  progress,
  onTopicToggle,
}) {
  const topics =
    Array.isArray(
      item.topics
    )
      ? item.topics
      : [];

  return (
    <div className="pg-topic-list">
      {topics.map(
        (
          topic,
          index
        ) => {
          const checked =
            Boolean(
              progress[
                topic.id
              ]
            );

          return (
            <label
              key={
                topic.id
              }
              className={
                checked
                  ? "completed"
                  : ""
              }
            >
              <input
                type="checkbox"
                checked={
                  checked
                }
                onChange={() =>
                  onTopicToggle(
                    topic.id
                  )
                }
              />

              <div className="pg-topic-index">
                {String(
                  index + 1
                ).padStart(
                  2,
                  "0"
                )}
              </div>

              <div className="pg-topic-copy">
                <strong>
                  {topic.title}
                </strong>

                <small>
                  Estimated{" "}
                  {number(
                    topic.estimatedHours,
                    1
                  )}
                  h
                </small>
              </div>
            </label>
          );
        }
      )}
    </div>
  );
}

function SkillProgressCard({
  item,
  progress,
  scoreInfo,
  verifiedScore,
  expanded,
  onToggle,
  onTopicToggle,
  onReassess,
  onContinueRoadmap,
}) {
  const progressInfo =
    skillProgress(
      item,
      progress
    );

  const verified =
    verifiedScore !==
    undefined;

  const status =
    statusFor({
      progressPercentage:
        progressInfo.percentage,
      gapPercentage:
        scoreInfo.gapPercentage,
      verified,
    });

  const ready =
    progressInfo.percentage >=
      100 &&
    !verified;

  return (
    <article className="pg-skill-card">
      <button
        className="pg-skill-summary"
        onClick={onToggle}
      >
        <div className="pg-status-wrap">
          <div
            className={`pg-status-dot ${status.tone}`}
          >
            {verified
              ? "✓"
              : ready
              ? "↻"
              : progressInfo.percentage >
                0
              ? "→"
              : "•"}
          </div>

          <div>
            <span>
              {status.label}
            </span>

            <h3>
              {item.skill}
            </h3>

            <small>
              Week {item.startWeek}
              {item.endWeek >
              item.startWeek
                ? `–${item.endWeek}`
                : ""}{" "}
              · {item.estimatedHours}h planned
            </small>
          </div>
        </div>

        <div className="pg-skill-summary-grid">
          <div>
            <span>
              Roadmap
            </span>

            <strong>
              {progressInfo.percentage.toFixed(
                0
              )}
              %
            </strong>
          </div>

          <div>
            <span>
              Current
            </span>

            <strong>
              {scoreInfo.demonstrated.toFixed(
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
              {scoreInfo.required.toFixed(
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
              {scoreInfo.gapPercentage.toFixed(
                0
              )}
              %
            </strong>
          </div>

          <b>
            {expanded
              ? "−"
              : "+"}
          </b>
        </div>
      </button>

      <div className="pg-card-progress">
        <div
          style={{
            width:
              `${progressInfo.percentage}%`,
          }}
        />
      </div>

      {expanded && (
        <div className="pg-skill-details">
          <section className="pg-detail-grid">
            <article>
              <span>
                Topics Completed
              </span>

              <strong>
                {progressInfo.completed}/
                {progressInfo.total}
              </strong>

              <small>
                {progressInfo.percentage.toFixed(
                  0
                )}
                % complete
              </small>
            </article>

            <article>
              <span>
                Current Score
              </span>

              <strong>
                {scoreInfo.demonstrated.toFixed(
                  1
                )}
                /10
              </strong>

              <small>
                Demonstrated assessment score
              </small>
            </article>

            <article>
              <span>
                Career Requirement
              </span>

              <strong>
                {scoreInfo.required.toFixed(
                  1
                )}
                /10
              </strong>

              <small>
                Required for target career
              </small>
            </article>

            <article>
              <span>
                Verification
              </span>

              <strong>
                {verified
                  ? "Verified"
                  : ready
                  ? "Ready"
                  : "Pending"}
              </strong>

              <small>
                {verified
                  ? `Verified at ${number(
                      verifiedScore
                    ).toFixed(
                      1
                    )}/10`
                  : "Pass re-assessment to verify"}
              </small>
            </article>
          </section>

          <section className="pg-learning-section">
            <div className="pg-section-head">
              <div>
                <span>
                  ROADMAP TOPICS
                </span>

                <h4>
                  Complete every topic before re-assessment
                </h4>
              </div>

              <strong>
                {progressInfo.completed}/
                {progressInfo.total}
              </strong>
            </div>

            <TopicChecklist
              item={item}
              progress={
                progress
              }
              onTopicToggle={
                onTopicToggle
              }
            />
          </section>

          <section
            className={
              verified
                ? "pg-gate verified"
                : ready
                ? "pg-gate ready"
                : "pg-gate"
            }
          >
            <div>
              <span>
                RE-ASSESSMENT GATE
              </span>

              <h4>
                {verified
                  ? "This skill is verified."
                  : ready
                  ? "You are ready for a new assessment."
                  : "Finish the roadmap before re-assessment."}
              </h4>

              <p>
                {verified
                  ? "Your verified score meets or exceeds the configured target-career requirement. Keep practicing to maintain the skill."
                  : ready
                  ? `Re-assessment will use a different question set. You need at least ${scoreInfo.required.toFixed(
                      1
                    )}/10 to pass and verify this skill.`
                  : `Complete ${
                      progressInfo.total -
                      progressInfo.completed
                    } remaining topic${
                      progressInfo.total -
                        progressInfo.completed ===
                      1
                        ? ""
                        : "s"
                    } first.`}
              </p>
            </div>

            <div className="pg-gate-actions">
              {!verified &&
                ready && (
                  <button
                    className="primary"
                    onClick={
                      onReassess
                    }
                  >
                    Start Re-Assessment →
                  </button>
                )}

              {!verified &&
                !ready && (
                  <button
                    onClick={
                      onContinueRoadmap
                    }
                  >
                    Continue Roadmap
                  </button>
                )}
            </div>
          </section>
        </div>
      )}
    </article>
  );
}

export default function Progress() {
  const navigate =
    useNavigate();

  const career =
    readJSON(
      STORAGE_KEYS.targetData,
      null
    );

  const plan =
    readJSON(
      STORAGE_KEYS.roadmapPlan,
      []
    );

  const preferences =
    readJSON(
      STORAGE_KEYS.roadmapPreferences,
      {}
    );

  const savedProgress =
    readJSON(
      STORAGE_KEYS.roadmapProgress,
      {}
    );

  const scores =
    readJSON(
      STORAGE_KEYS.scores,
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

  const [
    progress,
    setProgress,
  ] =
    useState(
      savedProgress &&
      typeof savedProgress ===
        "object"
        ? savedProgress
        : {}
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
    useState("roadmap");

  const [
    expanded,
    setExpanded,
  ] =
    useState({});

  const prepared =
    useMemo(() => {
      const items =
        Array.isArray(
          plan
        )
          ? plan.map(
              (item) => {
                const progressInfo =
                  skillProgress(
                    item,
                    progress
                  );

                const scoreInfo =
                  currentGap(
                    item,
                    scores
                  );

                const isVerified =
                  verified[
                    item.skill
                  ] !==
                  undefined;

                const status =
                  statusFor({
                    progressPercentage:
                      progressInfo.percentage,
                    gapPercentage:
                      scoreInfo.gapPercentage,
                    verified:
                      isVerified,
                  });

                return {
                  item,
                  progressInfo,
                  scoreInfo,
                  isVerified,
                  status,
                };
              }
            )
          : [];

      const query =
        search
          .trim()
          .toLowerCase();

      const filtered =
        items.filter(
          (entry) => {
            const matchSearch =
              !query ||
              entry.item.skill
                .toLowerCase()
                .includes(
                  query
                );

            let matchFilter =
              true;

            if (
              filter ===
              "Not Started"
            ) {
              matchFilter =
                entry.progressInfo
                  .percentage ===
                0;
            } else if (
              filter ===
              "In Progress"
            ) {
              matchFilter =
                entry.progressInfo
                  .percentage >
                  0 &&
                entry.progressInfo
                  .percentage <
                  100;
            } else if (
              filter ===
              "Ready to Re-Assess"
            ) {
              matchFilter =
                entry.progressInfo
                  .percentage >=
                  100 &&
                !entry.isVerified;
            } else if (
              filter ===
              "Verified"
            ) {
              matchFilter =
                entry.isVerified;
            }

            return (
              matchSearch &&
              matchFilter
            );
          }
        );

      const sorted =
        [...filtered];

      if (
        sortMode ===
        "progress"
      ) {
        sorted.sort(
          (a, b) =>
            b.progressInfo
              .percentage -
            a.progressInfo
              .percentage
        );
      } else if (
        sortMode ===
        "gap"
      ) {
        sorted.sort(
          (a, b) =>
            b.scoreInfo
              .gapPercentage -
            a.scoreInfo
              .gapPercentage
        );
      } else if (
        sortMode ===
        "priority"
      ) {
        sorted.sort(
          (a, b) =>
            number(
              b.item.priority
            ) -
            number(
              a.item.priority
            )
        );
      } else {
        sorted.sort(
          (a, b) =>
            number(
              a.item.rank,
              999
            ) -
            number(
              b.item.rank,
              999
            )
        );
      }

      return sorted;
    }, [
      plan,
      progress,
      scores,
      verified,
      search,
      filter,
      sortMode,
    ]);

  if (!career) {
    return (
      <main className="pg-state">
        <div>
          🎯
        </div>

        <h2>
          No target career found
        </h2>

        <p>
          Choose a target career before tracking progress.
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
    !Array.isArray(
      plan
    ) ||
    !plan.length
  ) {
    return (
      <main className="pg-state">
        <div>
          📈
        </div>

        <h2>
          No roadmap found
        </h2>

        <p>
          Generate your personalized roadmap first. Progress and re-assessment
          readiness are calculated from the roadmap topics.
        </p>

        <button
          onClick={() =>
            navigate(
              "/roadmap"
            )
          }
        >
          Open Roadmap
        </button>
      </main>
    );
  }

  const allPrepared =
    Array.isArray(
      plan
    )
      ? plan.map(
          (item) => {
            const progressInfo =
              skillProgress(
                item,
                progress
              );

            const scoreInfo =
              currentGap(
                item,
                scores
              );

            const isVerified =
              verified[
                item.skill
              ] !==
              undefined;

            return {
              item,
              progressInfo,
              scoreInfo,
              isVerified,
            };
          }
        )
      : [];

  const totalTopics =
    allPrepared.reduce(
      (
        sum,
        entry
      ) =>
        sum +
        entry.progressInfo
          .total,
      0
    );

  const completedTopics =
    allPrepared.reduce(
      (
        sum,
        entry
      ) =>
        sum +
        entry.progressInfo
          .completed,
      0
    );

  const overallProgress =
    totalTopics
      ? (
          completedTopics /
          totalTopics
        ) *
        100
      : 0;

  const readySkills =
    allPrepared.filter(
      (entry) =>
        entry.progressInfo
          .percentage >=
          100 &&
        !entry.isVerified
    );

  const verifiedSkills =
    allPrepared.filter(
      (entry) =>
        entry.isVerified
    );

  const inProgress =
    allPrepared.filter(
      (entry) =>
        entry.progressInfo
          .percentage >
          0 &&
        entry.progressInfo
          .percentage <
          100
    );

  const averageGap =
    allPrepared.length
      ? allPrepared.reduce(
          (
            sum,
            entry
          ) =>
            sum +
            entry.scoreInfo
              .gapPercentage,
          0
        ) /
        allPrepared.length
      : 0;

  const readiness =
    allPrepared.length
      ? allPrepared.reduce(
          (
            sum,
            entry
          ) => {
            const ratio =
              entry.scoreInfo
                .required >
              0
                ? clamp(
                    entry.scoreInfo
                      .demonstrated /
                      entry.scoreInfo
                        .required,
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
        allPrepared.length
      : 0;

  function toggleTopic(
    topicId
  ) {
    setProgress(
      (current) => {
        const next = {
          ...current,
          [topicId]:
            !current[
              topicId
            ],
        };

        localStorage.setItem(
          STORAGE_KEYS.roadmapProgress,
          JSON.stringify(
            next
          )
        );

        return next;
      }
    );
  }

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

  function startReassessment(
    skill
  ) {
    localStorage.setItem(
      STORAGE_KEYS.mode,
      "reassessment"
    );

    localStorage.setItem(
      STORAGE_KEYS.reassessmentSkills,
      JSON.stringify([
        skill,
      ])
    );

    navigate(
      "/assessment"
    );
  }

  function reassessAllReady() {
    const skills =
      readySkills.map(
        (entry) =>
          entry.item.skill
      );

    if (!skills.length) {
      alert(
        "No skills are ready for re-assessment yet. Complete all roadmap topics for at least one skill."
      );

      return;
    }

    localStorage.setItem(
      STORAGE_KEYS.mode,
      "reassessment"
    );

    localStorage.setItem(
      STORAGE_KEYS.reassessmentSkills,
      JSON.stringify(
        skills
      )
    );

    navigate(
      "/assessment"
    );
  }

  function expandAll() {
    setExpanded(
      Object.fromEntries(
        allPrepared.map(
          (entry) => [
            entry.item.skill,
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

  const lastCertificate =
    certificates.length
      ? certificates[
          certificates.length -
            1
        ]
      : null;

  return (
    <main className="pg-page">
      <section className="pg-hero">
        <div className="pg-hero-copy">
          <span className="pg-kicker">
            PROGRESS & RE-ASSESSMENT
          </span>

          <h1>
            Learn, complete, re-assess,
            and verify your skills.
          </h1>

          <p>
            Your roadmap for{" "}
            <strong>
              {career.name}
            </strong>{" "}
            is connected directly to re-assessment. Once all topics for a skill
            are complete, NEXTPATH unlocks a new assessment set. Passing means
            your new demonstrated score meets or exceeds the career requirement.
          </p>

          <div className="pg-flow">
            <span>
              Roadmap
            </span>

            <b>→</b>

            <span className="active">
              Progress
            </span>

            <b>→</b>

            <span>
              Re-Assessment
            </span>

            <b>→</b>

            <span>
              Verified Skill
            </span>

            <b>→</b>

            <span>
              Credential
            </span>
          </div>
        </div>

        <div className="pg-hero-rings">
          <ProgressRing
            value={
              overallProgress
            }
            label="Roadmap"
            accent="#16a34a"
          />

          <ProgressRing
            value={
              readiness
            }
            label="Readiness"
            accent="#2563eb"
          />
        </div>
      </section>

      <section className="pg-summary-grid">
        <SummaryCard
          label="Roadmap Progress"
          value={`${overallProgress.toFixed(
            0
          )}%`}
          note={`${completedTopics}/${totalTopics} topics`}
          accent="#16a34a"
        />

        <SummaryCard
          label="Ready to Re-Assess"
          value={readySkills.length}
          note="100% topics complete"
          accent="#2563eb"
        />

        <SummaryCard
          label="In Progress"
          value={inProgress.length}
          note="Learning underway"
          accent="#ca8a04"
        />

        <SummaryCard
          label="Verified Skills"
          value={verifiedSkills.length}
          note="Passed re-assessment"
          accent="#7c3aed"
        />

        <SummaryCard
          label="Average Gap"
          value={`${averageGap.toFixed(
            0
          )}%`}
          note="Current career gap"
          accent="#ea580c"
        />

        <SummaryCard
          label="Study Plan"
          value={`${number(
            preferences.weeklyHours,
            0
          )}h/week`}
          note={`${number(
            preferences.months,
            0
          )} month goal`}
          accent="#0891b2"
        />
      </section>

      <section className="pg-reassessment-panel">
        <div>
          <span className="pg-kicker">
            RE-ASSESSMENT CENTER
          </span>

          <h2>
            {readySkills.length
              ? `${readySkills.length} skill${
                  readySkills.length ===
                  1
                    ? ""
                    : "s"
                } ready for verification.`
              : "Keep learning to unlock re-assessment."}
          </h2>

          <p>
            Re-assessment uses a different question set from your previous
            attempt. Your result replaces the current demonstrated score for
            that skill. If the new score meets or exceeds the required career
            score, the skill becomes verified.
          </p>
        </div>

        <div className="pg-reassessment-actions">
          <button
            className="primary"
            disabled={
              !readySkills.length
            }
            onClick={
              reassessAllReady
            }
          >
            Re-Assess All Ready Skills →
          </button>

          <button
            onClick={() =>
              navigate(
                "/roadmap"
              )
            }
          >
            Open Roadmap
          </button>
        </div>
      </section>

      {lastCertificate && (
        <section className="pg-latest-credential">
          <div>
            <span>
              LATEST VERIFIED CREDENTIAL
            </span>

            <h3>
              {lastCertificate.skill}
            </h3>

            <p>
              Verified score{" "}
              {number(
                lastCertificate.score
              ).toFixed(
                1
              )}
              /10 · Required{" "}
              {number(
                lastCertificate.required
              ).toFixed(
                1
              )}
              /10
            </p>
          </div>

          <div>
            <strong>
              {lastCertificate.id}
            </strong>

            <small>
              {formatDate(
                lastCertificate.date
              )}
            </small>

            <button
              onClick={() =>
                navigate(
                  "/credentials"
                )
              }
            >
              View Credentials
            </button>
          </div>
        </section>
      )}

      <section className="pg-controls">
        <label>
          <span>
            Search Skill
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
            placeholder="SQL, Python, Machine Learning..."
          />
        </label>

        <label>
          <span>
            Status
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
              Not Started
            </option>

            <option>
              In Progress
            </option>

            <option>
              Ready to Re-Assess
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
            value={
              sortMode
            }
            onChange={(event) =>
              setSortMode(
                event.target.value
              )
            }
          >
            <option value="roadmap">
              Roadmap Order
            </option>

            <option value="progress">
              Progress
            </option>

            <option value="gap">
              Largest Gap
            </option>

            <option value="priority">
              Priority
            </option>
          </select>
        </label>

        <div className="pg-control-actions">
          <button
            onClick={
              expandAll
            }
          >
            Expand All
          </button>

          <button
            onClick={
              collapseAll
            }
          >
            Collapse
          </button>
        </div>
      </section>

      <section className="pg-skill-list">
        {prepared.length ? (
          prepared.map(
            ({
              item,
              scoreInfo,
            }) => (
              <SkillProgressCard
                key={
                  item.id ||
                  item.skill
                }
                item={
                  item
                }
                progress={
                  progress
                }
                scoreInfo={
                  scoreInfo
                }
                verifiedScore={
                  verified[
                    item.skill
                  ]
                }
                expanded={
                  Boolean(
                    expanded[
                      item.skill
                    ]
                  )
                }
                onToggle={() =>
                  toggleExpanded(
                    item.skill
                  )
                }
                onTopicToggle={
                  toggleTopic
                }
                onReassess={() =>
                  startReassessment(
                    item.skill
                  )
                }
                onContinueRoadmap={() =>
                  navigate(
                    "/roadmap"
                  )
                }
              />
            )
          )
        ) : (
          <div className="pg-empty">
            <div>
              🔍
            </div>

            <h2>
              No skills match the current filter
            </h2>

            <button
              onClick={() => {
                setSearch("");
                setFilter(
                  "All"
                );
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <section className="pg-how-it-works">
        <div>
          <span className="pg-kicker">
            RE-ASSESSMENT LOGIC
          </span>

          <h2>
            How skill verification works
          </h2>
        </div>

        <div className="pg-step-grid">
          <article>
            <span>
              01
            </span>

            <h3>
              Complete Topics
            </h3>

            <p>
              Finish 100% of the roadmap topics for one skill.
            </p>
          </article>

          <article>
            <span>
              02
            </span>

            <h3>
              Unlock Re-Assessment
            </h3>

            <p>
              NEXTPATH sends the skill to Assessment in reassessment mode.
            </p>
          </article>

          <article>
            <span>
              03
            </span>

            <h3>
              New Question Set
            </h3>

            <p>
              Quiz, problem solving, practical/code and project evidence are
              assessed again.
            </p>
          </article>

          <article>
            <span>
              04
            </span>

            <h3>
              Pass Requirement
            </h3>

            <p>
              New score must meet or exceed the career-required score.
            </p>
          </article>

          <article>
            <span>
              05
            </span>

            <h3>
              Verify Skill
            </h3>

            <p>
              Passing adds the skill to nextpathVerifiedSkills.
            </p>
          </article>

          <article>
            <span>
              06
            </span>

            <h3>
              Generate Credential
            </h3>

            <p>
              NEXTPATH creates a project credential for the verified skill.
            </p>
          </article>
        </div>
      </section>

      <section className="pg-fail-pass">
        <article className="pass">
          <span>
            IF YOU PASS
          </span>

          <h3>
            Skill verified
          </h3>

          <p>
            Your new demonstrated score is saved, the remaining gap becomes 0
            when you meet the requirement, and a NEXTPATH project credential is
            generated.
          </p>
        </article>

        <article className="fail">
          <span>
            IF YOU DO NOT PASS
          </span>

          <h3>
            Keep the new score and continue
          </h3>

          <p>
            The new score remains your current demonstrated score. Skill Gap
            recalculates the remaining gap, then you continue learning and can
            re-assess again later.
          </p>
        </article>
      </section>

      <section className="pg-final-panel">
        <div>
          <span className="pg-kicker">
            CAREER READINESS LOOP
          </span>

          <h2>
            Improve one skill at a time.
          </h2>

          <p>
            Your progress, re-assessment result, skill gap and credentials all
            use the same LocalStorage data model, so each successful
            re-assessment improves your career-readiness profile.
          </p>
        </div>

        <div className="pg-final-actions">
          <button
            className="primary"
            onClick={() =>
              navigate(
                "/skill-gap"
              )
            }
          >
            View Updated Skill Gap →
          </button>

          <button
            onClick={() =>
              navigate(
                "/credentials"
              )
            }
          >
            Credentials
          </button>

          <button
            onClick={() =>
              navigate(
                "/opportunities"
              )
            }
          >
            Opportunities
          </button>
        </div>
      </section>

      <footer className="pg-footer">
        NEXTPATH Progress & Re-Assessment · Re-assessment readiness requires
        100% roadmap-topic completion for the skill. Passing requires the new
        demonstrated score to meet or exceed the target-career requirement.
      </footer>

      <style>{`
        .pg-page {
          max-width: 1360px;
          margin: 0 auto;
          padding: 24px;
          color: #0f172a;
        }

        .pg-kicker {
          display: inline-block;
          color: #dc2626;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.4px;
        }

        .pg-hero {
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
              rgba(22,163,74,.10),
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

        .pg-hero h1 {
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

        .pg-hero p {
          max-width: 850px;
          margin: 0;
          color: #64748b;
          line-height: 1.7;
        }

        .pg-flow {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
          margin-top: 17px;
        }

        .pg-flow span {
          padding: 5px 8px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          background: #ffffff;
          color: #475569;
          font-size: 8px;
          font-weight: 850;
        }

        .pg-flow span.active {
          border-color: #16a34a;
          background: #16a34a;
          color: #ffffff;
        }

        .pg-flow b {
          color: #94a3b8;
        }

        .pg-hero-rings {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
        }

        .pg-ring {
          width: 112px;
          height: 112px;
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .pg-ring > div {
          width: 84px;
          height: 84px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%;
          background: #ffffff;
        }

        .pg-ring strong {
          font-size: 21px;
        }

        .pg-ring small {
          color: #64748b;
          font-size: 8px;
        }

        .pg-summary-grid {
          display: grid;
          grid-template-columns:
            repeat(6,minmax(0,1fr));
          gap: 10px;
          margin: 18px 0;
        }

        .pg-summary-card {
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

        .pg-summary-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background:
            var(--summary-accent);
        }

        .pg-summary-card span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .pg-summary-card strong {
          margin: 5px 0;
          font-size: 20px;
        }

        .pg-summary-card small {
          margin-top: auto;
          color: #94a3b8;
        }

        .pg-reassessment-panel {
          display: flex;
          justify-content: space-between;
          gap: 22px;
          align-items: center;
          padding: 20px;
          border: 1px solid #bbf7d0;
          border-radius: 15px;
          background: #f0fdf4;
        }

        .pg-reassessment-panel h2 {
          margin: 6px 0;
        }

        .pg-reassessment-panel p {
          max-width: 850px;
          margin: 0;
          color: #4d7c0f;
          line-height: 1.55;
        }

        .pg-reassessment-actions {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .pg-reassessment-actions button {
          padding: 10px 12px;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          background: #ffffff;
          color: #166534;
          font-weight: 850;
          white-space: nowrap;
          cursor: pointer;
        }

        .pg-reassessment-actions button.primary {
          border-color: #16a34a;
          background: #16a34a;
          color: #ffffff;
        }

        .pg-reassessment-actions button:disabled {
          opacity: .45;
          cursor: not-allowed;
        }

        .pg-latest-credential {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          margin-top: 14px;
          padding: 16px;
          border: 1px solid #ddd6fe;
          border-radius: 13px;
          background: #f5f3ff;
        }

        .pg-latest-credential span {
          color: #7c3aed;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .8px;
        }

        .pg-latest-credential h3 {
          margin: 4px 0;
        }

        .pg-latest-credential p {
          margin: 0;
          color: #6d28d9;
          font-size: 10px;
        }

        .pg-latest-credential > div:last-child {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }

        .pg-latest-credential > div:last-child strong {
          font-size: 10px;
        }

        .pg-latest-credential > div:last-child small {
          margin: 3px 0 6px;
          color: #8b5cf6;
        }

        .pg-latest-credential button {
          padding: 7px 9px;
          border: 0;
          border-radius: 7px;
          background: #7c3aed;
          color: #ffffff;
          font-weight: 850;
          cursor: pointer;
        }

        .pg-controls {
          display: grid;
          grid-template-columns:
            minmax(260px,1fr)
            190px
            190px
            auto;
          gap: 10px;
          align-items: end;
          margin: 14px 0 12px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
        }

        .pg-controls label > span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .pg-controls input,
        .pg-controls select {
          width: 100%;
          box-sizing: border-box;
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
        }

        .pg-control-actions {
          display: flex;
          gap: 6px;
        }

        .pg-control-actions button {
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          font-weight: 800;
          cursor: pointer;
        }

        .pg-skill-list {
          display: grid;
          gap: 11px;
        }

        .pg-skill-card {
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .pg-skill-summary {
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

        .pg-status-wrap {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .pg-status-dot {
          width: 35px;
          height: 35px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 50%;
          font-weight: 900;
        }

        .pg-status-dot.verified {
          background: #dcfce7;
          color: #166534;
        }

        .pg-status-dot.ready {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .pg-status-dot.progress {
          background: #fef3c7;
          color: #92400e;
        }

        .pg-status-dot.met {
          background: #ede9fe;
          color: #6d28d9;
        }

        .pg-status-dot.not-started {
          background: #f1f5f9;
          color: #64748b;
        }

        .pg-status-wrap span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .pg-status-wrap h3 {
          margin: 3px 0;
          font-size: 18px;
        }

        .pg-status-wrap small {
          color: #94a3b8;
        }

        .pg-skill-summary-grid {
          display: grid;
          grid-template-columns:
            repeat(4,82px)
            28px;
          gap: 8px;
          align-items: center;
        }

        .pg-skill-summary-grid > div {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }

        .pg-skill-summary-grid span {
          color: #94a3b8;
          font-size: 7px;
          text-transform: uppercase;
        }

        .pg-skill-summary-grid strong {
          margin-top: 2px;
          font-size: 13px;
        }

        .pg-skill-summary-grid > b {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #475569;
        }

        .pg-card-progress {
          height: 6px;
          background: #e2e8f0;
        }

        .pg-card-progress > div {
          height: 100%;
          background:
            linear-gradient(
              90deg,
              #16a34a,
              #22c55e
            );
        }

        .pg-skill-details {
          padding: 17px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .pg-detail-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
        }

        .pg-detail-grid article {
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
        }

        .pg-detail-grid span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .pg-detail-grid strong {
          margin: 4px 0;
          font-size: 15px;
        }

        .pg-detail-grid small {
          color: #94a3b8;
          line-height: 1.35;
        }

        .pg-learning-section {
          margin-top: 11px;
          padding: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #ffffff;
        }

        .pg-section-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .pg-section-head span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .pg-section-head h4 {
          margin: 4px 0;
        }

        .pg-section-head > strong {
          color: #16a34a;
          font-size: 15px;
        }

        .pg-topic-list {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 8px;
          margin-top: 10px;
        }

        .pg-topic-list label {
          display: grid;
          grid-template-columns:
            auto
            32px
            minmax(0,1fr);
          gap: 9px;
          align-items: center;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #f8fafc;
          cursor: pointer;
        }

        .pg-topic-list label.completed {
          border-color: #bbf7d0;
          background: #f0fdf4;
        }

        .pg-topic-list input {
          accent-color: #16a34a;
        }

        .pg-topic-index {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #ffffff;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
        }

        .pg-topic-copy {
          display: flex;
          flex-direction: column;
        }

        .pg-topic-copy strong {
          font-size: 10px;
        }

        .pg-topic-copy small {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 7px;
        }

        .pg-gate {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
          margin-top: 11px;
          padding: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #ffffff;
        }

        .pg-gate.ready {
          border-color: #bfdbfe;
          background: #eff6ff;
        }

        .pg-gate.verified {
          border-color: #bbf7d0;
          background: #f0fdf4;
        }

        .pg-gate span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .pg-gate h4 {
          margin: 4px 0;
        }

        .pg-gate p {
          max-width: 800px;
          margin: 0;
          color: #64748b;
          font-size: 9px;
          line-height: 1.45;
        }

        .pg-gate-actions {
          display: flex;
          gap: 7px;
        }

        .pg-gate-actions button {
          padding: 9px 11px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          font-weight: 850;
          white-space: nowrap;
          cursor: pointer;
        }

        .pg-gate-actions button.primary {
          border-color: #2563eb;
          background: #2563eb;
          color: #ffffff;
        }

        .pg-empty {
          padding: 35px;
          border: 1px dashed #cbd5e1;
          border-radius: 13px;
          text-align: center;
          background: #ffffff;
        }

        .pg-empty > div {
          font-size: 36px;
        }

        .pg-empty button {
          padding: 9px 12px;
          border: 0;
          border-radius: 8px;
          background: #111827;
          color: #ffffff;
          font-weight: 850;
          cursor: pointer;
        }

        .pg-how-it-works {
          margin-top: 18px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: #ffffff;
        }

        .pg-how-it-works h2 {
          margin: 6px 0 14px;
        }

        .pg-step-grid {
          display: grid;
          grid-template-columns:
            repeat(6,minmax(0,1fr));
          gap: 8px;
        }

        .pg-step-grid article {
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #f8fafc;
        }

        .pg-step-grid span {
          color: #dc2626;
          font-size: 8px;
          font-weight: 900;
        }

        .pg-step-grid h3 {
          margin: 5px 0;
          font-size: 11px;
        }

        .pg-step-grid p {
          margin: 0;
          color: #64748b;
          font-size: 8px;
          line-height: 1.45;
        }

        .pg-fail-pass {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 10px;
          margin-top: 14px;
        }

        .pg-fail-pass article {
          padding: 16px;
          border-radius: 12px;
        }

        .pg-fail-pass article.pass {
          border: 1px solid #bbf7d0;
          background: #f0fdf4;
        }

        .pg-fail-pass article.fail {
          border: 1px solid #fed7aa;
          background: #fff7ed;
        }

        .pg-fail-pass span {
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .pg-fail-pass .pass span {
          color: #15803d;
        }

        .pg-fail-pass .fail span {
          color: #c2410c;
        }

        .pg-fail-pass h3 {
          margin: 5px 0;
        }

        .pg-fail-pass p {
          margin: 0;
          color: #64748b;
          font-size: 10px;
          line-height: 1.5;
        }

        .pg-final-panel {
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

        .pg-final-panel h2 {
          margin: 6px 0;
        }

        .pg-final-panel p {
          max-width: 820px;
          margin: 0;
          color: #94a3b8;
          line-height: 1.55;
        }

        .pg-final-actions {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .pg-final-actions button {
          padding: 10px 12px;
          border: 1px solid #334155;
          border-radius: 8px;
          background: #111827;
          color: #cbd5e1;
          font-weight: 850;
          cursor: pointer;
        }

        .pg-final-actions button.primary {
          border-color: #dc2626;
          background: #dc2626;
          color: #ffffff;
        }

        .pg-footer {
          padding: 16px 2px 0;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.5;
        }

        .pg-state {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 30px;
          text-align: center;
          color: #0f172a;
        }

        .pg-state > div {
          font-size: 42px;
        }

        .pg-state p {
          max-width: 650px;
          color: #64748b;
          line-height: 1.55;
        }

        .pg-state button {
          padding: 10px 14px;
          border: 0;
          border-radius: 8px;
          background: #dc2626;
          color: #ffffff;
          font-weight: 900;
          cursor: pointer;
        }

        @media(max-width: 1120px) {
          .pg-summary-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }

          .pg-controls {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .pg-detail-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .pg-step-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }
        }

        @media(max-width: 820px) {
          .pg-page {
            padding: 14px;
          }

          .pg-hero {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          .pg-reassessment-panel,
          .pg-latest-credential,
          .pg-final-panel {
            align-items: stretch;
            flex-direction: column;
          }

          .pg-reassessment-actions,
          .pg-final-actions {
            justify-content: flex-start;
          }

          .pg-latest-credential > div:last-child {
            align-items: flex-start;
          }

          .pg-skill-summary {
            flex-direction: column;
          }

          .pg-skill-summary-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
            width: 100%;
          }

          .pg-skill-summary-grid > div {
            align-items: flex-start;
          }

          .pg-skill-summary-grid > b {
            display: none;
          }

          .pg-topic-list {
            grid-template-columns: 1fr;
          }

          .pg-gate {
            align-items: stretch;
            flex-direction: column;
          }
        }

        @media(max-width: 560px) {
          .pg-summary-grid,
          .pg-controls,
          .pg-detail-grid,
          .pg-step-grid,
          .pg-fail-pass {
            grid-template-columns: 1fr;
          }

          .pg-hero-rings {
            align-items: flex-start;
            flex-direction: column;
          }

          .pg-control-actions {
            width: 100%;
          }

          .pg-control-actions button {
            flex: 1;
          }
        }
      `}</style>
    </main>
  );
}
