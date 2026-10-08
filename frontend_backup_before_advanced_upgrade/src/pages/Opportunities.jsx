import { useMemo } from "react";
import { useNavigate } from "react-router-dom";


function Opportunities() {
  const navigate = useNavigate();


  /* =====================================================
     LOAD CAREER
  ===================================================== */

  const careerData = JSON.parse(
    localStorage.getItem(
      "nextpathTargetCareerData"
    ) || "null"
  );


  /* =====================================================
     LOAD VERIFIED SKILLS
  ===================================================== */

  const verifiedSkills = JSON.parse(
    localStorage.getItem(
      "nextpathVerifiedSkills"
    ) || "{}"
  );


  /* =====================================================
     LOAD ALL CURRENT SCORES
  ===================================================== */

  const skillScores = JSON.parse(
    localStorage.getItem(
      "nextpathSkillScores"
    ) || "{}"
  );


  if (!careerData) {

    return (

      <div style={emptyCard}>

        <h2>
          Select Your Target Career
        </h2>


        <p style={muted}>
          NEXTPATH needs your target career
          before matching job opportunities.
        </p>


        <button
          style={primaryButton}
          onClick={() =>
            navigate(
              "/target-career"
            )
          }
        >
          Choose Career
        </button>

      </div>

    );

  }


  /* =====================================================
     NORMALIZE REQUIRED SKILLS
  ===================================================== */

  const requiredSkills = useMemo(
    () =>
      (careerData.skills || []).map(
        (skill) =>
          typeof skill === "string"
            ? {
                name: skill,
                required_score: 7,
              }
            : skill
      ),
    [careerData]
  );


  const verifiedNames =
    Object.keys(
      verifiedSkills
    );


  /* =====================================================
     VERIFIED SKILL MATCH
  ===================================================== */

  const verifiedRequiredSkills =
    requiredSkills.filter(
      (skill) =>
        verifiedNames.includes(
          skill.name
        )
    );


  const verifiedSkillMatch =
    requiredSkills.length > 0
      ? (
          verifiedRequiredSkills.length /
          requiredSkills.length
        ) *
        100
      : 0;


  /* =====================================================
     READINESS BASED ON ALL SCORES
  ===================================================== */

  const readinessScores =
    requiredSkills.map(
      (skill) => {

        const score =
          Number(
            skillScores[
              skill.name
            ] || 0
          );


        const required =
          Number(
            skill.required_score ||
              0
          );


        if (
          required === 0
        ) {
          return 100;
        }


        return Math.min(
          100,
          (
            score /
            required
          ) *
            100
        );

      }
    );


  const overallReadiness =
    readinessScores.length > 0
      ? readinessScores.reduce(
          (
            total,
            value
          ) =>
            total +
            value,
          0
        ) /
        readinessScores.length
      : 0;


  /* =====================================================
     JOB ROLE RECOMMENDATIONS

     These are role recommendations.
     They are NOT live job vacancies.
  ===================================================== */

  const relatedRoles =
    getRelatedRoles(
      careerData.career
    );


  const jobMatches =
    relatedRoles.map(
      (
        role,
        index
      ) => {

        /*
          Prototype match score:

          70% verified skill match
          20% readiness
          10% career similarity

          Primary target career gets
          full career score.
        */

        const careerSimilarity =
          index === 0
            ? 100
            : role.similarity;


        const matchScore =
          verifiedSkillMatch *
            0.70 +
          overallReadiness *
            0.20 +
          careerSimilarity *
            0.10;


        return {
          ...role,

          matchScore:
            Math.min(
              100,
              Math.round(
                matchScore
              )
            ),
        };

      }
    );


  const encodedCareer =
    encodeURIComponent(
      careerData.career
    );


  const jobPlatforms = [

    {
      name:
        "LinkedIn Jobs",

      description:
        `Search current ${careerData.career} opportunities on LinkedIn.`,

      url:
        `https://www.linkedin.com/jobs/search/?keywords=${encodedCareer}`,
    },


    {
      name:
        "Indeed India",

      description:
        `Search ${careerData.career} opportunities on Indeed India.`,

      url:
        `https://in.indeed.com/jobs?q=${encodedCareer}`,
    },


    {
      name:
        "Naukri",

      description:
        `Search ${careerData.career} and related roles on Naukri.`,

      url:
        `https://www.naukri.com/${careerData.career
          .toLowerCase()
          .replace(
            /[^a-z0-9]+/g,
            "-"
          )}-jobs`,
    },

  ];


  return (

    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        paddingBottom: "50px",
      }}
    >

      {/* HEADER */}

      <p style={sectionLabel}>
        OPPORTUNITY INTELLIGENCE
      </p>


      <h1
        style={{
          fontSize: "38px",
          marginBottom: "8px",
        }}
      >
        Skill-Based Opportunities
      </h1>


      <p
        style={{
          ...muted,
          maxWidth: "850px",
          lineHeight: "1.7",
        }}
      >
        NEXTPATH uses your target career,
        assessment performance and verified
        skills to estimate how closely your
        profile matches relevant career roles.
      </p>


      {/* PROFILE SUMMARY */}

      <div style={profileSummary}>

        <div>

          <small>
            Target Career
          </small>

          <h2>
            {
              careerData.career
            }
          </h2>

        </div>


        <div>

          <small>
            Verified Skills
          </small>

          <h2>
            {
              verifiedRequiredSkills.length
            }
            /
            {
              requiredSkills.length
            }
          </h2>

        </div>


        <div>

          <small>
            Verified Skill Match
          </small>

          <h2>
            {
              verifiedSkillMatch.toFixed(
                0
              )
            }
            %
          </h2>

        </div>


        <div>

          <small>
            Career Readiness
          </small>

          <h2>
            {
              overallReadiness.toFixed(
                0
              )
            }
            %
          </h2>

        </div>

      </div>


      {/* VERIFIED SKILLS */}

      <div style={sectionCard}>

        <h2>
          Your Verified Skills
        </h2>


        {verifiedNames.length ===
        0 ? (

          <div>

            <p style={muted}>
              You have not verified any
              skills yet.
            </p>


            <button
              onClick={() =>
                navigate(
                  "/progress"
                )
              }
              style={primaryButton}
            >
              Continue Learning
            </button>

          </div>

        ) : (

          <div style={skillContainer}>

            {verifiedNames.map(
              (skill) => (

                <span
                  key={skill}
                  style={verifiedSkillBadge}
                >
                  ✓ {skill}
                </span>

              )
            )}

          </div>

        )}

      </div>


      {/* REQUIRED SKILLS STATUS */}

      <div style={sectionCard}>

        <h2>
          Career Skill Readiness
        </h2>


        <div
          style={{
            display: "grid",
            gap: "10px",
          }}
        >

          {requiredSkills.map(
            (skill) => {

              const score =
                Number(
                  skillScores[
                    skill.name
                  ] || 0
                );


              const required =
                Number(
                  skill.required_score
                );


              const verified =
                Boolean(
                  verifiedSkills[
                    skill.name
                  ]
                );


              const readiness =
                required > 0
                  ? Math.min(
                      100,
                      (
                        score /
                        required
                      ) *
                        100
                    )
                  : 100;


              return (

                <div
                  key={
                    skill.name
                  }
                  style={skillRow}
                >

                  <div>

                    <strong>
                      {
                        skill.name
                      }
                    </strong>


                    <p
                      style={{
                        margin:
                          "4px 0 0",
                        color:
                          "#6B7280",
                        fontSize:
                          "12px",
                      }}
                    >
                      Score:
                      {" "}
                      {score}/10
                      {" • "}
                      Required:
                      {" "}
                      {required}/10
                    </p>

                  </div>


                  <div
                    style={{
                      textAlign:
                        "right",
                    }}
                  >

                    <strong
                      style={{
                        color:
                          verified
                            ? "#166534"
                            : "#C9151E",
                      }}
                    >
                      {readiness.toFixed(
                        0
                      )}
                      %
                    </strong>


                    <div
                      style={{
                        fontSize:
                          "11px",
                        color:
                          verified
                            ? "#166534"
                            : "#6B7280",
                      }}
                    >
                      {verified
                        ? "✓ Verified"
                        : "Not Yet Verified"}
                    </div>

                  </div>

                </div>

              );

            }
          )}

        </div>

      </div>


      {/* ROLE MATCHES */}

      <div
        style={{
          marginTop: "30px",
        }}
      >

        <h2>
          Recommended Career Roles
        </h2>


        <p style={muted}>
          Match scores are prototype
          estimates based on your verified
          skills, career readiness and
          target-career similarity.
        </p>


        <div style={roleGrid}>

          {jobMatches.map(
            (
              role,
              index
            ) => (

              <div
                key={
                  role.title
                }
                style={roleCard}
              >

                <div style={roleTop}>

                  <div>

                    <small
                      style={{
                        color:
                          "#6B7280",
                      }}
                    >
                      Recommendation
                      {" "}
                      #{index + 1}
                    </small>


                    <h2
                      style={{
                        margin:
                          "6px 0",
                      }}
                    >
                      {
                        role.title
                      }
                    </h2>

                  </div>


                  <div
                    style={{
                      background:
                        role.matchScore >=
                        80
                          ? "#DCFCE7"
                          : role.matchScore >=
                            60
                          ? "#FEF3C7"
                          : "#FEE2E2",

                      color:
                        role.matchScore >=
                        80
                          ? "#166534"
                          : role.matchScore >=
                            60
                          ? "#92400E"
                          : "#B91C1C",

                      padding:
                        "8px 12px",

                      borderRadius:
                        "999px",

                      fontWeight:
                        "900",
                    }}
                  >
                    {
                      role.matchScore
                    }
                    % Match
                  </div>

                </div>


                <p
                  style={{
                    color:
                      "#6B7280",
                    lineHeight:
                      "1.6",
                  }}
                >
                  {
                    role.description
                  }
                </p>


                <div
                  style={{
                    marginTop:
                      "15px",
                  }}
                >

                  {role.skills.map(
                    (skill) => (

                      <span
                        key={
                          skill
                        }
                        style={{
                          display:
                            "inline-block",

                          background:
                            verifiedSkills[
                              skill
                            ]
                              ? "#DCFCE7"
                              : "#F3F4F6",

                          color:
                            verifiedSkills[
                              skill
                            ]
                              ? "#166534"
                              : "#4B5563",

                          padding:
                            "6px 10px",

                          borderRadius:
                            "999px",

                          margin:
                            "3px",

                          fontSize:
                            "12px",
                        }}
                      >
                        {
                          verifiedSkills[
                            skill
                          ]
                            ? "✓ "
                            : ""
                        }

                        {skill}
                      </span>

                    )
                  )}

                </div>

              </div>

            )
          )}

        </div>

      </div>


      {/* JOB CONNECTIONS */}

      <div
        style={{
          marginTop: "35px",
        }}
      >

        <h2>
          Find Current Opportunities
        </h2>


        <p style={muted}>
          Use these job platforms to
          search for current openings
          matching your target career.
        </p>


        <div style={platformGrid}>

          {jobPlatforms.map(
            (platform) => (

              <div
                key={
                  platform.name
                }
                style={platformCard}
              >

                <h3>
                  {
                    platform.name
                  }
                </h3>


                <p
                  style={{
                    color:
                      "#6B7280",
                    lineHeight:
                      "1.6",
                  }}
                >
                  {
                    platform.description
                  }
                </p>


                <a
                  href={
                    platform.url
                  }
                  target="_blank"
                  rel="noreferrer"
                  style={jobButton}
                >
                  Search Jobs →
                </a>

              </div>

            )
          )}

        </div>

      </div>


      {/* RECOMMENDATION */}

      {verifiedSkillMatch <
        100 && (

        <div style={learningBox}>

          <h2
            style={{
              marginTop: 0,
            }}
          >
            Improve Your Match
          </h2>


          <p
            style={{
              color:
                "#6B7280",
              lineHeight:
                "1.7",
            }}
          >
            You still have required skills
            that are not verified. Continue
            your personalized roadmap,
            complete the learning topics and
            take re-assessments to improve
            your career readiness and job
            match.
          </p>


          <button
            onClick={() =>
              navigate(
                "/progress"
              )
            }
            style={primaryButton}
          >
            Continue Roadmap →
          </button>

        </div>

      )}


      <p
        style={{
          color:
            "#9CA3AF",

          fontSize:
            "11px",

          marginTop:
            "25px",

          lineHeight:
            "1.6",
        }}
      >

        Recommended roles and match
        percentages are NEXTPATH prototype
        estimates. External job-search
        links open third-party platforms;
        NEXTPATH does not guarantee that a
        specific vacancy is currently
        available.

      </p>

    </div>

  );

}


