import { useState } from "react";
import { useNavigate } from "react-router-dom";


function RequiredSkills() {
  const navigate = useNavigate();

  const careerData = JSON.parse(
    localStorage.getItem("nextpathTargetCareerData") || "null"
  );

  const [selectedSkills, setSelectedSkills] = useState(() => {
    const saved = localStorage.getItem(
      "nextpathSelectedSkills"
    );

    return saved
      ? JSON.parse(saved)
      : {};
  });


  if (!careerData) {
    return (
      <div
        style={{
          background: "#FFFFFF",
          padding: "30px",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2>Select a Target Career First</h2>

        <p style={{ color: "#6B7280" }}>
          NEXTPATH needs your target career before
          identifying the required skills.
        </p>

        <button
          onClick={() => navigate("/target-career")}
          style={{
            padding: "12px 20px",
            background: "#C9151E",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "9px",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          Choose Career
        </button>
      </div>
    );
  }


  const careerSkills = (careerData.skills || []).map(
    (skill) => {
      if (typeof skill === "string") {
        return {
          name: skill,
          required_score: 7,
        };
      }

      return skill;
    }
  );


  const toggleSkill = (skillName) => {
    setSelectedSkills((previous) => {
      const updated = { ...previous };

      if (updated[skillName]) {
        delete updated[skillName];
      } else {
        updated[skillName] = {
          selected: true,
          selfLevel: "Beginner",
          selfScore: 3,
        };
      }

      return updated;
    });
  };


  const changeLevel = (
    skillName,
    level
  ) => {
    const scoreMap = {
      Beginner: 3,
      Intermediate: 6,
      Advanced: 8,
      Expert: 10,
    };

    setSelectedSkills((previous) => ({
      ...previous,

      [skillName]: {
        selected: true,
        selfLevel: level,
        selfScore: scoreMap[level],
      },
    }));
  };


  const continueToAssessment = () => {
    localStorage.setItem(
      "nextpathSelectedSkills",
      JSON.stringify(selectedSkills)
    );

    /*
      Remove previous report because a new
      skill selection requires a new assessment.
    */
    localStorage.removeItem(
      "nextpathAssessmentReport"
    );

    navigate("/assessment");
  };


  const selectedCount =
    Object.keys(selectedSkills).length;


  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          marginBottom: "28px",
        }}
      >
        <p
          style={{
            color: "#C9151E",
            fontWeight: "800",
            letterSpacing: "1px",
            marginBottom: "6px",
          }}
        >
          REQUIRED SKILLS
        </p>

        <h1
          style={{
            fontSize: "36px",
            margin: "0 0 8px 0",
          }}
        >
          {careerData.career}
        </h1>

        <p
          style={{
            color: "#6B7280",
            lineHeight: "1.7",
            maxWidth: "850px",
          }}
        >
          These skills are required for your selected
          career. Select only the skills you currently
          know. You will take an assessment only for
          those selected skills.
        </p>
      </div>


      {/* INFO BOX */}

      <div
        style={{
          background: "#FFF7F7",
          border: "1px solid #FECACA",
          padding: "18px",
          borderRadius: "14px",
          marginBottom: "25px",
        }}
      >
        <strong>
          How this works
        </strong>

        <p
          style={{
            color: "#6B7280",
            marginBottom: 0,
            lineHeight: "1.6",
          }}
        >
          Select a skill if you already have some
          knowledge of it. Your self-rating helps us
          understand your confidence, but your final
          demonstrated score will come from the
          assessment. Skills you do not select will
          automatically be treated as skills you need
          to learn.
        </p>
      </div>


      {/* SKILLS */}

      <div
        style={{
          display: "grid",
          gap: "16px",
        }}
      >
        {careerSkills.map((skill) => {
          const selected =
            Boolean(selectedSkills[skill.name]);

          const selectedData =
            selectedSkills[skill.name];

          return (
            <div
              key={skill.name}
              style={{
                background: "#FFFFFF",

                border: selected
                  ? "2px solid #C9151E"
                  : "1px solid #E5E7EB",

                borderRadius: "16px",
                padding: "22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() =>
                        toggleSkill(skill.name)
                      }
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />

                    <h2
                      style={{
                        margin: 0,
                        fontSize: "21px",
                      }}
                    >
                      {skill.name}
                    </h2>
                  </div>

                  <p
                    style={{
                      color: "#6B7280",
                      marginLeft: "30px",
                    }}
                  >
                    Required market proficiency:
                    {" "}
                    <strong>
                      {skill.required_score}/10
                    </strong>
                  </p>
                </div>


                <div
                  style={{
                    background: selected
                      ? "#DCFCE7"
                      : "#F3F4F6",

                    color: selected
                      ? "#166534"
                      : "#6B7280",

                    padding: "7px 12px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "800",
                  }}
                >
                  {selected
                    ? "I KNOW THIS"
                    : "NOT SELECTED"}
                </div>
              </div>


              {selected && (
                <div
                  style={{
                    marginTop: "16px",
                    paddingTop: "16px",
                    borderTop:
                      "1px solid #E5E7EB",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "700",
                      marginTop: 0,
                    }}
                  >
                    How well do you think you know
                    {` ${skill.name}`}?
                  </p>


                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {[
                      "Beginner",
                      "Intermediate",
                      "Advanced",
                      "Expert",
                    ].map((level) => {
                      const active =
                        selectedData?.selfLevel ===
                        level;

                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() =>
                            changeLevel(
                              skill.name,
                              level
                            )
                          }
                          style={{
                            padding: "9px 15px",

                            border: active
                              ? "2px solid #C9151E"
                              : "1px solid #D1D5DB",

                            background: active
                              ? "#FFF1F2"
                              : "#FFFFFF",

                            color: active
                              ? "#B91C1C"
                              : "#374151",

                            borderRadius: "9px",
                            cursor: "pointer",
                            fontWeight: "700",
                          }}
                        >
                          {level}
                        </button>
                      );
                    })}
                  </div>


                  <p
                    style={{
                      color: "#6B7280",
                      fontSize: "13px",
                      marginBottom: 0,
                    }}
                  >
                    Self-rating:
                    {" "}
                    <strong>
                      {selectedData?.selfScore || 0}
                      /10
                    </strong>

                    {" • "}

                    This score will be verified
                    through assessment.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>


      {/* SUMMARY */}

      <div
        style={{
          background: "#FFFFFF",
          marginTop: "25px",
          padding: "20px",
          borderRadius: "14px",
          border: "1px solid #E5E7EB",
        }}
      >
        <strong>
          {selectedCount}
          {" "}
          skill
          {selectedCount !== 1 ? "s" : ""}
          {" "}
          selected for verification
        </strong>

        <p
          style={{
            color: "#6B7280",
            marginBottom: 0,
          }}
        >
          {careerSkills.length - selectedCount}
          {" "}
          unselected skill
          {careerSkills.length - selectedCount !== 1
            ? "s"
            : ""}
          {" "}
          will be added directly to your
          skill-gap analysis.
        </p>
      </div>


      {/* CONTINUE */}

      <button
        onClick={continueToAssessment}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "15px",
          background: "#C9151E",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "800",
          cursor: "pointer",
        }}
      >
        Continue to Skill Verification →
      </button>
    </div>
  );
}


export default RequiredSkills;