import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEYS = {
  targetData: "nextpathTargetCareerData",
  scores: "nextpathSkillScores",
  gaps: "nextpathSkillGaps",
  verified: "nextpathVerifiedSkills",
  projects: "nextpathProjects",
  certificates: "nextpathCertificates",
  roadmapPlan: "nextpathRoadmapPlan",
};

const ROLE_CATALOG = {
  "Data Analyst": {
    "aliases": [
      "Junior Data Analyst",
      "Business Data Analyst",
      "Reporting Analyst",
      "BI Analyst"
    ],
    "coreSkills": [
      "SQL",
      "Excel",
      "Power BI",
      "Statistics",
      "Data Visualization",
      "Communication"
    ],
    "projectSignals": [
      "dashboard",
      "sql",
      "analysis",
      "report",
      "visualization"
    ],
    "salary": "₹4–14+ LPA",
    "experience": "0–3 years",
    "opportunityScore": 90,
    "summary": "Analyze business data, build reports and dashboards, and communicate insights to decision-makers."
  },
  "Data Scientist": {
    "aliases": [
      "Junior Data Scientist",
      "Applied Data Scientist",
      "Decision Scientist",
      "Analytics Scientist"
    ],
    "coreSkills": [
      "Python",
      "Statistics",
      "Machine Learning",
      "SQL",
      "Data Visualization",
      "Communication"
    ],
    "projectSignals": [
      "model",
      "prediction",
      "classification",
      "regression",
      "analysis"
    ],
    "salary": "₹6–22+ LPA",
    "experience": "0–4 years",
    "opportunityScore": 88,
    "summary": "Build statistical and machine-learning solutions to answer business or product questions."
  },
  "Data Engineer": {
    "aliases": [
      "Junior Data Engineer",
      "ETL Developer",
      "Data Pipeline Engineer",
      "Cloud Data Engineer"
    ],
    "coreSkills": [
      "SQL",
      "Python",
      "ETL",
      "Data Pipelines",
      "Cloud",
      "Big Data",
      "Data Modeling"
    ],
    "projectSignals": [
      "pipeline",
      "etl",
      "spark",
      "warehouse",
      "database"
    ],
    "salary": "₹6–20+ LPA",
    "experience": "0–4 years",
    "opportunityScore": 91,
    "summary": "Build reliable data pipelines, storage layers, and scalable data infrastructure."
  },
  "Business Analyst": {
    "aliases": [
      "Junior Business Analyst",
      "Product Business Analyst",
      "Operations Analyst",
      "Functional Analyst"
    ],
    "coreSkills": [
      "Business Analysis",
      "Excel",
      "SQL",
      "Communication",
      "Data Visualization"
    ],
    "projectSignals": [
      "requirements",
      "stakeholder",
      "process",
      "kpi",
      "dashboard"
    ],
    "salary": "₹4–14+ LPA",
    "experience": "0–3 years",
    "opportunityScore": 86,
    "summary": "Translate business problems into requirements, analysis, KPIs, and actionable recommendations."
  },
  "Machine Learning Engineer": {
    "aliases": [
      "ML Engineer",
      "Applied ML Engineer",
      "Junior ML Engineer",
      "AI/ML Engineer"
    ],
    "coreSkills": [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "MLOps",
      "APIs",
      "Cloud"
    ],
    "projectSignals": [
      "model",
      "api",
      "deployment",
      "mlflow",
      "docker"
    ],
    "salary": "₹8–25+ LPA",
    "experience": "1–4 years",
    "opportunityScore": 92,
    "summary": "Build, deploy, monitor, and improve machine-learning systems in production environments."
  },
  "BI Analyst": {
    "aliases": [
      "Business Intelligence Analyst",
      "Power BI Analyst",
      "Reporting Analyst",
      "Dashboard Analyst"
    ],
    "coreSkills": [
      "Power BI",
      "SQL",
      "Excel",
      "Data Visualization",
      "Data Modeling",
      "Communication"
    ],
    "projectSignals": [
      "dashboard",
      "dax",
      "power bi",
      "report",
      "kpi"
    ],
    "salary": "₹5–15+ LPA",
    "experience": "0–3 years",
    "opportunityScore": 88,
    "summary": "Create dashboards, semantic models, and management reporting for operational decisions."
  },
  "AI Engineer": {
    "aliases": [
      "Generative AI Engineer",
      "AI Application Engineer",
      "LLM Engineer",
      "Applied AI Engineer"
    ],
    "coreSkills": [
      "Python",
      "Generative AI",
      "Machine Learning",
      "APIs",
      "Cloud",
      "MLOps"
    ],
    "projectSignals": [
      "llm",
      "rag",
      "embedding",
      "api",
      "assistant"
    ],
    "salary": "₹8–28+ LPA",
    "experience": "1–4 years",
    "opportunityScore": 92,
    "summary": "Build AI applications using machine learning, LLMs, retrieval, APIs, and deployment systems."
  },
  "Product Analyst": {
    "aliases": [
      "Product Data Analyst",
      "Growth Analyst",
      "Experimentation Analyst",
      "Product Insights Analyst"
    ],
    "coreSkills": [
      "Product Analytics",
      "SQL",
      "Statistics",
      "Data Visualization",
      "Communication"
    ],
    "projectSignals": [
      "funnel",
      "retention",
      "cohort",
      "experiment",
      "product"
    ],
    "salary": "₹5–16+ LPA",
    "experience": "0–3 years",
    "opportunityScore": 87,
    "summary": "Analyze product behavior, funnels, retention, experiments, and growth opportunities."
  },
  "Marketing Analyst": {
    "aliases": [
      "Marketing Data Analyst",
      "Digital Marketing Analyst",
      "Growth Analyst",
      "Performance Analyst"
    ],
    "coreSkills": [
      "Marketing Analytics",
      "Excel",
      "SQL",
      "Statistics",
      "Data Visualization"
    ],
    "projectSignals": [
      "roas",
      "cac",
      "campaign",
      "conversion",
      "marketing"
    ],
    "salary": "₹4–13+ LPA",
    "experience": "0–3 years",
    "opportunityScore": 84,
    "summary": "Measure campaign performance, customer acquisition, attribution, and conversion behavior."
  },
  "Analytics Consultant": {
    "aliases": [
      "Analytics Consultant",
      "Data & Analytics Consultant",
      "BI Consultant",
      "Decision Analytics Consultant"
    ],
    "coreSkills": [
      "SQL",
      "Python",
      "Business Analysis",
      "Communication",
      "Data Visualization",
      "Statistics"
    ],
    "projectSignals": [
      "recommendation",
      "stakeholder",
      "analysis",
      "dashboard",
      "strategy"
    ],
    "salary": "₹7–20+ LPA",
    "experience": "1–4 years",
    "opportunityScore": 85,
    "summary": "Combine analysis, communication, and business understanding to solve client decision problems."
  },
  "Data Architect": {
    "aliases": [
      "Junior Data Architect",
      "Cloud Data Architect",
      "Analytics Architect",
      "Data Platform Architect"
    ],
    "coreSkills": [
      "Data Architecture",
      "Data Modeling",
      "Cloud",
      "Data Pipelines",
      "Big Data",
      "SQL"
    ],
    "projectSignals": [
      "architecture",
      "warehouse",
      "lake",
      "governance",
      "pipeline"
    ],
    "salary": "₹15–35+ LPA",
    "experience": "4–8+ years",
    "opportunityScore": 80,
    "summary": "Design scalable, governed, secure data platforms and architecture patterns."
  },
  "Senior Data Analyst": {
    "aliases": [
      "Senior Data Analyst",
      "Lead Analyst",
      "Senior BI Analyst",
      "Analytics Lead"
    ],
    "coreSkills": [
      "SQL",
      "Excel",
      "Power BI",
      "Statistics",
      "Data Visualization",
      "Communication",
      "Business Analysis"
    ],
    "projectSignals": [
      "dashboard",
      "strategy",
      "analysis",
      "stakeholder",
      "kpi"
    ],
    "salary": "₹10–24+ LPA",
    "experience": "3–6+ years",
    "opportunityScore": 83,
    "summary": "Lead analytical work, mentor others, and turn complex data into strategic decisions."
  }
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

function normalizeCareerSkills(career) {
  if (!career?.skills) {
    return [];
  }

  if (Array.isArray(career.skills)) {
    return career.skills.map((skill) => ({
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
    }));
  }

  return Object.entries(career.skills).map(
    ([name, score]) => ({
      name,
      required_score: number(score, 7),
    })
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
    Boolean(String(project.repository || "").trim() || String(project.demo || "").trim()),
  ];

  return (
    checks.filter(Boolean).length /
    checks.length
  ) * 100;
}

function encode(value) {
  return encodeURIComponent(
    String(value || "")
  );
}

function buildSearchLinks(role, location = "India") {
  const query = encode(role);
  const loc = encode(location);

  return [
    {
      provider: "LinkedIn",
      label: "Search on LinkedIn",
      url:
        `https://www.linkedin.com/jobs/search/?keywords=${query}&location=${loc}`,
      type: "Jobs",
    },
    {
      provider: "Indeed",
      label: "Search on Indeed",
      url:
        `https://in.indeed.com/jobs?q=${query}&l=${loc}`,
      type: "Jobs",
    },
    {
      provider: "Naukri",
      label: "Search on Naukri",
      url:
        `https://www.naukri.com/${String(role || "jobs")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}-jobs`,
      type: "Jobs",
    },
    {
      provider: "Wellfound",
      label: "Search on Wellfound",
      url:
        `https://wellfound.com/jobs?query=${query}`,
      type: "Startups",
    },
    {
      provider: "Internshala",
      label: "Search internships",
      url:
        `https://internshala.com/internships/keywords-${query}/`,
      type: "Internships",
    },
  ];
}

function matchingScore({
  role,
  verified,
  scores,
  projects,
  careerSkills,
}) {
  const required =
    role.coreSkills || [];

  if (!required.length) {
    return 0;
  }

  const verifiedCount =
    required.filter(
      (skill) =>
        verified[skill] !== undefined
    ).length;

  const assessedQuality =
    required.reduce(
      (sum, skill) => {
        const score =
          scores[skill];

        if (score === undefined) {
          return sum;
        }

        return (
          sum +
          clamp(
            number(score) / 10,
            0,
            1
          )
        );
      },
      0
    ) / required.length;

  const completedProjects =
    projects.filter(
      (project) =>
        projectCompletion(project) >= 80
    );

  const projectSignals =
    (role.projectSignals || [])
      .map((signal) =>
        String(signal).toLowerCase()
      );

  const projectEvidence =
    completedProjects.some(
      (project) => {
        const haystack =
          [
            project.title,
            project.description,
            project.problem,
            project.implementation,
            project.result,
            ...(project.skills || []),
          ]
            .join(" ")
            .toLowerCase();

        return projectSignals.some(
          (signal) =>
            haystack.includes(signal)
        );
      }
    )
      ? 1
      : 0;

  const careerSkillNames =
    new Set(
      careerSkills.map(
        (skill) => skill.name
      )
    );

  const careerAlignment =
    required.filter(
      (skill) =>
        careerSkillNames.has(skill)
    ).length /
    required.length;

  const verifiedRatio =
    verifiedCount /
    required.length;

  const raw =
    verifiedRatio * 0.45 +
    assessedQuality * 0.25 +
    projectEvidence * 0.20 +
    careerAlignment * 0.10;

  return Math.round(
    clamp(raw * 100, 0, 100)
  );
}

function readinessLabel(score) {
  const value = number(score);

  if (value >= 85) {
    return "Strong Match";
  }

  if (value >= 70) {
    return "Good Match";
  }

  if (value >= 55) {
    return "Developing Match";
  }

  if (value >= 35) {
    return "Early Match";
  }

  return "Build More Evidence";
}

function readinessTone(score) {
  const value = number(score);

  if (value >= 85) {
    return "excellent";
  }

  if (value >= 70) {
    return "good";
  }

  if (value >= 55) {
    return "developing";
  }

  return "early";
}

function SummaryCard({
  label,
  value,
  note,
  accent = "#dc2626",
}) {
  return (
    <article
      className="op-summary-card"
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

function ProviderLink({
  item,
}) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="op-provider-link"
    >
      <div>
        <span>
          {item.type}
        </span>

        <strong>
          {item.provider}
        </strong>

        <small>
          {item.label}
        </small>
      </div>

      <b>↗</b>
    </a>
  );
}

function RoleCard({
  item,
  expanded,
  onToggle,
  location,
}) {
  const {
    roleName,
    roleData,
    score,
    verifiedSkills,
    missingVerifiedSkills,
    relatedProjects,
  } = item;

  const links =
    buildSearchLinks(
      roleName,
      location
    );

  return (
    <article className="op-role-card">
      <button
        className="op-role-summary"
        onClick={onToggle}
      >
        <div className="op-role-left">
          <div
            className={`op-match-score ${readinessTone(
              score
            )}`}
          >
            <strong>
              {score}
            </strong>

            <span>
              %
            </span>
          </div>

          <div>
            <span className="op-role-label">
              {readinessLabel(
                score
              )}
            </span>

            <h3>
              {roleName}
            </h3>

            <small>
              {roleData.summary}
            </small>
          </div>
        </div>

        <div className="op-role-meta">
          <div>
            <span>
              Opportunity
            </span>

            <strong>
              {roleData.opportunityScore}
              /100
            </strong>
          </div>

          <div>
            <span>
              Salary*
            </span>

            <strong>
              {roleData.salary}
            </strong>
          </div>

          <div>
            <span>
              Experience
            </span>

            <strong>
              {roleData.experience}
            </strong>
          </div>

          <b>
            {expanded
              ? "−"
              : "+"}
          </b>
        </div>
      </button>

      <div className="op-role-progress">
        <div
          style={{
            width:
              `${score}%`,
          }}
        />
      </div>

      {expanded && (
        <div className="op-role-details">
          <section className="op-detail-grid">
            <article>
              <span>
                Verified Core Skills
              </span>

              <strong>
                {verifiedSkills.length}/
                {roleData.coreSkills.length}
              </strong>

              <small>
                Skills already verified by NEXTPATH
              </small>
            </article>

            <article>
              <span>
                Portfolio Evidence
              </span>

              <strong>
                {relatedProjects.length}
              </strong>

              <small>
                Related projects with strong completion
              </small>
            </article>

            <article>
              <span>
                Match Type
              </span>

              <strong>
                {readinessLabel(
                  score
                )}
              </strong>

              <small>
                NEXTPATH project readiness estimate
              </small>
            </article>

            <article>
              <span>
                Market Opportunity
              </span>

              <strong>
                {roleData.opportunityScore}/100
              </strong>

              <small>
                Prototype career-opportunity indicator
              </small>
            </article>
          </section>

          <section className="op-skill-section">
            <div>
              <span>
                CORE ROLE SKILLS
              </span>

              <h4>
                Skills NEXTPATH checks for this role
              </h4>
            </div>

            <div className="op-skill-grid">
              {roleData.coreSkills.map(
                (skill) => {
                  const verified =
                    verifiedSkills.includes(
                      skill
                    );

                  return (
                    <div
                      key={skill}
                      className={
                        verified
                          ? "verified"
                          : "missing"
                      }
                    >
                      <span>
                        {verified
                          ? "✓"
                          : "•"}
                      </span>

                      <strong>
                        {skill}
                      </strong>

                      <small>
                        {verified
                          ? "Verified"
                          : "Not verified"}
                      </small>
                    </div>
                  );
                }
              )}
            </div>
          </section>

          <section className="op-missing-section">
            <div>
              <span>
                NEXT BEST ACTION
              </span>

              <h4>
                {missingVerifiedSkills.length
                  ? "Verify the remaining high-value skills."
                  : "Your core skill verification is strong."}
              </h4>

              <p>
                {missingVerifiedSkills.length
                  ? `Priority skills to verify: ${missingVerifiedSkills.join(
                      ", "
                    )}. Continue roadmap learning, complete projects and re-assess these skills.`
                  : "Focus on strong portfolio evidence, interview preparation and live opportunity search."}
              </p>
            </div>
          </section>

          <section className="op-project-section">
            <div className="op-section-head">
              <div>
                <span>
                  RELEVANT PROJECTS
                </span>

                <h4>
                  Portfolio proof linked to this role
                </h4>
              </div>

              <strong>
                {relatedProjects.length}
              </strong>
            </div>

            {relatedProjects.length ? (
              <div className="op-project-grid">
                {relatedProjects
                  .slice(0, 4)
                  .map(
                    (project) => (
                      <article
                        key={project.id}
                      >
                        <span>
                          {Math.round(
                            projectCompletion(
                              project
                            )
                          )}
                          % complete
                        </span>

                        <h5>
                          {project.title}
                        </h5>

                        <small>
                          {(project.skills || [])
                            .slice(0, 3)
                            .join(" · ")}
                        </small>
                      </article>
                    )
                  )}
              </div>
            ) : (
              <div className="op-empty-inline">
                No strong matching project evidence yet.
              </div>
            )}
          </section>

          <section className="op-search-section">
            <div className="op-section-head">
              <div>
                <span>
                  EXTERNAL OPPORTUNITY SEARCH
                </span>

                <h4>
                  Open current searches on job platforms
                </h4>
              </div>
            </div>

            <div className="op-provider-grid">
              {links.map(
                (link) => (
                  <ProviderLink
                    key={
                      link.provider
                    }
                    item={link}
                  />
                )
              )}
            </div>
          </section>

          <section className="op-aliases">
            <span>
              RELATED JOB TITLES
            </span>

            <div>
              {roleData.aliases.map(
                (alias) => (
                  <b key={alias}>
                    {alias}
                  </b>
                )
              )}
            </div>
          </section>
        </div>
      )}
    </article>
  );
}

export default function Opportunities() {
  const navigate =
    useNavigate();

  const career =
    readJSON(
      STORAGE_KEYS.targetData,
      null
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

  const projects =
    readJSON(
      STORAGE_KEYS.projects,
      []
    );

  const certificates =
    readJSON(
      STORAGE_KEYS.certificates,
      []
    );

  const careerSkills =
    useMemo(
      () =>
        normalizeCareerSkills(
          career
        ),
      [career]
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
    useState("match");

  const [
    expanded,
    setExpanded,
  ] =
    useState({});

  const [
    location,
    setLocation,
  ] =
    useState("India");

  const roleRows =
    useMemo(() => {
      const rows =
        Object.entries(
          ROLE_CATALOG
        ).map(
          ([roleName, roleData]) => {
            const score =
              matchingScore({
                role: roleData,
                verified,
                scores,
                projects,
                careerSkills,
              });

            const verifiedSkills =
              roleData.coreSkills.filter(
                (skill) =>
                  verified[skill] !==
                  undefined
              );

            const missingVerifiedSkills =
              roleData.coreSkills.filter(
                (skill) =>
                  verified[skill] ===
                  undefined
              );

            const roleTerms =
              new Set(
                [
                  roleName,
                  ...roleData.aliases,
                  ...roleData.projectSignals,
                  ...roleData.coreSkills,
                ].map(
                  (value) =>
                    String(value)
                      .toLowerCase()
                )
              );

            const relatedProjects =
              (Array.isArray(
                projects
              )
                ? projects
                : []
              ).filter(
                (project) => {
                  if (
                    projectCompletion(
                      project
                    ) < 70
                  ) {
                    return false;
                  }

                  const haystack =
                    [
                      project.title,
                      project.description,
                      project.problem,
                      project.implementation,
                      project.result,
                      ...(project.skills || []),
                    ]
                      .join(" ")
                      .toLowerCase();

                  return Array.from(
                    roleTerms
                  ).some(
                    (term) =>
                      haystack.includes(
                        term
                      )
                  );
                }
              );

            return {
              roleName,
              roleData,
              score,
              verifiedSkills,
              missingVerifiedSkills,
              relatedProjects,
              targetCareer:
                career?.name ===
                roleName,
            };
          }
        );

      const query =
        search
          .trim()
          .toLowerCase();

      const filtered =
        rows.filter(
          (row) => {
            const searchable =
              [
                row.roleName,
                row.roleData.summary,
                ...row.roleData.aliases,
                ...row.roleData.coreSkills,
              ]
                .join(" ")
                .toLowerCase();

            const matchSearch =
              !query ||
              searchable.includes(
                query
              );

            let matchFilter =
              true;

            if (
              filter ===
              "Target Career"
            ) {
              matchFilter =
                row.targetCareer;
            } else if (
              filter ===
              "Strong Match"
            ) {
              matchFilter =
                row.score >=
                85;
            } else if (
              filter ===
              "Good Match"
            ) {
              matchFilter =
                row.score >=
                  70 &&
                row.score <
                  85;
            } else if (
              filter ===
              "Developing"
            ) {
              matchFilter =
                row.score >=
                  55 &&
                row.score <
                  70;
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
        "match"
      ) {
        sorted.sort(
          (a, b) =>
            b.score -
            a.score
        );
      } else if (
        sortMode ===
        "opportunity"
      ) {
        sorted.sort(
          (a, b) =>
            b.roleData
              .opportunityScore -
            a.roleData
              .opportunityScore
        );
      } else if (
        sortMode ===
        "verified"
      ) {
        sorted.sort(
          (a, b) =>
            b.verifiedSkills
              .length -
            a.verifiedSkills
              .length
        );
      } else {
        sorted.sort(
          (a, b) =>
            a.roleName.localeCompare(
              b.roleName
            )
        );
      }

      return sorted;
    }, [
      career,
      careerSkills,
      verified,
      scores,
      projects,
      search,
      filter,
      sortMode,
    ]);

  const allRows =
    useMemo(() => {
      return Object.entries(
        ROLE_CATALOG
      ).map(
        ([roleName, roleData]) => ({
          roleName,
          roleData,
          score:
            matchingScore({
              role: roleData,
              verified,
              scores,
              projects,
              careerSkills,
            }),
        })
      );
    }, [
      careerSkills,
      verified,
      scores,
      projects,
    ]);

  const targetRow =
    allRows.find(
      (row) =>
        row.roleName ===
        career?.name
    );

  const bestMatch =
    [...allRows].sort(
      (a, b) =>
        b.score -
        a.score
    )[0];

  const strongMatches =
    allRows.filter(
      (row) =>
        row.score >=
        85
    ).length;

  const goodOrBetter =
    allRows.filter(
      (row) =>
        row.score >=
        70
    ).length;

  const completeProjects =
    (Array.isArray(
      projects
    )
      ? projects
      : []
    ).filter(
      (project) =>
        projectCompletion(
          project
        ) >= 80
    ).length;

  function toggleExpanded(
    role
  ) {
    setExpanded(
      (current) => ({
        ...current,
        [role]:
          !current[
            role
          ],
      })
    );
  }

  function expandAll() {
    setExpanded(
      Object.fromEntries(
        roleRows.map(
          (row) => [
            row.roleName,
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

  if (!career) {
    return (
      <main className="op-state">
        <div>
          💼
        </div>

        <h2>
          Choose a target career first
        </h2>

        <p>
          Opportunities are matched against your target career, verified skills,
          assessment scores and portfolio evidence.
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

  return (
    <main className="op-page">
      <section className="op-hero">
        <div className="op-hero-copy">
          <span className="op-kicker">
            CAREER OPPORTUNITIES
          </span>

          <h1>
            Turn verified skills into
            opportunity signals.
          </h1>

          <p>
            NEXTPATH compares your verified skills, demonstrated scores, target
            career and portfolio projects against a set of related career roles.
            The match percentage is a project readiness estimate, not an
            employer hiring probability.
          </p>

          <div className="op-flow">
            <span>
              Verified Skills
            </span>

            <b>→</b>

            <span>
              Projects
            </span>

            <b>→</b>

            <span className="active">
              Opportunities
            </span>

            <b>→</b>

            <span>
              Job Search
            </span>
          </div>
        </div>

        <div className="op-hero-match">
          <div
            className="op-match-ring"
            style={{
              background:
                `conic-gradient(#2563eb ${(targetRow?.score || 0) * 3.6}deg,#e2e8f0 0deg)`,
            }}
          >
            <div>
              <strong>
                {targetRow?.score ||
                  0}
                %
              </strong>

              <small>
                Target Match
              </small>
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
              {readinessLabel(
                targetRow?.score ||
                  0
              )}
            </small>
          </div>
        </div>
      </section>

      <section className="op-summary-grid">
        <SummaryCard
          label="Target Match"
          value={`${targetRow?.score || 0}%`}
          note="NEXTPATH readiness estimate"
          accent="#2563eb"
        />

        <SummaryCard
          label="Verified Skills"
          value={
            Object.keys(
              verified
            ).length
          }
          note="Passed re-assessment"
          accent="#16a34a"
        />

        <SummaryCard
          label="Portfolio Projects"
          value={
            completeProjects
          }
          note="≥80% documented"
          accent="#7c3aed"
        />

        <SummaryCard
          label="Strong Matches"
          value={
            strongMatches
          }
          note="Match ≥85%"
          accent="#0891b2"
        />

        <SummaryCard
          label="Good+ Matches"
          value={
            goodOrBetter
          }
          note="Match ≥70%"
          accent="#ca8a04"
        />

        <SummaryCard
          label="Credentials"
          value={
            Array.isArray(
              certificates
            )
              ? certificates.length
              : 0
          }
          note="Project credentials"
          accent="#ea580c"
        />
      </section>

      <section className="op-insights">
        <article>
          <span>
            BEST CURRENT MATCH
          </span>

          <h3>
            {bestMatch?.roleName ||
              "No match"}
          </h3>

          <p>
            {bestMatch
              ? `${bestMatch.score}% project readiness based on skills, scores, project evidence and career alignment.`
              : "No role data available."}
          </p>
        </article>

        <article>
          <span>
            TARGET CAREER
          </span>

          <h3>
            {career.name}
          </h3>

          <p>
            {targetRow
              ? `${targetRow.score}% current NEXTPATH match. Continue verifying missing skills and improving portfolio evidence.`
              : "This target career is not in the opportunity role catalog."}
          </p>
        </article>

        <article>
          <span>
            IMPORTANT
          </span>

          <h3>
            Match ≠ hiring probability
          </h3>

          <p>
            Employers use many additional factors such as education, experience,
            location, interviews, domain knowledge and current vacancies.
          </p>
        </article>
      </section>

      <section className="op-search-settings">
        <div>
          <span className="op-kicker">
            EXTERNAL JOB SEARCH
          </span>

          <h2>
            Choose the location used in job-search links.
          </h2>
        </div>

        <label>
          <span>
            Search Location
          </span>

          <input
            value={
              location
            }
            onChange={(event) =>
              setLocation(
                event.target.value
              )
            }
            placeholder="India, Chandigarh, Bengaluru..."
          />
        </label>
      </section>

      <section className="op-controls">
        <label>
          <span>
            Search Role / Skill
          </span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="AI Engineer, SQL, Product Analytics..."
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
              Target Career
            </option>

            <option>
              Strong Match
            </option>

            <option>
              Good Match
            </option>

            <option>
              Developing
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
            <option value="match">
              Best Match
            </option>

            <option value="opportunity">
              Opportunity Score
            </option>

            <option value="verified">
              Verified Skills
            </option>

            <option value="name">
              Role Name
            </option>
          </select>
        </label>

        <div className="op-control-actions">
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

      <section className="op-role-list">
        {roleRows.length ? (
          roleRows.map(
            (item) => (
              <RoleCard
                key={
                  item.roleName
                }
                item={
                  item
                }
                location={
                  location
                }
                expanded={
                  Boolean(
                    expanded[
                      item.roleName
                    ]
                  )
                }
                onToggle={() =>
                  toggleExpanded(
                    item.roleName
                  )
                }
              />
            )
          )
        ) : (
          <div className="op-empty">
            <div>
              🔍
            </div>

            <h2>
              No roles match your filters
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

      <section className="op-how-match">
        <div>
          <span className="op-kicker">
            MATCHING MODEL
          </span>

          <h2>
            How NEXTPATH calculates role readiness
          </h2>
        </div>

        <div className="op-weight-grid">
          <article>
            <span>
              45%
            </span>

            <h3>
              Verified Skills
            </h3>

            <p>
              Skills passed through NEXTPATH re-assessment carry the largest weight.
            </p>
          </article>

          <article>
            <span>
              25%
            </span>

            <h3>
              Demonstrated Scores
            </h3>

            <p>
              Assessment scores provide evidence even before every skill is verified.
            </p>
          </article>

          <article>
            <span>
              20%
            </span>

            <h3>
              Project Evidence
            </h3>

            <p>
              Strong portfolio projects provide practical proof for the role.
            </p>
          </article>

          <article>
            <span>
              10%
            </span>

            <h3>
              Career Alignment
            </h3>

            <p>
              The role receives additional weight when its core skills overlap the target career.
            </p>
          </article>
        </div>
      </section>

      <section className="op-final-panel">
        <div>
          <span className="op-kicker">
            BUILD YOUR PROFILE
          </span>

          <h2>
            Improve the match by improving the evidence.
          </h2>

          <p>
            Complete roadmap topics, finish portfolio projects and verify skills
            through re-assessment. NEXTPATH will automatically update your
            readiness profile.
          </p>
        </div>

        <div className="op-final-actions">
          <button
            className="primary"
            onClick={() =>
              navigate(
                "/progress"
              )
            }
          >
            Progress & Re-Assessment →
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
                "/credentials"
              )
            }
          >
            Credentials
          </button>
        </div>
      </section>

      <section className="op-disclaimer">
        <strong>
          Opportunity data note
        </strong>

        <p>
          Salary ranges, opportunity scores and experience ranges in this
          hackathon build are illustrative career-profile values, not live labor
          market measurements. External buttons open job-platform searches, but
          NEXTPATH does not claim that a specific vacancy is currently open or
          that a match score predicts employer hiring decisions.
        </p>
      </section>

      <footer className="op-footer">
        NEXTPATH Opportunities · Match scores are internal project readiness
        estimates based on the user's NEXTPATH evidence, not employer decisions.
      </footer>

      <style>{`
        .op-page {
          max-width: 1360px;
          margin: 0 auto;
          padding: 24px;
          color: #0f172a;
        }

        .op-kicker {
          display: inline-block;
          color: #dc2626;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.4px;
        }

        .op-hero {
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

        .op-hero h1 {
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

        .op-hero p {
          max-width: 850px;
          margin: 0;
          color: #64748b;
          line-height: 1.7;
        }

        .op-flow {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
          margin-top: 17px;
        }

        .op-flow span {
          padding: 5px 8px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          background: #ffffff;
          color: #475569;
          font-size: 8px;
          font-weight: 850;
        }

        .op-flow span.active {
          border-color: #2563eb;
          background: #2563eb;
          color: #ffffff;
        }

        .op-flow b {
          color: #94a3b8;
        }

        .op-hero-match {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
        }

        .op-match-ring {
          width: 116px;
          height: 116px;
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .op-match-ring > div {
          width: 86px;
          height: 86px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%;
          background: #ffffff;
        }

        .op-match-ring strong {
          font-size: 22px;
        }

        .op-match-ring small {
          color: #64748b;
          font-size: 8px;
        }

        .op-hero-match > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .op-hero-match > div:last-child span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .op-hero-match > div:last-child strong {
          margin: 4px 0;
          font-size: 17px;
        }

        .op-hero-match > div:last-child small {
          color: #94a3b8;
        }

        .op-summary-grid {
          display: grid;
          grid-template-columns:
            repeat(6,minmax(0,1fr));
          gap: 10px;
          margin: 18px 0;
        }

        .op-summary-card {
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

        .op-summary-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background:
            var(--summary-accent);
        }

        .op-summary-card span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .op-summary-card strong {
          margin: 5px 0;
          font-size: 20px;
        }

        .op-summary-card small {
          margin-top: auto;
          color: #94a3b8;
        }

        .op-insights {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 10px;
          margin-bottom: 14px;
        }

        .op-insights article {
          padding: 15px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #f8fafc;
        }

        .op-insights span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .op-insights h3 {
          margin: 5px 0;
        }

        .op-insights p {
          margin: 0;
          color: #64748b;
          font-size: 10px;
          line-height: 1.5;
        }

        .op-search-settings {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          margin-bottom: 14px;
          padding: 18px;
          border: 1px solid #bfdbfe;
          border-radius: 14px;
          background: #eff6ff;
        }

        .op-search-settings h2 {
          margin: 5px 0 0;
        }

        .op-search-settings label {
          min-width: 300px;
        }

        .op-search-settings label > span {
          display: block;
          margin-bottom: 5px;
          color: #1d4ed8;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .op-search-settings input {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 11px;
          border: 1px solid #93c5fd;
          border-radius: 8px;
          background: #ffffff;
        }

        .op-controls {
          display: grid;
          grid-template-columns:
            minmax(260px,1fr)
            190px
            200px
            auto;
          gap: 10px;
          align-items: end;
          margin-bottom: 12px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
        }

        .op-controls label > span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .op-controls input,
        .op-controls select {
          width: 100%;
          box-sizing: border-box;
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
        }

        .op-control-actions {
          display: flex;
          gap: 6px;
        }

        .op-control-actions button {
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          font-weight: 800;
          cursor: pointer;
        }

        .op-role-list {
          display: grid;
          gap: 11px;
        }

        .op-role-card {
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .op-role-summary {
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

        .op-role-left {
          display: flex;
          align-items: center;
          gap: 11px;
          min-width: 0;
        }

        .op-match-score {
          width: 54px;
          height: 54px;
          flex: 0 0 auto;
          display: flex;
          align-items: baseline;
          justify-content: center;
          border-radius: 13px;
          padding-top: 13px;
        }

        .op-match-score strong {
          font-size: 20px;
        }

        .op-match-score span {
          font-size: 8px;
        }

        .op-match-score.excellent {
          background: #dcfce7;
          color: #166534;
        }

        .op-match-score.good {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .op-match-score.developing {
          background: #fef3c7;
          color: #92400e;
        }

        .op-match-score.early {
          background: #f1f5f9;
          color: #64748b;
        }

        .op-role-label {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .op-role-left h3 {
          margin: 3px 0;
          font-size: 18px;
        }

        .op-role-left small {
          display: block;
          max-width: 620px;
          color: #94a3b8;
          line-height: 1.4;
        }

        .op-role-meta {
          display: grid;
          grid-template-columns:
            100px
            130px
            100px
            28px;
          gap: 8px;
          align-items: center;
        }

        .op-role-meta > div {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }

        .op-role-meta span {
          color: #94a3b8;
          font-size: 7px;
          text-transform: uppercase;
        }

        .op-role-meta strong {
          margin-top: 2px;
          font-size: 11px;
          text-align: right;
        }

        .op-role-meta > b {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #475569;
        }

        .op-role-progress {
          height: 6px;
          background: #e2e8f0;
        }

        .op-role-progress > div {
          height: 100%;
          background:
            linear-gradient(
              90deg,
              #2563eb,
              #3b82f6
            );
        }

        .op-role-details {
          padding: 17px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .op-detail-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
        }

        .op-detail-grid article {
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
        }

        .op-detail-grid span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .op-detail-grid strong {
          margin: 4px 0;
          font-size: 14px;
        }

        .op-detail-grid small {
          color: #94a3b8;
          line-height: 1.35;
        }

        .op-skill-section,
        .op-project-section,
        .op-search-section,
        .op-aliases {
          margin-top: 10px;
          padding: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #ffffff;
        }

        .op-skill-section > div:first-child > span,
        .op-section-head span,
        .op-aliases > span,
        .op-missing-section span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .op-skill-section h4,
        .op-section-head h4,
        .op-missing-section h4 {
          margin: 4px 0;
        }

        .op-skill-grid {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 7px;
          margin-top: 9px;
        }

        .op-skill-grid > div {
          display: grid;
          grid-template-columns:
            auto
            minmax(0,1fr)
            auto;
          gap: 7px;
          align-items: center;
          padding: 9px;
          border-radius: 8px;
        }

        .op-skill-grid > div.verified {
          border: 1px solid #bbf7d0;
          background: #f0fdf4;
        }

        .op-skill-grid > div.missing {
          border: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .op-skill-grid > div.verified span {
          color: #16a34a;
        }

        .op-skill-grid > div.missing span {
          color: #94a3b8;
        }

        .op-skill-grid strong {
          font-size: 10px;
        }

        .op-skill-grid small {
          color: #94a3b8;
          font-size: 7px;
        }

        .op-missing-section {
          margin-top: 10px;
          padding: 13px;
          border: 1px solid #fde68a;
          border-radius: 10px;
          background: #fffbeb;
        }

        .op-missing-section p {
          margin: 0;
          color: #92400e;
          font-size: 9px;
          line-height: 1.5;
        }

        .op-section-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .op-section-head > strong {
          color: #2563eb;
        }

        .op-project-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 7px;
          margin-top: 8px;
        }

        .op-project-grid article {
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
        }

        .op-project-grid span {
          color: #7c3aed;
          font-size: 7px;
          font-weight: 900;
        }

        .op-project-grid h5 {
          margin: 4px 0;
        }

        .op-project-grid small {
          color: #94a3b8;
          font-size: 7px;
        }

        .op-provider-grid {
          display: grid;
          grid-template-columns:
            repeat(5,minmax(0,1fr));
          gap: 7px;
          margin-top: 8px;
        }

        .op-provider-link {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          align-items: center;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
          color: inherit;
          text-decoration: none;
        }

        .op-provider-link:hover {
          border-color: #93c5fd;
          background: #eff6ff;
        }

        .op-provider-link > div {
          display: flex;
          flex-direction: column;
        }

        .op-provider-link span {
          color: #64748b;
          font-size: 6px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .op-provider-link strong {
          margin: 2px 0;
          font-size: 10px;
        }

        .op-provider-link small {
          color: #94a3b8;
          font-size: 7px;
        }

        .op-provider-link b {
          color: #2563eb;
        }

        .op-aliases > div {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        .op-aliases b {
          padding: 5px 7px;
          border-radius: 999px;
          background: #f1f5f9;
          color: #475569;
          font-size: 8px;
        }

        .op-empty-inline {
          margin-top: 8px;
          padding: 12px;
          border: 1px dashed #cbd5e1;
          border-radius: 8px;
          color: #64748b;
          font-size: 9px;
          text-align: center;
        }

        .op-empty {
          padding: 35px;
          border: 1px dashed #cbd5e1;
          border-radius: 13px;
          text-align: center;
          background: #ffffff;
        }

        .op-empty > div {
          font-size: 36px;
        }

        .op-empty button {
          padding: 9px 12px;
          border: 0;
          border-radius: 8px;
          background: #111827;
          color: #ffffff;
          font-weight: 850;
          cursor: pointer;
        }

        .op-how-match {
          margin-top: 18px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: #ffffff;
        }

        .op-how-match h2 {
          margin: 6px 0 14px;
        }

        .op-weight-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
        }

        .op-weight-grid article {
          padding: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #f8fafc;
        }

        .op-weight-grid span {
          color: #2563eb;
          font-size: 16px;
          font-weight: 900;
        }

        .op-weight-grid h3 {
          margin: 5px 0;
          font-size: 11px;
        }

        .op-weight-grid p {
          margin: 0;
          color: #64748b;
          font-size: 8px;
          line-height: 1.45;
        }

        .op-final-panel {
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

        .op-final-panel h2 {
          margin: 6px 0;
        }

        .op-final-panel p {
          max-width: 820px;
          margin: 0;
          color: #94a3b8;
          line-height: 1.55;
        }

        .op-final-actions {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .op-final-actions button {
          padding: 10px 12px;
          border: 1px solid #334155;
          border-radius: 8px;
          background: #111827;
          color: #cbd5e1;
          font-weight: 850;
          cursor: pointer;
        }

        .op-final-actions button.primary {
          border-color: #2563eb;
          background: #2563eb;
          color: #ffffff;
        }

        .op-disclaimer {
          margin-top: 14px;
          padding: 14px;
          border: 1px solid #fde68a;
          border-radius: 11px;
          background: #fffbeb;
        }

        .op-disclaimer strong {
          color: #92400e;
          font-size: 9px;
          text-transform: uppercase;
        }

        .op-disclaimer p {
          margin: 5px 0 0;
          color: #92400e;
          font-size: 9px;
          line-height: 1.5;
        }

        .op-footer {
          padding: 16px 2px 0;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.5;
        }

        .op-state {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 30px;
          text-align: center;
          color: #0f172a;
        }

        .op-state > div {
          font-size: 42px;
        }

        .op-state p {
          max-width: 650px;
          color: #64748b;
          line-height: 1.55;
        }

        .op-state button {
          padding: 10px 14px;
          border: 0;
          border-radius: 8px;
          background: #2563eb;
          color: #ffffff;
          font-weight: 900;
          cursor: pointer;
        }

        @media(max-width: 1120px) {
          .op-summary-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }

          .op-controls {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .op-detail-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .op-provider-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }
        }

        @media(max-width: 820px) {
          .op-page {
            padding: 14px;
          }

          .op-hero {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          .op-insights {
            grid-template-columns: 1fr;
          }

          .op-search-settings,
          .op-final-panel {
            align-items: stretch;
            flex-direction: column;
          }

          .op-search-settings label {
            min-width: 0;
          }

          .op-role-summary {
            flex-direction: column;
          }

          .op-role-meta {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
            width: 100%;
          }

          .op-role-meta > div {
            align-items: flex-start;
          }

          .op-role-meta > b {
            display: none;
          }

          .op-skill-grid,
          .op-project-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .op-weight-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .op-final-actions {
            justify-content: flex-start;
          }
        }

        @media(max-width: 560px) {
          .op-summary-grid,
          .op-controls,
          .op-detail-grid,
          .op-provider-grid,
          .op-skill-grid,
          .op-project-grid,
          .op-weight-grid {
            grid-template-columns: 1fr;
          }

          .op-hero-match {
            align-items: flex-start;
            flex-direction: column;
          }

          .op-control-actions {
            width: 100%;
          }

          .op-control-actions button {
            flex: 1;
          }
        }
      `}</style>
    </main>
  );
}
