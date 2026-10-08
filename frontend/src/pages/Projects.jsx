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
  if (!value) {
    return "Not available";
  }

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

function normalizeUrl(value) {
  const raw = String(value || "").trim();

  if (!raw) {
    return "";
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  return `https://${raw}`;
}

function projectCompletion(project) {
  const checks = [
    Boolean(String(project.title || "").trim()),
    Boolean(String(project.description || "").trim()),
    Boolean(String(project.problem || "").trim()),
    Boolean(String(project.implementation || "").trim()),
    Boolean(String(project.result || "").trim()),
    Boolean(String(project.evidence || "").trim()),
    Array.isArray(project.skills) && project.skills.length > 0,
  ];

  const completed =
    checks.filter(Boolean).length;

  return Math.round(
    (completed / checks.length) * 100
  );
}

function projectStatus(project) {
  const completion =
    projectCompletion(project);

  if (project.verified) {
    return {
      label: "Verified",
      tone: "verified",
    };
  }

  if (completion >= 100) {
    return {
      label: "Portfolio Ready",
      tone: "ready",
    };
  }

  if (completion >= 50) {
    return {
      label: "In Progress",
      tone: "progress",
    };
  }

  return {
    label: "Draft",
    tone: "draft",
  };
}

function generateRoadmapProjects(roadmap, existingProjects) {
  const existingSourceIds =
    new Set(
      existingProjects
        .map((project) => project.sourceId)
        .filter(Boolean)
    );

  return roadmap
    .filter(
      (item) =>
        item.project &&
        !existingSourceIds.has(item.id)
    )
    .map((item) => ({
      id:
        `project-${item.id}`,
      sourceId:
        item.id,
      source:
        "roadmap",
      title:
        `${item.skill} Career Project`,
      skill:
        item.skill,
      skills: [item.skill],
      description:
        item.project,
      problem: "",
      implementation: "",
      result: "",
      evidence: "",
      repository: "",
      demo: "",
      status:
        "Draft",
      verified: false,
      priority:
        number(item.priority),
      gapPercentage:
        number(item.gapPercentage),
      estimatedHours:
        Math.max(
          4,
          Math.round(
            number(
              item.estimatedHours,
              8
            ) * 0.25
          )
        ),
      createdAt:
        new Date().toISOString(),
      updatedAt:
        new Date().toISOString(),
    }));
}

function SummaryCard({
  label,
  value,
  note,
  accent = "#dc2626",
}) {
  return (
    <article
      className="pj-summary-card"
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

function StatusBadge({
  project,
}) {
  const status =
    projectStatus(project);

  return (
    <span
      className={`pj-status-badge ${status.tone}`}
    >
      {status.label}
    </span>
  );
}

function ProjectCard({
  project,
  expanded,
  onToggle,
  onEdit,
  onDelete,
}) {
  const completion =
    projectCompletion(project);

  return (
    <article className="pj-card">
      <button
        className="pj-card-summary"
        onClick={onToggle}
      >
        <div className="pj-card-left">
          <div className="pj-project-icon">
            🛠️
          </div>

          <div>
            <div className="pj-card-topline">
              <StatusBadge
                project={project}
              />

              {project.source ===
                "roadmap" && (
                <span className="pj-roadmap-badge">
                  Roadmap Project
                </span>
              )}
            </div>

            <h3>
              {project.title}
            </h3>

            <small>
              {project.skill ||
                project.skills?.[0] ||
                "General Project"}
            </small>
          </div>
        </div>

        <div className="pj-card-right">
          <div>
            <span>
              Completion
            </span>

            <strong>
              {completion}%
            </strong>
          </div>

          <div>
            <span>
              Skills
            </span>

            <strong>
              {project.skills?.length ||
                0}
            </strong>
          </div>

          <div>
            <span>
              Priority
            </span>

            <strong>
              {number(
                project.priority,
                0
              )}
            </strong>
          </div>

          <b>
            {expanded ? "−" : "+"}
          </b>
        </div>
      </button>

      <div className="pj-progress-track">
        <div
          style={{
            width:
              `${completion}%`,
          }}
        />
      </div>

      {expanded && (
        <div className="pj-card-details">
          <section className="pj-project-overview">
            <article>
              <span>
                Description
              </span>

              <p>
                {project.description ||
                  "No description added yet."}
              </p>
            </article>

            <article>
              <span>
                Problem Statement
              </span>

              <p>
                {project.problem ||
                  "Add the problem you are solving."}
              </p>
            </article>

            <article>
              <span>
                Implementation
              </span>

              <p>
                {project.implementation ||
                  "Describe the technical approach, tools and workflow."}
              </p>
            </article>

            <article>
              <span>
                Result
              </span>

              <p>
                {project.result ||
                  "Add measurable results, observations or outcomes."}
              </p>
            </article>
          </section>

          <section className="pj-skills-wrap">
            <span>
              SKILLS DEMONSTRATED
            </span>

            <div>
              {(project.skills || []).map(
                (skill) => (
                  <b key={skill}>
                    {skill}
                  </b>
                )
              )}
            </div>
          </section>

          <section className="pj-links-grid">
            <article>
              <span>
                GitHub Repository
              </span>

              {project.repository ? (
                <a
                  href={normalizeUrl(
                    project.repository
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Repository ↗
                </a>
              ) : (
                <p>
                  No repository added.
                </p>
              )}
            </article>

            <article>
              <span>
                Live Demo
              </span>

              {project.demo ? (
                <a
                  href={normalizeUrl(
                    project.demo
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Demo ↗
                </a>
              ) : (
                <p>
                  No demo link added.
                </p>
              )}
            </article>

            <article>
              <span>
                Evidence
              </span>

              {project.evidence ? (
                /^https?:\/\//i.test(
                  project.evidence
                ) ? (
                  <a
                    href={project.evidence}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Evidence ↗
                  </a>
                ) : (
                  <p>
                    {project.evidence}
                  </p>
                )
              ) : (
                <p>
                  No evidence added.
                </p>
              )}
            </article>
          </section>

          <section className="pj-project-meta">
            <div>
              <span>
                Estimated Time
              </span>

              <strong>
                {number(
                  project.estimatedHours,
                  0
                )}h
              </strong>
            </div>

            <div>
              <span>
                Created
              </span>

              <strong>
                {formatDate(
                  project.createdAt
                )}
              </strong>
            </div>

            <div>
              <span>
                Updated
              </span>

              <strong>
                {formatDate(
                  project.updatedAt
                )}
              </strong>
            </div>
          </section>

          <section className="pj-card-actions">
            <button
              className="primary"
              onClick={onEdit}
            >
              Edit Project
            </button>

            <button
              onClick={onDelete}
            >
              Delete
            </button>
          </section>
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const navigate =
    useNavigate();

  const career =
    readJSON(
      STORAGE_KEYS.targetData,
      null
    );

  const roadmap =
    readJSON(
      STORAGE_KEYS.roadmapPlan,
      []
    );

  const verified =
    readJSON(
      STORAGE_KEYS.verified,
      {}
    );

  const savedProjects =
    readJSON(
      STORAGE_KEYS.projects,
      []
    );

  const [
    projects,
    setProjects,
  ] =
    useState(() => {
      const base =
        Array.isArray(
          savedProjects
        )
          ? savedProjects
          : [];

      const generated =
        generateRoadmapProjects(
          Array.isArray(
            roadmap
          )
            ? roadmap
            : [],
          base
        );

      const merged = [
        ...base,
        ...generated,
      ];

      localStorage.setItem(
        STORAGE_KEYS.projects,
        JSON.stringify(
          merged
        )
      );

      return merged;
    });

  const [
    expanded,
    setExpanded,
  ] =
    useState({});

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
    showEditor,
    setShowEditor,
  ] =
    useState(false);

  const [
    editingId,
    setEditingId,
  ] =
    useState(null);

  const [
    form,
    setForm,
  ] =
    useState({
      title: "",
      skill: "",
      skills: [],
      description: "",
      problem: "",
      implementation: "",
      result: "",
      evidence: "",
      repository: "",
      demo: "",
      estimatedHours: 8,
      priority: 50,
    });

  const allKnownSkills =
    useMemo(() => {
      const skills =
        new Set();

      if (
        Array.isArray(
          roadmap
        )
      ) {
        roadmap.forEach(
          (item) => {
            if (item.skill) {
              skills.add(
                item.skill
              );
            }
          }
        );
      }

      projects.forEach(
        (project) => {
          (project.skills || []).forEach(
            (skill) =>
              skills.add(
                skill
              )
          );
        }
      );

      Object.keys(
        verified
      ).forEach(
        (skill) =>
          skills.add(
            skill
          )
      );

      return Array.from(
        skills
      ).sort();
    }, [
      roadmap,
      projects,
      verified,
    ]);

  const visibleProjects =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      const filtered =
        projects.filter(
          (project) => {
            const searchable =
              [
                project.title,
                project.description,
                project.problem,
                ...(project.skills || []),
              ]
                .join(" ")
                .toLowerCase();

            const matchSearch =
              !query ||
              searchable.includes(
                query
              );

            const status =
              projectStatus(
                project
              ).label;

            const matchFilter =
              filter === "All" ||
              status === filter ||
              (
                filter ===
                  "Roadmap Projects" &&
                project.source ===
                  "roadmap"
              );

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
        "priority"
      ) {
        sorted.sort(
          (a, b) =>
            number(
              b.priority
            ) -
            number(
              a.priority
            )
        );
      } else if (
        sortMode ===
        "completion"
      ) {
        sorted.sort(
          (a, b) =>
            projectCompletion(
              b
            ) -
            projectCompletion(
              a
            )
        );
      } else if (
        sortMode ===
        "updated"
      ) {
        sorted.sort(
          (a, b) =>
            new Date(
              b.updatedAt ||
                0
            ) -
            new Date(
              a.updatedAt ||
                0
            )
        );
      } else {
        sorted.sort(
          (a, b) =>
            String(
              a.title
            ).localeCompare(
              String(
                b.title
              )
            )
        );
      }

      return sorted;
    }, [
      projects,
      search,
      filter,
      sortMode,
    ]);

  const totalProjects =
    projects.length;

  const portfolioReady =
    projects.filter(
      (project) =>
        projectCompletion(
          project
        ) >= 100
    ).length;

  const inProgress =
    projects.filter(
      (project) => {
        const completion =
          projectCompletion(
            project
          );

        return (
          completion >
            0 &&
          completion <
            100
        );
      }
    ).length;

  const roadmapProjects =
    projects.filter(
      (project) =>
        project.source ===
        "roadmap"
    ).length;

  const verifiedProjects =
    projects.filter(
      (project) =>
        project.verified
    ).length;

  const averageCompletion =
    totalProjects
      ? projects.reduce(
          (
            sum,
            project
          ) =>
            sum +
            projectCompletion(
              project
            ),
          0
        ) /
        totalProjects
      : 0;

  function persist(
    nextProjects
  ) {
    setProjects(
      nextProjects
    );

    localStorage.setItem(
      STORAGE_KEYS.projects,
      JSON.stringify(
        nextProjects
      )
    );
  }

  function toggleExpanded(
    id
  ) {
    setExpanded(
      (current) => ({
        ...current,
        [id]:
          !current[
            id
          ],
      })
    );
  }

  function openNewProject() {
    setEditingId(
      null
    );

    setForm({
      title: "",
      skill:
        allKnownSkills[0] ||
        "",
      skills:
        allKnownSkills[0]
          ? [
              allKnownSkills[0],
            ]
          : [],
      description: "",
      problem: "",
      implementation: "",
      result: "",
      evidence: "",
      repository: "",
      demo: "",
      estimatedHours: 8,
      priority: 50,
    });

    setShowEditor(
      true
    );
  }

  function openEdit(
    project
  ) {
    setEditingId(
      project.id
    );

    setForm({
      ...project,
      skills:
        Array.isArray(
          project.skills
        )
          ? project.skills
          : [],
    });

    setShowEditor(
      true
    );
  }

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
  }

  function toggleFormSkill(
    skill
  ) {
    setForm(
      (current) => {
        const currentSkills =
          Array.isArray(
            current.skills
          )
            ? current.skills
            : [];

        const exists =
          currentSkills.includes(
            skill
          );

        return {
          ...current,
          skills: exists
            ? currentSkills.filter(
                (item) =>
                  item !== skill
              )
            : [
                ...currentSkills,
                skill,
              ],
        };
      }
    );
  }

  function saveProject() {
    if (
      !String(
        form.title ||
          ""
      ).trim()
    ) {
      alert(
        "Please add a project title."
      );

      return;
    }

    if (
      !Array.isArray(
        form.skills
      ) ||
      !form.skills.length
    ) {
      alert(
        "Select at least one skill for the project."
      );

      return;
    }

    const now =
      new Date()
        .toISOString();

    if (
      editingId
    ) {
      const next =
        projects.map(
          (project) =>
            project.id ===
            editingId
              ? {
                  ...project,
                  ...form,
                  title:
                    form.title.trim(),
                  updatedAt:
                    now,
                }
              : project
        );

      persist(
        next
      );
    } else {
      const project = {
        ...form,
        id:
          `custom-project-${Date.now()}`,
        source:
          "custom",
        title:
          form.title.trim(),
        verified: false,
        createdAt:
          now,
        updatedAt:
          now,
      };

      persist([
        project,
        ...projects,
      ]);
    }

    setShowEditor(
      false
    );

    setEditingId(
      null
    );
  }

  function deleteProject(
    id
  ) {
    const confirmed =
      window.confirm(
        "Delete this project from NEXTPATH?"
      );

    if (!confirmed) {
      return;
    }

    const next =
      projects.filter(
        (project) =>
          project.id !== id
      );

    persist(
      next
    );
  }

  function syncRoadmapProjects() {
    const generated =
      generateRoadmapProjects(
        Array.isArray(
          roadmap
        )
          ? roadmap
          : [],
        projects
      );

    if (!generated.length) {
      alert(
        "All roadmap projects are already in your project workspace."
      );

      return;
    }

    persist([
      ...projects,
      ...generated,
    ]);
  }

  return (
    <main className="pj-page">
      <section className="pj-hero">
        <div className="pj-hero-copy">
          <span className="pj-kicker">
            PROJECT PORTFOLIO
          </span>

          <h1>
            Turn your roadmap skills into
            portfolio evidence.
          </h1>

          <p>
            NEXTPATH Projects converts learning into proof. Each project can
            connect to one or more target-career skills, include implementation
            evidence, GitHub and demo links, and become part of your readiness
            profile for interviews and opportunities.
          </p>

          <div className="pj-flow">
            <span>
              Roadmap
            </span>

            <b>→</b>

            <span className="active">
              Projects
            </span>

            <b>→</b>

            <span>
              Evidence
            </span>

            <b>→</b>

            <span>
              Re-Assessment
            </span>

            <b>→</b>

            <span>
              Opportunities
            </span>
          </div>
        </div>

        <div className="pj-hero-score">
          <div
            className="pj-completion-ring"
            style={{
              background:
                `conic-gradient(#16a34a ${averageCompletion * 3.6}deg,#e2e8f0 0deg)`,
            }}
          >
            <div>
              <strong>
                {averageCompletion.toFixed(
                  0
                )}
                %
              </strong>

              <small>
                Portfolio
              </small>
            </div>
          </div>

          <div>
            <span>
              Target Career
            </span>

            <strong>
              {career?.icon ||
                "🎯"}{" "}
              {career?.name ||
                "Not selected"}
            </strong>

            <small>
              {totalProjects} project
              {totalProjects === 1
                ? ""
                : "s"}{" "}
              in workspace
            </small>
          </div>
        </div>
      </section>

      <section className="pj-summary-grid">
        <SummaryCard
          label="Total Projects"
          value={totalProjects}
          note="Portfolio workspace"
          accent="#dc2626"
        />

        <SummaryCard
          label="Roadmap Projects"
          value={roadmapProjects}
          note="Generated from roadmap"
          accent="#2563eb"
        />

        <SummaryCard
          label="In Progress"
          value={inProgress}
          note="Partially documented"
          accent="#ca8a04"
        />

        <SummaryCard
          label="Portfolio Ready"
          value={portfolioReady}
          note="100% project evidence"
          accent="#16a34a"
        />

        <SummaryCard
          label="Verified Projects"
          value={verifiedProjects}
          note="Linked to verified skills"
          accent="#7c3aed"
        />

        <SummaryCard
          label="Average Completion"
          value={`${averageCompletion.toFixed(
            0
          )}%`}
          note="Across all projects"
          accent="#0891b2"
        />
      </section>

      <section className="pj-strategy">
        <article>
          <span>
            PROJECT PURPOSE
          </span>

          <h3>
            Show what you can build
          </h3>

          <p>
            Strong portfolio projects demonstrate practical ability better than
            a skill name alone.
          </p>
        </article>

        <article>
          <span>
            EVIDENCE MODEL
          </span>

          <h3>
            Problem → Build → Result
          </h3>

          <p>
            Each project records the problem, implementation, evidence and
            measurable result.
          </p>
        </article>

        <article>
          <span>
            CAREER ALIGNMENT
          </span>

          <h3>
            Link projects to target skills
          </h3>

          <p>
            Projects can demonstrate multiple skills from your selected career
            and roadmap.
          </p>
        </article>
      </section>

      <section className="pj-actions-bar">
        <div>
          <span className="pj-kicker">
            PROJECT WORKSPACE
          </span>

          <h2>
            Build evidence for your career profile.
          </h2>
        </div>

        <div className="pj-actions">
          <button
            onClick={
              syncRoadmapProjects
            }
          >
            Sync Roadmap Projects
          </button>

          <button
            className="primary"
            onClick={
              openNewProject
            }
          >
            + Add New Project
          </button>
        </div>
      </section>

      <section className="pj-controls">
        <label>
          <span>
            Search Project
          </span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="SQL dashboard, ML model, API..."
          />
        </label>

        <label>
          <span>
            Status
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
              Draft
            </option>

            <option>
              In Progress
            </option>

            <option>
              Portfolio Ready
            </option>

            <option>
              Verified
            </option>

            <option>
              Roadmap Projects
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
            <option value="priority">
              Priority
            </option>

            <option value="completion">
              Completion
            </option>

            <option value="updated">
              Recently Updated
            </option>

            <option value="name">
              Project Name
            </option>
          </select>
        </label>
      </section>

      {showEditor && (
        <section className="pj-editor">
          <div className="pj-editor-head">
            <div>
              <span className="pj-kicker">
                {editingId
                  ? "EDIT PROJECT"
                  : "NEW PROJECT"}
              </span>

              <h2>
                {editingId
                  ? "Update portfolio evidence"
                  : "Create a career-aligned project"}
              </h2>
            </div>

            <button
              onClick={() =>
                setShowEditor(
                  false
                )
              }
            >
              ✕
            </button>
          </div>

          <div className="pj-form-grid">
            <label>
              <span>
                Project Title
              </span>

              <input
                value={
                  form.title
                }
                onChange={(event) =>
                  updateField(
                    "title",
                    event.target.value
                  )
                }
                placeholder="Example: Sales Analytics Dashboard"
              />
            </label>

            <label>
              <span>
                Estimated Hours
              </span>

              <input
                type="number"
                min="1"
                max="500"
                value={
                  form.estimatedHours
                }
                onChange={(event) =>
                  updateField(
                    "estimatedHours",
                    clamp(
                      number(
                        event.target.value,
                        8
                      ),
                      1,
                      500
                    )
                  )
                }
              />
            </label>

            <label>
              <span>
                Priority
              </span>

              <input
                type="number"
                min="0"
                max="100"
                value={
                  form.priority
                }
                onChange={(event) =>
                  updateField(
                    "priority",
                    clamp(
                      number(
                        event.target.value,
                        50
                      ),
                      0,
                      100
                    )
                  )
                }
              />
            </label>
          </div>

          <div className="pj-skill-selector">
            <span>
              SKILLS DEMONSTRATED
            </span>

            <div>
              {allKnownSkills.length ? (
                allKnownSkills.map(
                  (skill) => {
                    const selected =
                      form.skills?.includes(
                        skill
                      );

                    return (
                      <button
                        key={skill}
                        className={
                          selected
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          toggleFormSkill(
                            skill
                          )
                        }
                      >
                        {selected
                          ? "✓ "
                          : ""}
                        {skill}
                      </button>
                    );
                  }
                )
              ) : (
                <small>
                  Generate a roadmap first or create a custom skill later.
                </small>
              )}
            </div>
          </div>

          <label className="pj-field full">
            <span>
              Project Description
            </span>

            <textarea
              rows={5}
              value={
                form.description
              }
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value
                )
              }
              placeholder="What are you building and why is it useful?"
            />
          </label>

          <div className="pj-two-fields">
            <label className="pj-field">
              <span>
                Problem Statement
              </span>

              <textarea
                rows={6}
                value={
                  form.problem
                }
                onChange={(event) =>
                  updateField(
                    "problem",
                    event.target.value
                  )
                }
                placeholder="Describe the problem, users and objective."
              />
            </label>

            <label className="pj-field">
              <span>
                Implementation
              </span>

              <textarea
                rows={6}
                value={
                  form.implementation
                }
                onChange={(event) =>
                  updateField(
                    "implementation",
                    event.target.value
                  )
                }
                placeholder="Describe your stack, workflow, architecture and technical decisions."
              />
            </label>
          </div>

          <div className="pj-two-fields">
            <label className="pj-field">
              <span>
                Result / Outcome
              </span>

              <textarea
                rows={5}
                value={
                  form.result
                }
                onChange={(event) =>
                  updateField(
                    "result",
                    event.target.value
                  )
                }
                placeholder="What did the project achieve? Add numbers or evidence where possible."
              />
            </label>

            <label className="pj-field">
              <span>
                Evidence
              </span>

              <textarea
                rows={5}
                value={
                  form.evidence
                }
                onChange={(event) =>
                  updateField(
                    "evidence",
                    event.target.value
                  )
                }
                placeholder="Screenshot note, report link, notebook link, dashboard link, or evidence summary."
              />
            </label>
          </div>

          <div className="pj-two-fields">
            <label className="pj-field">
              <span>
                GitHub Repository
              </span>

              <input
                value={
                  form.repository
                }
                onChange={(event) =>
                  updateField(
                    "repository",
                    event.target.value
                  )
                }
                placeholder="https://github.com/..."
              />
            </label>

            <label className="pj-field">
              <span>
                Live Demo
              </span>

              <input
                value={
                  form.demo
                }
                onChange={(event) =>
                  updateField(
                    "demo",
                    event.target.value
                  )
                }
                placeholder="https://..."
              />
            </label>
          </div>

          <div className="pj-editor-footer">
            <div>
              <span>
                Current Completion
              </span>

              <strong>
                {projectCompletion(
                  form
                )}
                %
              </strong>
            </div>

            <div>
              <button
                onClick={() =>
                  setShowEditor(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                className="primary"
                onClick={
                  saveProject
                }
              >
                Save Project
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="pj-project-list">
        {visibleProjects.length ? (
          visibleProjects.map(
            (project) => (
              <ProjectCard
                key={
                  project.id
                }
                project={
                  project
                }
                expanded={
                  Boolean(
                    expanded[
                      project.id
                    ]
                  )
                }
                onToggle={() =>
                  toggleExpanded(
                    project.id
                  )
                }
                onEdit={() =>
                  openEdit(
                    project
                  )
                }
                onDelete={() =>
                  deleteProject(
                    project.id
                  )
                }
              />
            )
          )
        ) : (
          <section className="pj-empty">
            <div>
              🛠️
            </div>

            <h2>
              No projects found
            </h2>

            <p>
              Add a new project or sync the portfolio projects from your roadmap.
            </p>

            <button
              onClick={
                openNewProject
              }
            >
              Add Project
            </button>
          </section>
        )}
      </section>

      <section className="pj-portfolio-guide">
        <div>
          <span className="pj-kicker">
            WHAT MAKES A STRONG PROJECT
          </span>

          <h2>
            Build evidence that a recruiter can understand.
          </h2>
        </div>

        <div className="pj-guide-grid">
          <article>
            <span>
              01
            </span>

            <h3>
              Clear Problem
            </h3>

            <p>
              Explain the real problem, user and objective before showing tools.
            </p>
          </article>

          <article>
            <span>
              02
            </span>

            <h3>
              Real Implementation
            </h3>

            <p>
              Show code, queries, dashboard logic, architecture or another real artifact.
            </p>
          </article>

          <article>
            <span>
              03
            </span>

            <h3>
              Evidence
            </h3>

            <p>
              Add GitHub, screenshots, notebook, live demo or report evidence.
            </p>
          </article>

          <article>
            <span>
              04
            </span>

            <h3>
              Measurable Result
            </h3>

            <p>
              Show what changed, improved, predicted, automated or analyzed.
            </p>
          </article>

          <article>
            <span>
              05
            </span>

            <h3>
              Career Skills
            </h3>

            <p>
              Connect the project to the skills your target career requires.
            </p>
          </article>

          <article>
            <span>
              06
            </span>

            <h3>
              Reflection
            </h3>

            <p>
              Explain limitations, trade-offs and what you would improve next.
            </p>
          </article>
        </div>
      </section>

      <section className="pj-final-panel">
        <div>
          <span className="pj-kicker">
            NEXT STEP
          </span>

          <h2>
            Use your project evidence in the rest of NEXTPATH.
          </h2>

          <p>
            Your portfolio projects strengthen your learning evidence and can
            support re-assessment, credentials and opportunity matching.
          </p>
        </div>

        <div className="pj-final-actions">
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

      <footer className="pj-footer">
        NEXTPATH Projects · Portfolio completion is based on project documentation
        fields in this prototype. Production verification should validate external
        repositories, evidence and project ownership before treating a project as verified.
      </footer>

      <style>{`
        .pj-page {
          max-width: 1360px;
          margin: 0 auto;
          padding: 24px;
          color: #0f172a;
        }

        .pj-kicker {
          display: inline-block;
          color: #dc2626;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.4px;
        }

        .pj-hero {
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

        .pj-hero h1 {
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

        .pj-hero p {
          max-width: 850px;
          margin: 0;
          color: #64748b;
          line-height: 1.7;
        }

        .pj-flow {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
          margin-top: 17px;
        }

        .pj-flow span {
          padding: 5px 8px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          background: #ffffff;
          color: #475569;
          font-size: 8px;
          font-weight: 850;
        }

        .pj-flow span.active {
          border-color: #7c3aed;
          background: #7c3aed;
          color: #ffffff;
        }

        .pj-flow b {
          color: #94a3b8;
        }

        .pj-hero-score {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #ffffff;
        }

        .pj-completion-ring {
          width: 116px;
          height: 116px;
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .pj-completion-ring > div {
          width: 86px;
          height: 86px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%;
          background: #ffffff;
        }

        .pj-completion-ring strong {
          font-size: 22px;
        }

        .pj-completion-ring small {
          color: #64748b;
          font-size: 8px;
        }

        .pj-hero-score > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .pj-hero-score > div:last-child span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .pj-hero-score > div:last-child strong {
          margin: 4px 0;
          font-size: 17px;
        }

        .pj-hero-score > div:last-child small {
          color: #94a3b8;
        }

        .pj-summary-grid {
          display: grid;
          grid-template-columns:
            repeat(6,minmax(0,1fr));
          gap: 10px;
          margin: 18px 0;
        }

        .pj-summary-card {
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

        .pj-summary-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background:
            var(--summary-accent);
        }

        .pj-summary-card span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .pj-summary-card strong {
          margin: 5px 0;
          font-size: 20px;
        }

        .pj-summary-card small {
          margin-top: auto;
          color: #94a3b8;
        }

        .pj-strategy {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 10px;
          margin-bottom: 14px;
        }

        .pj-strategy article {
          padding: 15px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #f8fafc;
        }

        .pj-strategy span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .pj-strategy h3 {
          margin: 5px 0;
        }

        .pj-strategy p {
          margin: 0;
          color: #64748b;
          font-size: 10px;
          line-height: 1.5;
        }

        .pj-actions-bar {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
          margin-bottom: 14px;
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .pj-actions-bar h2 {
          margin: 5px 0 0;
        }

        .pj-actions {
          display: flex;
          gap: 7px;
        }

        .pj-actions button {
          padding: 10px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          font-weight: 850;
          cursor: pointer;
        }

        .pj-actions button.primary {
          border-color: #7c3aed;
          background: #7c3aed;
          color: #ffffff;
        }

        .pj-controls {
          display: grid;
          grid-template-columns:
            minmax(260px,1fr)
            200px
            200px;
          gap: 10px;
          margin-bottom: 12px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #ffffff;
        }

        .pj-controls label > span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .pj-controls input,
        .pj-controls select {
          width: 100%;
          box-sizing: border-box;
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
        }

        .pj-editor {
          margin-bottom: 14px;
          padding: 20px;
          border: 1px solid #ddd6fe;
          border-radius: 15px;
          background: #faf5ff;
        }

        .pj-editor-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .pj-editor-head h2 {
          margin: 5px 0;
        }

        .pj-editor-head > button {
          width: 34px;
          height: 34px;
          border: 1px solid #ddd6fe;
          border-radius: 8px;
          background: #ffffff;
          color: #6d28d9;
          cursor: pointer;
        }

        .pj-form-grid {
          display: grid;
          grid-template-columns:
            minmax(260px,1fr)
            160px
            160px;
          gap: 10px;
          margin-top: 13px;
        }

        .pj-form-grid label > span,
        .pj-field > span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .pj-form-grid input,
        .pj-field input,
        .pj-field textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          background: #ffffff;
        }

        .pj-field textarea {
          resize: vertical;
          line-height: 1.5;
        }

        .pj-form-grid input:focus,
        .pj-field input:focus,
        .pj-field textarea:focus {
          border-color: #7c3aed;
          box-shadow:
            0 0 0 3px
            rgba(124,58,237,.08);
        }

        .pj-skill-selector {
          margin-top: 12px;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #ffffff;
        }

        .pj-skill-selector > span {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .pj-skill-selector > div {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        .pj-skill-selector button {
          padding: 6px 8px;
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          background: #ffffff;
          color: #475569;
          font-size: 9px;
          font-weight: 800;
          cursor: pointer;
        }

        .pj-skill-selector button.selected {
          border-color: #c4b5fd;
          background: #ede9fe;
          color: #6d28d9;
        }

        .pj-field.full {
          display: block;
          margin-top: 12px;
        }

        .pj-two-fields {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 10px;
          margin-top: 10px;
        }

        .pj-editor-footer {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          align-items: center;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #ddd6fe;
        }

        .pj-editor-footer > div:first-child {
          display: flex;
          flex-direction: column;
        }

        .pj-editor-footer span {
          color: #64748b;
          font-size: 8px;
          text-transform: uppercase;
        }

        .pj-editor-footer strong {
          margin-top: 2px;
          font-size: 18px;
        }

        .pj-editor-footer > div:last-child {
          display: flex;
          gap: 7px;
        }

        .pj-editor-footer button {
          padding: 9px 11px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          font-weight: 850;
          cursor: pointer;
        }

        .pj-editor-footer button.primary {
          border-color: #7c3aed;
          background: #7c3aed;
          color: #ffffff;
        }

        .pj-project-list {
          display: grid;
          gap: 11px;
        }

        .pj-card {
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .pj-card-summary {
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

        .pj-card-left {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .pj-project-icon {
          width: 38px;
          height: 38px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #ede9fe;
          font-size: 18px;
        }

        .pj-card-topline {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          align-items: center;
        }

        .pj-status-badge,
        .pj-roadmap-badge {
          padding: 4px 7px;
          border-radius: 999px;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .pj-status-badge.verified {
          background: #dcfce7;
          color: #166534;
        }

        .pj-status-badge.ready {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .pj-status-badge.progress {
          background: #fef3c7;
          color: #92400e;
        }

        .pj-status-badge.draft {
          background: #f1f5f9;
          color: #64748b;
        }

        .pj-roadmap-badge {
          background: #ede9fe;
          color: #6d28d9;
        }

        .pj-card-left h3 {
          margin: 4px 0;
          font-size: 18px;
        }

        .pj-card-left small {
          color: #94a3b8;
        }

        .pj-card-right {
          display: grid;
          grid-template-columns:
            repeat(3,80px)
            28px;
          gap: 8px;
          align-items: center;
        }

        .pj-card-right > div {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }

        .pj-card-right span {
          color: #94a3b8;
          font-size: 7px;
          text-transform: uppercase;
        }

        .pj-card-right strong {
          margin-top: 2px;
          font-size: 13px;
        }

        .pj-card-right > b {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #475569;
        }

        .pj-progress-track {
          height: 6px;
          background: #e2e8f0;
        }

        .pj-progress-track > div {
          height: 100%;
          background:
            linear-gradient(
              90deg,
              #7c3aed,
              #8b5cf6
            );
        }

        .pj-card-details {
          padding: 17px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .pj-project-overview {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 8px;
        }

        .pj-project-overview article {
          padding: 11px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
        }

        .pj-project-overview span,
        .pj-links-grid span,
        .pj-project-meta span,
        .pj-skills-wrap > span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .pj-project-overview p,
        .pj-links-grid p {
          margin: 5px 0 0;
          color: #475569;
          font-size: 9px;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .pj-skills-wrap {
          margin-top: 9px;
          padding: 11px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
        }

        .pj-skills-wrap > div {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 7px;
        }

        .pj-skills-wrap b {
          padding: 5px 7px;
          border-radius: 999px;
          background: #ede9fe;
          color: #6d28d9;
          font-size: 8px;
        }

        .pj-links-grid {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 8px;
          margin-top: 9px;
        }

        .pj-links-grid article {
          padding: 11px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
        }

        .pj-links-grid a {
          display: inline-block;
          margin-top: 6px;
          color: #2563eb;
          font-size: 9px;
          font-weight: 850;
          text-decoration: none;
          word-break: break-all;
        }

        .pj-project-meta {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 8px;
          margin-top: 9px;
        }

        .pj-project-meta > div {
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
        }

        .pj-project-meta strong {
          margin-top: 4px;
          font-size: 11px;
        }

        .pj-card-actions {
          display: flex;
          gap: 7px;
          margin-top: 10px;
        }

        .pj-card-actions button {
          padding: 8px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          font-weight: 850;
          cursor: pointer;
        }

        .pj-card-actions button.primary {
          border-color: #7c3aed;
          background: #7c3aed;
          color: #ffffff;
        }

        .pj-empty {
          padding: 38px;
          border: 1px dashed #cbd5e1;
          border-radius: 13px;
          text-align: center;
          background: #ffffff;
        }

        .pj-empty > div {
          font-size: 38px;
        }

        .pj-empty p {
          color: #64748b;
        }

        .pj-empty button {
          padding: 9px 12px;
          border: 0;
          border-radius: 8px;
          background: #7c3aed;
          color: #ffffff;
          font-weight: 850;
          cursor: pointer;
        }

        .pj-portfolio-guide {
          margin-top: 18px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: #ffffff;
        }

        .pj-portfolio-guide h2 {
          margin: 6px 0 14px;
        }

        .pj-guide-grid {
          display: grid;
          grid-template-columns:
            repeat(6,minmax(0,1fr));
          gap: 8px;
        }

        .pj-guide-grid article {
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #f8fafc;
        }

        .pj-guide-grid span {
          color: #7c3aed;
          font-size: 8px;
          font-weight: 900;
        }

        .pj-guide-grid h3 {
          margin: 5px 0;
          font-size: 11px;
        }

        .pj-guide-grid p {
          margin: 0;
          color: #64748b;
          font-size: 8px;
          line-height: 1.45;
        }

        .pj-final-panel {
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

        .pj-final-panel h2 {
          margin: 6px 0;
        }

        .pj-final-panel p {
          max-width: 820px;
          margin: 0;
          color: #94a3b8;
          line-height: 1.55;
        }

        .pj-final-actions {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .pj-final-actions button {
          padding: 10px 12px;
          border: 1px solid #334155;
          border-radius: 8px;
          background: #111827;
          color: #cbd5e1;
          font-weight: 850;
          cursor: pointer;
        }

        .pj-final-actions button.primary {
          border-color: #7c3aed;
          background: #7c3aed;
          color: #ffffff;
        }

        .pj-footer {
          padding: 16px 2px 0;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.5;
        }

        @media(max-width: 1120px) {
          .pj-summary-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }

          .pj-guide-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }
        }

        @media(max-width: 820px) {
          .pj-page {
            padding: 14px;
          }

          .pj-hero {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          .pj-actions-bar,
          .pj-final-panel {
            align-items: stretch;
            flex-direction: column;
          }

          .pj-actions,
          .pj-final-actions {
            justify-content: flex-start;
          }

          .pj-controls,
          .pj-form-grid {
            grid-template-columns: 1fr;
          }

          .pj-two-fields,
          .pj-project-overview,
          .pj-links-grid,
          .pj-project-meta {
            grid-template-columns: 1fr;
          }

          .pj-card-summary {
            flex-direction: column;
          }

          .pj-card-right {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
            width: 100%;
          }

          .pj-card-right > div {
            align-items: flex-start;
          }

          .pj-card-right > b {
            display: none;
          }
        }

        @media(max-width: 560px) {
          .pj-summary-grid,
          .pj-guide-grid {
            grid-template-columns: 1fr;
          }

          .pj-hero-score {
            align-items: flex-start;
            flex-direction: column;
          }

          .pj-editor-footer {
            align-items: stretch;
            flex-direction: column;
          }

          .pj-editor-footer > div:last-child {
            width: 100%;
          }

          .pj-editor-footer button {
            flex: 1;
          }
        }
      `}</style>
    </main>
  );
}
