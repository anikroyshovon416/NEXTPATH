import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Progress() {
  const navigate = useNavigate();


  const roadmap = JSON.parse(
    localStorage.getItem(
      "nextpathRoadmapPlan"
    ) || "[]"
  );


  const [progress, setProgress] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "nextpathRoadmapProgress"
        ) || "{}"
      )
    );


  const verifiedSkills = JSON.parse(
    localStorage.getItem(
      "nextpathVerifiedSkills"
    ) || "{}"
  );


  const skillScores = JSON.parse(
    localStorage.getItem(
      "nextpathSkillScores"
    ) || "{}"
  );


  /* =========================================
     TOGGLE TOPIC
  ========================================= */

  const toggleTopic = (
    skillName,
    topic
  ) => {
    const updated = {
      ...progress,

      [skillName]: {
        ...(progress[skillName] || {}),

        topics: {
          ...(progress[skillName]?.topics || {}),

          [topic]:
            !progress[
              skillName
            ]?.topics?.[
              topic
            ],
        },
      },
    };


    setProgress(updated);


    localStorage.setItem(
      "nextpathRoadmapProgress",
      JSON.stringify(updated)
    );
  };


  /* =========================================
     CALCULATE SKILL PROGRESS
  ========================================= */

  const getSkillProgress = (
    skill
  ) => {
    const topics =
      skill.topics || [];


    if (
      topics.length === 0
    ) {
      return 0;
    }


    const storedTopics =
      progress[
        skill.skill
      ]?.topics || {};


    const completed =
      topics.filter(
        (topic) =>
          storedTopics[
            topic
          ] === true
      ).length;


    return Math.round(
      (
        completed /
        topics.length
      ) * 100
    );
  };


  /* =========================================
     OVERALL PROGRESS
  ========================================= */

  const overallProgress =
    roadmap.length > 0
      ? Math.round(
          roadmap.reduce(
            (
              total,
              skill
            ) =>
              total +
              getSkillProgress(
                skill
              ),
            0
          ) /
            roadmap.length
        )
      : 0;


  /* =========================================
     START RE-ASSESSMENT FOR ONE SKILL
  ========================================= */

  const startSkillReassessment =
    (skillName) => {

      localStorage.setItem(
        "nextpathAssessmentMode",
        "reassessment"
      );


      localStorage.setItem(
        "nextpathReassessmentSkills",
        JSON.stringify([
          skillName
        ])
      );


      navigate(
        "/assessment"
      );
    };


  /* =========================================
     START RE-ASSESSMENT FOR ALL READY SKILLS
  ========================================= */

  const readySkills =
    roadmap.filter(
      (skill) =>
        getSkillProgress(
          skill
        ) === 100 &&
        !verifiedSkills[
          skill.skill
        ]
    );


  const startAllReassessment =
    () => {

      if (
        readySkills.length ===
        0
      ) {
        return;
      }


      const names =
        readySkills.map(
          (skill) =>
            skill.skill
        );


      localStorage.setItem(
        "nextpathAssessmentMode",
        "reassessment"
      );


      localStorage.setItem(
        "nextpathReassessmentSkills",
        JSON.stringify(
          names
        )
      );


      navigate(
        "/assessment"
      );
    };


  /* =========================================
     NO ROADMAP
  ========================================= */

  if (
    roadmap.length === 0
  ) {

    return (
      <div
        style={{
          background:
            "#FFFFFF",

          padding:
            "30px",

          borderRadius:
            "16px",

          border:
            "1px solid #E5E7EB",
        }}
      >

        <h2>
          No Roadmap Found
        </h2>


        <p
          style={{
            color:
              "#6B7280",
          }}
        >
          Generate your personalized
          roadmap first.
        </p>


        <button
          style={
            primaryButton
          }

          onClick={() =>
            navigate(
              "/roadmap"
            )
          }
        >

          Open Roadmap

        </button>

      </div>
    );

  }


  return (

    <div
      style={{
        maxWidth:
          "1150px",

        margin:
          "0 auto",

        paddingBottom:
          "50px",
      }}
    >

      {/* HEADER */}

      <p
        style={{
          color:
            "#C9151E",

          fontWeight:
            "800",

          letterSpacing:
            "1px",
        }}
      >
        PROGRESS & RE-ASSESSMENT
      </p>


      <h1
        style={{
          fontSize:
            "38px",

          marginBottom:
            "8px",
        }}
      >
        Learning Progress
      </h1>


      <p
        style={{
          color:
            "#6B7280",

          lineHeight:
            "1.7",

          maxWidth:
            "850px",
        }}
      >
        Complete the learning topics
        in your roadmap. Once a skill
        reaches 100% learning progress,
        you can take a new re-assessment
        to verify your improvement.
      </p>


      {/* OVERALL PROGRESS */}

      <div
        style={{
          background:
            "#111827",

          color:
            "#FFFFFF",

          padding:
            "25px",

          borderRadius:
            "16px",

          margin:
            "25px 0",
        }}
      >

        <small
          style={{
            color:
              "#D1D5DB",
          }}
        >
          Overall Roadmap Progress
        </small>


        <h1
          style={{
            fontSize:
              "42px",

            margin:
              "8px 0",
          }}
        >
          {overallProgress}%
        </h1>


        <div
          style={{
            height:
              "10px",

            background:
              "#374151",

            borderRadius:
              "999px",

            overflow:
              "hidden",
          }}
        >

          <div
            style={{
              width:
                `${overallProgress}%`,

              height:
                "100%",

              background:
                "#22C55E",
            }}
          />

        </div>

      </div>


      {/* SKILL CARDS */}

      <div
        style={{
          display:
            "grid",

          gap:
            "18px",
        }}
      >

        {roadmap.map(
          (skill) => {

            const percentage =
              getSkillProgress(
                skill
              );


            const verified =
              Boolean(
                verifiedSkills[
                  skill.skill
                ]
              );


            const currentScore =
              skillScores[
                skill.skill
              ];


            const ready =
              percentage === 100 &&
              !verified;


            return (

              <div
                key={
                  skill.skill
                }

                style={{
                  background:
                    "#FFFFFF",

                  padding:
                    "24px",

                  borderRadius:
                    "16px",

                  border:
                    verified
                      ? "2px solid #86EFAC"
                      : ready
                      ? "2px solid #FCA5A5"
                      : "1px solid #E5E7EB",
                }}
              >

                {/* TOP */}

                <div
                  style={{
                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "flex-start",

                    gap:
                      "20px",

                    flexWrap:
                      "wrap",
                  }}
                >

                  <div>

                    <h2
                      style={{
                        margin:
                          "0 0 6px",
                      }}
                    >
                      {
                        skill.skill
                      }
                    </h2>


                    <p
                      style={{
                        margin:
                          "0 0 5px",

                        color:
                          "#6B7280",
                      }}
                    >
                      Original Gap:
                      {" "}
                      {
                        skill.gapPercentage
                      }
                      %
                    </p>


                    <p
                      style={{
                        margin:
                          0,

                        color:
                          "#6B7280",
                      }}
                    >
                      Current Verified Score:
                      {" "}

                      <strong>
                        {currentScore !==
                        undefined
                          ? `${currentScore}/10`
                          : "Not verified"}
                      </strong>

                    </p>

                  </div>


                  {/* STATUS */}

                  {verified ? (

                    <span
                      style={{
                        background:
                          "#DCFCE7",

                        color:
                          "#166534",

                        padding:
                          "8px 13px",

                        borderRadius:
                          "999px",

                        fontWeight:
                          "800",
                      }}
                    >
                      ✓ Skill Verified
                    </span>

                  ) : ready ? (

                    <span
                      style={{
                        background:
                          "#FEE2E2",

                        color:
                          "#B91C1C",

                        padding:
                          "8px 13px",

                        borderRadius:
                          "999px",

                        fontWeight:
                          "800",
                      }}
                    >
                      Ready for Re-Assessment
                    </span>

                  ) : (

                    <span
                      style={{
                        background:
                          "#F3F4F6",

                        color:
                          "#4B5563",

                        padding:
                          "8px 13px",

                        borderRadius:
                          "999px",

                        fontWeight:
                          "700",
                      }}
                    >
                      Learning
                    </span>

                  )}

                </div>


                {/* PROGRESS BAR */}

                <div
                  style={{
                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    marginTop:
                      "20px",

                    marginBottom:
                      "8px",
                  }}
                >

                  <span>
                    Learning Progress
                  </span>


                  <strong>
                    {percentage}%
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
                        `${percentage}%`,

                      background:
                        percentage ===
                        100
                          ? "#16A34A"
                          : "#C9151E",
                    }}
                  />

                </div>


                {/* TOPICS */}

                <h3
                  style={{
                    marginTop:
                      "22px",
                  }}
                >
                  Learning Topics
                </h3>


                {(skill.topics || []).map(
                  (topic) => {

                    const completed =
                      Boolean(
                        progress[
                          skill.skill
                        ]?.topics?.[
                          topic
                        ]
                      );


                    return (

                      <label
                        key={
                          topic
                        }

                        style={{
                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap:
                            "10px",

                          padding:
                            "11px",

                          marginBottom:
                            "6px",

                          background:
                            completed
                              ? "#F0FDF4"
                              : "#F9FAFB",

                          borderRadius:
                            "8px",

                          cursor:
                            verified
                              ? "default"
                              : "pointer",
                        }}
                      >

                        <input
                          type="checkbox"

                          checked={
                            completed
                          }

                          disabled={
                            verified
                          }

                          onChange={() =>
                            toggleTopic(
                              skill.skill,
                              topic
                            )
                          }
                        />


                        <span
                          style={{
                            textDecoration:
                              completed
                                ? "line-through"
                                : "none",

                            color:
                              completed
                                ? "#166534"
                                : "#374151",
                          }}
                        >
                          {topic}
                        </span>

                      </label>

                    );

                  }
                )}


                {/* REASSESSMENT BUTTON */}

                {ready && (

                  <div
                    style={{
                      marginTop:
                        "20px",

                      padding:
                        "18px",

                      background:
                        "#FFF7F7",

                      border:
                        "1px solid #FECACA",

                      borderRadius:
                        "12px",
                    }}
                  >

                    <h3
                      style={{
                        marginTop:
                          0,

                        color:
                          "#991B1B",
                      }}
                    >
                      Re-Assessment Available
                    </h3>


                    <p
                      style={{
                        color:
                          "#6B7280",

                        lineHeight:
                          "1.6",
                      }}
                    >
                      You completed all
                      learning topics for
                      {` ${skill.skill}`}.
                      Take a new quiz,
                      problem-solving task
                      and coding challenge
                      to verify your progress.
                    </p>


                    <button
                      style={{
                        ...primaryButton,

                        width:
                          "100%",
                      }}

                      onClick={() =>
                        startSkillReassessment(
                          skill.skill
                        )
                      }
                    >
                      Re-Assess {skill.skill} →
                    </button>

                  </div>

                )}


                {/* VERIFIED MESSAGE */}

                {verified && (

                  <div
                    style={{
                      marginTop:
                        "20px",

                      padding:
                        "15px",

                      background:
                        "#F0FDF4",

                      border:
                        "1px solid #BBF7D0",

                      borderRadius:
                        "10px",

                      color:
                        "#166534",
                    }}
                  >

                    <strong>
                      ✓ Verified
                    </strong>

                    <p
                      style={{
                        marginBottom:
                          0,
                      }}
                    >
                      This skill has
                      passed the required
                      proficiency level.
                      A NEXTPATH credential
                      can now be issued.
                    </p>

                  </div>

                )}

              </div>

            );

          }
        )}

      </div>


      {/* ALL READY SKILLS REASSESSMENT */}

      <div
        style={{
          background:
            "#FFFFFF",

          padding:
            "24px",

          borderRadius:
            "16px",

          border:
            "1px solid #E5E7EB",

          marginTop:
            "28px",
        }}
      >

        <h2
          style={{
            marginTop:
              0,
          }}
        >
          Re-Assessment Center
        </h2>


        <p
          style={{
            color:
              "#6B7280",

            lineHeight:
              "1.7",
          }}
        >
          You can re-assess one skill
          individually using the button
          inside its progress card, or
          assess all completed skills
          together.
        </p>


        <p>
          <strong>
            Ready Skills:
          </strong>
          {" "}
          {
            readySkills.length
          }
        </p>


        {readySkills.length >
          0 && (

          <div
            style={{
              marginBottom:
                "18px",
            }}
          >

            {readySkills.map(
              (skill) => (

                <span
                  key={
                    skill.skill
                  }

                  style={{
                    display:
                      "inline-block",

                    background:
                      "#DCFCE7",

                    color:
                      "#166534",

                    padding:
                      "7px 11px",

                    margin:
                      "4px",

                    borderRadius:
                      "999px",

                    fontWeight:
                      "700",

                    fontSize:
                      "13px",
                  }}
                >
                  ✓ {
                    skill.skill
                  }
                </span>

              )
            )}

          </div>

        )}


        <button
          disabled={
            readySkills.length ===
            0
          }

          onClick={
            startAllReassessment
          }

          style={{
            ...primaryButton,

            width:
              "100%",

            opacity:
              readySkills.length ===
              0
                ? 0.5
                : 1,

            cursor:
              readySkills.length ===
              0
                ? "not-allowed"
                : "pointer",
          }}
        >
          Re-Assess All Ready Skills →
        </button>

      </div>

    </div>

  );

}


const primaryButton = {
  background:
    "#C9151E",

  color:
    "#FFFFFF",

  border:
    "none",

  borderRadius:
    "10px",

  padding:
    "14px 20px",

  fontWeight:
    "800",

  cursor:
    "pointer",
};


export default Progress;