import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

function RequiredSkills() {
  const navigate = useNavigate();

  const [career, setCareer] =
    useState(null);

  const [selected, setSelected] =
    useState({});

  const confidenceScores = {
    Beginner: 3,
    Intermediate: 6,
    Advanced: 8,
    Expert: 10,
  };

  useEffect(() => {
    try {
      const data =
        JSON.parse(
          localStorage.getItem(
            "nextpathTargetCareerData"
          ) || "null"
        );

      setCareer(data);

      const old =
        JSON.parse(
          localStorage.getItem(
            "nextpathSelectedSkills"
          ) || "{}"
        );

      setSelected(old || {});
    } catch {
      setCareer(null);
    }
  }, []);

  if (!career) {
    return (
      <div style={styles.page}>
        <h2>
          No target career selected
        </h2>

        <button
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

  const toggleSkill = (
    skillName
  ) => {
    setSelected((current) => {
      const copy = {
        ...current,
      };

      if (copy[skillName]) {
        delete copy[skillName];
      } else {
        copy[skillName] = {
          selected: true,
          selfLevel:
            "Beginner",
          selfScore: 3,
        };
      }

      return copy;
    });
  };

  const updateLevel = (
    skill,
    level
  ) => {
    setSelected((current) => ({
      ...current,

      [skill]: {
        selected: true,
        selfLevel: level,
        selfScore:
          confidenceScores[
            level
          ],
      },
    }));
  };

  const continueNext = () => {
    localStorage.setItem(
      "nextpathSelectedSkills",
      JSON.stringify(selected)
    );

    localStorage.setItem(
      "nextpathAssessmentMode",
      "initial"
    );

    if (
      Object.keys(selected)
        .length === 0
    ) {
      localStorage.setItem(
        "nextpathAssessmentReport",
        JSON.stringify({
          mode: "initial",
          targetCareer:
            career.name,
          skillScores: {},
          detailedResults: {},
          passedSkills: [],
          overallScore: 0,
        })
      );

      navigate(
        "/skill-gap"
      );

      return;
    }

    navigate(
      "/assessment"
    );
  };

  return (
    <div style={styles.page}>
      <h1>
        Skills You Already Know
      </h1>

      <p style={styles.description}>
        Select only skills where you
        already have some knowledge.
        Your confidence level does not
        become your final score. The
        assessment verifies your skill.
      </p>

      <div style={styles.grid}>
        {career.skills.map(
          (skill) => {
            const record =
              selected[
                skill.name
              ];

            return (
              <div
                key={
                  skill.name
                }
                style={{
                  ...styles.card,

                  ...(record
                    ? styles.active
                    : {}),
                }}
              >
                <label
                  style={
                    styles.checkRow
                  }
                >
                  <input
                    type="checkbox"
                    checked={
                      !!record
                    }
                    onChange={() =>
                      toggleSkill(
                        skill.name
                      )
                    }
                  />

                  <strong>
                    {
                      skill.name
                    }
                  </strong>
                </label>

                <p>
                  Career requirement:{" "}
                  <strong>
                    {
                      skill.required_score
                    }
                    /10
                  </strong>
                </p>

                <select
                  disabled={
                    !record
                  }
                  value={
                    record?.selfLevel ||
                    "Beginner"
                  }
                  onChange={(
                    event
                  ) =>
                    updateLevel(
                      skill.name,
                      event.target
                        .value
                    )
                  }
                  style={
                    styles.select
                  }
                >
                  {Object.keys(
                    confidenceScores
                  ).map(
                    (level) => (
                      <option
                        key={
                          level
                        }
                      >
                        {level}
                      </option>
                    )
                  )}
                </select>
              </div>
            );
          }
        )}
      </div>

      <button
        onClick={
          continueNext
        }
        style={styles.primary}
      >
        {Object.keys(selected)
          .length > 0
          ? "Continue to Assessment →"
          : "I Don't Know These Skills →"}
      </button>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: 24,
  },

  description: {
    color: "#64748b",
    lineHeight: 1.6,
  },

  grid: {
    display: "grid",
    gap: 14,
    marginTop: 22,
  },

  card: {
    padding: 18,
    border:
      "1px solid #e2e8f0",
    borderRadius: 12,
    background: "white",
  },

  active: {
    border:
      "2px solid #dc2626",
    background: "#fff7f7",
  },

  checkRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },

  select: {
    padding: 10,
    width: "100%",
  },

  primary: {
    marginTop: 22,
    padding: 14,
    width: "100%",
    border: 0,
    borderRadius: 9,
    background: "#dc2626",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
  },
};

export default RequiredSkills;