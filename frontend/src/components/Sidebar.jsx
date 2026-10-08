import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

/**
 * ============================================================
 * NEXTPATH ADVANCED SIDEBAR
 * ============================================================
 *
 * Features
 * ------------------------------------------------------------
 * - Professional desktop navigation
 * - Responsive mobile navigation
 * - Collapsible sidebar
 * - Active route indication
 * - User profile information
 * - Profile photo support
 * - Career information
 * - Progress badges
 * - Verified skills / project / credential counts
 * - Quick actions
 * - Logout
 * - Keyboard shortcut support
 * - Accessible navigation structure
 *
 * No third-party icon package is required.
 * ============================================================
 */

/* ============================================================
   01. STORAGE KEYS
   ============================================================ */

const STORAGE_KEYS =
  Object.freeze({
    loggedIn:
      "nextpathLoggedIn",

    currentUser:
      "nextpathCurrentUser",

    profile:
      "nextpathProfile",

    targetCareer:
      "nextpathTargetCareerData",

    verifiedSkills:
      "nextpathVerifiedSkills",

    certificates:
      "nextpathCertificates",

    projects:
      "nextpathProjects",

    roadmapPlan:
      "nextpathRoadmapPlan",

    roadmapProgress:
      "nextpathRoadmapProgress",

    assessmentReport:
      "nextpathAssessmentReport",

    skillGaps:
      "nextpathSkillGaps",

    selectedSkills:
      "nextpathSelectedSkills",

    sidebarCollapsed:
      "nextpathSidebarCollapsed",
  });

/* ============================================================
   02. SAFE STORAGE HELPERS
   ============================================================ */

