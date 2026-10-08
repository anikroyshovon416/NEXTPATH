import { useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();


  const currentUser = JSON.parse(
    localStorage.getItem(
      "nextpathCurrentUser"
    ) || "null"
  );


  const careerData = JSON.parse(
    localStorage.getItem(
      "nextpathTargetCareerData"
    ) || "null"
  );


  const selectedSkills = JSON.parse(
    localStorage.getItem(
      "nextpathSelectedSkills"
    ) || "{}"
  );


  const assessmentReport = JSON.parse(
    localStorage.getItem(
      "nextpathAssessmentReport"
    ) || "null"
  );


  const skillGaps = JSON.parse(
    localStorage.getItem(
      "nextpathSkillGaps"
    ) || "[]"
  );


  const roadmap = JSON.parse(
    localStorage.getItem(
      "nextpathRoadmapPlan"
    ) || "[]"
  );


  const roadmapProgress = JSON.parse(
    localStorage.getItem(
      "nextpathRoadmapProgress"
    ) || "{}"
  );


  const verifiedSkills = JSON.parse(
    localStorage.getItem(
      "nextpathVerifiedSkills"
    ) || "{}"
  );


  const certificates = JSON.parse(
    localStorage.getItem(
      "nextpathCertificates"
    ) || "[]"
  );


  const studentName =
    currentUser?.fullName ||
    currentUser?.name ||
    "Student";


  /* =====================================================
     CALCULATE OVERALL GAP
  ===================================================== */

  const overallGap =
    skillGaps.length > 0
      ? skillGaps.reduce(
          (total, skill) =>
            total +
            Number(
              skill.gapPercentage ||
                0
            ),
          0
        ) /
        skillGaps.length
      : 0;


  const careerReadiness =
    Math.max(
      0,
      100 - overallGap
    );


  /* =====================================================
     ROADMAP PROGRESS
  ===================================================== */

  const calculateSkillProgress =
    (skill) => {

      const topics =
        skill.topics || [];


      if (
        topics.length === 0
      ) {
        return 0;
      }


      const stored =
        roadmapProgress[
          skill.skill
        ]?.topics || {};


      const completed =
        topics.filter(
          (topic) =>
            stored[topic]
        ).length;


      return (
        completed /
        topics.length
      ) *
        100;
    };


  const overallRoadmapProgress =
    roadmap.length > 0
      ? roadmap.reduce(
          (total, skill) =>
            total +
            calculateSkillProgress(
              skill
            ),
          0
        ) /
        roadmap.length
      : 0;


  /* =====================================================
     JOURNEY STEPS
  ===================================================== */

  const journey = [
    {
      title: "Choose Career",
      description:
        careerData
          ? careerData.career
          : "Select your target career",
      complete:
        Boolean(careerData),
      path: "/target-career",
    },

    {
      title: "Select Skills",
      description:
        `${Object.keys(
          selectedSkills
        ).length} skill(s) selected`,
      complete:
        Object.keys(
          selectedSkills
        ).length > 0,
      path: "/required-skills",
    },

    {
      title: "Skill Assessment",
      description:
        assessmentReport
          ? "Assessment completed"
          : "Quiz, problems and coding",
      complete:
        Boolean(
          assessmentReport
        ),
      path: "/assessment",
    },

    {
      title: "Skill Gap",
      description:
        skillGaps.length > 0
          ? `${overallGap.toFixed(
              0
            )}% overall gap`
          : "Analyze missing skills",
      complete:
        skillGaps.length > 0,
      path: "/skill-gap",
    },

    {
      title: "Roadmap",
      description:
        roadmap.length > 0
          ? `${roadmap.length} skill learning plan`
          : "Generate learning plan",
      complete:
        roadmap.length > 0,
      path: "/roadmap",
    },

    {
      title: "Progress",
      description:
        `${overallRoadmapProgress.toFixed(
          0
        )}% completed`,
      complete:
        overallRoadmapProgress >=
        100,
      path: "/progress",
    },

    {
      title: "Credentials",
      description:
        `${certificates.length} certificate(s)`,
      complete:
        certificates.length > 0,
      path: "/credentials",
    },

    {
      title: "Opportunities",
      description:
        "Find matching career opportunities",
      complete: false,
      path: "/opportunities",
    },
  ];


  /* =====================================================
     FIND NEXT ACTION
  ===================================================== */

  let nextAction = {
    label:
      "Choose Target Career",
    path:
      "/target-career",
  };


  if (careerData) {
    nextAction = {
      label:
        "Select Your Skills",
      path:
        "/required-skills",
    };
  }


  if (
    Object.keys(
      selectedSkills
    ).length > 0 &&
    !assessmentReport
  ) {
    nextAction = {
      label:
        "Take Assessment",
      path:
        "/assessment",
    };
  }


  if (
    assessmentReport &&
    skillGaps.length === 0
  ) {
    nextAction = {
      label:
        "View Skill Gap",
      path:
        "/skill-gap",
    };
  }


  if (
    skillGaps.length > 0 &&
    roadmap.length === 0
  ) {
    nextAction = {
      label:
        "Build Roadmap",
      path:
        "/roadmap",
    };
  }


  if (
    roadmap.length > 0 &&
    overallRoadmapProgress <
      100
  ) {
    nextAction = {
      label:
        "Continue Learning",
      path:
        "/progress",
    };
  }


  if (
    Object.keys(
      verifiedSkills
    ).length > 0
  ) {
    nextAction = {
      label:
        "View Opportunities",
      path:
        "/opportunities",
    };
  }


  return (
    <div className="dashboard-page">

      {/* HEADER */}

      <section className="dashboard-header">

        <div>

          <div className="eyebrow">
            CAREER INTELLIGENCE PLATFORM
          </div>

          <h1>
            Welcome back,{" "}
            {studentName}
          </h1>

          <p>
            Build a verified career path
            using real skill assessment,
            personalized learning and
            continuous progress validation.
          </p>

        </div>


        <button
          className="primary-action"
          onClick={() =>
            navigate(
              nextAction.path
            )
          }
        >
          {nextAction.label} →
        </button>

      </section>


      {/* KPI CARDS */}

      <section className="dashboard-kpis">

        <DashboardMetric
          title="Target Career"
          value={
            careerData?.career ||
            "Not Selected"
          }
          subtitle="Your career goal"
        />


        <DashboardMetric
          title="Career Readiness"
          value={`${careerReadiness.toFixed(
            0
          )}%`}
          subtitle="Based on current skills"
        />


        <DashboardMetric
          title="Roadmap Progress"
          value={`${overallRoadmapProgress.toFixed(
            0
          )}%`}
          subtitle="Learning completion"
        />


        <DashboardMetric
          title="Verified Skills"
          value={
            Object.keys(
              verifiedSkills
            ).length
          }
          subtitle="Passed re-assessment"
        />

      </section>


      {/* MAIN GRID */}

      <section className="dashboard-main-grid">

        {/* JOURNEY */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <div className="eyebrow">
                YOUR JOURNEY
              </div>

              <h2>
                Career Development Path
              </h2>
            </div>

          </div>


          <div className="journey-list">

            {journey.map(
              (step, index) => (

                <button
                  key={
                    step.title
                  }
                  className="journey-item"
                  onClick={() =>
                    navigate(
                      step.path
                    )
                  }
                >

                  <div
                    className={
                      step.complete
                        ? "journey-number completed"
                        : "journey-number"
                    }
                  >
                    {step.complete
                      ? "✓"
                      : index + 1}
                  </div>


                  <div className="journey-copy">

                    <strong>
                      {step.title}
                    </strong>

                    <span>
                      {
                        step.description
                      }
                    </span>

                  </div>


                  <div className="journey-arrow">
                    →
                  </div>

                </button>

              )
            )}

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="dashboard-side">

          {/* GAP */}

          <div className="dashboard-panel">

            <div className="eyebrow">
              SKILL GAP
            </div>

            <h2>
              Current Readiness
            </h2>


            <div className="readiness-number">
              {careerReadiness.toFixed(
                0
              )}
              %
            </div>


            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width:
                    `${careerReadiness}%`,
                }}
              />
            </div>


            {skillGaps.length >
            0 ? (

              <div className="priority-list">

                {skillGaps
                  .slice(0, 3)
                  .map(
                    (
                      skill,
                      index
                    ) => (

                      <div
                        key={
                          skill.skill
                        }
                        className="priority-row"
                      >
                        <span>
                          #{index + 1}{" "}
                          {
                            skill.skill
                          }
                        </span>

                        <strong>
                          {
                            skill.gapPercentage
                          }
                          %
                        </strong>
                      </div>

                    )
                  )}

              </div>

            ) : (

              <p className="muted-text">
                Complete your assessment
                to generate skill-gap
                priorities.
              </p>

            )}

          </div>


          {/* VERIFIED */}

          <div className="dashboard-panel">

            <div className="eyebrow">
              VERIFIED SKILLS
            </div>

            <h2>
              Credentials
            </h2>


            {Object.keys(
              verifiedSkills
            ).length === 0 ? (

              <p className="muted-text">
                Complete your roadmap and
                pass re-assessments to
                unlock verified skills.
              </p>

            ) : (

              <div className="verified-list">

                {Object.keys(
                  verifiedSkills
                ).map(
                  (skill) => (

                    <div
                      key={skill}
                      className="verified-row"
                    >
                      <span>
                        ✓ {skill}
                      </span>

                      <strong>
                        {
                          verifiedSkills[
                            skill
                          ].score
                        }
                        /10
                      </strong>
                    </div>

                  )
                )}

              </div>

            )}


            <button
              className="secondary-action"
              onClick={() =>
                navigate(
                  "/credentials"
                )
              }
            >
              View Credentials
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}


function DashboardMetric({
  title,
  value,
  subtitle,
}) {
  return (
    <div className="dashboard-metric">

      <div className="metric-label">
        {title}
      </div>

      <div className="metric-value">
        {value}
      </div>

      <div className="metric-subtitle">
        {subtitle}
      </div>

    </div>
  );
}


export default Dashboard;