import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

const fallbackResource = (skill) => ({
  skill,
  topics: [
    `${skill} Fundamentals`,
    `${skill} Core Concepts`,
    `${skill} Guided Practice`,
    `${skill} Mini Project`,
  ],

  free_resources: [
    {
      name: `${skill} Official Tutorial Search`,
      url:
        "https://www.google.com/search?q=" +
        encodeURIComponent(`${skill} official tutorial`),
    },
  ],

  practice_resources: [
    {
      name: `${skill} Practice`,
      url:
        "https://www.google.com/search?q=" +
        encodeURIComponent(`${skill} practice exercises`),
    },
  ],

  paid_resources: [
    {
      name: `Coursera ${skill} Courses`,
      url:
        "https://www.coursera.org/search?query=" +
        encodeURIComponent(skill),
    },
    {
      name: `Udemy ${skill} Courses`,
      url:
        "https://www.udemy.com/courses/search/?q=" +
        encodeURIComponent(skill),
    },
  ],

  project: `Build a practical mini project using ${skill}.`,
});

function getStoredJSON(key, fallbackValue) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallbackValue;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(`Could not read ${key}:`, error);
    return fallbackValue;
  }
}

function normalizeGapItem(item) {
  return {
    skill:
      item.skill ||
      item.name ||
      item.skillName ||
      "Unknown Skill",

    requiredScore: Number(
      item.requiredScore ??
        item.required_score ??
        item.required ??
        0
    ),

    demonstratedScore: Number(
      item.demonstratedScore ??
        item.demonstrated_score ??
        item.score ??
        0
    ),

    gapScore: Number(
      item.gapScore ??
        item.gap_score ??
        0
    ),

    gapPercentage: Number(
      item.gapPercentage ??
        item.gap_percentage ??
        item.gap ??
        0
    ),
  };
}

function normalizeResources(rawResources) {
  if (!Array.isArray(rawResources)) {
    return [];
  }

  return rawResources.map((resource) => ({
    skill:
      resource.skill ||
      resource.name ||
      "",

    topics: Array.isArray(resource.topics)
      ? resource.topics
      : [],

    free_resources:
      resource.free_resources ||
      resource.free ||
      [],

    practice_resources:
      resource.practice_resources ||
      resource.practice ||
      [],

    paid_resources:
      resource.paid_resources ||
      resource.paid ||
      [],

    project:
      resource.project ||
      "",
  }));
}