/* =====================================================
   RELATED CAREER ROLES
===================================================== */

function getRelatedRoles(
  career
) {

  const roles = {

    "Data Analyst": [
      {
        title:
          "Data Analyst",
        similarity:
          100,
        description:
          "Analyze business data, create reports and communicate actionable insights.",
        skills: [
          "SQL",
          "Excel",
          "Power BI",
          "Python",
          "Statistics",
        ],
      },

      {
        title:
          "Business Intelligence Analyst",
        similarity:
          88,
        description:
          "Build dashboards, analyze business performance and support data-driven decisions.",
        skills: [
          "SQL",
          "Power BI",
          "Excel",
          "Data Visualization",
        ],
      },

      {
        title:
          "Junior Business Analyst",
        similarity:
          78,
        description:
          "Analyze business requirements, processes and supporting data.",
        skills: [
          "Excel",
          "SQL",
          "Business Analysis",
          "Communication",
        ],
      },
    ],


    "Data Scientist": [
      {
        title:
          "Data Scientist",
        similarity:
          100,
        description:
          "Use statistics, programming and machine learning to solve data-driven problems.",
        skills: [
          "Python",
          "Machine Learning",
          "Statistics",
          "SQL",
        ],
      },

      {
        title:
          "Junior Machine Learning Engineer",
        similarity:
          85,
        description:
          "Develop and evaluate machine-learning models for real-world applications.",
        skills: [
          "Python",
          "Machine Learning",
          "Deep Learning",
        ],
      },

      {
        title:
          "Data Science Analyst",
        similarity:
          82,
        description:
          "Combine analytics, statistics and programming to produce business insights.",
        skills: [
          "Python",
          "Statistics",
          "SQL",
          "Data Visualization",
        ],
      },
    ],


    "Data Engineer": [
      {
        title:
          "Data Engineer",
        similarity:
          100,
        description:
          "Build reliable pipelines and infrastructure for collecting and processing data.",
        skills: [
          "SQL",
          "Python",
          "ETL",
          "Data Pipelines",
          "Big Data",
        ],
      },

      {
        title:
          "ETL Developer",
        similarity:
          86,
        description:
          "Design data extraction, transformation and loading processes.",
        skills: [
          "SQL",
          "ETL",
          "Python",
        ],
      },

      {
        title:
          "Junior Cloud Data Engineer",
        similarity:
          80,
        description:
          "Develop cloud-based pipelines and scalable data systems.",
        skills: [
          "Python",
          "SQL",
          "Cloud",
          "Data Pipelines",
        ],
      },
    ],


    "Machine Learning Engineer": [
      {
        title:
          "Machine Learning Engineer",
        similarity:
          100,
        description:
          "Build, train, deploy and maintain machine-learning systems.",
        skills: [
          "Python",
          "Machine Learning",
          "Deep Learning",
          "MLOps",
        ],
      },

      {
        title:
          "AI Engineer",
        similarity:
          90,
        description:
          "Build AI-powered applications using machine learning and modern AI models.",
        skills: [
          "Python",
          "Machine Learning",
          "Deep Learning",
          "Generative AI",
          "APIs",
        ],
      },

      {
        title:
          "Junior MLOps Engineer",
        similarity:
          78,
        description:
          "Support deployment, monitoring and lifecycle management of ML models.",
        skills: [
          "Python",
          "MLOps",
          "Machine Learning",
          "Cloud",
        ],
      },
    ],


    "AI Engineer": [
      {
        title:
          "AI Engineer",
        similarity:
          100,
        description:
          "Develop AI applications using machine learning, deep learning and generative AI.",
        skills: [
          "Python",
          "Machine Learning",
          "Deep Learning",
          "Generative AI",
          "APIs",
        ],
      },

      {
        title:
          "Generative AI Developer",
        similarity:
          90,
        description:
          "Build applications using large language models, retrieval and AI APIs.",
        skills: [
          "Python",
          "Generative AI",
          "APIs",
        ],
      },

      {
        title:
          "Machine Learning Engineer",
        similarity:
          85,
        description:
          "Design, train and deploy machine-learning systems.",
        skills: [
          "Python",
          "Machine Learning",
          "Deep Learning",
          "MLOps",
        ],
      },
    ],
  };


  if (
    roles[career]
  ) {
    return roles[
      career
    ];
  }


  /*
    Generic fallback for any of your
    other 10+ career options.
  */

  return [
    {
      title:
        career,

      similarity:
        100,

      description:
        `Primary role aligned with your selected ${career} career path.`,

      skills: [],
    },

    {
      title:
        `Junior ${career}`,

      similarity:
        85,

      description:
        `Entry-level opportunity related to ${career}.`,

      skills: [],
    },

    {
      title:
        `${career} Associate`,

      similarity:
        75,

      description:
        `Related associate-level role connected to ${career}.`,

      skills: [],
    },
  ];

}


