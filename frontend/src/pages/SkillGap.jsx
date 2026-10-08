import { useNavigate } from "react-router-dom";

function SkillGap() {
  const navigate = useNavigate();

  const careerData = JSON.parse(
    localStorage.getItem("nextpathTargetCareerData") || "null"
  );

  const selectedSkills = JSON.parse(
    localStorage.getItem("nextpathSelectedSkills") || "{}"
  );

  const cumulativeScores = JSON.parse(
    localStorage.getItem("nextpathSkillScores") || "{}"
  );

  const assessmentReport = JSON.parse(
    localStorage.getItem("nextpathAssessmentReport") || "null"
  );

  if (!careerData) {
    return (
      <div style={messageCard}>
        <h2>Select Your Target Career First</h2>

        <button
          style={primaryButton}
          onClick={() => navigate("/target-career")}
        >
          Choose Career
        </button>
      </div>
    );
  }

  if (!assessmentReport) {
    return (
      <div style={messageCard}>
        <h2>Complete Skill Verification First</h2>

        <p>
          Select the skills you already know and complete
          their verification assessment.
        </p>

        <button
          style={primaryButton}
          onClick={() => navigate("/required-skills")}
        >
          Go to Required Skills
        </button>
      </div>
    );
  }

  const careerSkills = (careerData.skills || []).map((skill) => {
    if (typeof skill === "string") {
      return {
        name: skill,
        required_score: 7,
      };
    }

    return skill;
  });

  const skillGaps = careerSkills.map((skill) => {
    const requiredScore = Number(skill.required_score || 0);

    const isSelected = Boolean(
      selectedSkills[skill.name]
    );

    const demonstratedScore = isSelected
      ? Number(cumulativeScores[skill.name] || 0)
      : 0;

    const gapScore = Math.max(
      0,
      requiredScore - demonstratedScore
    );

    const gapPercentage =
      requiredScore > 0
        ? Math.max(
            0,
            Math.min(
              100,
              (gapScore / requiredScore) * 100
            )
          )
        : 0;

    const readinessPercentage =
      requiredScore > 0
        ? Math.min(
            100,
            (demonstratedScore / requiredScore) * 100
          )
        : 0;

    let status = "Strong";

    if (!isSelected) {
      status = "Not Known";
    } else if (gapPercentage >= 70) {
      status = "Critical";
    } else if (gapPercentage >= 40) {
      status = "Major Gap";
    } else if (gapPercentage >= 20) {
      status = "Developing";
    } else if (gapPercentage > 0) {
      status = "Near Ready";
    }

    return {
      skill: skill.name,
      requiredScore,
      demonstratedScore,
      gapScore: Number(gapScore.toFixed(1)),
      gapPercentage: Number(gapPercentage.toFixed(1)),
      readinessPercentage: Number(
        readinessPercentage.toFixed(1)
      ),
      isSelected,
      status,
    };
  });

  const sortedSkillGaps = [...skillGaps].sort(
    (a, b) => b.gapPercentage - a.gapPercentage
  );

  /*
    IMPORTANT:
    Save skill gaps for Roadmap.jsx
  */

  localStorage.setItem(
    "nextpathSkillGaps",
    JSON.stringify(sortedSkillGaps)
  );

  const overallGap =
    sortedSkillGaps.length > 0
      ? sortedSkillGaps.reduce(
          (total, item) =>
            total + item.gapPercentage,
          0
        ) / sortedSkillGaps.length
      : 0;

  const overallReadiness = Math.max(
    0,
    100 - overallGap
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Not Known":
      case "Critical":
        return {
          background: "#FEE2E2",
          color: "#B91C1C",
        };

      case "Major Gap":
        return {
          background: "#FFEDD5",
          color: "#C2410C",
        };

      case "Developing":
        return {
          background: "#FEF3C7",
          color: "#92400E",
        };

      case "Near Ready":
        return {
          background: "#DBEAFE",
          color: "#1D4ED8",
        };

      default:
        return {
          background: "#DCFCE7",
          color: "#166534",
        };
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <p style={sectionLabel}>
        SKILL GAP ANALYSIS
      </p>

      <h1 style={{ fontSize: "36px" }}>
        {careerData.career}
      </h1>

      <p style={description}>
        Your assessment performance is compared with
        the proficiency required for your target career.
        Skills that you said you do not know are treated
        as 100% gaps.
      </p>

      <div style={summaryGrid}>
        <SummaryCard
          title="Required Skills"
          value={careerSkills.length}
        />

        <SummaryCard
          title="Skills Claimed"
          value={Object.keys(selectedSkills).length}
        />

        <SummaryCard
          title="Overall Gap"
          value={`${overallGap.toFixed(1)}%`}
        />

        <SummaryCard
          title="Career Readiness"
          value={`${overallReadiness.toFixed(1)}%`}
        />
      </div>

      <div style={{ display: "grid", gap: "16px" }}>
        {sortedSkillGaps.map((item, index) => {
          const style = getStatusStyle(item.status);

          return (
            <div
              key={item.skill}
              style={{
                background: "#FFFFFF",
                padding: "24px",
                borderRadius: "16px",
                border:
                  item.gapPercentage === 100
                    ? "2px solid #FCA5A5"
                    : "1px solid #E5E7EB",
              }}
            >
              <div style={cardTop}>
                <div>
                  <small style={{ color: "#6B7280" }}>
                    Learning Priority #{index + 1}
                  </small>

                  <h2>{item.skill}</h2>

                  <p style={{ color: "#6B7280" }}>
                    {item.isSelected
                      ? "Assessment verified"
                      : "You reported no current knowledge"}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      ...style,
                      padding: "7px 12px",
                      borderRadius: "999px",
                      fontWeight: "800",
                    }}
                  >
                    {item.status}
                  </span>

                  <span
                    style={{
                      background: "#F3F4F6",
                      padding: "7px 12px",
                      borderRadius: "999px",
                      fontWeight: "800",
                    }}
                  >
                    {item.gapPercentage}% Gap
                  </span>
                </div>
              </div>

              <div style={scoreGrid}>
                <ScoreCard
                  title="Required"
                  value={`${item.requiredScore}/10`}
                />

                <ScoreCard
                  title="Demonstrated"
                  value={`${item.demonstratedScore}/10`}
                />

                <ScoreCard
                  title="Gap Score"
                  value={item.gapScore}
                />

                <ScoreCard
                  title="Gap Percentage"
                  value={`${item.gapPercentage}%`}
                />
              </div>

              <div>
                <div style={progressHeader}>
                  <span>Skill Readiness</span>

                  <strong>
                    {item.readinessPercentage}%
                  </strong>
                </div>

                <div style={progressTrack}>
                  <div
                    style={{
                      width: `${item.readinessPercentage}%`,
                      height: "100%",
                      background:
                        item.readinessPercentage >= 80
                          ? "#16A34A"
                          : "#C9151E",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        style={{
          ...primaryButton,
          width: "100%",
          marginTop: "25px",
          padding: "16px",
        }}
        onClick={() => navigate("/roadmap")}
      >
        Build My Personalized Roadmap →
      </button>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div style={summaryCard}>
      <small style={{ color: "#6B7280" }}>
        {title}
      </small>

      <h2>{value}</h2>
    </div>
  );
}

function ScoreCard({ title, value }) {
  return (
    <div
      style={{
        background: "#F9FAFB",
        padding: "14px",
        borderRadius: "10px",
      }}
    >
      <small style={{ color: "#6B7280" }}>
        {title}
      </small>

      <h3 style={{ marginBottom: 0 }}>
        {value}
      </h3>
    </div>
  );
}

const sectionLabel = {
  color: "#C9151E",
  fontWeight: "800",
  letterSpacing: "1px",
};

const description = {
  color: "#6B7280",
  lineHeight: "1.7",
  maxWidth: "850px",
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(190px, 1fr))",
  gap: "15px",
  margin: "28px 0",
};

const summaryCard = {
  background: "#FFFFFF",
  padding: "20px",
  borderRadius: "14px",
  border: "1px solid #E5E7EB",
};

const cardTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "15px",
};

const scoreGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "12px",
  margin: "20px 0",
};

const progressHeader = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "7px",
};

const progressTrack = {
  height: "9px",
  background: "#E5E7EB",
  borderRadius: "999px",
  overflow: "hidden",
};

const messageCard = {
  background: "#FFFFFF",
  padding: "30px",
  borderRadius: "16px",
};

const primaryButton = {
  background: "#C9151E",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "10px",
  padding: "12px 20px",
  cursor: "pointer",
  fontWeight: "800",
};

export default SkillGap;