function readJSON(
  key,
  fallback
) {
  try {
    const raw =
      window.localStorage.getItem(
        key
      );

    if (!raw) {
      return fallback;
    }

    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function readString(
  key,
  fallback = ""
) {
  try {
    const value =
      window.localStorage.getItem(
        key
      );

    return (
      value ?? fallback
    );
  } catch {
    return fallback;
  }
}

function writeString(
  key,
  value
) {
  try {
    window.localStorage.setItem(
      key,
      String(value)
    );
  } catch {
    // Ignore storage failure.
  }
}

/* ============================================================
   03. USER HELPERS
   ============================================================ */

function getUserName(
  user,
  profile
) {
  return (
    profile?.personal
      ?.fullName ||
    user?.fullName ||
    user?.name ||
    user?.username ||
    user?.email?.split(
      "@"
    )[0] ||
    "NEXTPATH User"
  );
}

function getUserEmail(
  user,
  profile
) {
  return (
    profile?.personal
      ?.email ||
    user?.email ||
    ""
  );
}

function getUserHeadline(
  profile,
  career
) {
  return (
    profile?.personal
      ?.headline ||
    career?.name ||
    "Career Explorer"
  );
}

function getInitials(name) {
  return String(
    name || "NP"
  )
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      (part) =>
        part?.[0] || ""
    )
    .join("")
    .toUpperCase();
}

/* ============================================================
   04. PROJECT COMPLETION HELPER
   ============================================================ */

function projectCompletion(
  project
) {
  const checks = [
    Boolean(
      String(
        project?.title || ""
      ).trim()
    ),

    Boolean(
      String(
        project?.description ||
          ""
      ).trim()
    ),

    Boolean(
      String(
        project?.problem || ""
      ).trim()
    ),

    Boolean(
      String(
        project?.implementation ||
          ""
      ).trim()
    ),

    Boolean(
      String(
        project?.result || ""
      ).trim()
    ),

    Boolean(
      String(
        project?.evidence || ""
      ).trim()
    ),
  ];

  return (
    checks.filter(Boolean)
      .length /
    checks.length
  ) * 100;
}

/* ============================================================
   05. ROADMAP COMPLETION HELPER
   ============================================================ */

function calculateRoadmapCompletion(
  plan,
  progress
) {
  if (
    !Array.isArray(plan) ||
    !plan.length
  ) {
    return {
      total: 0,
      completed: 0,
      percentage: 0,
    };
  }

  let total = 0;
  let completed = 0;

  plan.forEach(
    (item) => {
      const topics =
        Array.isArray(
          item?.topics
        )
          ? item.topics
          : [];

      topics.forEach(
        (topic) => {
          total += 1;

          if (
            progress?.[
              topic.id
            ]
          ) {
            completed += 1;
          }
        }
      );
    }
  );

  return {
    total,
    completed,

    percentage:
      total > 0
        ? Math.round(
            (
              completed /
              total
            ) * 100
          )
        : 0,
  };
}

/* ============================================================
   06. NAVIGATION DEFINITION
   ============================================================ */

const NAVIGATION_GROUPS =
  [
    {
      id: "main",
      label: "Overview",

      items: [
        {
          label:
            "Dashboard",

          path:
            "/",

          icon:
            "⌂",

          description:
            "Career readiness overview",

          exact:
            true,
        },

        {
          label:
            "Profile",

          path:
            "/profile",

          icon:
            "◎",

          description:
            "Personal career profile",
        },
      ],
    },

    {
      id: "career",
      label:
        "Career Planning",

      items: [
        {
          label:
            "Target Career",

          path:
            "/target-career",

          icon:
            "🎯",

          description:
            "Choose your target role",
        },

        {
          label:
            "Required Skills",

          path:
            "/required-skills",

          icon:
            "◫",

          description:
            "Career skill requirements",
        },

        {
          label:
            "Skill Gap",

          path:
            "/skill-gap",

          icon:
            "↗",

          description:
            "Compare current vs required",
        },
      ],
    },

    {
      id: "assessment",
      label:
        "Assessment",

      items: [
        {
          label:
            "Assessment",

          path:
            "/assessment",

          icon:
            "✦",

          description:
            "Test demonstrated ability",
        },

        {
          label:
            "Assessment Report",

          path:
            "/assessment-report",

          icon:
            "▤",

          description:
            "Review your results",
        },
      ],
    },

    {
      id: "learning",
      label:
        "Learning",

      items: [
        {
          label:
            "Roadmap",

          path:
            "/roadmap",

          icon:
            "🗺",

          description:
            "Personalized learning plan",
        },

        {
          label:
            "Progress",

          path:
            "/progress",

          icon:
            "✓",

          description:
            "Track learning and reassessment",
        },

        {
          label:
            "Projects",

          path:
            "/projects",

          icon:
            "◆",

          description:
            "Build portfolio evidence",
        },
      ],
    },

    {
      id: "career-growth",
      label:
        "Career Growth",

      items: [
        {
          label:
            "Credentials",

          path:
            "/credentials",

          icon:
            "★",

          description:
            "Verified NEXTPATH skills",
        },

        {
          label:
            "Opportunities",

          path:
            "/opportunities",

          icon:
            "⌁",

          description:
            "Role matching and jobs",
        },
      ],
    },
  ];

/* ============================================================
   07. NAVIGATION ITEM
   ============================================================ */

function SidebarNavItem({
  item,
  collapsed,
  badge,
  onNavigate,
}) {
  return (
    <NavLink
      to={item.path}
      end={item.exact}
      className={({
        isActive,
      }) =>
        [
          "np-side-link",

          isActive
            ? "active"
            : "",

          collapsed
            ? "collapsed"
            : "",
        ]
          .filter(Boolean)
          .join(" ")
      }
      title={
        collapsed
          ? item.label
          : undefined
      }
      onClick={
        onNavigate
      }
    >
      <span className="np-side-link-icon">
        {item.icon}
      </span>

      {!collapsed && (
        <>
          <span className="np-side-link-content">
            <strong>
              {item.label}
            </strong>

            <small>
              {
                item.description
              }
            </small>
          </span>

          {badge !==
            undefined &&
            badge !== null &&
            badge !== "" && (
              <span className="np-side-badge">
                {badge}
              </span>
            )}
        </>
      )}
    </NavLink>
  );
}

/* ============================================================
   08. USER CARD
   ============================================================ */

function SidebarUserCard({
  collapsed,
  userName,
  userEmail,
  headline,
  photo,
  navigate,
}) {
  if (collapsed) {
    return (
      <button
        type="button"
        className="np-side-user-collapsed"
        title={userName}
        onClick={() =>
          navigate(
            "/profile"
          )
        }
      >
        {photo ? (
          <img
            src={photo}
            alt=""
          />
        ) : (
          <span>
            {getInitials(
              userName
            )}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      className="np-side-user-card"
      onClick={() =>
        navigate(
          "/profile"
        )
      }
    >
      <div className="np-side-user-avatar">
        {photo ? (
          <img
            src={photo}
            alt=""
          />
        ) : (
          <span>
            {getInitials(
              userName
            )}
          </span>
        )}
      </div>

      <div className="np-side-user-copy">
        <strong>
          {userName}
        </strong>

        <span>
          {headline}
        </span>

        {userEmail && (
          <small>
            {userEmail}
          </small>
        )}
      </div>

      <span className="np-side-user-arrow">
        ›
      </span>
    </button>
  );
}

/* ============================================================
   09. SIDEBAR COMPONENT
   ============================================================ */

export default function Sidebar() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const sidebarRef =
    useRef(null);

  const [
    collapsed,
    setCollapsed,
  ] =
    useState(
      () =>
        readString(
          STORAGE_KEYS
            .sidebarCollapsed,
          "false"
        ) === "true"
    );

  const [
    mobileOpen,
    setMobileOpen,
  ] =
    useState(false);

  const [
    dataVersion,
    setDataVersion,
  ] =
    useState(0);

  const user =
    readJSON(
      STORAGE_KEYS.currentUser,
      null
    );

  const profile =
    readJSON(
      STORAGE_KEYS.profile,
      null
    );

  const career =
    readJSON(
      STORAGE_KEYS.targetCareer,
      null
    );

  const verifiedSkills =
    readJSON(
      STORAGE_KEYS
        .verifiedSkills,
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

  const roadmapPlan =
    readJSON(
      STORAGE_KEYS.roadmapPlan,
      []
    );

  const roadmapProgress =
    readJSON(
      STORAGE_KEYS
        .roadmapProgress,
      {}
    );

  const assessmentReport =
    readJSON(
      STORAGE_KEYS
        .assessmentReport,
      null
    );

  const skillGaps =
    readJSON(
      STORAGE_KEYS.skillGaps,
      []
    );

  const selectedSkills =
    readJSON(
      STORAGE_KEYS
        .selectedSkills,
      {}
    );

  const userName =
    getUserName(
      user,
      profile
    );

  const userEmail =
    getUserEmail(
      user,
      profile
    );

  const headline =
    getUserHeadline(
      profile,
      career
    );

  const photo =
    profile?.photo || "";

  const roadmap =
    useMemo(
      () =>
        calculateRoadmapCompletion(
          roadmapPlan,
          roadmapProgress
        ),

      [
        roadmapPlan,
        roadmapProgress,
        dataVersion,
      ]
    );

  const verifiedCount =
    Object.keys(
      verifiedSkills || {}
    ).length;

  const credentialCount =
    Array.isArray(
      certificates
    )
      ? certificates.length
      : 0;

  const projectCount =
    Array.isArray(
      projects
    )
      ? projects.length
      : 0;

  const portfolioReadyCount =
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

  const activeGapCount =
    Array.isArray(
      skillGaps
    )
      ? skillGaps.filter(
          (item) =>
            Number(
              item?.gapPercentage ??
                0
            ) > 0
        ).length
      : 0;

  const selectedSkillCount =
    Array.isArray(
      selectedSkills
    )
      ? selectedSkills.length
      : Object.keys(
          selectedSkills || {}
        ).length;

  /* ==========================================================
     10. BADGE MAP
     ========================================================== */

  const badgeMap =
    {
      "/required-skills":
        selectedSkillCount ||
        "",

      "/assessment-report":
        assessmentReport
          ? "✓"
          : "",

      "/skill-gap":
        activeGapCount ||
        "",

      "/roadmap":
        roadmap.total
          ? `${roadmap.percentage}%`
          : "",

      "/progress":
        roadmap.completed ||
        "",

      "/projects":
        projectCount || "",

      "/credentials":
        credentialCount ||
        verifiedCount ||
        "",

      "/opportunities":
        verifiedCount > 0
          ? "NEW"
          : "",
    };

  /* ==========================================================
     11. UPDATE WHEN STORAGE CHANGES
     ========================================================== */

  useEffect(
    () => {
      function handleStorage() {
        setDataVersion(
          (value) =>
            value + 1
        );
      }

      window.addEventListener(
        "storage",
        handleStorage
      );

      window.addEventListener(
        "nextpath:data-updated",
        handleStorage
      );

      return () => {
        window.removeEventListener(
          "storage",
          handleStorage
        );

        window.removeEventListener(
          "nextpath:data-updated",
          handleStorage
        );
      };
    },
    []
  );

  /* ==========================================================
     12. CLOSE MOBILE MENU ON ROUTE CHANGE
     ========================================================== */

  useEffect(
    () => {
      setMobileOpen(
        false
      );
    },
    [location.pathname]
  );

  /* ==========================================================
     13. KEYBOARD SHORTCUT
     Ctrl/Cmd + B toggles sidebar
     ========================================================== */

  useEffect(
    () => {
      function handleKeyDown(
        event
      ) {
        const toggle =
          (
            event.ctrlKey ||
            event.metaKey
          ) &&
          event.key.toLowerCase() ===
            "b";

        if (!toggle) {
          return;
        }

        event.preventDefault();

        setCollapsed(
          (current) =>
            !current
        );
      }

      window.addEventListener(
        "keydown",
        handleKeyDown
      );

      return () => {
        window.removeEventListener(
          "keydown",
          handleKeyDown
        );
      };
    },
    []
  );

  /* ==========================================================
     14. PERSIST COLLAPSED STATE
     ========================================================== */

  useEffect(
    () => {
      writeString(
        STORAGE_KEYS
          .sidebarCollapsed,
        collapsed
      );
    },
    [collapsed]
  );

  /* ==========================================================
     15. ESC CLOSE MOBILE MENU
     ========================================================== */

  useEffect(
    () => {
      if (!mobileOpen) {
        return undefined;
      }

      function handleEscape(
        event
      ) {
        if (
          event.key ===
          "Escape"
        ) {
          setMobileOpen(
            false
          );
        }
      }

      window.addEventListener(
        "keydown",
        handleEscape
      );

      return () => {
        window.removeEventListener(
          "keydown",
          handleEscape
        );
      };
    },
    [mobileOpen]
  );

  /* ==========================================================
     16. LOGOUT
     ========================================================== */

  function handleLogout() {
    const confirmed =
      window.confirm(
        "Do you want to sign out of NEXTPATH?"
      );

    if (!confirmed) {
      return;
    }

    try {
      window.localStorage.removeItem(
        "nextpathLoggedIn"
      );

      window.localStorage.removeItem(
        "nextpathAccessToken"
      );

      window.localStorage.removeItem(
        "nextpathRefreshToken"
      );

      window.localStorage.removeItem(
        "nextpathCurrentUser"
      );
    } catch {
      // Continue to login even if
      // storage cleanup fails.
    }

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  }

  /* ==========================================================
     17. QUICK CONTINUE DESTINATION
     ========================================================== */

  function getContinueRoute() {
    if (!career) {
      return "/target-career";
    }

    if (
      !selectedSkillCount
    ) {
      return "/required-skills";
    }

    if (
      !assessmentReport
    ) {
      return "/assessment";
    }

    if (
      !Array.isArray(
        skillGaps
      ) ||
      !skillGaps.length
    ) {
      return "/skill-gap";
    }

    if (!roadmap.total) {
      return "/roadmap";
    }

    if (
      roadmap.percentage <
      100
    ) {
      return "/progress";
    }

    return "/opportunities";
  }

  const continueRoute =
    getContinueRoute();

  /* ==========================================================
     18. RENDER
     ========================================================== */

  return (
    <>
      <button
        type="button"
        className="np-mobile-menu-button"
        onClick={() =>
          setMobileOpen(
            true
          )
        }
        aria-label="Open navigation"
      >
        <span>
          ☰
        </span>

        <strong>
          NEXTPATH
        </strong>
      </button>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="np-side-overlay"
          onClick={() =>
            setMobileOpen(
              false
            )
          }
        />
      )}

      <aside
        ref={sidebarRef}
        className={[
          "np-sidebar",

          collapsed
            ? "is-collapsed"
            : "",

          mobileOpen
            ? "is-mobile-open"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="np-side-top">
          <button
            type="button"
            className="np-side-brand"
            onClick={() =>
              navigate("/")
            }
            aria-label="Go to dashboard"
          >
            <span className="np-side-brand-mark">
              N
            </span>

            {!collapsed && (
              <span className="np-side-brand-copy">
                <strong>
                  NEXTPATH
                </strong>

                <small>
                  Career Intelligence
                </small>
              </span>
            )}
          </button>

          <button
            type="button"
            className="np-side-collapse"
            title={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            onClick={() =>
              setCollapsed(
                (current) =>
                  !current
              )
            }
          >
            {collapsed
              ? "›"
              : "‹"}
          </button>

          <button
            type="button"
            className="np-side-mobile-close"
            aria-label="Close navigation"
            onClick={() =>
              setMobileOpen(
                false
              )
            }
          >
            ×
          </button>
        </div>

        {!collapsed && (
          <div className="np-side-career">
            <span>
              TARGET CAREER
            </span>

            <strong>
              {career?.name ||
                "Not selected"}
            </strong>

            <small>
              {career
                ? "Your active career goal"
                : "Choose a career to personalize NEXTPATH"}
            </small>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/target-career"
                )
              }
            >
              {career
                ? "Change Career"
                : "Choose Career"}
            </button>
          </div>
        )}

        {!collapsed && (
          <button
            type="button"
            className="np-side-continue"
            onClick={() =>
              navigate(
                continueRoute
              )
            }
          >
            <span>
              Continue Journey
            </span>

            <strong>
              {roadmap.total
                ? `${roadmap.percentage}% roadmap`
                : career
                ? "Continue setup"
                : "Start NEXTPATH"}
            </strong>

            <span className="np-side-continue-arrow">
              →
            </span>
          </button>
        )}

        <nav
          className="np-side-nav"
          aria-label="Primary navigation"
        >
          {NAVIGATION_GROUPS.map(
            (group) => (
              <section
                key={
                  group.id
                }
                className="np-side-nav-group"
              >
                {!collapsed && (
                  <span className="np-side-nav-label">
                    {group.label}
                  </span>
                )}

                <div className="np-side-nav-list">
                  {group.items.map(
                    (item) => (
                      <SidebarNavItem
                        key={
                          item.path
                        }
                        item={
                          item
                        }
                        collapsed={
                          collapsed
                        }
                        badge={
                          badgeMap[
                            item.path
                          ]
                        }
                        onNavigate={() =>
                          setMobileOpen(
                            false
                          )
                        }
                      />
                    )
                  )}
                </div>
              </section>
            )
          )}
        </nav>

        {!collapsed && (
          <section className="np-side-summary">
            <div className="np-side-summary-head">
              <span>
                PROFILE SIGNALS
              </span>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/profile"
                  )
                }
              >
                View
              </button>
            </div>

            <div className="np-side-summary-grid">
              <article>
                <strong>
                  {
                    verifiedCount
                  }
                </strong>

                <span>
                  Verified
                </span>
              </article>

              <article>
                <strong>
                  {
                    portfolioReadyCount
                  }
                </strong>

                <span>
                  Projects
                </span>
              </article>

              <article>
                <strong>
                  {
                    credentialCount
                  }
                </strong>

                <span>
                  Credentials
                </span>
              </article>

              <article>
                <strong>
                  {
                    activeGapCount
                  }
                </strong>

                <span>
                  Gaps
                </span>
              </article>
            </div>
          </section>
        )}

        <div className="np-side-bottom">
          <SidebarUserCard
            collapsed={
              collapsed
            }
            userName={
              userName
            }
            userEmail={
              userEmail
            }
            headline={
              headline
            }
            photo={
              photo
            }
            navigate={
              navigate
            }
          />

          <button
            type="button"
            className={[
              "np-side-logout",

              collapsed
                ? "collapsed"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            title={
              collapsed
                ? "Sign out"
                : undefined
            }
            onClick={
              handleLogout
            }
          >
            <span>
              ⇥
            </span>

            {!collapsed && (
              <>
                <strong>
                  Sign Out
                </strong>

                <small>
                  End this session
                </small>
              </>
            )}
          </button>

          {!collapsed && (
            <small className="np-side-shortcut">
              Ctrl/Cmd + B to collapse
            </small>
          )}
        </div>
      </aside>

      <style>{`
        /* =====================================================
           SIDEBAR LAYOUT
           ===================================================== */

        .np-sidebar {
          position: sticky;
          top: 0;
          z-index: 100;

          width:
            var(
              --sidebar-width,
              250px
            );

          height: 100vh;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          border-right:
            1px solid
            #e2e8f0;

          background:
            rgba(
              255,
              255,
              255,
              0.97
            );

          backdrop-filter:
            blur(14px);

          box-shadow:
            10px 0 35px
            rgba(
              15,
              23,
              42,
              0.025
            );

          transition:
            width 180ms ease,
            transform 180ms ease;
        }

        .np-sidebar.is-collapsed {
          width: 78px;
        }

        /* =====================================================
           TOP AREA
           ===================================================== */

        .np-side-top {
          min-height: 68px;

          display: flex;
          align-items: center;

          gap: 8px;

          padding: 11px 12px;

          border-bottom:
            1px solid
            #f1f5f9;
        }

        .np-side-brand {
          min-width: 0;

          flex: 1;

          display: flex;
          align-items: center;

          gap: 10px;

          padding: 0;

          text-align: left;

          cursor: pointer;
        }

        .np-side-brand-mark {
          width: 40px;
          height: 40px;

          flex: 0 0 auto;

          display: grid;
          place-items: center;

          border-radius: 11px;

          background:
            linear-gradient(
              135deg,
              #111827,
              #2563eb
            );

          color: #ffffff;

          font-size: 18px;
          font-weight: 950;

          box-shadow:
            0 8px 20px
            rgba(
              37,
              99,
              235,
              0.16
            );
        }

        .np-side-brand-copy {
          min-width: 0;

          display: flex;
          flex-direction: column;
        }

        .np-side-brand-copy strong {
          color: #0f172a;

          font-size: 13px;
          font-weight: 950;
          letter-spacing: 0.08em;
        }

        .np-side-brand-copy small {
          margin-top: 2px;

          color: #94a3b8;

          font-size: 7px;
          font-weight: 700;
        }

        .np-side-collapse {
          width: 30px;
          height: 30px;

          flex: 0 0 auto;

          display: grid;
          place-items: center;

          border:
            1px solid
            #e2e8f0;

          border-radius: 8px;

          background: #ffffff;

          color: #64748b;

          font-size: 18px;

          cursor: pointer;

          transition:
            background 120ms ease,
            color 120ms ease,
            border-color 120ms ease;
        }

        .np-side-collapse:hover {
          border-color:
            #cbd5e1;

          background:
            #f8fafc;

          color:
            #0f172a;
        }

        .np-side-mobile-close {
          display: none;
        }

        /* =====================================================
           TARGET CAREER
           ===================================================== */

        .np-side-career {
          margin:
            12px
            12px
            8px;

          padding: 11px;

          display: flex;
          flex-direction: column;

          border:
            1px solid
            #dbeafe;

          border-radius: 11px;

          background:
            linear-gradient(
              145deg,
              #eff6ff,
              #f8fbff
            );
        }

        .np-side-career > span {
          color: #60a5fa;

          font-size: 7px;
          font-weight: 950;
          letter-spacing: .08em;
        }

        .np-side-career > strong {
          margin-top: 4px;

          color: #1e3a8a;

          font-size: 11px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .np-side-career > small {
          margin-top: 3px;

          color: #64748b;

          font-size: 7px;
          line-height: 1.35;
        }

        .np-side-career > button {
          margin-top: 8px;

          align-self: flex-start;

          padding:
            5px
            7px;

          border:
            1px solid
            #bfdbfe;

          border-radius: 6px;

          background: #ffffff;

          color: #2563eb;

          font-size: 7px;
          font-weight: 900;

          cursor: pointer;
        }

        /* =====================================================
           CONTINUE JOURNEY
           ===================================================== */

        .np-side-continue {
          position: relative;

          margin:
            0
            12px
            10px;

          padding:
            10px
            34px
            10px
            11px;

          display: flex;
          flex-direction: column;

          border-radius: 10px;

          background:
            linear-gradient(
              135deg,
              #111827,
              #1e293b
            );

          color: #ffffff;

          text-align: left;

          cursor: pointer;
        }

        .np-side-continue > span:first-child {
          color: #94a3b8;

          font-size: 7px;
          font-weight: 850;
          letter-spacing: .04em;
        }

        .np-side-continue > strong {
          margin-top: 3px;

          font-size: 9px;
        }

        .np-side-continue-arrow {
          position: absolute;

          right: 12px;
          top: 50%;

          transform:
            translateY(-50%);

          color:
            #60a5fa;

          font-size: 17px;
        }

        /* =====================================================
           NAVIGATION
           ===================================================== */

        .np-side-nav {
          flex: 1;

          min-height: 0;

          overflow-y: auto;

          padding:
            4px
            10px
            12px;

          scrollbar-width: thin;

          scrollbar-color:
            #e2e8f0
            transparent;
        }

        .np-side-nav::-webkit-scrollbar {
          width: 5px;
        }

        .np-side-nav::-webkit-scrollbar-thumb {
          border-radius: 999px;

          background:
            #e2e8f0;
        }

        .np-side-nav-group {
          margin-top: 10px;
        }

        .np-side-nav-label {
          display: block;

          padding:
            0
            8px
            6px;

          color:
            #94a3b8;

          font-size: 6.5px;
          font-weight: 950;
          letter-spacing: .10em;
          text-transform: uppercase;
        }

        .np-side-nav-list {
          display: grid;

          gap: 3px;
        }

        .np-side-link {
          position: relative;

          min-height: 44px;

          display: grid;

          grid-template-columns:
            34px
            minmax(0,1fr)
            auto;

          gap: 8px;

          align-items: center;

          padding:
            6px
            8px;

          border:
            1px solid
            transparent;

          border-radius:
            9px;

          color:
            #475569;

          text-decoration: none;

          transition:
            background 120ms ease,
            border-color 120ms ease,
            color 120ms ease,
            transform 120ms ease;
        }

        .np-side-link:hover {
          border-color:
            #e2e8f0;

          background:
            #f8fafc;

          color:
            #0f172a;

          transform:
            translateX(1px);
        }

        .np-side-link.active {
          border-color:
            #dbeafe;

          background:
            #eff6ff;

          color:
            #1d4ed8;
        }

        .np-side-link.active::before {
          content: "";

          position: absolute;

          left: -10px;
          top: 9px;
          bottom: 9px;

          width: 3px;

          border-radius:
            0
            4px
            4px
            0;

          background:
            #2563eb;
        }

        .np-side-link.collapsed {
          grid-template-columns:
            1fr;

          justify-items: center;

          min-height: 46px;

          padding: 6px;
        }

        .np-side-link.collapsed.active::before {
          left: -10px;
        }

        .np-side-link-icon {
          width: 32px;
          height: 32px;

          display: grid;
          place-items: center;

          border-radius: 8px;

          background:
            #f1f5f9;

          color:
            #475569;

          font-size: 14px;
          font-weight: 900;

          transition:
            background 120ms ease,
            color 120ms ease;
        }

        .np-side-link.active .np-side-link-icon {
          background:
            #dbeafe;

          color:
            #1d4ed8;
        }

        .np-side-link-content {
          min-width: 0;

          display: flex;
          flex-direction: column;
        }

        .np-side-link-content strong {
          color: inherit;

          font-size: 9px;
          font-weight: 850;
        }

        .np-side-link-content small {
          margin-top: 2px;

          overflow: hidden;

          color: #94a3b8;

          font-size: 6.5px;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }

        .np-side-badge {
          min-width: 22px;

          padding:
            3px
            5px;

          border-radius:
            999px;

          background:
            #f1f5f9;

          color:
            #64748b;

          font-size: 6px;
          font-weight: 900;
          text-align: center;
        }

        .np-side-link.active .np-side-badge {
          background:
            #ffffff;

          color:
            #2563eb;
        }

        /* =====================================================
           SUMMARY
           ===================================================== */

        .np-side-summary {
          margin:
            0
            12px
            10px;

          padding: 10px;

          border:
            1px solid
            #e2e8f0;

          border-radius:
            10px;

          background:
            #f8fafc;
        }

        .np-side-summary-head {
          display: flex;

          justify-content:
            space-between;

          gap: 8px;

          align-items: center;
        }

        .np-side-summary-head > span {
          color:
            #94a3b8;

          font-size:
            6.5px;

          font-weight:
            950;

          letter-spacing:
            .08em;
        }

        .np-side-summary-head > button {
          color:
            #2563eb;

          font-size:
            6.5px;

          font-weight:
            900;

          cursor: pointer;
        }

        .np-side-summary-grid {
          display: grid;

          grid-template-columns:
            repeat(
              4,
              minmax(0,1fr)
            );

          gap: 4px;

          margin-top:
            8px;
        }

        .np-side-summary-grid article {
          display: flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          padding:
            6px
            3px;

          border:
            1px solid
            #e2e8f0;

          border-radius:
            7px;

          background:
            #ffffff;
        }

        .np-side-summary-grid strong {
          font-size:
            10px;
        }

        .np-side-summary-grid span {
          margin-top:
            1px;

          color:
            #94a3b8;

          font-size:
            5.5px;
        }

        /* =====================================================
           USER AREA
           ===================================================== */

        .np-side-bottom {
          padding:
            10px
            12px
            12px;

          border-top:
            1px solid
            #f1f5f9;

          background:
            rgba(
              255,
              255,
              255,
              .96
            );
        }

        .np-side-user-card {
          width: 100%;

          display: grid;

          grid-template-columns:
            38px
            minmax(0,1fr)
            auto;

          gap: 8px;

          align-items: center;

          padding: 8px;

          border:
            1px solid
            #e2e8f0;

          border-radius:
            10px;

          background:
            #ffffff;

          text-align: left;

          cursor: pointer;

          transition:
            background 120ms ease,
            border-color 120ms ease;
        }

        .np-side-user-card:hover {
          border-color:
            #cbd5e1;

          background:
            #f8fafc;
        }

        .np-side-user-avatar {
          width: 36px;
          height: 36px;

          overflow: hidden;

          display: grid;
          place-items: center;

          border-radius: 10px;

          background:
            linear-gradient(
              135deg,
              #334155,
              #111827
            );

          color: #ffffff;

          font-size: 10px;
          font-weight: 900;
        }

        .np-side-user-avatar img {
          width: 100%;
          height: 100%;

          object-fit: cover;
        }

        .np-side-user-copy {
          min-width: 0;

          display: flex;
          flex-direction: column;
        }

        .np-side-user-copy strong {
          overflow: hidden;

          color:
            #0f172a;

          font-size:
            8.5px;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }

        .np-side-user-copy span {
          margin-top:
            1px;

          overflow:
            hidden;

          color:
            #64748b;

          font-size:
            6.5px;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }

        .np-side-user-copy small {
          margin-top:
            1px;

          overflow:
            hidden;

          color:
            #94a3b8;

          font-size:
            6px;

          text-overflow:
            ellipsis;

          white-space:
            nowrap;
        }

        .np-side-user-arrow {
          color:
            #94a3b8;

          font-size:
            15px;
        }

        .np-side-user-collapsed {
          width: 44px;
          height: 44px;

          margin: 0 auto;

          overflow: hidden;

          display: grid;
          place-items: center;

          border-radius:
            11px;

          background:
            linear-gradient(
              135deg,
              #334155,
              #111827
            );

          color: #ffffff;

          cursor: pointer;
        }

        .np-side-user-collapsed img {
          width: 100%;
          height: 100%;

          object-fit: cover;
        }

        .np-side-user-collapsed span {
          font-size: 10px;
          font-weight: 900;
        }

        /* =====================================================
           LOGOUT
           ===================================================== */

        .np-side-logout {
          width: 100%;

          display: grid;

          grid-template-columns:
            28px
            minmax(0,1fr);

          gap: 7px;

          align-items: center;

          margin-top:
            6px;

          padding: 7px;

          border:
            1px solid
            transparent;

          border-radius:
            8px;

          color:
            #64748b;

          text-align: left;

          cursor: pointer;
        }

        .np-side-logout:hover {
          border-color:
            #fecaca;

          background:
            #fef2f2;

          color:
            #b91c1c;
        }

        .np-side-logout > span {
          width: 28px;
          height: 28px;

          display: grid;
          place-items: center;

          border-radius:
            7px;

          background:
            #f8fafc;

          font-size: 14px;
        }

        .np-side-logout > strong {
          align-self:
            end;

          font-size:
            8px;
        }

        .np-side-logout > small {
          grid-column:
            2;

          margin-top:
            -4px;

          color:
            #94a3b8;

          font-size:
            6px;
        }

        .np-side-logout.collapsed {
          grid-template-columns:
            1fr;

          justify-items:
            center;

          padding: 5px;
        }

        .np-side-shortcut {
          display: block;

          margin-top: 5px;

          color:
            #cbd5e1;

          font-size:
            5.5px;

          text-align:
            center;
        }

        /* =====================================================
           MOBILE HEADER
           ===================================================== */

        .np-mobile-menu-button {
          display: none;
        }

        .np-side-overlay {
          display: none;
        }

        /* =====================================================
           DESKTOP COLLAPSED
           ===================================================== */

        .np-sidebar.is-collapsed .np-side-top {
          justify-content:
            center;

          flex-direction:
            column;

          min-height:
            112px;
        }

        .np-sidebar.is-collapsed .np-side-brand {
          flex:
            0
            0
            auto;
        }

        .np-sidebar.is-collapsed .np-side-nav {
          padding-inline:
            10px;
        }

        .np-sidebar.is-collapsed .np-side-nav-group {
          margin-top:
            7px;
        }

        .np-sidebar.is-collapsed .np-side-bottom {
          display: grid;

          justify-items:
            center;
        }

        .np-sidebar.is-collapsed .np-side-logout {
          width: 44px;
        }

        /* =====================================================
           RESPONSIVE
           ===================================================== */

        @media(max-width: 900px) {
          .np-mobile-menu-button {
            position: sticky;

            top: 0;
            z-index: 95;

            width: 100%;
            height: 54px;

            display: flex;

            align-items:
              center;

            gap: 9px;

            padding:
              0
              14px;

            border-bottom:
              1px solid
              #e2e8f0;

            background:
              rgba(
                255,
                255,
                255,
                .96
              );

            backdrop-filter:
              blur(12px);

            color:
              #0f172a;

            text-align:
              left;

            cursor:
              pointer;
          }

          .np-mobile-menu-button > span {
            width: 32px;
            height: 32px;

            display: grid;
            place-items: center;

            border:
              1px solid
              #e2e8f0;

            border-radius:
              8px;

            background:
              #f8fafc;
          }

          .np-mobile-menu-button > strong {
            font-size:
              12px;

            letter-spacing:
              .08em;
          }

          .np-sidebar,
          .np-sidebar.is-collapsed {
            position: fixed;

            left: 0;
            top: 0;

            z-index: 110;

            width:
              min(
                310px,
                88vw
              );

            transform:
              translateX(-102%);

            box-shadow:
              20px 0 55px
              rgba(
                15,
                23,
                42,
                .16
              );
          }

          .np-sidebar.is-mobile-open {
            transform:
              translateX(0);
          }

          .np-sidebar.is-collapsed .np-side-top {
            min-height:
              68px;

            justify-content:
              flex-start;

            flex-direction:
              row;
          }

          .np-sidebar.is-collapsed .np-side-brand {
            flex:
              1;
          }

          .np-sidebar.is-collapsed .np-side-brand-copy {
            display: flex;
          }

          .np-sidebar.is-collapsed .np-side-career,
          .np-sidebar.is-collapsed .np-side-continue,
          .np-sidebar.is-collapsed .np-side-summary,
          .np-sidebar.is-collapsed .np-side-nav-label,
          .np-sidebar.is-collapsed .np-side-link-content,
          .np-sidebar.is-collapsed .np-side-badge,
          .np-sidebar.is-collapsed .np-side-user-copy,
          .np-sidebar.is-collapsed .np-side-user-arrow,
          .np-sidebar.is-collapsed .np-side-shortcut {
            display: initial;
          }

          .np-sidebar.is-collapsed .np-side-nav-label {
            display: block;
          }

          .np-sidebar.is-collapsed .np-side-link {
            grid-template-columns:
              34px
              minmax(0,1fr)
              auto;

            justify-items:
              stretch;

            min-height:
              44px;

            padding:
              6px
              8px;
          }

          .np-sidebar.is-collapsed .np-side-bottom {
            display: block;
          }

          .np-sidebar.is-collapsed .np-side-user-collapsed {
            display: none;
          }

          .np-sidebar.is-collapsed .np-side-user-card {
            display: grid;
          }

          .np-sidebar.is-collapsed .np-side-logout {
            width: 100%;

            grid-template-columns:
              28px
              minmax(0,1fr);

            justify-items:
              stretch;
          }

          .np-side-collapse {
            display: none;
          }

          .np-side-mobile-close {
            width: 32px;
            height: 32px;

            display: grid;
            place-items: center;

            border:
              1px solid
              #e2e8f0;

            border-radius:
              8px;

            background:
              #ffffff;

            color:
              #64748b;

            font-size:
              18px;

            cursor:
              pointer;
          }

          .np-side-overlay {
            position: fixed;

            inset: 0;

            z-index: 105;

            display: block;

            background:
              rgba(
                15,
                23,
                42,
                .42
              );

            backdrop-filter:
              blur(2px);
          }
        }

        @media(max-width: 420px) {
          .np-sidebar,
          .np-sidebar.is-collapsed {
            width:
              min(
                300px,
                92vw
              );
          }
        }

        /* =====================================================
           REDUCED MOTION
           ===================================================== */

        @media(
          prefers-reduced-motion:
          reduce
        ) {
          .np-sidebar,
          .np-side-link,
          .np-side-collapse {
            transition:
              none;
          }
        }
      `}</style>
    </>
  );
}
