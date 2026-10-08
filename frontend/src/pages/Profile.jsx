import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEYS = {
  currentUser: "nextpathCurrentUser",
  profile: "nextpathProfile",
  verified: "nextpathVerifiedSkills",
  scores: "nextpathSkillScores",
  certificates: "nextpathCertificates",
  projects: "nextpathProjects",
  targetData: "nextpathTargetCareerData",
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}

function uid(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

function getUserName(user) {
  if (!user) return "NEXTPATH Learner";
  if (typeof user === "string") return user;

  return (
    user.fullName ||
    user.name ||
    user.username ||
    user.email ||
    "NEXTPATH Learner"
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

function formatDate(value) {
  if (!value) return "Not set";

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

  if (!raw) return "";

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  return `https://${raw}`;
}

function completionScore(profile) {
  const checks = [
    Boolean(profile.photo),
    Boolean(profile.bio?.trim()),
    Boolean(profile.personal?.fullName?.trim()),
    Boolean(profile.personal?.headline?.trim()),
    Boolean(profile.personal?.city?.trim()),
    Boolean(profile.personal?.country?.trim()),
    Boolean(profile.personal?.phone?.trim()),
    Boolean(profile.personal?.dateOfBirth),
    Boolean(profile.education?.length),
    Boolean(profile.skills?.length),
    Boolean(profile.achievements?.length),
    Boolean(profile.links?.linkedin?.trim() || profile.links?.github?.trim()),
  ];

  return Math.round(
    (checks.filter(Boolean).length /
      checks.length) *
      100
  );
}

function EmptyMessage({ text }) {
  return (
    <div className="pf-empty">
      {text}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  onAction,
}) {
  return (
    <div className="pf-section-head">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        {description && (
          <p>{description}</p>
        )}
      </div>

      {action && (
        <button
          type="button"
          onClick={onAction}
        >
          {action}
        </button>
      )}
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const currentUser =
    readJSON(
      STORAGE_KEYS.currentUser,
      null
    );

  const verified =
    readJSON(
      STORAGE_KEYS.verified,
      {}
    );

  const scores =
    readJSON(
      STORAGE_KEYS.scores,
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

  const targetCareer =
    readJSON(
      STORAGE_KEYS.targetData,
      null
    );

  const defaultProfile = {
    photo: "",
    bio: "",
    personal: {
      fullName:
        getUserName(currentUser),
      headline: "",
      email:
        currentUser?.email || "",
      phone: "",
      city: "",
      state: "",
      country: "",
      dateOfBirth: "",
      nationality: "",
      gender: "",
      languages: "",
      careerObjective: "",
    },
    links: {
      linkedin: "",
      github: "",
      portfolio: "",
      website: "",
    },
    skills: [],
    education: [],
    achievements: [],
    interests: [],
    updatedAt: "",
  };

  const [
    profile,
    setProfile,
  ] =
    useState(() => {
      const saved =
        readJSON(
          STORAGE_KEYS.profile,
          null
        );

      if (!saved) {
        return defaultProfile;
      }

      return {
        ...defaultProfile,
        ...saved,
        personal: {
          ...defaultProfile.personal,
          ...(saved.personal || {}),
        },
        links: {
          ...defaultProfile.links,
          ...(saved.links || {}),
        },
        skills:
          Array.isArray(saved.skills)
            ? saved.skills
            : [],
        education:
          Array.isArray(saved.education)
            ? saved.education
            : [],
        achievements:
          Array.isArray(saved.achievements)
            ? saved.achievements
            : [],
        interests:
          Array.isArray(saved.interests)
            ? saved.interests
            : [],
      };
    });

  const [
    activeTab,
    setActiveTab,
  ] =
    useState("overview");

  const [
    saveStatus,
    setSaveStatus,
  ] =
    useState("");

  const [
    skillInput,
    setSkillInput,
  ] =
    useState("");

  const [
    skillLevel,
    setSkillLevel,
  ] =
    useState("Intermediate");

  const [
    interestInput,
    setInterestInput,
  ] =
    useState("");

  const [
    educationForm,
    setEducationForm,
  ] =
    useState({
      institution: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      grade: "",
      description: "",
    });

  const [
    achievementForm,
    setAchievementForm,
  ] =
    useState({
      title: "",
      organization: "",
      date: "",
      description: "",
      link: "",
    });

  const completion =
    completionScore(profile);

  const verifiedSkills =
    Object.keys(
      verified || {}
    );

  const assessedSkills =
    Object.keys(
      scores || {}
    );

  const portfolioReady =
    Array.isArray(projects)
      ? projects.filter(
          (project) => {
            const values = [
              project.title,
              project.description,
              project.problem,
              project.implementation,
              project.result,
              project.evidence,
            ];

            const filled =
              values.filter(
                (item) =>
                  Boolean(
                    String(
                      item || ""
                    ).trim()
                  )
              ).length;

            return (
              filled /
                values.length >=
              0.8
            );
          }
        ).length
      : 0;

  const profileSkills =
    useMemo(() => {
      const map =
        new Map();

      profile.skills.forEach(
        (item) => {
          if (!item?.name) return;

          map.set(
            item.name.toLowerCase(),
            item
          );
        }
      );

      verifiedSkills.forEach(
        (skill) => {
          const key =
            skill.toLowerCase();

          if (!map.has(key)) {
            map.set(key, {
              id:
                uid("verified-skill"),
              name: skill,
              level: "Verified",
              source:
                "NEXTPATH Verified",
            });
          }
        }
      );

      return Array.from(
        map.values()
      );
    }, [
      profile.skills,
      verifiedSkills.join("|"),
    ]);

  function saveProfile(
    nextProfile = profile
  ) {
    const updated = {
      ...nextProfile,
      updatedAt:
        new Date().toISOString(),
    };

    setProfile(updated);

    saveJSON(
      STORAGE_KEYS.profile,
      updated
    );

    setSaveStatus(
      "Profile saved successfully."
    );

    setTimeout(
      () =>
        setSaveStatus(""),
      1800
    );
  }

  function updatePersonal(
    field,
    value
  ) {
    setProfile(
      (current) => ({
        ...current,
        personal: {
          ...current.personal,
          [field]: value,
        },
      })
    );
  }

  function updateLink(
    field,
    value
  ) {
    setProfile(
      (current) => ({
        ...current,
        links: {
          ...current.links,
          [field]: value,
        },
      })
    );
  }

  function handlePhotoChange(
    event
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "Please choose an image file."
      );
      return;
    }

    if (
      file.size >
      2 * 1024 * 1024
    ) {
      alert(
        "Please use an image smaller than 2 MB for this prototype."
      );
      return;
    }

    const reader =
      new FileReader();

    reader.onload =
      () => {
        const next = {
          ...profile,
          photo:
            String(
              reader.result ||
                ""
            ),
        };

        saveProfile(next);
      };

    reader.readAsDataURL(
      file
    );
  }

  function removePhoto() {
    const next = {
      ...profile,
      photo: "",
    };

    saveProfile(next);

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }
  }

  function addSkill() {
    const name =
      skillInput.trim();

    if (!name) return;

    const exists =
      profile.skills.some(
        (item) =>
          item.name
            .toLowerCase() ===
          name.toLowerCase()
      );

    if (exists) {
      alert(
        "This skill is already in your profile."
      );
      return;
    }

    const next = {
      ...profile,
      skills: [
        ...profile.skills,
        {
          id:
            uid("skill"),
          name,
          level:
            skillLevel,
          source:
            "Personal",
        },
      ],
    };

    setSkillInput("");
    saveProfile(next);
  }

  function removeSkill(id) {
    const next = {
      ...profile,
      skills:
        profile.skills.filter(
          (item) =>
            item.id !== id
        ),
    };

    saveProfile(next);
  }

  function addInterest() {
    const value =
      interestInput.trim();

    if (!value) return;

    if (
      profile.interests.some(
        (item) =>
          item.toLowerCase() ===
          value.toLowerCase()
      )
    ) {
      return;
    }

    const next = {
      ...profile,
      interests: [
        ...profile.interests,
        value,
      ],
    };

    setInterestInput("");
    saveProfile(next);
  }

  function removeInterest(
    value
  ) {
    const next = {
      ...profile,
      interests:
        profile.interests.filter(
          (item) =>
            item !== value
        ),
    };

    saveProfile(next);
  }

  function addEducation() {
    if (
      !educationForm.institution.trim() ||
      !educationForm.degree.trim()
    ) {
      alert(
        "Please add institution and degree."
      );
      return;
    }

    const next = {
      ...profile,
      education: [
        ...profile.education,
        {
          id:
            uid("edu"),
          ...educationForm,
        },
      ],
    };

    setEducationForm({
      institution: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      grade: "",
      description: "",
    });

    saveProfile(next);
  }

  function removeEducation(
    id
  ) {
    const next = {
      ...profile,
      education:
        profile.education.filter(
          (item) =>
            item.id !== id
        ),
    };

    saveProfile(next);
  }

  function addAchievement() {
    if (
      !achievementForm.title.trim()
    ) {
      alert(
        "Please add an achievement title."
      );
      return;
    }

    const next = {
      ...profile,
      achievements: [
        ...profile.achievements,
        {
          id:
            uid("achievement"),
          ...achievementForm,
        },
      ],
    };

    setAchievementForm({
      title: "",
      organization: "",
      date: "",
      description: "",
      link: "",
    });

    saveProfile(next);
  }

  function removeAchievement(
    id
  ) {
    const next = {
      ...profile,
      achievements:
        profile.achievements.filter(
          (item) =>
            item.id !== id
        ),
    };

    saveProfile(next);
  }

  const tabs = [
    {
      id: "overview",
      label: "Overview",
    },
    {
      id: "personal",
      label: "Personal Details",
    },
    {
      id: "skills",
      label: "Skills",
    },
    {
      id: "education",
      label: "Education",
    },
    {
      id: "achievements",
      label: "Achievements",
    },
    {
      id: "links",
      label: "Links",
    },
  ];

  return (
    <main className="pf-page">
      <section className="pf-hero">
        <div className="pf-identity">
          <div className="pf-photo-wrap">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Profile"
              />
            ) : (
              <div className="pf-photo-fallback">
                {getInitials(
                  profile.personal.fullName
                )}
              </div>
            )}

            <button
              type="button"
              className="pf-photo-edit"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              📷
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={
                handlePhotoChange
              }
              hidden
            />
          </div>

          <div className="pf-identity-copy">
            <span className="pf-kicker">
              NEXTPATH PROFILE
            </span>

            <h1>
              {profile.personal.fullName}
            </h1>

            <p className="pf-headline">
              {profile.personal.headline ||
                targetCareer?.name ||
                "Add your professional headline"}
            </p>

            <div className="pf-location-line">
              <span>
                📍{" "}
                {[
                  profile.personal.city,
                  profile.personal.state,
                  profile.personal.country,
                ]
                  .filter(Boolean)
                  .join(", ") ||
                  "Location not added"}
              </span>

              <span>
                🎯{" "}
                {targetCareer?.name ||
                  "No target career selected"}
              </span>
            </div>

            <div className="pf-hero-actions">
              <button
                type="button"
                className="primary"
                onClick={() =>
                  setActiveTab(
                    "personal"
                  )
                }
              >
                Edit Profile
              </button>

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                Change Photo
              </button>

              {profile.photo && (
                <button
                  type="button"
                  onClick={
                    removePhoto
                  }
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pf-completion-card">
          <div
            className="pf-completion-ring"
            style={{
              background:
                `conic-gradient(#2563eb ${completion * 3.6}deg,#e2e8f0 0deg)`,
            }}
          >
            <div>
              <strong>
                {completion}%
              </strong>

              <small>
                Complete
              </small>
            </div>
          </div>

          <div>
            <span>
              PROFILE STRENGTH
            </span>

            <strong>
              {completion >= 85
                ? "Excellent"
                : completion >= 65
                ? "Strong"
                : completion >= 40
                ? "Developing"
                : "Getting Started"}
            </strong>

            <small>
              Complete more sections to improve your NEXTPATH profile.
            </small>
          </div>
        </div>
      </section>

      <section className="pf-summary-grid">
        <article>
          <span>
            Verified Skills
          </span>

          <strong>
            {verifiedSkills.length}
          </strong>

          <small>
            Passed reassessment
          </small>
        </article>

        <article>
          <span>
            Personal Skills
          </span>

          <strong>
            {profile.skills.length}
          </strong>

          <small>
            Added manually
          </small>
        </article>

        <article>
          <span>
            Education
          </span>

          <strong>
            {profile.education.length}
          </strong>

          <small>
            Academic records
          </small>
        </article>

        <article>
          <span>
            Achievements
          </span>

          <strong>
            {profile.achievements.length}
          </strong>

          <small>
            Awards & milestones
          </small>
        </article>

        <article>
          <span>
            Projects
          </span>

          <strong>
            {portfolioReady}
          </strong>

          <small>
            Portfolio ready
          </small>
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

          <small>
            NEXTPATH credentials
          </small>
        </article>
      </section>

      <section className="pf-tabs">
        {tabs.map(
          (tab) => (
            <button
              key={tab.id}
              type="button"
              className={
                activeTab ===
                tab.id
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab(
                  tab.id
                )
              }
            >
              {tab.label}
            </button>
          )
        )}
      </section>

      {saveStatus && (
        <div className="pf-save-toast">
          ✓ {saveStatus}
        </div>
      )}

      {activeTab ===
        "overview" && (
        <section className="pf-overview-grid">
          <section className="pf-panel">
            <SectionHeader
              eyebrow="ABOUT"
              title="Professional Bio"
              description="A short introduction that represents you."
              action="Edit"
              onAction={() =>
                setActiveTab(
                  "personal"
                )
              }
            />

            {profile.bio ? (
              <p className="pf-bio-text">
                {profile.bio}
              </p>
            ) : (
              <EmptyMessage
                text="No bio added yet. Add a short professional introduction."
              />
            )}
          </section>

          <section className="pf-panel">
            <SectionHeader
              eyebrow="CAREER PROFILE"
              title="Career Direction"
            />

            <div className="pf-career-overview">
              <article>
                <span>
                  Target Career
                </span>

                <strong>
                  {targetCareer?.name ||
                    "Not selected"}
                </strong>
              </article>

              <article>
                <span>
                  Verified Skills
                </span>

                <strong>
                  {verifiedSkills.length}
                </strong>
              </article>

              <article>
                <span>
                  Assessed Skills
                </span>

                <strong>
                  {assessedSkills.length}
                </strong>
              </article>

              <article>
                <span>
                  Portfolio Projects
                </span>

                <strong>
                  {portfolioReady}
                </strong>
              </article>
            </div>

            <button
              className="pf-career-button"
              type="button"
              onClick={() =>
                navigate(
                  "/opportunities"
                )
              }
            >
              View Career Opportunities →
            </button>
          </section>

          <section className="pf-panel">
            <SectionHeader
              eyebrow="SKILLS"
              title="Profile Skills"
              action="Manage"
              onAction={() =>
                setActiveTab(
                  "skills"
                )
              }
            />

            {profileSkills.length ? (
              <div className="pf-chip-wrap">
                {profileSkills
                  .slice(0, 12)
                  .map(
                    (skill) => (
                      <span
                        key={
                          skill.id ||
                          skill.name
                        }
                        className={
                          skill.source ===
                          "NEXTPATH Verified"
                            ? "verified"
                            : ""
                        }
                      >
                        {skill.source ===
                          "NEXTPATH Verified"
                          ? "✓ "
                          : ""}
                        {skill.name}
                      </span>
                    )
                  )}
              </div>
            ) : (
              <EmptyMessage
                text="No skills added yet."
              />
            )}
          </section>

          <section className="pf-panel">
            <SectionHeader
              eyebrow="EDUCATION"
              title="Education"
              action="Manage"
              onAction={() =>
                setActiveTab(
                  "education"
                )
              }
            />

            {profile.education.length ? (
              <div className="pf-mini-list">
                {profile.education
                  .slice(0, 3)
                  .map(
                    (item) => (
                      <article
                        key={
                          item.id
                        }
                      >
                        <strong>
                          {item.degree}
                        </strong>

                        <span>
                          {item.field}
                        </span>

                        <small>
                          {item.institution}
                        </small>
                      </article>
                    )
                  )}
              </div>
            ) : (
              <EmptyMessage
                text="No education details added yet."
              />
            )}
          </section>

          <section className="pf-panel">
            <SectionHeader
              eyebrow="ACHIEVEMENTS"
              title="Achievements"
              action="Manage"
              onAction={() =>
                setActiveTab(
                  "achievements"
                )
              }
            />

            {profile.achievements.length ? (
              <div className="pf-mini-list">
                {profile.achievements
                  .slice(0, 3)
                  .map(
                    (item) => (
                      <article
                        key={
                          item.id
                        }
                      >
                        <strong>
                          {item.title}
                        </strong>

                        <span>
                          {item.organization ||
                            "Personal Achievement"}
                        </span>

                        <small>
                          {formatDate(
                            item.date
                          )}
                        </small>
                      </article>
                    )
                  )}
              </div>
            ) : (
              <EmptyMessage
                text="No achievements added yet."
              />
            )}
          </section>

          <section className="pf-panel">
            <SectionHeader
              eyebrow="INTERESTS"
              title="Interests"
            />

            {profile.interests.length ? (
              <div className="pf-chip-wrap">
                {profile.interests.map(
                  (item) => (
                    <span
                      key={item}
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            ) : (
              <EmptyMessage
                text="No interests added yet."
              />
            )}
          </section>
        </section>
      )}

      {activeTab ===
        "personal" && (
        <section className="pf-panel">
          <SectionHeader
            eyebrow="PERSONAL DETAILS"
            title="Personal & Professional Information"
            description="Add details that make your profile more complete."
          />

          <div className="pf-form-grid">
            <label>
              <span>
                Full Name
              </span>

              <input
                value={
                  profile.personal.fullName
                }
                onChange={(event) =>
                  updatePersonal(
                    "fullName",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <span>
                Professional Headline
              </span>

              <input
                value={
                  profile.personal.headline
                }
                onChange={(event) =>
                  updatePersonal(
                    "headline",
                    event.target.value
                  )
                }
                placeholder="Example: AIML Student | Aspiring AI Engineer"
              />
            </label>

            <label>
              <span>
                Email
              </span>

              <input
                type="email"
                value={
                  profile.personal.email
                }
                onChange={(event) =>
                  updatePersonal(
                    "email",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <span>
                Phone
              </span>

              <input
                value={
                  profile.personal.phone
                }
                onChange={(event) =>
                  updatePersonal(
                    "phone",
                    event.target.value
                  )
                }
                placeholder="+91 ..."
              />
            </label>

            <label>
              <span>
                City
              </span>

              <input
                value={
                  profile.personal.city
                }
                onChange={(event) =>
                  updatePersonal(
                    "city",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <span>
                State / Region
              </span>

              <input
                value={
                  profile.personal.state
                }
                onChange={(event) =>
                  updatePersonal(
                    "state",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <span>
                Country
              </span>

              <input
                value={
                  profile.personal.country
                }
                onChange={(event) =>
                  updatePersonal(
                    "country",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <span>
                Date of Birth
              </span>

              <input
                type="date"
                value={
                  profile.personal.dateOfBirth
                }
                onChange={(event) =>
                  updatePersonal(
                    "dateOfBirth",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <span>
                Nationality
              </span>

              <input
                value={
                  profile.personal.nationality
                }
                onChange={(event) =>
                  updatePersonal(
                    "nationality",
                    event.target.value
                  )
                }
              />
            </label>

            <label>
              <span>
                Gender
              </span>

              <select
                value={
                  profile.personal.gender
                }
                onChange={(event) =>
                  updatePersonal(
                    "gender",
                    event.target.value
                  )
                }
              >
                <option value="">
                  Prefer not to say
                </option>

                <option>
                  Male
                </option>

                <option>
                  Female
                </option>

                <option>
                  Non-binary
                </option>

                <option>
                  Other
                </option>
              </select>
            </label>

            <label className="full">
              <span>
                Languages
              </span>

              <input
                value={
                  profile.personal.languages
                }
                onChange={(event) =>
                  updatePersonal(
                    "languages",
                    event.target.value
                  )
                }
                placeholder="Example: English, Bangla, Hindi"
              />
            </label>

            <label className="full">
              <span>
                Professional Bio
              </span>

              <textarea
                rows={6}
                value={
                  profile.bio
                }
                onChange={(event) =>
                  setProfile(
                    (current) => ({
                      ...current,
                      bio:
                        event.target.value,
                    })
                  )
                }
                placeholder="Write a short professional bio about your background, strengths, interests and career goal."
              />
            </label>

            <label className="full">
              <span>
                Career Objective
              </span>

              <textarea
                rows={5}
                value={
                  profile.personal.careerObjective
                }
                onChange={(event) =>
                  updatePersonal(
                    "careerObjective",
                    event.target.value
                  )
                }
                placeholder="Describe what you want to achieve professionally."
              />
            </label>
          </div>

          <div className="pf-save-row">
            <button
              type="button"
              className="primary"
              onClick={() =>
                saveProfile()
              }
            >
              Save Personal Details
            </button>
          </div>
        </section>
      )}

      {activeTab ===
        "skills" && (
        <section className="pf-panel">
          <SectionHeader
            eyebrow="SKILLS"
            title="Skills & Expertise"
            description="Add personal skills and view NEXTPATH-verified skills."
          />

          <div className="pf-add-row">
            <input
              value={skillInput}
              onChange={(event) =>
                setSkillInput(
                  event.target.value
                )
              }
              placeholder="Add a skill, e.g. Python"
              onKeyDown={(event) => {
                if (
                  event.key ===
                  "Enter"
                ) {
                  event.preventDefault();
                  addSkill();
                }
              }}
            />

            <select
              value={skillLevel}
              onChange={(event) =>
                setSkillLevel(
                  event.target.value
                )
              }
            >
              <option>
                Beginner
              </option>

              <option>
                Intermediate
              </option>

              <option>
                Advanced
              </option>

              <option>
                Expert
              </option>
            </select>

            <button
              type="button"
              onClick={addSkill}
            >
              Add Skill
            </button>
          </div>

          <div className="pf-skill-sections">
            <section>
              <h3>
                Personal Skills
              </h3>

              {profile.skills.length ? (
                <div className="pf-skill-list">
                  {profile.skills.map(
                    (skill) => (
                      <article
                        key={
                          skill.id
                        }
                      >
                        <div>
                          <strong>
                            {skill.name}
                          </strong>

                          <span>
                            {skill.level}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeSkill(
                              skill.id
                            )
                          }
                        >
                          Remove
                        </button>
                      </article>
                    )
                  )}
                </div>
              ) : (
                <EmptyMessage
                  text="No personal skills added yet."
                />
              )}
            </section>

            <section>
              <h3>
                NEXTPATH Verified Skills
              </h3>

              {verifiedSkills.length ? (
                <div className="pf-verified-skill-list">
                  {verifiedSkills.map(
                    (skill) => (
                      <article
                        key={skill}
                      >
                        <div>
                          <span>
                            ✓
                          </span>

                          <strong>
                            {skill}
                          </strong>
                        </div>

                        <small>
                          Score{" "}
                          {Number(
                            verified[
                              skill
                            ]
                          ).toFixed(
                            1
                          )}
                          /10
                        </small>
                      </article>
                    )
                  )}
                </div>
              ) : (
                <EmptyMessage
                  text="No verified skills yet. Complete roadmap topics and pass reassessment."
                />
              )}
            </section>
          </div>

          <div className="pf-interest-block">
            <h3>
              Interests
            </h3>

            <div className="pf-add-row interest">
              <input
                value={
                  interestInput
                }
                onChange={(event) =>
                  setInterestInput(
                    event.target.value
                  )
                }
                placeholder="Example: Generative AI"
                onKeyDown={(event) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    event.preventDefault();
                    addInterest();
                  }
                }}
              />

              <button
                type="button"
                onClick={
                  addInterest
                }
              >
                Add Interest
              </button>
            </div>

            <div className="pf-chip-wrap removable">
              {profile.interests.map(
                (item) => (
                  <span
                    key={item}
                  >
                    {item}

                    <button
                      type="button"
                      onClick={() =>
                        removeInterest(
                          item
                        )
                      }
                    >
                      ×
                    </button>
                  </span>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {activeTab ===
        "education" && (
        <section className="pf-panel">
          <SectionHeader
            eyebrow="EDUCATION"
            title="Academic Background"
            description="Add your school, college, university and other formal education."
          />

          <div className="pf-form-grid education-form">
            <label>
              <span>
                Institution
              </span>

              <input
                value={
                  educationForm.institution
                }
                onChange={(event) =>
                  setEducationForm(
                    (current) => ({
                      ...current,
                      institution:
                        event.target.value,
                    })
                  )
                }
                placeholder="University / College"
              />
            </label>

            <label>
              <span>
                Degree
              </span>

              <input
                value={
                  educationForm.degree
                }
                onChange={(event) =>
                  setEducationForm(
                    (current) => ({
                      ...current,
                      degree:
                        event.target.value,
                    })
                  )
                }
                placeholder="Example: B.E. / B.Tech"
              />
            </label>

            <label>
              <span>
                Field of Study
              </span>

              <input
                value={
                  educationForm.field
                }
                onChange={(event) =>
                  setEducationForm(
                    (current) => ({
                      ...current,
                      field:
                        event.target.value,
                    })
                  )
                }
                placeholder="Example: CSE AIML"
              />
            </label>

            <label>
              <span>
                Grade / CGPA
              </span>

              <input
                value={
                  educationForm.grade
                }
                onChange={(event) =>
                  setEducationForm(
                    (current) => ({
                      ...current,
                      grade:
                        event.target.value,
                    })
                  )
                }
                placeholder="Example: 8.5 CGPA"
              />
            </label>

            <label>
              <span>
                Start Year
              </span>

              <input
                value={
                  educationForm.startYear
                }
                onChange={(event) =>
                  setEducationForm(
                    (current) => ({
                      ...current,
                      startYear:
                        event.target.value,
                    })
                  )
                }
                placeholder="2025"
              />
            </label>

            <label>
              <span>
                End Year
              </span>

              <input
                value={
                  educationForm.endYear
                }
                onChange={(event) =>
                  setEducationForm(
                    (current) => ({
                      ...current,
                      endYear:
                        event.target.value,
                    })
                  )
                }
                placeholder="2029 / Present"
              />
            </label>

            <label className="full">
              <span>
                Description
              </span>

              <textarea
                rows={4}
                value={
                  educationForm.description
                }
                onChange={(event) =>
                  setEducationForm(
                    (current) => ({
                      ...current,
                      description:
                        event.target.value,
                    })
                  )
                }
                placeholder="Add relevant subjects, activities, awards or academic highlights."
              />
            </label>
          </div>

          <div className="pf-save-row">
            <button
              type="button"
              className="primary"
              onClick={
                addEducation
              }
            >
              + Add Education
            </button>
          </div>

          <div className="pf-record-list">
            {profile.education.length ? (
              profile.education.map(
                (item) => (
                  <article
                    key={
                      item.id
                    }
                  >
                    <div className="pf-record-icon">
                      🎓
                    </div>

                    <div className="pf-record-copy">
                      <span>
                        {item.startYear ||
                          "—"}{" "}
                        –{" "}
                        {item.endYear ||
                          "Present"}
                      </span>

                      <h3>
                        {item.degree}
                      </h3>

                      <strong>
                        {item.field}
                      </strong>

                      <p>
                        {item.institution}
                      </p>

                      {item.grade && (
                        <small>
                          Grade:{" "}
                          {item.grade}
                        </small>
                      )}

                      {item.description && (
                        <p className="description">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeEducation(
                          item.id
                        )
                      }
                    >
                      Remove
                    </button>
                  </article>
                )
              )
            ) : (
              <EmptyMessage
                text="No education records added yet."
              />
            )}
          </div>
        </section>
      )}

      {activeTab ===
        "achievements" && (
        <section className="pf-panel">
          <SectionHeader
            eyebrow="ACHIEVEMENTS"
            title="Awards, Certifications & Milestones"
            description="Show your competitions, certificates, scholarships, publications and other achievements."
          />

          <div className="pf-form-grid">
            <label>
              <span>
                Achievement Title
              </span>

              <input
                value={
                  achievementForm.title
                }
                onChange={(event) =>
                  setAchievementForm(
                    (current) => ({
                      ...current,
                      title:
                        event.target.value,
                    })
                  )
                }
                placeholder="Example: Hackathon Finalist"
              />
            </label>

            <label>
              <span>
                Organization
              </span>

              <input
                value={
                  achievementForm.organization
                }
                onChange={(event) =>
                  setAchievementForm(
                    (current) => ({
                      ...current,
                      organization:
                        event.target.value,
                    })
                  )
                }
                placeholder="Issued by / organized by"
              />
            </label>

            <label>
              <span>
                Date
              </span>

              <input
                type="date"
                value={
                  achievementForm.date
                }
                onChange={(event) =>
                  setAchievementForm(
                    (current) => ({
                      ...current,
                      date:
                        event.target.value,
                    })
                  )
                }
              />
            </label>

            <label>
              <span>
                Verification / Reference Link
              </span>

              <input
                value={
                  achievementForm.link
                }
                onChange={(event) =>
                  setAchievementForm(
                    (current) => ({
                      ...current,
                      link:
                        event.target.value,
                    })
                  )
                }
                placeholder="https://..."
              />
            </label>

            <label className="full">
              <span>
                Description
              </span>

              <textarea
                rows={5}
                value={
                  achievementForm.description
                }
                onChange={(event) =>
                  setAchievementForm(
                    (current) => ({
                      ...current,
                      description:
                        event.target.value,
                    })
                  )
                }
                placeholder="Describe what you achieved and why it matters."
              />
            </label>
          </div>

          <div className="pf-save-row">
            <button
              type="button"
              className="primary"
              onClick={
                addAchievement
              }
            >
              + Add Achievement
            </button>
          </div>

          <div className="pf-achievement-grid">
            {profile.achievements.length ? (
              profile.achievements.map(
                (item) => (
                  <article
                    key={
                      item.id
                    }
                  >
                    <div className="pf-achievement-top">
                      <span>
                        🏆
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeAchievement(
                            item.id
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>

                    <small>
                      {formatDate(
                        item.date
                      )}
                    </small>

                    <h3>
                      {item.title}
                    </h3>

                    <strong>
                      {item.organization ||
                        "Personal Achievement"}
                    </strong>

                    <p>
                      {item.description ||
                        "No description added."}
                    </p>

                    {item.link && (
                      <a
                        href={normalizeUrl(
                          item.link
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Evidence ↗
                      </a>
                    )}
                  </article>
                )
              )
            ) : (
              <EmptyMessage
                text="No achievements added yet."
              />
            )}
          </div>
        </section>
      )}

      {activeTab ===
        "links" && (
        <section className="pf-panel">
          <SectionHeader
            eyebrow="PROFESSIONAL LINKS"
            title="Online Presence"
            description="Connect your profile to your professional and project work."
          />

          <div className="pf-form-grid">
            <label>
              <span>
                LinkedIn
              </span>

              <input
                value={
                  profile.links.linkedin
                }
                onChange={(event) =>
                  updateLink(
                    "linkedin",
                    event.target.value
                  )
                }
                placeholder="https://linkedin.com/in/..."
              />
            </label>

            <label>
              <span>
                GitHub
              </span>

              <input
                value={
                  profile.links.github
                }
                onChange={(event) =>
                  updateLink(
                    "github",
                    event.target.value
                  )
                }
                placeholder="https://github.com/..."
              />
            </label>

            <label>
              <span>
                Portfolio
              </span>

              <input
                value={
                  profile.links.portfolio
                }
                onChange={(event) =>
                  updateLink(
                    "portfolio",
                    event.target.value
                  )
                }
                placeholder="https://yourportfolio.com"
              />
            </label>

            <label>
              <span>
                Personal Website
              </span>

              <input
                value={
                  profile.links.website
                }
                onChange={(event) =>
                  updateLink(
                    "website",
                    event.target.value
                  )
                }
                placeholder="https://..."
              />
            </label>
          </div>

          <div className="pf-save-row">
            <button
              type="button"
              className="primary"
              onClick={() =>
                saveProfile()
              }
            >
              Save Professional Links
            </button>
          </div>

          <div className="pf-link-preview">
            {Object.entries(
              profile.links
            )
              .filter(
                ([, value]) =>
                  Boolean(
                    value?.trim()
                  )
              )
              .map(
                ([key, value]) => (
                  <a
                    key={key}
                    href={normalizeUrl(
                      value
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>
                      {key}
                    </span>

                    <strong>
                      Open ↗
                    </strong>
                  </a>
                )
              )}
          </div>
        </section>
      )}

      <section className="pf-bottom-panel">
        <div>
          <span className="pf-kicker">
            PROFILE → CAREER
          </span>

          <h2>
            Use your profile across the NEXTPATH journey.
          </h2>

          <p>
            Your skills, projects, verified credentials and achievements can
            strengthen how you present yourself when exploring career opportunities.
          </p>
        </div>

        <div>
          <button
            type="button"
            className="primary"
            onClick={() =>
              navigate(
                "/opportunities"
              )
            }
          >
            Opportunities →
          </button>

          <button
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
            type="button"
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

      <footer className="pf-footer">
        NEXTPATH Profile · Profile photo and personal details are stored locally
        in this browser in the current hackathon prototype. A production system
        should use secure backend storage, access controls and privacy protections.
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .pf-page {
          max-width: 1380px;
          margin: 0 auto;
          padding: 24px;
          color: #0f172a;
        }

        .pf-kicker {
          display: inline-block;
          color: #2563eb;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.3px;
        }

        .pf-hero {
          display: grid;
          grid-template-columns:
            minmax(0,1.35fr)
            minmax(320px,.65fr);
          gap: 24px;
          padding: 30px;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          background:
            radial-gradient(
              circle at top right,
              rgba(37,99,235,.10),
              transparent 32%
            ),
            #ffffff;
          box-shadow:
            0 18px 45px
            rgba(15,23,42,.05);
        }

        .pf-identity {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .pf-photo-wrap {
          position: relative;
          width: 128px;
          height: 128px;
          flex: 0 0 auto;
        }

        .pf-photo-wrap img,
        .pf-photo-fallback {
          width: 128px;
          height: 128px;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid #ffffff;
          box-shadow:
            0 0 0 1px #cbd5e1,
            0 14px 32px rgba(15,23,42,.12);
        }

        .pf-photo-fallback {
          display: grid;
          place-items: center;
          background:
            linear-gradient(
              135deg,
              #1e293b,
              #334155
            );
          color: #ffffff;
          font-size: 34px;
          font-weight: 900;
        }

        .pf-photo-edit {
          position: absolute;
          right: 2px;
          bottom: 6px;
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 3px solid #ffffff;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
        }

        .pf-identity-copy h1 {
          margin: 5px 0;
          font-size:
            clamp(
              30px,
              4vw,
              45px
            );
          letter-spacing: -1px;
        }

        .pf-headline {
          margin: 0;
          color: #475569;
          font-size: 14px;
        }

        .pf-location-line {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 9px;
          color: #64748b;
          font-size: 8px;
        }

        .pf-hero-actions {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          margin-top: 13px;
        }

        .pf-hero-actions button,
        .pf-save-row button,
        .pf-career-button,
        .pf-bottom-panel button {
          padding: 9px 11px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          background: #ffffff;
          color: #334155;
          font-weight: 850;
          cursor: pointer;
        }

        .pf-hero-actions button.primary,
        .pf-save-row button.primary,
        .pf-bottom-panel button.primary {
          border-color: #2563eb;
          background: #2563eb;
          color: #ffffff;
        }

        .pf-completion-card {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: #f8fafc;
        }

        .pf-completion-ring {
          width: 116px;
          height: 116px;
          display: grid;
          place-items: center;
          border-radius: 50%;
        }

        .pf-completion-ring > div {
          width: 86px;
          height: 86px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 50%;
          background: #ffffff;
        }

        .pf-completion-ring strong {
          font-size: 23px;
        }

        .pf-completion-ring small {
          color: #64748b;
          font-size: 8px;
        }

        .pf-completion-card > div:last-child {
          display: flex;
          flex-direction: column;
        }

        .pf-completion-card > div:last-child span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
        }

        .pf-completion-card > div:last-child strong {
          margin: 4px 0;
          font-size: 15px;
        }

        .pf-completion-card > div:last-child small {
          max-width: 220px;
          color: #94a3b8;
          line-height: 1.4;
        }

        .pf-summary-grid {
          display: grid;
          grid-template-columns:
            repeat(6,minmax(0,1fr));
          gap: 9px;
          margin: 16px 0;
        }

        .pf-summary-grid article {
          display: flex;
          flex-direction: column;
          padding: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 11px;
          background: #ffffff;
        }

        .pf-summary-grid span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .pf-summary-grid strong {
          margin: 4px 0;
          font-size: 19px;
        }

        .pf-summary-grid small {
          color: #94a3b8;
          font-size: 7px;
        }

        .pf-tabs {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 14px;
          padding: 8px;
          border: 1px solid #e2e8f0;
          border-radius: 11px;
          background: #ffffff;
        }

        .pf-tabs button {
          padding: 8px 10px;
          border: 0;
          border-radius: 7px;
          background: transparent;
          color: #64748b;
          font-size: 8px;
          font-weight: 850;
          cursor: pointer;
        }

        .pf-tabs button.active {
          background: #111827;
          color: #ffffff;
        }

        .pf-save-toast {
          margin-bottom: 12px;
          padding: 10px 12px;
          border: 1px solid #bbf7d0;
          border-radius: 9px;
          background: #f0fdf4;
          color: #166534;
          font-size: 9px;
          font-weight: 800;
        }

        .pf-overview-grid {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 13px;
        }

        .pf-panel {
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #ffffff;
        }

        .pf-section-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 13px;
        }

        .pf-section-head > div {
          display: flex;
          flex-direction: column;
        }

        .pf-section-head span {
          color: #64748b;
          font-size: 7px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .pf-section-head h2 {
          margin: 4px 0;
          font-size: 18px;
        }

        .pf-section-head p {
          margin: 0;
          color: #94a3b8;
          font-size: 8px;
        }

        .pf-section-head > button {
          padding: 6px 8px;
          border: 1px solid #dbeafe;
          border-radius: 7px;
          background: #eff6ff;
          color: #2563eb;
          font-size: 8px;
          font-weight: 850;
          cursor: pointer;
        }

        .pf-bio-text {
          margin: 0;
          color: #475569;
          line-height: 1.7;
          white-space: pre-wrap;
        }

        .pf-career-overview {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 7px;
        }

        .pf-career-overview article {
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
        }

        .pf-career-overview span {
          color: #64748b;
          font-size: 7px;
        }

        .pf-career-overview strong {
          margin-top: 4px;
          font-size: 11px;
        }

        .pf-career-button {
          margin-top: 9px;
          width: 100%;
        }

        .pf-chip-wrap {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .pf-chip-wrap > span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 8px;
          border-radius: 999px;
          background: #f1f5f9;
          color: #475569;
          font-size: 8px;
          font-weight: 800;
        }

        .pf-chip-wrap > span.verified {
          background: #dcfce7;
          color: #166534;
        }

        .pf-chip-wrap.removable > span button {
          width: 18px;
          height: 18px;
          border: 0;
          border-radius: 50%;
          background: rgba(15,23,42,.08);
          cursor: pointer;
        }

        .pf-mini-list {
          display: grid;
          gap: 7px;
        }

        .pf-mini-list article {
          display: flex;
          flex-direction: column;
          padding: 9px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
        }

        .pf-mini-list strong {
          font-size: 10px;
        }

        .pf-mini-list span {
          margin-top: 2px;
          color: #475569;
          font-size: 8px;
        }

        .pf-mini-list small {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 7px;
        }

        .pf-empty {
          padding: 18px;
          border: 1px dashed #cbd5e1;
          border-radius: 9px;
          background: #f8fafc;
          color: #64748b;
          font-size: 8px;
          text-align: center;
        }

        .pf-form-grid {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 11px;
        }

        .pf-form-grid label {
          display: block;
        }

        .pf-form-grid label.full {
          grid-column: 1 / -1;
        }

        .pf-form-grid label > span {
          display: block;
          margin-bottom: 5px;
          color: #475569;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .pf-form-grid input,
        .pf-form-grid select,
        .pf-form-grid textarea,
        .pf-add-row input,
        .pf-add-row select {
          width: 100%;
          padding: 10px 11px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          background: #ffffff;
          color: #0f172a;
          font: inherit;
        }

        .pf-form-grid textarea {
          resize: vertical;
          line-height: 1.5;
        }

        .pf-form-grid input:focus,
        .pf-form-grid select:focus,
        .pf-form-grid textarea:focus,
        .pf-add-row input:focus,
        .pf-add-row select:focus {
          border-color: #2563eb;
          box-shadow:
            0 0 0 3px
            rgba(37,99,235,.07);
        }

        .pf-save-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 13px;
        }

        .pf-add-row {
          display: grid;
          grid-template-columns:
            minmax(220px,1fr)
            180px
            auto;
          gap: 8px;
          margin-bottom: 14px;
        }

        .pf-add-row button {
          padding: 9px 11px;
          border: 0;
          border-radius: 8px;
          background: #2563eb;
          color: #ffffff;
          font-weight: 850;
          cursor: pointer;
        }

        .pf-add-row.interest {
          grid-template-columns:
            minmax(220px,1fr)
            auto;
        }

        .pf-skill-sections {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 13px;
        }

        .pf-skill-sections h3,
        .pf-interest-block h3 {
          margin: 0 0 9px;
          font-size: 14px;
        }

        .pf-skill-list,
        .pf-verified-skill-list {
          display: grid;
          gap: 7px;
        }

        .pf-skill-list article,
        .pf-verified-skill-list article {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
        }

        .pf-skill-list article > div {
          display: flex;
          flex-direction: column;
        }

        .pf-skill-list strong,
        .pf-verified-skill-list strong {
          font-size: 10px;
        }

        .pf-skill-list span {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 7px;
        }

        .pf-skill-list button,
        .pf-record-list article > button,
        .pf-achievement-top button {
          padding: 5px 7px;
          border: 1px solid #fecaca;
          border-radius: 6px;
          background: #ffffff;
          color: #b91c1c;
          font-size: 7px;
          font-weight: 850;
          cursor: pointer;
        }

        .pf-verified-skill-list article {
          border-color: #bbf7d0;
          background: #f0fdf4;
        }

        .pf-verified-skill-list article > div {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pf-verified-skill-list article > div span {
          color: #16a34a;
        }

        .pf-verified-skill-list small {
          color: #4d7c0f;
          font-size: 7px;
        }

        .pf-interest-block {
          margin-top: 18px;
          padding-top: 15px;
          border-top: 1px solid #e2e8f0;
        }

        .pf-record-list {
          display: grid;
          gap: 9px;
          margin-top: 16px;
        }

        .pf-record-list article {
          display: grid;
          grid-template-columns:
            42px
            minmax(0,1fr)
            auto;
          gap: 11px;
          align-items: start;
          padding: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
        }

        .pf-record-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #dbeafe;
          font-size: 18px;
        }

        .pf-record-copy {
          display: flex;
          flex-direction: column;
        }

        .pf-record-copy > span {
          color: #94a3b8;
          font-size: 7px;
          font-weight: 900;
        }

        .pf-record-copy h3 {
          margin: 4px 0 2px;
          font-size: 13px;
        }

        .pf-record-copy strong {
          color: #334155;
          font-size: 9px;
        }

        .pf-record-copy p {
          margin: 3px 0 0;
          color: #64748b;
          font-size: 8px;
        }

        .pf-record-copy small {
          margin-top: 4px;
          color: #475569;
          font-size: 7px;
        }

        .pf-record-copy p.description {
          margin-top: 7px;
          line-height: 1.45;
        }

        .pf-achievement-grid {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 9px;
          margin-top: 16px;
        }

        .pf-achievement-grid > article {
          padding: 13px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
        }

        .pf-achievement-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
        }

        .pf-achievement-top > span {
          font-size: 22px;
        }

        .pf-achievement-grid > article > small {
          display: block;
          margin-top: 8px;
          color: #94a3b8;
          font-size: 7px;
        }

        .pf-achievement-grid h3 {
          margin: 5px 0;
          font-size: 13px;
        }

        .pf-achievement-grid strong {
          color: #475569;
          font-size: 9px;
        }

        .pf-achievement-grid p {
          color: #64748b;
          font-size: 8px;
          line-height: 1.5;
        }

        .pf-achievement-grid a {
          color: #2563eb;
          font-size: 8px;
          font-weight: 850;
          text-decoration: none;
        }

        .pf-link-preview {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
          margin-top: 15px;
        }

        .pf-link-preview a {
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

        .pf-link-preview span {
          color: #64748b;
          font-size: 8px;
          text-transform: capitalize;
        }

        .pf-link-preview strong {
          color: #2563eb;
          font-size: 8px;
        }

        .pf-bottom-panel {
          display: flex;
          justify-content: space-between;
          gap: 22px;
          align-items: center;
          margin-top: 16px;
          padding: 22px;
          border-radius: 15px;
          background:
            linear-gradient(
              135deg,
              #111827,
              #0f172a
            );
          color: #ffffff;
        }

        .pf-bottom-panel h2 {
          margin: 5px 0;
        }

        .pf-bottom-panel p {
          max-width: 820px;
          margin: 0;
          color: #94a3b8;
          line-height: 1.5;
        }

        .pf-bottom-panel > div:last-child {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
        }

        .pf-bottom-panel button {
          border-color: #334155;
          background: #111827;
          color: #cbd5e1;
        }

        .pf-bottom-panel button.primary {
          border-color: #2563eb;
          background: #2563eb;
          color: #ffffff;
        }

        .pf-footer {
          padding: 15px 2px 0;
          color: #94a3b8;
          font-size: 8px;
          line-height: 1.5;
        }

        @media(max-width: 1120px) {
          .pf-summary-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }

          .pf-achievement-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .pf-link-preview {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }
        }

        @media(max-width: 820px) {
          .pf-page {
            padding: 14px;
          }

          .pf-hero {
            grid-template-columns: 1fr;
            padding: 22px;
          }

          .pf-overview-grid,
          .pf-skill-sections {
            grid-template-columns: 1fr;
          }

          .pf-bottom-panel {
            align-items: stretch;
            flex-direction: column;
          }
        }

        @media(max-width: 620px) {
          .pf-identity {
            align-items: flex-start;
            flex-direction: column;
          }

          .pf-summary-grid,
          .pf-achievement-grid,
          .pf-link-preview,
          .pf-form-grid {
            grid-template-columns: 1fr;
          }

          .pf-form-grid label.full {
            grid-column: auto;
          }

          .pf-add-row,
          .pf-add-row.interest {
            grid-template-columns: 1fr;
          }

          .pf-record-list article {
            grid-template-columns:
              42px
              minmax(0,1fr);
          }

          .pf-record-list article > button {
            grid-column:
              1 / -1;
          }

          .pf-completion-card {
            align-items: flex-start;
            flex-direction: column;
          }

          .pf-career-overview {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
