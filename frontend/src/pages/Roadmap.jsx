import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";


function Roadmap() {
  const navigate = useNavigate();

  const careerData = JSON.parse(
    localStorage.getItem("nextpathTargetCareerData") || "null"
  );

  const skillGaps = JSON.parse(
    localStorage.getItem("nextpathSkillGaps") || "[]"
  );

  const savedPreferences = JSON.parse(
    localStorage.getItem(
      "nextpathRoadmapPreferences"
    ) || "null"
  );

  const [months, setMonths] = useState(
    savedPreferences?.months || 3
  );

  const [weeklyHours, setWeeklyHours] = useState(
    savedPreferences?.weeklyHours || 10
  );

  const [generated, setGenerated] = useState(
    Boolean(
      localStorage.getItem("nextpathRoadmapPlan")
    )
  );

  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/learning-resources"
    )
      .then((response) => response.json())
      .then((data) => {
        setResources(data.resources || []);
      })
      .catch((error) => {
        console.error(
          "Learning resources error:",
          error
        );
      });
  }, []);

  const roadmapPlan = useMemo(() => {
    const gaps = skillGaps.filter(
      (item) => item.gapPercentage > 0
    );

    if (gaps.length === 0) {
      return [];
    }

    const totalGap = gaps.reduce(
      (sum, item) =>
        sum + item.gapPercentage,
      0
    );

    const totalWeeks = months * 4;

    return gaps.map((item) => {
      const weight =
        item.gapPercentage / totalGap;

      const hoursPerWeek = Math.max(
        1,
        Number(
          (
            weeklyHours * weight
          ).toFixed(1)
        )
      );

      const recommendedWeeks = Math.max(
        1,
        Math.round(
          totalWeeks * weight
        )
      );

      const resource = resources.find(
        (r) =>
          r.skill.toLowerCase() ===
          item.skill.toLowerCase()
      );

      const topics =
        resource?.topics || [
          `${item.skill} fundamentals`,
          `${item.skill} practical concepts`,
          `${item.skill} problem solving`,
          `${item.skill} project practice`,
        ];

      return {
        ...item,
        hoursPerWeek,
        recommendedWeeks,
        topics,
        freeResources:
          resource?.free_resources || [],
        paidResources:
          resource?.paid_resources || [],
      };
    });
  }, [
    skillGaps,
    months,
    weeklyHours,
    resources,
  ]);

  const generateRoadmap = () => {
    const preferences = {
      months: Number(months),
      weeklyHours: Number(weeklyHours),
    };

    localStorage.setItem(
      "nextpathRoadmapPreferences",
      JSON.stringify(preferences)
    );

    localStorage.setItem(
      "nextpathRoadmapPlan",
      JSON.stringify(roadmapPlan)
    );

    /*
      Create initial progress structure.
    */

    const existingProgress = JSON.parse(
      localStorage.getItem(
        "nextpathRoadmapProgress"
      ) || "{}"
    );

    roadmapPlan.forEach((skill) => {
      if (!existingProgress[skill.skill]) {
        existingProgress[skill.skill] = {
          topics: {},
        };

        skill.topics.forEach((topic) => {
          existingProgress[
            skill.skill
          ].topics[topic] = false;
        });
      }
    });

    localStorage.setItem(
      "nextpathRoadmapProgress",
      JSON.stringify(existingProgress)
    );

    setGenerated(true);
  };

  if (!careerData) {
    return (
      <Message
        text="Select a target career first."
        button="Choose Career"
        onClick={() =>
          navigate("/target-career")
        }
      />
    );
  }

  if (skillGaps.length === 0) {
    return (
      <Message
        text="Complete your Skill Gap Analysis first."
        button="Open Skill Gap"
        onClick={() =>
          navigate("/skill-gap")
        }
      />
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <p style={label}>
        PERSONALIZED ROADMAP
      </p>

      <h1>
        {careerData.career} Learning Plan
      </h1>

      <p style={description}>
        Tell NEXTPATH how quickly you want
        to reach your goal and how much time
        you can study each week.
      </p>

      <div style={inputGrid}>
        <div style={inputCard}>
          <label>
            <strong>
              Goal Duration
            </strong>
          </label>

          <select
            value={months}
            onChange={(e) =>
              setMonths(
                Number(e.target.value)
              )
            }
            style={inputStyle}
          >
            <option value={1}>
              1 Month
            </option>

            <option value={2}>
              2 Months
            </option>

            <option value={3}>
              3 Months
            </option>

            <option value={6}>
              6 Months
            </option>
          </select>
        </div>

        <div style={inputCard}>
          <label>
            <strong>
              Study Hours Per Week
            </strong>
          </label>

          <input
            type="number"
            min="1"
            max="40"
            value={weeklyHours}
            onChange={(e) =>
              setWeeklyHours(
                Number(e.target.value)
              )
            }
            style={inputStyle}
          />
        </div>
      </div>

      <button
        style={{
          ...button,
          width: "100%",
          marginBottom: "30px",
        }}
        onClick={generateRoadmap}
      >
        Generate Personalized Roadmap
      </button>

      {generated && (
        <>
          <div style={summary}>
            <strong>
              {months * 4}-Week Plan
            </strong>

            <span>
              {weeklyHours} hours/week
            </span>

            <span>
              {roadmapPlan.length} skills
              to improve
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
            {roadmapPlan.map(
              (item, index) => (
                <RoadmapCard
                  key={item.skill}
                  item={item}
                  priority={index + 1}
                />
              )
            )}
          </div>

          <button
            style={{
              ...button,
              width: "100%",
              marginTop: "25px",
            }}
            onClick={() =>
              navigate("/progress")
            }
          >
            Start Learning & Track Progress →
          </button>
        </>
      )}
    </div>
  );
}