function Roadmap() {
  const navigate = useNavigate();

  const [months, setMonths] = useState(() => {
    const previous = getStoredJSON(
      "nextpathRoadmapPreferences",
      {}
    );

    return Number(previous.months || 3);
  });

  const [weeklyHours, setWeeklyHours] = useState(() => {
    const previous = getStoredJSON(
      "nextpathRoadmapPreferences",
      {}
    );

    return Number(previous.weeklyHours || 8);
  });

  const [resources, setResources] = useState([]);
  const [roadmap, setRoadmap] = useState(() =>
    getStoredJSON("nextpathRoadmapPlan", [])
  );

  const [loading, setLoading] = useState(true);
  const [resourceError, setResourceError] =
    useState("");

  const rawSkillGaps = useMemo(
    () =>
      getStoredJSON(
        "nextpathSkillGaps",
        []
      ),
    []
  );

  const skillGaps = useMemo(
    () =>
      Array.isArray(rawSkillGaps)
        ? rawSkillGaps
            .map(normalizeGapItem)
            .filter(
              (item) =>
                item.skill &&
                item.gapPercentage > 0
            )
        : [],
    [rawSkillGaps]
  );

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        setResourceError("");

        const response = await fetch(
          `${API_URL}/learning-resources`
        );

        if (!response.ok) {
          throw new Error(
            `Backend returned ${response.status}`
          );
        }

        const data = await response.json();

        setResources(
          normalizeResources(data)
        );
      } catch (error) {
        console.error(
          "Learning resources error:",
          error
        );

        setResourceError(
          "Could not load learning resources from the backend. " +
            "NEXTPATH will use fallback resources for now."
        );
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const getResourceForSkill = (skill) => {
    const found = resources.find(
      (resource) =>
        resource.skill
          .trim()
          .toLowerCase() ===
        skill.trim().toLowerCase()
    );

    if (!found) {
      return fallbackResource(skill);
    }

    const fallback =
      fallbackResource(skill);

    return {
      skill,

      topics:
        found.topics?.length > 0
          ? found.topics
          : fallback.topics,

      free_resources:
        found.free_resources?.length > 0
          ? found.free_resources
          : fallback.free_resources,

      practice_resources:
        found.practice_resources?.length > 0
          ? found.practice_resources
          : fallback.practice_resources,

      paid_resources:
        found.paid_resources?.length > 0
          ? found.paid_resources
          : fallback.paid_resources,

      project:
        found.project ||
        fallback.project,
    };
  };

  const generateRoadmap = () => {
    if (skillGaps.length === 0) {
      alert(
        "No skill gaps were found. Please complete the Skill Gap step first."
      );
      return;
    }

    const totalGap =
      skillGaps.reduce(
        (sum, item) =>
          sum + item.gapPercentage,
        0
      ) || 1;

    const totalWeeks =
      Number(months) * 4;

    const sortedGaps = [
      ...skillGaps,
    ].sort(
      (a, b) =>
        b.gapPercentage -
        a.gapPercentage
    );

    const plan = sortedGaps.map(
      (gapItem, index) => {
        const resource =
          getResourceForSkill(
            gapItem.skill
          );

        const weight =
          gapItem.gapPercentage /
          totalGap;

        const calculatedHours =
          Number(weeklyHours) *
          weight;

        const calculatedWeeks =
          totalWeeks * weight;

        const hoursPerWeek = Math.max(
          0.5,
          Math.round(
            calculatedHours * 10
          ) / 10
        );

        const recommendedWeeks =
          Math.max(
            1,
            Math.round(calculatedWeeks)
          );

        return {
          priority: index + 1,

          skill: gapItem.skill,

          requiredScore:
            gapItem.requiredScore,

          demonstratedScore:
            gapItem.demonstratedScore,

          gapScore:
            gapItem.gapScore,

          gapPercentage:
            gapItem.gapPercentage,

          // Kept for compatibility
          gap: gapItem.gapPercentage,

          hoursPerWeek,

          recommendedWeeks,

          topics: resource.topics,

          freeResources:
            resource.free_resources,

          practiceResources:
            resource.practice_resources,

          paidResources:
            resource.paid_resources,

          // Snake-case aliases for compatibility
          free_resources:
            resource.free_resources,

          practice_resources:
            resource.practice_resources,

          paid_resources:
            resource.paid_resources,

          project: resource.project,
        };
      }
    );

    setRoadmap(plan);

    localStorage.setItem(
      "nextpathRoadmapPreferences",
      JSON.stringify({
        months: Number(months),
        weeklyHours:
          Number(weeklyHours),
      })
    );

    localStorage.setItem(
      "nextpathRoadmapPlan",
      JSON.stringify(plan)
    );

    const existingProgress =
      getStoredJSON(
        "nextpathRoadmapProgress",
        {}
      );

    const newProgress = {
      ...existingProgress,
    };

    plan.forEach((item) => {
      item.topics.forEach(
        (topic) => {
          const key =
            `${item.skill}::${topic}`;

          if (
            newProgress[key] ===
            undefined
          ) {
            newProgress[key] =
              false;
          }
        }
      );
    });

    localStorage.setItem(
      "nextpathRoadmapProgress",
      JSON.stringify(newProgress)
    );
  };

  const goToProgress = () => {
    navigate("/progress");
  };

  const goBack = () => {
    navigate("/skill-gap");
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <p style={styles.eyebrow}>
            LEARNING INTELLIGENCE
          </p>

          <h1 style={styles.title}>
            Personalized Roadmap
          </h1>

          <p style={styles.subtitle}>
            NEXTPATH converts your
            verified skill gaps into a
            practical learning plan with
            study topics, free materials,
            practice platforms, paid
            course suggestions and
            projects.
          </p>
        </div>

        <div style={styles.headerBadge}>
          Evidence → Gap → Learning →
          Re-Assessment
        </div>
      </div>

      <div style={styles.infoBanner}>
        <strong>
          How this roadmap works:
        </strong>{" "}
        skills with larger gaps receive
        higher priority and a larger
        share of your weekly study time.
      </div>

      {resourceError && (
        <div style={styles.warning}>
          {resourceError}
        </div>
      )}

      <section style={styles.settingsCard}>
        <div style={styles.sectionTop}>
          <div>
            <p style={styles.eyebrow}>
              ROADMAP SETTINGS
            </p>

            <h2 style={styles.sectionTitle}>
              Choose your learning
              commitment
            </h2>

            <p style={styles.sectionText}>
              Tell NEXTPATH how much
              time you have. The roadmap
              will distribute that time
              across your remaining
              skill gaps.
            </p>
          </div>
        </div>

        <div style={styles.settingsGrid}>
          <div>
            <label style={styles.label}>
              Goal duration
            </label>

            <select
              value={months}
              onChange={(event) =>
                setMonths(
                  Number(
                    event.target.value
                  )
                )
              }
              style={styles.select}
            >
              <option value={1}>
                1 month
              </option>

              <option value={2}>
                2 months
              </option>

              <option value={3}>
                3 months
              </option>

              <option value={6}>
                6 months
              </option>
            </select>
          </div>

          <div>
            <label style={styles.label}>
              Weekly study hours
            </label>

            <input
              type="number"
              min="2"
              max="40"
              value={weeklyHours}
              onChange={(event) =>
                setWeeklyHours(
                  Math.max(
                    2,
                    Number(
                      event.target.value
                    ) || 2
                  )
                )
              }
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.summaryStrip}>
          <div>
            <span
              style={
                styles.summaryLabel
              }
            >
              Duration
            </span>

            <strong>
              {months}{" "}
              {months === 1
                ? "month"
                : "months"}
            </strong>
          </div>

          <div>
            <span
              style={
                styles.summaryLabel
              }
            >
              Study time
            </span>

            <strong>
              {weeklyHours} hrs/week
            </strong>
          </div>

          <div>
            <span
              style={
                styles.summaryLabel
              }
            >
              Remaining skills
            </span>

            <strong>
              {skillGaps.length}
            </strong>
          </div>
        </div>

        <button
          onClick={generateRoadmap}
          style={styles.primaryButton}
          disabled={loading}
        >
          {loading
            ? "Loading Resources..."
            : roadmap.length > 0
            ? "Regenerate Personalized Roadmap"
            : "Generate Personalized Roadmap"}
        </button>
      </section>

      {skillGaps.length === 0 && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>
            🧩
          </div>

          <h3>
            No skill gaps are available
            yet
          </h3>

          <p>
            Complete the Target Career,
            Required Skills and
            Assessment steps first.
          </p>

          <button
            onClick={goBack}
            style={
              styles.secondaryButton
            }
          >
            Go to Skill Gap
          </button>
        </div>
      )}

      {roadmap.length > 0 && (
        <>
          <div style={styles.planHeading}>
            <div>
              <p style={styles.eyebrow}>
                YOUR LEARNING PLAN
              </p>

              <h2 style={styles.sectionTitle}>
                Priority-based roadmap
              </h2>
            </div>

            <div style={styles.planCount}>
              {roadmap.length} skills
            </div>
          </div>

          <div style={styles.roadmapList}>
            {roadmap.map((item) => (
              <article
                key={item.skill}
                style={styles.skillCard}
              >
                <div
                  style={
                    styles.cardHeader
                  }
                >
                  <div
                    style={
                      styles.priorityBadge
                    }
                  >
                    Priority #
                    {item.priority}
                  </div>

                  <div
                    style={
                      styles.skillHeaderText
                    }
                  >
                    <h2
                      style={
                        styles.skillTitle
                      }
                    >
                      {item.skill}
                    </h2>

                    <p
                      style={
                        styles.skillDescription
                      }
                    >
                      Focus on closing
                      this skill gap
                      before
                      re-assessment.
                    </p>
                  </div>
                </div>

                <div style={styles.metricsGrid}>
                  <Metric
                    label="Current Gap"
                    value={`${Math.round(
                      item.gapPercentage
                    )}%`}
                  />

                  <Metric
                    label="Required"
                    value={`${item.requiredScore}/10`}
                  />

                  <Metric
                    label="Current Score"
                    value={`${item.demonstratedScore}/10`}
                  />

                  <Metric
                    label="Study / Week"
                    value={`${item.hoursPerWeek} hrs`}
                  />

                  <Metric
                    label="Suggested Time"
                    value={`${item.recommendedWeeks} weeks`}
                  />
                </div>

                <div
                  style={
                    styles.progressTrack
                  }
                >
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${Math.max(
                        3,
                        100 -
                          item.gapPercentage
                      )}%`,
                    }}
                  />
                </div>

                <p
                  style={
                    styles.progressCaption
                  }
                >
                  Current readiness for
                  this skill:{" "}
                  {Math.max(
                    0,
                    Math.round(
                      100 -
                        item.gapPercentage
                    )
                  )}
                  %
                </p>

                <div
                  style={
                    styles.contentGrid
                  }
                >
                  <section
                    style={
                      styles.contentPanel
                    }
                  >
                    <div
                      style={
                        styles.panelTitle
                      }
                    >
                      📘 Topics to Learn
                    </div>

                    <ol
                      style={
                        styles.topicList
                      }
                    >
                      {item.topics.map(
                        (
                          topic,
                          topicIndex
                        ) => (
                          <li
                            key={topic}
                            style={
                              styles.topicItem
                            }
                          >
                            <span
                              style={
                                styles.topicNumber
                              }
                            >
                              {topicIndex +
                                1}
                            </span>

                            <span>
                              {topic}
                            </span>
                          </li>
                        )
                      )}
                    </ol>
                  </section>

                  <section
                    style={
                      styles.contentPanel
                    }
                  >
                    <div
                      style={
                        styles.panelTitle
                      }
                    >
                      📚 Free Study
                      Materials
                    </div>

                    <ResourceLinks
                      resources={
                        item.freeResources
                      }
                      emptyText="No free material available."
                    />
                  </section>

                  <section
                    style={
                      styles.contentPanel
                    }
                  >
                    <div
                      style={
                        styles.panelTitle
                      }
                    >
                      🧪 Practice
                      Platforms
                    </div>

                    <ResourceLinks
                      resources={
                        item.practiceResources
                      }
                      emptyText="No practice platform available."
                    />
                  </section>

                  <section
                    style={
                      styles.contentPanel
                    }
                  >
                    <div
                      style={
                        styles.panelTitle
                      }
                    >
                      💳 Paid Course
                      Suggestions
                    </div>

                    <p
                      style={
                        styles.smallNote
                      }
                    >
                      Platform/search
                      links are used
                      because individual
                      course names,
                      prices and
                      availability can
                      change.
                    </p>

                    <ResourceLinks
                      resources={
                        item.paidResources
                      }
                      emptyText="No paid course suggestion available."
                    />
                  </section>
                </div>

                <section
                  style={
                    styles.projectBox
                  }
                >
                  <div
                    style={
                      styles.projectIcon
                    }
                  >
                    🛠
                  </div>

                  <div>
                    <div
                      style={
                        styles.projectLabel
                      }
                    >
                      RECOMMENDED
                      PRACTICAL PROJECT
                    </div>

                    <div
                      style={
                        styles.projectTitle
                      }
                    >
                      {item.project}
                    </div>

                    <p
                      style={
                        styles.projectText
                      }
                    >
                      Complete this
                      project as evidence
                      that you can apply
                      the skill, not only
                      study the theory.
                    </p>
                  </div>
                </section>
              </article>
            ))}
          </div>

          <div style={styles.bottomActions}>
            <button
              onClick={goBack}
              style={
                styles.secondaryButton
              }
            >
              ← Back to Skill Gap
            </button>

            <button
              onClick={goToProgress}
              style={
                styles.primaryButton
              }
            >
              Start Progress Tracking →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div style={styles.metricCard}>
      <span style={styles.metricLabel}>
        {label}
      </span>

      <strong style={styles.metricValue}>
        {value}
      </strong>
    </div>
  );
}

function ResourceLinks({
  resources,
  emptyText,
}) {
  if (
    !Array.isArray(resources) ||
    resources.length === 0
  ) {
    return (
      <p style={styles.smallNote}>
        {emptyText}
      </p>
    );
  }

  return (
    <div style={styles.resourceList}>
      {resources.map(
        (resource, index) => (
          <a
            key={`${resource.name}-${index}`}
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            style={styles.resourceLink}
          >
            <span>
              {resource.name}
            </span>

            <span
              style={
                styles.externalIcon
              }
            >
              ↗
            </span>
          </a>
        )
      )}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "8px 6px 60px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "24px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },

  eyebrow: {
    margin: "0 0 8px",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.4px",
    color: "#60a5fa",
  },

  title: {
    margin: 0,
    fontSize: "36px",
    lineHeight: 1.1,
    color: "#f8fafc",
  },

  subtitle: {
    maxWidth: "760px",
    marginTop: "12px",
    color: "#94a3b8",
    lineHeight: 1.7,
  },

  headerBadge: {
    padding: "10px 14px",
    borderRadius: "999px",
    background: "#0f1d35",
    border: "1px solid #1e3a5f",
    color: "#93c5fd",
    fontSize: "13px",
    fontWeight: "700",
  },

  infoBanner: {
    padding: "16px 18px",
    marginBottom: "20px",
    borderRadius: "12px",
    background: "#0c2435",
    border: "1px solid #164e63",
    color: "#bae6fd",
    lineHeight: 1.6,
  },

  warning: {
    padding: "14px 16px",
    marginBottom: "18px",
    borderRadius: "12px",
    background: "#33240a",
    border: "1px solid #854d0e",
    color: "#fde68a",
  },

  settingsCard: {
    padding: "24px",
    borderRadius: "18px",
    background: "#111827",
    border: "1px solid #263244",
    marginBottom: "28px",
  },

  sectionTop: {
    marginBottom: "22px",
  },

  sectionTitle: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "24px",
  },

  sectionText: {
    marginTop: "8px",
    color: "#94a3b8",
    lineHeight: 1.6,
  },

  settingsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    marginBottom: "18px",
  },

  label: {
    display: "block",
    color: "#cbd5e1",
    fontWeight: "700",
    marginBottom: "8px",
  },

  select: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0b1220",
    color: "#f8fafc",
    outline: "none",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0b1220",
    color: "#f8fafc",
    outline: "none",
  },

  summaryStrip: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px",
    marginBottom: "20px",
  },

  summaryLabel: {
    display: "block",
    fontSize: "12px",
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: "4px",
  },

  primaryButton: {
    padding: "13px 20px",
    borderRadius: "10px",
    border: "none",
    background:
      "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "white",
    fontWeight: "800",
    cursor: "pointer",
  },

  secondaryButton: {
    padding: "13px 20px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#111827",
    color: "#e2e8f0",
    fontWeight: "700",
    cursor: "pointer",
  },

  emptyState: {
    textAlign: "center",
    padding: "50px 20px",
    borderRadius: "18px",
    border: "1px dashed #334155",
    color: "#94a3b8",
  },

  emptyIcon: {
    fontSize: "42px",
  },

  planHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "34px 0 18px",
  },

  planCount: {
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#172033",
    color: "#93c5fd",
    fontWeight: "700",
  },

  roadmapList: {
    display: "grid",
    gap: "22px",
  },

  skillCard: {
    padding: "24px",
    borderRadius: "18px",
    border: "1px solid #263244",
    background: "#0f172a",
  },

  cardHeader: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    marginBottom: "20px",
  },

  priorityBadge: {
    padding: "7px 10px",
    borderRadius: "9px",
    background: "#172554",
    color: "#bfdbfe",
    fontSize: "12px",
    fontWeight: "800",
    whiteSpace: "nowrap",
  },

  skillHeaderText: {
    flex: 1,
  },

  skillTitle: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "25px",
  },

  skillDescription: {
    margin: "5px 0 0",
    color: "#94a3b8",
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "10px",
  },

  metricCard: {
    padding: "14px",
    borderRadius: "12px",
    background: "#111827",
    border: "1px solid #273449",
  },

  metricLabel: {
    display: "block",
    color: "#64748b",
    fontSize: "12px",
    marginBottom: "6px",
  },

  metricValue: {
    color: "#f8fafc",
    fontSize: "18px",
  },

  progressTrack: {
    width: "100%",
    height: "8px",
    borderRadius: "999px",
    background: "#1e293b",
    marginTop: "20px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background:
      "linear-gradient(90deg, #2563eb, #22c55e)",
  },

  progressCaption: {
    marginTop: "7px",
    color: "#64748b",
    fontSize: "12px",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(270px, 1fr))",
    gap: "14px",
    marginTop: "20px",
  },

  contentPanel: {
    padding: "18px",
    background: "#111827",
    border: "1px solid #273449",
    borderRadius: "14px",
  },

  panelTitle: {
    fontWeight: "800",
    color: "#e2e8f0",
    marginBottom: "14px",
  },

  topicList: {
    padding: 0,
    listStyle: "none",
    margin: 0,
  },

  topicItem: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "8px 0",
    color: "#cbd5e1",
    borderBottom:
      "1px solid rgba(51,65,85,0.45)",
  },

  topicNumber: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#1e3a8a",
    color: "#dbeafe",
    fontSize: "11px",
    fontWeight: "800",
  },

  resourceList: {
    display: "grid",
    gap: "9px",
  },

  resourceLink: {
    display: "flex",
    alignItems: "center",
    justifyContent:
      "space-between",
    textDecoration: "none",
    padding: "11px 12px",
    borderRadius: "9px",
    background: "#0b1220",
    border: "1px solid #334155",
    color: "#93c5fd",
    fontWeight: "650",
  },

  externalIcon: {
    fontSize: "16px",
    color: "#60a5fa",
  },

  smallNote: {
    color: "#64748b",
    lineHeight: 1.5,
    fontSize: "12px",
  },

  projectBox: {
    display: "flex",
    gap: "15px",
    alignItems: "flex-start",
    marginTop: "20px",
    padding: "18px",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, #14261f, #10231c)",
    border: "1px solid #22543d",
  },

  projectIcon: {
    fontSize: "28px",
  },

  projectLabel: {
    color: "#86efac",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  projectTitle: {
    color: "#f0fdf4",
    fontWeight: "800",
    fontSize: "17px",
    marginTop: "5px",
  },

  projectText: {
    margin: "6px 0 0",
    color: "#86a995",
    lineHeight: 1.5,
    fontSize: "13px",
  },

  bottomActions: {
    display: "flex",
    justifyContent:
      "space-between",
    gap: "12px",
    marginTop: "28px",
    flexWrap: "wrap",
  },
};

export default Roadmap;