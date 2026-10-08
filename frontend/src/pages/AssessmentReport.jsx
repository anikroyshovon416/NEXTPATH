import { useNavigate } from "react-router-dom";


function AssessmentReport() {
  const navigate = useNavigate();


  /* =====================================================
     LOAD DATA
  ===================================================== */

  const report = JSON.parse(
    localStorage.getItem(
      "nextpathAssessmentReport"
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


  /* =====================================================
     NO REPORT
  ===================================================== */

  if (!report) {
    return (
      <div
        style={{
          background: "#FFFFFF",
          padding: "30px",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          maxWidth: "800px",
        }}
      >
        <h2>
          No Assessment Report Found
        </h2>

        <p
          style={{
            color: "#6B7280",
          }}
        >
          Complete your skill verification
          assessment first.
        </p>

        <button
          onClick={() =>
            navigate("/assessment")
          }
          style={primaryButton}
        >
          Go to Assessment
        </button>
      </div>
    );
  }


  const isReassessment =
    report.mode === "reassessment";


  /* =====================================================
     NORMALIZE CAREER SKILLS
  ===================================================== */

  const careerSkills =
    (careerData?.skills || []).map(
      (skill) => {
        if (
          typeof skill === "string"
        ) {
          return {
            name: skill,
            required_score: 7,
          };
        }

        return skill;
      }
    );


  /* =====================================================
     RESULT DATA
  ===================================================== */

  const skillScores =
    report.skillScores || {};

  const detailedResults =
    report.detailedResults || {};

  const assessedSkillNames =
    Object.keys(skillScores);


  /* =====================================================
     FIND REQUIRED SCORE
  ===================================================== */

  const getRequiredScore = (
    skillName
  ) => {
    const found =
      careerSkills.find(
        (skill) =>
          skill.name ===
          skillName
      );

    return Number(
      found?.required_score || 0
    );
  };


  /* =====================================================
     PASS / FAIL
  ===================================================== */

  const getStatus = (
    skillName,
    score
  ) => {
    const required =
      getRequiredScore(
        skillName
      );

    if (
      Number(score) >=
      required
    ) {
      return {
        label: "Verified",
        background: "#DCFCE7",
        color: "#166534",
      };
    }

    const percentage =
      required > 0
        ? (
            Number(score) /
            required
          ) * 100
        : 0;

    if (
      percentage >= 80
    ) {
      return {
        label: "Near Ready",
        background: "#DBEAFE",
        color: "#1D4ED8",
      };
    }

    if (
      percentage >= 50
    ) {
      return {
        label: "Developing",
        background: "#FEF3C7",
        color: "#92400E",
      };
    }

    return {
      label: "Needs Improvement",
      background: "#FEE2E2",
      color: "#B91C1C",
    };
  };


  /* =====================================================
     OVERALL SCORE
  ===================================================== */

  const overallScore =
    Number(
      report.overallScore || 0
    );


  const verifiedCount =
    assessedSkillNames.filter(
      (skill) =>
        Number(
          skillScores[skill]
        ) >=
        getRequiredScore(
          skill
        )
    ).length;


  const totalAssessed =
    assessedSkillNames.length;


  const verificationRate =
    totalAssessed > 0
      ? Math.round(
          (
            verifiedCount /
            totalAssessed
          ) *
            100
        )
      : 0;


  /* =====================================================
     CONTINUE TO SKILL GAP
  ===================================================== */

  const continueToSkillGap =
    () => {
      navigate("/skill-gap");
    };


  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        paddingBottom: "50px",
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
            marginBottom: "7px",
          }}
        >
          {isReassessment
            ? "PROGRESS VERIFICATION REPORT"
            : "ASSESSMENT REPORT"}
        </p>

        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "38px",
          }}
        >
          {report.targetCareer ||
            careerData?.career ||
            "Career Assessment"}
        </h1>

        <p
          style={{
            color: "#6B7280",
            lineHeight: "1.7",
            maxWidth: "850px",
          }}
        >
          NEXTPATH analyzed your quiz,
          problem-solving and coding
          performance to calculate your
          demonstrated proficiency for each
          assessed skill.
        </p>
      </div>


      {/* OVERALL SUMMARY */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <SummaryCard
          title="Overall Score"
          value={`${overallScore}/10`}
        />

        <SummaryCard
          title="Skills Assessed"
          value={totalAssessed}
        />

        <SummaryCard
          title="Skills Verified"
          value={verifiedCount}
        />

        <SummaryCard
          title="Verification Rate"
          value={`${verificationRate}%`}
        />
      </div>


      {/* OVERALL SCORE BOX */}

      <div
        style={{
          background: "#111827",
          color: "#FFFFFF",
          padding: "26px",
          borderRadius: "16px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <small
              style={{
                color: "#D1D5DB",
              }}
            >
              Overall Demonstrated
              Performance
            </small>

            <h1
              style={{
                fontSize: "42px",
                margin:
                  "8px 0 0",
              }}
            >
              {overallScore}/10
            </h1>
          </div>

          <div>
            <small
              style={{
                color: "#D1D5DB",
              }}
            >
              Assessment Type
            </small>

            <h3
              style={{
                margin:
                  "8px 0 0",
              }}
            >
              {isReassessment
                ? "Progress Re-Assessment"
                : "Initial Skill Verification"}
            </h3>
          </div>
        </div>
      </div>


      {/* =================================================
          PER-SKILL RESULTS
      ================================================= */}

      <div
        style={{
          marginBottom: "18px",
        }}
      >
        <h2>
          Skill-by-Skill Results
        </h2>

        <p
          style={{
            color: "#6B7280",
          }}
        >
          Your demonstrated score is
          compared with the required score
          for your target career.
        </p>
      </div>


      <div
        style={{
          display: "grid",
          gap: "18px",
        }}
      >
        {assessedSkillNames.map(
          (skillName) => {
            const score =
              Number(
                skillScores[
                  skillName
                ] || 0
              );

            const required =
              getRequiredScore(
                skillName
              );

            const detail =
              detailedResults[
                skillName
              ] || {};

            const status =
              getStatus(
                skillName,
                score
              );

            const readiness =
              required > 0
                ? Math.min(
                    100,
                    (
                      score /
                      required
                    ) * 100
                  )
                : 0;

            const gap =
              Math.max(
                0,
                required -
                  score
              );

            const gapPercentage =
              required > 0
                ? Math.max(
                    0,
                    (
                      gap /
                      required
                    ) *
                      100
                  )
                : 0;


            return (
              <div
                key={
                  skillName
                }
                style={{
                  background:
                    "#FFFFFF",
                  border:
                    "1px solid #E5E7EB",
                  borderRadius:
                    "16px",
                  padding:
                    "24px",
                }}
              >
                {/* TITLE */}

                <div
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "flex-start",
                    gap:
                      "15px",
                    flexWrap:
                      "wrap",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin:
                          "0 0 5px",
                      }}
                    >
                      {skillName}
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color:
                          "#6B7280",
                      }}
                    >
                      Required:
                      {" "}
                      <strong>
                        {required}/10
                      </strong>
                    </p>
                  </div>


                  <span
                    style={{
                      background:
                        status.background,
                      color:
                        status.color,
                      padding:
                        "7px 12px",
                      borderRadius:
                        "999px",
                      fontWeight:
                        "800",
                      fontSize:
                        "12px",
                    }}
                  >
                    {status.label}
                  </span>
                </div>


                {/* SCORE METRICS */}

                <div
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(140px, 1fr))",
                    gap:
                      "12px",
                    margin:
                      "20px 0",
                  }}
                >
                  <MetricCard
                    title="Final Score"
                    value={`${score}/10`}
                  />

                  <MetricCard
                    title="Required"
                    value={`${required}/10`}
                  />

                  <MetricCard
                    title="Remaining Gap"
                    value={`${gap.toFixed(
                      1
                    )}/10`}
                  />

                  <MetricCard
                    title="Gap %"
                    value={`${gapPercentage.toFixed(
                      1
                    )}%`}
                  />
                </div>


                {/* SECTION PERFORMANCE */}

                <div
                  style={{
                    marginTop:
                      "15px",
                  }}
                >
                  <h3>
                    Assessment Breakdown
                  </h3>


                  <div
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(160px, 1fr))",
                      gap:
                        "10px",
                    }}
                  >
                    <BreakdownCard
                      title="Quiz"
                      value={
                        detail.quizPercentage !==
                        undefined
                          ? `${detail.quizPercentage}%`
                          : "N/A"
                      }
                    />

                    <BreakdownCard
                      title="Problem Solving"
                      value={
                        detail.problemSolvingPercentage !==
                        undefined
                          ? `${detail.problemSolvingPercentage}%`
                          : "N/A"
                      }
                    />

                    <BreakdownCard
                      title="Coding"
                      value={
                        detail.codingPercentage ===
                          null ||
                        detail.codingPercentage ===
                          undefined
                          ? "Not Required"
                          : `${detail.codingPercentage}%`
                      }
                    />
                  </div>
                </div>


                {/* READINESS BAR */}

                <div
                  style={{
                    marginTop:
                      "22px",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      marginBottom:
                        "7px",
                    }}
                  >
                    <span
                      style={{
                        color:
                          "#6B7280",
                      }}
                    >
                      Required-Level
                      Readiness
                    </span>

                    <strong>
                      {readiness.toFixed(
                        1
                      )}
                      %
                    </strong>
                  </div>


                  <div
                    style={{
                      height:
                        "10px",
                      background:
                        "#E5E7EB",
                      borderRadius:
                        "999px",
                      overflow:
                        "hidden",
                    }}
                  >
                    <div
                      style={{
                        height:
                          "100%",
                        width:
                          `${readiness}%`,
                        background:
                          readiness >=
                          100
                            ? "#16A34A"
                            : "#C9151E",
                      }}
                    />
                  </div>
                </div>


                {/* RESULT MESSAGE */}

                <div
                  style={{
                    marginTop:
                      "18px",
                    padding:
                      "13px",
                    borderRadius:
                      "9px",
                    background:
                      status.background,
                    color:
                      status.color,
                  }}
                >
                  {score >=
                  required
                    ? `${skillName} meets the required proficiency level for ${careerData?.career || "your target career"}.`
                    : `${skillName} needs further improvement. Your personalized Skill Gap page will calculate the remaining learning requirement.`}
                </div>
              </div>
            );
          }
        )}
      </div>


      {/* =================================================
          SKILLS USER DID NOT SELECT
      ================================================= */}

      {!isReassessment && (
        <UnknownSkillsSection
          careerSkills={
            careerSkills
          }
          selectedSkills={
            selectedSkills
          }
        />
      )}


      {/* =================================================
          NEXT ACTION
      ================================================= */}

      <div
        style={{
          background:
            "#FFF7F7",
          border:
            "1px solid #FECACA",
          padding:
            "22px",
          borderRadius:
            "14px",
          marginTop:
            "30px",
        }}
      >
        <h2
          style={{
            marginTop: 0,
          }}
        >
          What happens next?
        </h2>


        {isReassessment ? (
          <p
            style={{
              color:
                "#6B7280",
              lineHeight:
                "1.7",
            }}
          >
            NEXTPATH will recalculate
            your remaining skill gaps.
            Skills that meet the target
            proficiency are eligible for
            NEXTPATH verification and
            credentials.
          </p>
        ) : (
          <p
            style={{
              color:
                "#6B7280",
              lineHeight:
                "1.7",
            }}
          >
            NEXTPATH will combine these
            verified scores with the
            skills you said you do not
            know. Unselected skills will
            have a demonstrated score of
            0 and therefore begin with a
            100% skill gap.
          </p>
        )}


        <button
          onClick={
            continueToSkillGap
          }
          style={{
            ...primaryButton,
            width:
              "100%",
            marginTop:
              "8px",
            padding:
              "15px",
          }}
        >
          {isReassessment
            ? "View Updated Skill Gap →"
            : "Continue to Skill Gap Analysis →"}
        </button>
      </div>
    </div>
  );
}