/* =====================================================
   STYLES
===================================================== */

const sectionLabel = {
  color: "#C9151E",
  fontWeight: "800",
  letterSpacing: "1px",
};


const muted = {
  color: "#6B7280",
};


const profileSummary = {
  background: "#111827",
  color: "#FFFFFF",
  padding: "24px",
  borderRadius: "16px",
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "20px",
  margin: "28px 0",
};


const sectionCard = {
  background: "#FFFFFF",
  padding: "22px",
  borderRadius: "14px",
  border: "1px solid #E5E7EB",
  marginBottom: "20px",
};


const skillContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};


const verifiedSkillBadge = {
  background: "#DCFCE7",
  color: "#166534",
  padding: "8px 12px",
  borderRadius: "999px",
  fontWeight: "700",
};


const skillRow = {
  background: "#F9FAFB",
  borderRadius: "9px",
  padding: "13px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "15px",
};


const roleGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "18px",
};


const roleCard = {
  background: "#FFFFFF",
  padding: "22px",
  border: "1px solid #E5E7EB",
  borderRadius: "15px",
};


const roleTop = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  alignItems: "flex-start",
};


const platformGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "16px",
};


const platformCard = {
  background: "#FFFFFF",
  padding: "22px",
  borderRadius: "14px",
  border: "1px solid #E5E7EB",
};


const jobButton = {
  display: "inline-block",
  background: "#111827",
  color: "#FFFFFF",
  padding: "11px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "800",
};


const learningBox = {
  background: "#FFF7F7",
  border: "1px solid #FECACA",
  padding: "22px",
  borderRadius: "14px",
  marginTop: "30px",
};


const emptyCard = {
  background: "#FFFFFF",
  padding: "35px",
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
};


const primaryButton = {
  background: "#C9151E",
  color: "#FFFFFF",
  padding: "13px 20px",
  border: "none",
  borderRadius: "9px",
  cursor: "pointer",
  fontWeight: "800",
};


export default Opportunities;