function RoadmapCard({
  item,
  priority,
}) {
  return (
    <div style={roadmapCard}>
      <div style={topRow}>
        <div>
          <small>
            Priority #{priority}
          </small>

          <h2>
            {item.skill}
          </h2>
        </div>

        <div style={gapBadge}>
          {item.gapPercentage}% Gap
        </div>
      </div>

      <div style={metrics}>
        <MiniMetric
          title="Study"
          value={`${item.hoursPerWeek} hrs/week`}
        />

        <MiniMetric
          title="Recommended"
          value={`${item.recommendedWeeks} weeks`}
        />

        <MiniMetric
          title="Current Readiness"
          value={`${item.readinessPercentage}%`}
        />
      </div>

      <h3>Topics to Learn</h3>

      <ul>
        {item.topics.map((topic) => (
          <li key={topic}>
            {topic}
          </li>
        ))}
      </ul>

      <h3>Free Study Materials</h3>

      {item.freeResources.length === 0 ? (
        <p style={muted}>
          Add a free learning resource
          for this skill.
        </p>
      ) : (
        item.freeResources.map(
          (resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              style={resourceLink}
            >
              {resource.title}
              {" — "}
              {resource.provider}
            </a>
          )
        )
      )}

      <h3>Paid Courses</h3>

      {item.paidResources.length === 0 ? (
        <p style={muted}>
          Add a verified paid course
          for this skill.
        </p>
      ) : (
        item.paidResources.map(
          (resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              style={resourceLink}
            >
              {resource.title}
              {" — "}
              {resource.provider}
            </a>
          )
        )
      )}
    </div>
  );
}


function MiniMetric({
  title,
  value,
}) {
  return (
    <div style={miniMetric}>
      <small>{title}</small>
      <strong>{value}</strong>
    </div>
  );
}


function Message({
  text,
  button: buttonText,
  onClick,
}) {
  return (
    <div style={roadmapCard}>
      <h2>{text}</h2>

      <button
        style={button}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}


const label = {
  color: "#C9151E",
  fontWeight: "800",
};

const description = {
  color: "#6B7280",
  lineHeight: "1.7",
};

const inputGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "18px",
  margin: "25px 0",
};

const inputCard = {
  background: "#FFFFFF",
  padding: "20px",
  borderRadius: "14px",
  border: "1px solid #E5E7EB",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid #D1D5DB",
  boxSizing: "border-box",
};

const button = {
  background: "#C9151E",
  color: "#FFFFFF",
  border: "none",
  padding: "14px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "800",
};

const summary = {
  background: "#111827",
  color: "#FFFFFF",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  padding: "20px",
  borderRadius: "14px",
  marginBottom: "22px",
  gap: "15px",
};

const roadmapCard = {
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
  padding: "24px",
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
};

const gapBadge = {
  background: "#FEE2E2",
  color: "#B91C1C",
  padding: "7px 12px",
  borderRadius: "999px",
  fontWeight: "800",
};

const metrics = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "10px",
  margin: "18px 0",
};

const miniMetric = {
  background: "#F9FAFB",
  padding: "12px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const resourceLink = {
  display: "block",
  padding: "10px",
  marginBottom: "8px",
  background: "#F9FAFB",
  borderRadius: "8px",
  color: "#1D4ED8",
  textDecoration: "none",
};

const muted = {
  color: "#6B7280",
};

export default Roadmap;