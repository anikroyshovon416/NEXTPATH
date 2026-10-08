import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TargetCareer() {
  const navigate = useNavigate();

  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");

  useEffect(() => {
    const savedCareer = localStorage.getItem(
      "nextpathTargetCareer"
    );

    if (savedCareer) {
      setSelectedCareer(savedCareer);
    }

    fetch("http://127.0.0.1:8000/career-market")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to load career market data"
          );
        }

        return response.json();
      })
      .then((data) => {
        setCareers(data.careers || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Career API Error:",
          err
        );

        setError(
          "Could not load career market data. Make sure the FastAPI backend is running."
        );

        setLoading(false);
      });
  }, []);

  const selectCareer = (career) => {
    setSelectedCareer(career.career);

    /*
      Save selected career name
    */
    localStorage.setItem(
      "nextpathTargetCareer",
      career.career
    );

    /*
      Save complete career data:
      salary
      demand
      required skills
      required scores
    */
    localStorage.setItem(
      "nextpathTargetCareerData",
      JSON.stringify(career)
    );

    /*
      Clear old skill selections because
      the user is choosing a new career.
    */
    localStorage.removeItem(
      "nextpathSelectedSkills"
    );

    /*
      Clear old assessment report because
      assessment depends on selected career.
    */
    localStorage.removeItem(
      "nextpathAssessmentReport"
    );

    /*
      IMPORTANT:
      After career selection,
      go to Required Skills page.
    */
    navigate("/required-skills");
  };

  const getDemandLabel = (score) => {
    if (score >= 90) {
      return "Very High";
    }

    if (score >= 80) {
      return "High";
    }

    if (score >= 70) {
      return "Moderate";
    }

    return "Developing";
  };

  const getOpportunityLabel = (score) => {
    if (score >= 90) {
      return "Excellent";
    }

    if (score >= 80) {
      return "Strong";
    }

    if (score >= 70) {
      return "Good";
    }

    return "Moderate";
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>
          Loading Career Intelligence...
        </h2>

        <p
          style={{
            color: "#6B7280",
          }}
        >
          NEXTPATH is loading analyzed
          market, salary, demand and
          required skill data.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          background: "#FFFFFF",
          padding: "30px",
          borderRadius: "16px",
          border: "1px solid #FCA5A5",
        }}
      >
        <h2
          style={{
            color: "#B91C1C",
          }}
        >
          Career Market Data Could Not
          Be Loaded
        </h2>

        <p
          style={{
            color: "#6B7280",
          }}
        >
          {error}
        </p>

        <p>
          Check whether this URL works:
        </p>

        <code>
          http://127.0.0.1:8000/career-market
        </code>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          marginBottom: "32px",
        }}
      >
        <p
          style={{
            color: "#C9151E",
            fontWeight: "800",
            letterSpacing: "1px",
            marginBottom: "8px",
          }}
        >
          CAREER INTELLIGENCE
        </p>

        <h1
          style={{
            fontSize: "38px",
            margin: "0 0 10px 0",
            color: "#111827",
          }}
        >
          Choose Your Target Career
        </h1>

        <p
          style={{
            color: "#6B7280",
            maxWidth: "850px",
            lineHeight: "1.7",
            fontSize: "16px",
          }}
        >
          Compare career opportunities
          using analyzed market demand,
          salary, opportunity score,
          experience requirements and
          required skills.
        </p>

        <p
          style={{
            color: "#6B7280",
            maxWidth: "850px",
            lineHeight: "1.7",
            fontSize: "16px",
          }}
        >
          After selecting your target
          career, NEXTPATH will show the
          required skills. You can then
          select which skills you already
          know before taking the skill
          verification assessment.
        </p>
      </div>

      {/* SUMMARY */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            padding: "18px",
            borderRadius: "14px",
            border:
              "1px solid #E5E7EB",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#6B7280",
              fontSize: "13px",
            }}
          >
            Available Careers
          </p>

          <h2
            style={{
              margin: "6px 0 0",
            }}
          >
            {careers.length}
          </h2>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            padding: "18px",
            borderRadius: "14px",
            border:
              "1px solid #E5E7EB",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#6B7280",
              fontSize: "13px",
            }}
          >
            Current Career
          </p>

          <h3
            style={{
              margin: "6px 0 0",
              color: selectedCareer
                ? "#111827"
                : "#9CA3AF",
            }}
          >
            {selectedCareer ||
              "Not selected"}
          </h3>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            padding: "18px",
            borderRadius: "14px",
            border:
              "1px solid #E5E7EB",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#6B7280",
              fontSize: "13px",
            }}
          >
            Next Step
          </p>

          <h3
            style={{
              margin: "6px 0 0",
            }}
          >
            Required Skills
          </h3>
        </div>
      </div>

      {/* CAREER CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "22px",
        }}
      >
        {careers.map((career) => {
          const isSelected =
            selectedCareer ===
            career.career;

          return (
            <div
              key={career.career}
              style={{
                background: "#FFFFFF",

                border: isSelected
                  ? "2px solid #C9151E"
                  : "1px solid #E5E7EB",

                borderRadius: "18px",
                padding: "24px",

                boxShadow: isSelected
                  ? "0 10px 30px rgba(201,21,30,0.12)"
                  : "0 5px 18px rgba(0,0,0,0.05)",

                position: "relative",
              }}
            >
              {/* SELECTED BADGE */}

              {isSelected && (
                <div
                  style={{
                    position: "absolute",
                    right: "18px",
                    top: "18px",
                    background: "#FEE2E2",
                    color: "#B91C1C",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "800",
                  }}
                >
                  SELECTED
                </div>
              )}

              {/* CAREER TITLE */}

              <div
                style={{
                  marginBottom: "20px",
                  paddingRight: isSelected
                    ? "90px"
                    : "0",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    color: "#111827",
                    fontSize: "24px",
                  }}
                >
                  {career.career}
                </h2>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#6B7280",
                  }}
                >
                  Career Market
                  Intelligence
                </p>
              </div>

              {/* METRICS */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    background: "#F9FAFB",
                    padding: "14px",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#6B7280",
                      fontSize: "12px",
                    }}
                  >
                    Market Demand
                  </p>

                  <h3
                    style={{
                      margin: "5px 0",
                    }}
                  >
                    {career.demand_score}
                    /100
                  </h3>

                  <small
                    style={{
                      color: "#C9151E",
                      fontWeight: "700",
                    }}
                  >
                    {getDemandLabel(
                      career.demand_score
                    )}
                  </small>
                </div>

                <div
                  style={{
                    background: "#F9FAFB",
                    padding: "14px",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#6B7280",
                      fontSize: "12px",
                    }}
                  >
                    Opportunity Score
                  </p>

                  <h3
                    style={{
                      margin: "5px 0",
                    }}
                  >
                    {
                      career.opportunity_score
                    }
                    /100
                  </h3>

                  <small
                    style={{
                      color: "#2563EB",
                      fontWeight: "700",
                    }}
                  >
                    {getOpportunityLabel(
                      career.opportunity_score
                    )}
                  </small>
                </div>

                <div
                  style={{
                    background: "#F9FAFB",
                    padding: "14px",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#6B7280",
                      fontSize: "12px",
                    }}
                  >
                    Average Salary
                  </p>

                  <h3
                    style={{
                      margin: "5px 0",
                    }}
                  >
                    ₹
                    {
                      career.salary_average
                    }{" "}
                    LPA
                  </h3>
                </div>

                <div
                  style={{
                    background: "#F9FAFB",
                    padding: "14px",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: "#6B7280",
                      fontSize: "12px",
                    }}
                  >
                    Experience
                  </p>

                  <h3
                    style={{
                      margin: "5px 0",
                    }}
                  >
                    {
                      career.min_experience
                    }
                    + Years
                  </h3>
                </div>
              </div>

              {/* SALARY RANGE */}

              <div
                style={{
                  marginBottom: "20px",
                  padding: "14px",
                  background: "#FFF7F7",
                  borderRadius: "12px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: "#6B7280",
                    fontSize: "12px",
                  }}
                >
                  Salary Range
                </p>

                <h3
                  style={{
                    margin: "5px 0 0",
                    color: "#111827",
                  }}
                >
                  ₹{career.salary_min}
                  {" - "}
                  ₹{career.salary_max}
                  {" "}
                  LPA
                </h3>
              </div>

              {/* REQUIRED SKILLS PREVIEW */}

              <div>
                <h3
                  style={{
                    marginBottom: "10px",
                    color: "#111827",
                  }}
                >
                  Required Skills
                </h3>

                <div>
                  {career.skills?.map(
                    (skill) => {
                      const skillName =
                        typeof skill ===
                        "string"
                          ? skill
                          : skill.name;

                      const requiredScore =
                        typeof skill ===
                        "string"
                          ? null
                          : skill.required_score;

                      return (
                        <span
                          key={skillName}
                          style={{
                            display:
                              "inline-block",

                            margin: "4px",

                            padding:
                              "7px 11px",

                            background:
                              "#F3F4F6",

                            borderRadius:
                              "999px",

                            fontSize:
                              "13px",

                            color:
                              "#374151",
                          }}
                        >
                          {skillName}

                          {requiredScore !==
                            null &&
                            requiredScore !==
                              undefined &&
                            ` • ${requiredScore}/10`}
                        </span>
                      );
                    }
                  )}
                </div>
              </div>

              {/* SELECT BUTTON */}

              <button
                onClick={() =>
                  selectCareer(career)
                }
                style={{
                  width: "100%",
                  marginTop: "24px",
                  padding: "14px",

                  background: isSelected
                    ? "#111827"
                    : "#C9151E",

                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px",

                  fontWeight: "800",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                {isSelected
                  ? "Continue to Required Skills →"
                  : "Select Career"}
              </button>
            </div>
          );
        })}
      </div>

      {/* NO CAREERS */}

      {careers.length === 0 && (
        <div
          style={{
            background: "#FFFFFF",
            padding: "30px",
            borderRadius: "16px",
            textAlign: "center",
            border:
              "1px solid #E5E7EB",
          }}
        >
          <h2>
            No Career Data Found
          </h2>

          <p
            style={{
              color: "#6B7280",
            }}
          >
            Check your backend
            career_market.json file and
            FastAPI /career-market
            endpoint.
          </p>
        </div>
      )}
    </div>
  );
}

export default TargetCareer;