/* =========================================================
   UNKNOWN SKILLS
========================================================= */

function UnknownSkillsSection({
  careerSkills,
  selectedSkills,
}) {
  const unknownSkills =
    careerSkills.filter(
      (skill) =>
        !selectedSkills[
          skill.name
        ]
    );


  if (
    unknownSkills.length === 0
  ) {
    return null;
  }


  return (
    <div
      style={{
        marginTop:
          "35px",
      }}
    >
      <h2>
        Skills Not Assessed
      </h2>

      <p
        style={{
          color:
            "#6B7280",
          lineHeight:
            "1.6",
        }}
      >
        You indicated that you do not
        currently know these skills, so
        NEXTPATH did not require an
        assessment for them.
      </p>


      <div
        style={{
          display:
            "grid",
          gap:
            "10px",
        }}
      >
        {unknownSkills.map(
          (skill) => (
            <div
              key={
                skill.name
              }
              style={{
                background:
                  "#FFF1F2",
                border:
                  "1px solid #FECACA",
                padding:
                  "16px",
                borderRadius:
                  "10px",
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
                gap:
                  "15px",
              }}
            >
              <div>
                <strong>
                  {skill.name}
                </strong>

                <p
                  style={{
                    margin:
                      "4px 0 0",
                    color:
                      "#6B7280",
                    fontSize:
                      "13px",
                  }}
                >
                  Required:
                  {" "}
                  {
                    skill.required_score
                  }
                  /10
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
                      "#B91C1C",
                  }}
                >
                  100% Gap
                </strong>

                <p
                  style={{
                    margin:
                      "4px 0 0",
                    fontSize:
                      "12px",
                    color:
                      "#B91C1C",
                  }}
                >
                  Not yet known
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background:
          "#FFFFFF",
        padding:
          "19px",
        borderRadius:
          "13px",
        border:
          "1px solid #E5E7EB",
      }}
    >
      <small
        style={{
          color:
            "#6B7280",
        }}
      >
        {title}
      </small>

      <h2
        style={{
          margin:
            "5px 0 0",
        }}
      >
        {value}
      </h2>
    </div>
  );
}


/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background:
          "#F9FAFB",
        padding:
          "13px",
        borderRadius:
          "9px",
      }}
    >
      <small
        style={{
          color:
            "#6B7280",
        }}
      >
        {title}
      </small>

      <h3
        style={{
          margin:
            "5px 0 0",
        }}
      >
        {value}
      </h3>
    </div>
  );
}


/* =========================================================
   BREAKDOWN CARD
========================================================= */

function BreakdownCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background:
          "#F9FAFB",
        padding:
          "13px",
        borderRadius:
          "9px",
        border:
          "1px solid #F3F4F6",
      }}
    >
      <small
        style={{
          color:
            "#6B7280",
        }}
      >
        {title}
      </small>

      <h3
        style={{
          margin:
            "5px 0 0",
        }}
      >
        {value}
      </h3>
    </div>
  );
}


const primaryButton = {
  background: "#C9151E",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "9px",
  padding: "12px 20px",
  fontWeight: "800",
  cursor: "pointer",
};


export default AssessmentReport;