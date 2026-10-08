import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, getCareerMarket } from "../services/api";

const FALLBACK_MARKET = {
  "Data Analyst": {
    "icon": "📊",
    "accent": "#2563eb",
    "category": "Analytics",
    "marketDemand": 88,
    "skillDemand": 86,
    "opportunityScore": 90,
    "salary": {
      "entry": "₹4–7 LPA",
      "mid": "₹7–14 LPA",
      "senior": "₹14–24+ LPA"
    },
    "experience": "0–2 years for many entry-level roles. Strong SQL, Excel/BI projects and business understanding can improve readiness.",
    "outlook": "Strong",
    "opportunitySummary": "Common across technology, finance, retail, consulting, operations, healthcare and product teams.",
    "skills": [
      {
        "name": "SQL",
        "required_score": 8,
        "demand_score": 95
      },
      {
        "name": "Excel",
        "required_score": 8,
        "demand_score": 91
      },
      {
        "name": "Power BI",
        "required_score": 7,
        "demand_score": 90
      },
      {
        "name": "Statistics",
        "required_score": 7,
        "demand_score": 84
      },
      {
        "name": "Data Visualization",
        "required_score": 8,
        "demand_score": 88
      },
      {
        "name": "Python",
        "required_score": 6,
        "demand_score": 82
      },
      {
        "name": "Communication",
        "required_score": 7,
        "demand_score": 87
      },
      {
        "name": "Business Analysis",
        "required_score": 7,
        "demand_score": 80
      }
    ]
  },
  "Data Scientist": {
    "icon": "🧠",
    "accent": "#7c3aed",
    "category": "AI / ML",
    "marketDemand": 84,
    "skillDemand": 92,
    "opportunityScore": 82,
    "salary": {
      "entry": "₹6–10 LPA",
      "mid": "₹10–20 LPA",
      "senior": "₹20–35+ LPA"
    },
    "experience": "1–3 years is common, though strong ML projects, statistics and deployment evidence can help fresh graduates.",
    "outlook": "High-skill",
    "opportunitySummary": "Seen in product companies, fintech, consulting, healthcare, research and AI startups.",
    "skills": [
      {
        "name": "Python",
        "required_score": 9,
        "demand_score": 96
      },
      {
        "name": "Statistics",
        "required_score": 9,
        "demand_score": 94
      },
      {
        "name": "Machine Learning",
        "required_score": 9,
        "demand_score": 97
      },
      {
        "name": "SQL",
        "required_score": 8,
        "demand_score": 91
      },
      {
        "name": "Data Visualization",
        "required_score": 8,
        "demand_score": 86
      },
      {
        "name": "Deep Learning",
        "required_score": 7,
        "demand_score": 84
      },
      {
        "name": "Communication",
        "required_score": 7,
        "demand_score": 82
      },
      {
        "name": "MLOps",
        "required_score": 6,
        "demand_score": 80
      }
    ]
  },
  "Data Engineer": {
    "icon": "🛠️",
    "accent": "#0891b2",
    "category": "Engineering",
    "marketDemand": 91,
    "skillDemand": 94,
    "opportunityScore": 91,
    "salary": {
      "entry": "₹6–10 LPA",
      "mid": "₹10–20 LPA",
      "senior": "₹20–35+ LPA"
    },
    "experience": "1–3 years is common. SQL, Python, ETL, cloud, pipelines and orchestration are especially valuable.",
    "outlook": "Very Strong",
    "opportunitySummary": "Strong demand in cloud platforms, enterprise data platforms, analytics infrastructure and product engineering.",
    "skills": [
      {
        "name": "SQL",
        "required_score": 9,
        "demand_score": 96
      },
      {
        "name": "Python",
        "required_score": 8,
        "demand_score": 92
      },
      {
        "name": "ETL",
        "required_score": 9,
        "demand_score": 95
      },
      {
        "name": "Data Pipelines",
        "required_score": 9,
        "demand_score": 96
      },
      {
        "name": "Cloud",
        "required_score": 8,
        "demand_score": 91
      },
      {
        "name": "Big Data",
        "required_score": 8,
        "demand_score": 88
      },
      {
        "name": "Data Modeling",
        "required_score": 8,
        "demand_score": 87
      },
      {
        "name": "APIs",
        "required_score": 7,
        "demand_score": 82
      }
    ]
  },
  "Business Analyst": {
    "icon": "📈",
    "accent": "#ea580c",
    "category": "Business",
    "marketDemand": 82,
    "skillDemand": 78,
    "opportunityScore": 86,
    "salary": {
      "entry": "₹4–7 LPA",
      "mid": "₹7–13 LPA",
      "senior": "₹13–22+ LPA"
    },
    "experience": "0–2 years for many junior roles. Domain understanding, requirements, Excel/SQL and stakeholder communication are important.",
    "outlook": "Strong",
    "opportunitySummary": "Common in consulting, banking, SaaS, enterprise transformation, operations and product organizations.",
    "skills": [
      {
        "name": "Business Analysis",
        "required_score": 9,
        "demand_score": 94
      },
      {
        "name": "Communication",
        "required_score": 9,
        "demand_score": 95
      },
      {
        "name": "Excel",
        "required_score": 8,
        "demand_score": 89
      },
      {
        "name": "SQL",
        "required_score": 7,
        "demand_score": 84
      },
      {
        "name": "Data Visualization",
        "required_score": 7,
        "demand_score": 82
      },
      {
        "name": "Statistics",
        "required_score": 6,
        "demand_score": 72
      },
      {
        "name": "Power BI",
        "required_score": 6,
        "demand_score": 79
      },
      {
        "name": "Product Analytics",
        "required_score": 6,
        "demand_score": 75
      }
    ]
  },
  "Machine Learning Engineer": {
    "icon": "🤖",
    "accent": "#9333ea",
    "category": "AI / ML",
    "marketDemand": 93,
    "skillDemand": 97,
    "opportunityScore": 89,
    "salary": {
      "entry": "₹7–12 LPA",
      "mid": "₹12–24 LPA",
      "senior": "₹24–40+ LPA"
    },
    "experience": "1–3 years is common. Strong ML, Python, software engineering, APIs, MLOps and cloud deployment evidence are valuable.",
    "outlook": "Very Strong",
    "opportunitySummary": "AI product teams, computer vision, NLP, recommender systems, fintech, SaaS and enterprise AI.",
    "skills": [
      {
        "name": "Python",
        "required_score": 9,
        "demand_score": 97
      },
      {
        "name": "Machine Learning",
        "required_score": 9,
        "demand_score": 98
      },
      {
        "name": "Deep Learning",
        "required_score": 8,
        "demand_score": 91
      },
      {
        "name": "MLOps",
        "required_score": 8,
        "demand_score": 93
      },
      {
        "name": "APIs",
        "required_score": 8,
        "demand_score": 89
      },
      {
        "name": "Cloud",
        "required_score": 8,
        "demand_score": 90
      },
      {
        "name": "SQL",
        "required_score": 7,
        "demand_score": 84
      },
      {
        "name": "Data Pipelines",
        "required_score": 7,
        "demand_score": 85
      }
    ]
  },
  "BI Analyst": {
    "icon": "📉",
    "accent": "#0284c7",
    "category": "Analytics",
    "marketDemand": 85,
    "skillDemand": 84,
    "opportunityScore": 88,
    "salary": {
      "entry": "₹4–7 LPA",
      "mid": "₹7–13 LPA",
      "senior": "₹13–22+ LPA"
    },
    "experience": "0–2 years for junior roles. Power BI, SQL, Excel, data modeling and business communication are highly useful.",
    "outlook": "Strong",
    "opportunitySummary": "BI teams, finance, operations, sales analytics, enterprise reporting and management dashboards.",
    "skills": [
      {
        "name": "Power BI",
        "required_score": 9,
        "demand_score": 96
      },
      {
        "name": "SQL",
        "required_score": 8,
        "demand_score": 93
      },
      {
        "name": "Excel",
        "required_score": 8,
        "demand_score": 89
      },
      {
        "name": "Data Visualization",
        "required_score": 9,
        "demand_score": 92
      },
      {
        "name": "Data Modeling",
        "required_score": 7,
        "demand_score": 82
      },
      {
        "name": "Business Analysis",
        "required_score": 7,
        "demand_score": 79
      },
      {
        "name": "Communication",
        "required_score": 7,
        "demand_score": 85
      },
      {
        "name": "Statistics",
        "required_score": 6,
        "demand_score": 70
      }
    ]
  },
  "AI Engineer": {
    "icon": "✨",
    "accent": "#8b5cf6",
    "category": "AI / ML",
    "marketDemand": 95,
    "skillDemand": 98,
    "opportunityScore": 92,
    "salary": {
      "entry": "₹8–14 LPA",
      "mid": "₹14–28 LPA",
      "senior": "₹28–45+ LPA"
    },
    "experience": "1–3 years is common. LLM APIs, RAG, Python, ML engineering, evaluation, vector search and deployment improve readiness.",
    "outlook": "Very Strong",
    "opportunitySummary": "GenAI products, intelligent assistants, search, automation, NLP, enterprise AI and AI-native startups.",
    "skills": [
      {
        "name": "Generative AI",
        "required_score": 9,
        "demand_score": 99
      },
      {
        "name": "Python",
        "required_score": 9,
        "demand_score": 97
      },
      {
        "name": "Machine Learning",
        "required_score": 8,
        "demand_score": 95
      },
      {
        "name": "APIs",
        "required_score": 9,
        "demand_score": 93
      },
      {
        "name": "MLOps",
        "required_score": 8,
        "demand_score": 92
      },
      {
        "name": "Cloud",
        "required_score": 8,
        "demand_score": 91
      },
      {
        "name": "Deep Learning",
        "required_score": 8,
        "demand_score": 90
      },
      {
        "name": "Data Pipelines",
        "required_score": 7,
        "demand_score": 83
      }
    ]
  },
  "Product Analyst": {
    "icon": "🧩",
    "accent": "#0d9488",
    "category": "Analytics",
    "marketDemand": 82,
    "skillDemand": 83,
    "opportunityScore": 85,
    "salary": {
      "entry": "₹5–8 LPA",
      "mid": "₹8–15 LPA",
      "senior": "₹15–25+ LPA"
    },
    "experience": "0–2 years can be sufficient when supported by SQL, experimentation, funnels, retention and product thinking.",
    "outlook": "Growing",
    "opportunitySummary": "SaaS, consumer apps, e-commerce, fintech and product-led technology companies.",
    "skills": [
      {
        "name": "Product Analytics",
        "required_score": 9,
        "demand_score": 95
      },
      {
        "name": "SQL",
        "required_score": 8,
        "demand_score": 92
      },
      {
        "name": "Statistics",
        "required_score": 8,
        "demand_score": 85
      },
      {
        "name": "Data Visualization",
        "required_score": 8,
        "demand_score": 86
      },
      {
        "name": "Business Analysis",
        "required_score": 7,
        "demand_score": 80
      },
      {
        "name": "Communication",
        "required_score": 8,
        "demand_score": 88
      },
      {
        "name": "Python",
        "required_score": 6,
        "demand_score": 74
      },
      {
        "name": "Excel",
        "required_score": 7,
        "demand_score": 76
      }
    ]
  },
  "Marketing Analyst": {
    "icon": "🎯",
    "accent": "#db2777",
    "category": "Analytics",
    "marketDemand": 78,
    "skillDemand": 76,
    "opportunityScore": 80,
    "salary": {
      "entry": "₹4–6 LPA",
      "mid": "₹6–12 LPA",
      "senior": "₹12–20+ LPA"
    },
    "experience": "0–2 years for many entry roles. Campaign analytics, Excel, SQL, attribution, visualization and communication help.",
    "outlook": "Growing",
    "opportunitySummary": "Digital marketing, D2C, agencies, growth teams, e-commerce and consumer brands.",
    "skills": [
      {
        "name": "Marketing Analytics",
        "required_score": 9,
        "demand_score": 92
      },
      {
        "name": "Excel",
        "required_score": 8,
        "demand_score": 85
      },
      {
        "name": "SQL",
        "required_score": 7,
        "demand_score": 80
      },
      {
        "name": "Data Visualization",
        "required_score": 8,
        "demand_score": 83
      },
      {
        "name": "Statistics",
        "required_score": 7,
        "demand_score": 76
      },
      {
        "name": "Communication",
        "required_score": 8,
        "demand_score": 86
      },
      {
        "name": "Power BI",
        "required_score": 6,
        "demand_score": 69
      },
      {
        "name": "Python",
        "required_score": 5,
        "demand_score": 64
      }
    ]
  },
  "Analytics Consultant": {
    "icon": "💼",
    "accent": "#ca8a04",
    "category": "Business",
    "marketDemand": 86,
    "skillDemand": 88,
    "opportunityScore": 87,
    "salary": {
      "entry": "₹6–10 LPA",
      "mid": "₹10–18 LPA",
      "senior": "₹18–30+ LPA"
    },
    "experience": "1–3 years is common. Analytics depth, stakeholder communication, business framing and presentation are important.",
    "outlook": "Strong",
    "opportunitySummary": "Consulting firms, analytics service companies, transformation teams and enterprise strategy groups.",
    "skills": [
      {
        "name": "Business Analysis",
        "required_score": 9,
        "demand_score": 91
      },
      {
        "name": "SQL",
        "required_score": 8,
        "demand_score": 88
      },
      {
        "name": "Power BI",
        "required_score": 8,
        "demand_score": 84
      },
      {
        "name": "Communication",
        "required_score": 9,
        "demand_score": 94
      },
      {
        "name": "Statistics",
        "required_score": 7,
        "demand_score": 79
      },
      {
        "name": "Python",
        "required_score": 7,
        "demand_score": 77
      },
      {
        "name": "Data Visualization",
        "required_score": 8,
        "demand_score": 86
      },
      {
        "name": "Excel",
        "required_score": 8,
        "demand_score": 83
      }
    ]
  },
  "Data Architect": {
    "icon": "🏗️",
    "accent": "#0369a1",
    "category": "Engineering",
    "marketDemand": 88,
    "skillDemand": 95,
    "opportunityScore": 83,
    "salary": {
      "entry": "Usually not entry-level",
      "mid": "₹18–28 LPA",
      "senior": "₹28–50+ LPA"
    },
    "experience": "Typically 5+ years because architecture roles require broad platform, cloud, governance, security and system design experience.",
    "outlook": "Senior-demand",
    "opportunitySummary": "Enterprise data platforms, cloud modernization, governance, warehousing and data-platform architecture.",
    "skills": [
      {
        "name": "Data Architecture",
        "required_score": 10,
        "demand_score": 98
      },
      {
        "name": "Cloud",
        "required_score": 9,
        "demand_score": 94
      },
      {
        "name": "Data Modeling",
        "required_score": 9,
        "demand_score": 93
      },
      {
        "name": "Data Pipelines",
        "required_score": 9,
        "demand_score": 92
      },
      {
        "name": "Big Data",
        "required_score": 8,
        "demand_score": 88
      },
      {
        "name": "SQL",
        "required_score": 8,
        "demand_score": 87
      },
      {
        "name": "ETL",
        "required_score": 8,
        "demand_score": 86
      },
      {
        "name": "Communication",
        "required_score": 8,
        "demand_score": 82
      }
    ]
  },
  "Senior Data Analyst": {
    "icon": "📊",
    "accent": "#1d4ed8",
    "category": "Analytics",
    "marketDemand": 87,
    "skillDemand": 90,
    "opportunityScore": 84,
    "salary": {
      "entry": "Not usually entry-level",
      "mid": "₹9–16 LPA",
      "senior": "₹16–26+ LPA"
    },
    "experience": "Usually 3–5+ years, with strong SQL, BI, stakeholder management, mentoring and measurable business impact.",
    "outlook": "Strong",
    "opportunitySummary": "Senior analytics, product analytics, finance, operations, consulting and strategy teams.",
    "skills": [
      {
        "name": "SQL",
        "required_score": 9,
        "demand_score": 95
      },
      {
        "name": "Power BI",
        "required_score": 8,
        "demand_score": 90
      },
      {
        "name": "Statistics",
        "required_score": 8,
        "demand_score": 85
      },
      {
        "name": "Data Visualization",
        "required_score": 9,
        "demand_score": 90
      },
      {
        "name": "Communication",
        "required_score": 9,
        "demand_score": 93
      },
      {
        "name": "Business Analysis",
        "required_score": 8,
        "demand_score": 87
      },
      {
        "name": "Python",
        "required_score": 7,
        "demand_score": 79
      },
      {
        "name": "Excel",
        "required_score": 8,
        "demand_score": 82
      }
    ]
  }
};

const CATEGORY_FILTERS = [
  "All",
  "Analytics",
  "AI / ML",
  "Engineering",
  "Business",
];

const SORT_OPTIONS = [
  { value: "opportunity", label: "Opportunity Score" },
  { value: "market", label: "Market Demand" },
  { value: "skills", label: "Skill Demand" },
  { value: "salary", label: "Salary Potential" },
  { value: "name", label: "Career Name" },
];

const STORAGE_KEYS = {
  target: "nextpathTargetCareer",
  targetData: "nextpathTargetCareerData",
  selectedSkills: "nextpathSelectedSkills",
  scores: "nextpathSkillScores",
  report: "nextpathAssessmentReport",
  gaps: "nextpathSkillGaps",
  roadmap: "nextpathRoadmapPlan",
  roadmapProgress: "nextpathRoadmapProgress",
  verified: "nextpathVerifiedSkills",
  certificates: "nextpathCertificates",
  mode: "nextpathAssessmentMode",
  reassessmentSkills: "nextpathReassessmentSkills",
};

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeSkill(skill) {
  if (typeof skill === "string") {
    return {
      name: skill,
      required_score: 7,
      demand_score: 75,
    };
  }

  return {
    ...skill,
    name:
      skill.name ||
      skill.skill ||
      skill.skillName ||
      "Unknown Skill",
    required_score: toNumber(
      skill.required_score ??
        skill.requiredScore ??
        skill.score ??
        7,
      7
    ),
    demand_score: toNumber(
      skill.demand_score ??
        skill.skill_demand ??
        skill.market_demand ??
        75,
      75
    ),
  };
}

function normalizeSkills(rawSkills) {
  if (Array.isArray(rawSkills)) {
    return rawSkills.map(normalizeSkill);
  }

  if (rawSkills && typeof rawSkills === "object") {
    return Object.entries(rawSkills).map(([name, score]) => ({
      name,
      required_score: toNumber(score, 7),
      demand_score: 75,
    }));
  }

  return [];
}

function fallbackForCareer(name) {
  return (
    FALLBACK_MARKET[name] || {
      icon: "💡",
      accent: "#dc2626",
      category: "Career",
      marketDemand: 75,
      skillDemand: 75,
      opportunityScore: 75,
      salary: {
        entry: "Configure in backend",
        mid: "Configure in backend",
        senior: "Configure in backend",
      },
      experience: "Configure experience requirement in backend.",
      outlook: "Configurable",
      opportunitySummary:
        "Career opportunities depend on region, industry and employer.",
      skills: [],
      sourceNote:
        "No validated fallback market record is configured.",
    }
  );
}

function normalizeCareer(career, index) {
  const name =
    career.name ||
    career.career ||
    career.title ||
    `Career ${index + 1}`;

  const fallback = fallbackForCareer(name);

  const backendMarket =
    career.market ||
    career.market_data ||
    career.marketData ||
    {};

  const backendSalary =
    backendMarket.salary ||
    career.salary ||
    fallback.salary;

  const skills = normalizeSkills(
    career.skills ||
      career.required_skills ||
      career.requiredSkills ||
      fallback.skills
  );

  return {
    ...career,
    name,
    icon: career.icon || fallback.icon,
    accent: career.accent || fallback.accent,
    category: career.category || fallback.category,
    description:
      career.description ||
      career.summary ||
      `${name} career intelligence profile.`,
    marketDemand: toNumber(
      backendMarket.demand_score ??
        backendMarket.market_demand ??
        career.market_demand ??
        fallback.marketDemand,
      fallback.marketDemand
    ),
    skillDemand: toNumber(
      backendMarket.skill_demand_score ??
        backendMarket.skill_demand ??
        career.skill_demand ??
        fallback.skillDemand,
      fallback.skillDemand
    ),
    opportunityScore: toNumber(
      backendMarket.opportunity_score ??
        career.opportunity_score ??
        fallback.opportunityScore,
      fallback.opportunityScore
    ),
    salary: {
      entry:
        backendSalary?.entry ||
        backendSalary?.junior ||
        fallback.salary.entry,
      mid:
        backendSalary?.mid ||
        backendSalary?.middle ||
        fallback.salary.mid,
      senior:
        backendSalary?.senior ||
        fallback.salary.senior,
    },
    experience:
      backendMarket.experience_required ||
      career.experience_required ||
      career.experience ||
      fallback.experience,
    outlook:
      backendMarket.outlook ||
      career.outlook ||
      fallback.outlook,
    opportunitySummary:
      backendMarket.opportunity_summary ||
      career.opportunity_summary ||
      fallback.opportunitySummary,
    marketSourceNote:
      backendMarket.source_note ||
      career.source_note ||
      fallback.sourceNote ||
      "Illustrative hackathon estimate.",
    skills,
  };
}

function salaryRank(career) {
  const source = [
    career.salary?.entry,
    career.salary?.mid,
    career.salary?.senior,
  ]
    .filter(Boolean)
    .join(" ");

  const numbers =
    source.match(/\d+(?:\.\d+)?/g)?.map(Number) || [];

  if (!numbers.length) {
    return 0;
  }

  return Math.max(...numbers);
}

function clearDownstreamState() {
  [
    STORAGE_KEYS.selectedSkills,
    STORAGE_KEYS.scores,
    STORAGE_KEYS.report,
    STORAGE_KEYS.gaps,
    STORAGE_KEYS.roadmap,
    STORAGE_KEYS.roadmapProgress,
    STORAGE_KEYS.verified,
    STORAGE_KEYS.certificates,
    STORAGE_KEYS.reassessmentSkills,
  ].forEach((key) => localStorage.removeItem(key));

  localStorage.setItem(
    STORAGE_KEYS.mode,
    "initial"
  );
}

function ScoreMeter({
  label,
  value,
  accent = "#dc2626",
  helper,
}) {
  const safe = clamp(
    toNumber(value),
    0,
    100
  );

  return (
    <div className="tc-meter">
      <div className="tc-meter-head">
        <span>{label}</span>
        <strong>{safe}/100</strong>
      </div>

      <div className="tc-meter-track">
        <div
          className="tc-meter-fill"
          style={{
            width: `${safe}%`,
            background: accent,
          }}
        />
      </div>

      {helper && (
        <small>{helper}</small>
      )}
    </div>
  );
}

function MiniStat({
  label,
  value,
  note,
}) {
  return (
    <div className="tc-mini-stat">
      <span>{label}</span>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </div>
  );
}

function SalaryBox({
  label,
  value,
}) {
  return (
    <div className="tc-salary-box">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SkillDemandCard({
  skill,
  accent,
  index,
}) {
  const required = clamp(
    toNumber(skill.required_score, 7),
    0,
    10
  );

  const demand = clamp(
    toNumber(skill.demand_score, 75),
    0,
    100
  );

  return (
    <article className="tc-skill-demand-card">
      <div className="tc-skill-demand-head">
        <div>
          <small>
            SKILL #{String(index + 1).padStart(2, "0")}
          </small>
          <h3>{skill.name}</h3>
        </div>

        <div className="tc-skill-demand-score">
          <strong>{demand}</strong>
          <span>/100 demand</span>
        </div>
      </div>

      <div className="tc-bar-label">
        <span>Required competency</span>
        <strong>{required}/10</strong>
      </div>

      <div className="tc-skill-bar">
        <div
          style={{
            width: `${required * 10}%`,
            background: accent,
          }}
        />
      </div>

      <div className="tc-bar-label second">
        <span>Market-oriented skill demand</span>
        <strong>{demand}/100</strong>
      </div>

      <div className="tc-skill-bar demand">
        <div
          style={{
            width: `${demand}%`,
          }}
        />
      </div>
    </article>
  );
}

function CareerCard({
  career,
  selected,
  comparing,
  onChoose,
  onCompare,
}) {
  const topSkills = [...career.skills]
    .sort(
      (a, b) =>
        toNumber(b.demand_score, 75) -
        toNumber(a.demand_score, 75)
    )
    .slice(0, 5);

  return (
    <article
      className={
        selected
          ? "tc-career-card selected"
          : "tc-career-card"
      }
      style={{
        "--career-accent": career.accent,
      }}
    >
      <div className="tc-card-top">
        <div className="tc-career-icon">
          {career.icon}
        </div>

        <div className="tc-card-badges">
          <span>
            {career.category}
          </span>

          <span className="green">
            {career.outlook}
          </span>
        </div>
      </div>

      <h2>{career.name}</h2>

      <p className="tc-career-description">
        {career.description}
      </p>

      <div className="tc-card-market">
        <ScoreMeter
          label="Market Demand"
          value={career.marketDemand}
          accent={career.accent}
        />

        <ScoreMeter
          label="Skill Demand"
          value={career.skillDemand}
          accent="#16a34a"
        />

        <ScoreMeter
          label="Opportunity"
          value={career.opportunityScore}
          accent="#f59e0b"
        />
      </div>

      <div className="tc-card-info-grid">
        <div>
          <small>Entry Salary*</small>
          <strong>
            {career.salary.entry}
          </strong>
        </div>

        <div>
          <small>Experience</small>
          <strong>
            {career.experience}
          </strong>
        </div>
      </div>

      <div className="tc-card-skills">
        {topSkills.map((skill) => (
          <span key={skill.name}>
            {skill.name}
            <b>
              {skill.required_score}/10
            </b>
          </span>
        ))}
      </div>

      <div className="tc-card-actions">
        <button
          className="primary"
          onClick={() =>
            onChoose(career)
          }
        >
          {selected
            ? "Selected Career"
            : "Choose Career"}
        </button>

        <button
          className={
            comparing
              ? "compare-button active"
              : "compare-button"
          }
          onClick={() =>
            onCompare(career)
          }
        >
          {comparing
            ? "✓ Comparing"
            : "Compare"}
        </button>
      </div>
    </article>
  );
}

export default function TargetCareer() {
  const navigate = useNavigate();

  const [
    careers,
    setCareers,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("All");

  const [
    sortMode,
    setSortMode,
  ] = useState("opportunity");

  const [
    selectedName,
    setSelectedName,
  ] = useState(
    localStorage.getItem(
      STORAGE_KEYS.target
    ) || ""
  );

  const [
    compareNames,
    setCompareNames,
  ] = useState([]);

  const [
    detailsTab,
    setDetailsTab,
  ] = useState("overview");

  const loadCareerMarket =
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getCareerMarket();

        const rawList =
          Array.isArray(response)
            ? response
            : response.careers ||
              response.data ||
              [];

        const normalized =
          rawList.map(
            normalizeCareer
          );

        if (!normalized.length) {
          throw new Error(
            "No career data returned by backend."
          );
        }

        setCareers(normalized);
      } catch (requestError) {
        console.error(
          requestError
        );

        setError(
          requestError?.message ||
            "Could not load career market."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadCareerMarket();
  }, []);

  const filteredCareers =
    useMemo(() => {
      const q =
        search
          .trim()
          .toLowerCase();

      const filtered =
        careers.filter(
          (career) => {
            const text = [
              career.name,
              career.description,
              career.category,
              career.experience,
              career.opportunitySummary,
              ...career.skills.map(
                (skill) =>
                  skill.name
              ),
            ]
              .join(" ")
              .toLowerCase();

            const searchMatch =
              !q ||
              text.includes(q);

            const categoryMatch =
              category === "All" ||
              career.category ===
                category;

            return (
              searchMatch &&
              categoryMatch
            );
          }
        );

      const sorted = [
        ...filtered,
      ];

      if (
        sortMode ===
        "opportunity"
      ) {
        sorted.sort(
          (a, b) =>
            b.opportunityScore -
            a.opportunityScore
        );
      } else if (
        sortMode === "market"
      ) {
        sorted.sort(
          (a, b) =>
            b.marketDemand -
            a.marketDemand
        );
      } else if (
        sortMode === "skills"
      ) {
        sorted.sort(
          (a, b) =>
            b.skillDemand -
            a.skillDemand
        );
      } else if (
        sortMode === "salary"
      ) {
        sorted.sort(
          (a, b) =>
            salaryRank(b) -
            salaryRank(a)
        );
      } else {
        sorted.sort(
          (a, b) =>
            a.name.localeCompare(
              b.name
            )
        );
      }

      return sorted;
    }, [
      careers,
      search,
      category,
      sortMode,
    ]);

  const selectedCareer =
    careers.find(
      (career) =>
        career.name ===
        selectedName
    ) || null;

  const comparedCareers =
    compareNames
      .map((name) =>
        careers.find(
          (career) =>
            career.name === name
        )
      )
      .filter(Boolean);

  const topMarketCareers =
    useMemo(() => {
      return [...careers]
        .sort(
          (a, b) =>
            b.marketDemand -
            a.marketDemand
        )
        .slice(0, 3);
    }, [careers]);

  const topOpportunityCareers =
    useMemo(() => {
      return [...careers]
        .sort(
          (a, b) =>
            b.opportunityScore -
            a.opportunityScore
        )
        .slice(0, 3);
    }, [careers]);

  function chooseCareer(
    career
  ) {
    setSelectedName(
      career.name
    );

    setDetailsTab(
      "overview"
    );

    setTimeout(() => {
      document
        .getElementById(
          "tc-details"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 0);
  }

  function toggleCompare(
    career
  ) {
    setCompareNames(
      (current) => {
        if (
          current.includes(
            career.name
          )
        ) {
          return current.filter(
            (name) =>
              name !==
              career.name
          );
        }

        if (
          current.length >= 3
        ) {
          alert(
            "You can compare up to 3 careers."
          );

          return current;
        }

        return [
          ...current,
          career.name,
        ];
      }
    );
  }

  function continueNext() {
    if (!selectedCareer) {
      alert(
        "Please select a career."
      );

      return;
    }

    const previous =
      localStorage.getItem(
        STORAGE_KEYS.target
      );

    if (
      previous &&
      previous !==
        selectedCareer.name
    ) {
      clearDownstreamState();
    }

    localStorage.setItem(
      STORAGE_KEYS.target,
      selectedCareer.name
    );

    localStorage.setItem(
      STORAGE_KEYS.targetData,
      JSON.stringify(
        selectedCareer
      )
    );

    localStorage.setItem(
      STORAGE_KEYS.mode,
      "initial"
    );

    navigate(
      "/required-skills"
    );
  }

  if (loading) {
    return (
      <main className="tc-state">
        <div className="tc-loader" />
        <h2>Loading Career Intelligence</h2>
        <p>Connecting to the NEXTPATH backend...</p>
        <code>{API_URL}</code>
        <style>{STATE_CSS}</style>
      </main>
    );
  }

  if (error) {
    return (
      <main className="tc-state">
        <div className="tc-error-icon">!</div>
        <h2>Career market could not be loaded</h2>
        <p>{error}</p>

        <div className="tc-state-actions">
          <button onClick={loadCareerMarket}>
            Try Again
          </button>

          <a
            href={`${API_URL}/career-market`}
            target="_blank"
            rel="noreferrer"
          >
            Open API ↗
          </a>
        </div>

        <style>{STATE_CSS}</style>
      </main>
    );
  }

  return (
    <main className="tc-page">
      <section className="tc-hero">
        <div className="tc-hero-copy">
          <span className="tc-kicker">
            CAREER MARKET INTELLIGENCE
          </span>

          <h1>
            Choose a career using demand, salary,
            opportunity and skill evidence.
          </h1>

          <p>
            NEXTPATH compares career requirements with
            market-oriented signals, then converts your
            target into an evidence-based assessment and
            personalized roadmap.
          </p>

          <div className="tc-api">
            <i />
            <strong>Public backend connected</strong>
            <code>{API_URL}</code>
          </div>
        </div>

        <div className="tc-hero-grid">
          <MiniStat
            label="Career Profiles"
            value={careers.length}
            note="Loaded from API"
          />

          <MiniStat
            label="Unique Skills"
            value={
              new Set(
                careers.flatMap(
                  (career) =>
                    career.skills.map(
                      (skill) =>
                        skill.name
                    )
                )
              ).size
            }
            note="Across profiles"
          />

          <MiniStat
            label="Market Signals"
            value="5"
            note="Demand, skills, salary, opportunity, experience"
          />

          <MiniStat
            label="Next Stage"
            value="Assessment"
            note="Evidence before gap analysis"
          />
        </div>
      </section>

      <div className="tc-data-warning">
        <strong>Market-data note:</strong>{" "}
        fallback salary ranges, demand scores and
        opportunity scores are illustrative hackathon
        estimates, not live verified labour-market statistics.
        Backend-provided market data automatically overrides
        these fallback values.
      </div>

      <section className="tc-insight-row">
        <article>
          <span>Highest Market Demand</span>

          <div>
            {topMarketCareers.map(
              (career, index) => (
                <p key={career.name}>
                  <b>#{index + 1}</b>
                  {career.name}
                  <strong>
                    {career.marketDemand}/100
                  </strong>
                </p>
              )
            )}
          </div>
        </article>

        <article>
          <span>Highest Opportunity Score</span>

          <div>
            {topOpportunityCareers.map(
              (career, index) => (
                <p key={career.name}>
                  <b>#{index + 1}</b>
                  {career.name}
                  <strong>
                    {career.opportunityScore}/100
                  </strong>
                </p>
              )
            )}
          </div>
        </article>
      </section>

      <section className="tc-controls">
        <label className="tc-search">
          <span>
            Search career, skill or experience
          </span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="AI Engineer, SQL, Power BI, 0–2 years..."
          />
        </label>

        <div className="tc-control-row">
          <div className="tc-filters">
            {CATEGORY_FILTERS.map(
              (item) => (
                <button
                  key={item}
                  className={
                    category === item
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCategory(item)
                  }
                >
                  {item}
                </button>
              )
            )}
          </div>

          <label className="tc-sort">
            <span>Sort by</span>

            <select
              value={sortMode}
              onChange={(event) =>
                setSortMode(
                  event.target.value
                )
              }
            >
              {SORT_OPTIONS.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>
          </label>
        </div>

        <div className="tc-result-count">
          Showing{" "}
          <strong>{filteredCareers.length}</strong>{" "}
          of{" "}
          <strong>{careers.length}</strong>{" "}
          careers
        </div>
      </section>

      <section className="tc-career-grid">
        {filteredCareers.map(
          (career) => (
            <CareerCard
              key={career.name}
              career={career}
              selected={
                selectedName ===
                career.name
              }
              comparing={
                compareNames.includes(
                  career.name
                )
              }
              onChoose={chooseCareer}
              onCompare={toggleCompare}
            />
          )
        )}
      </section>

      {!filteredCareers.length && (
        <section className="tc-empty">
          <div>🔍</div>
          <h2>No career matches your filters</h2>
          <p>
            Try a different search term or select All categories.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
          >
            Reset Filters
          </button>
        </section>
      )}

      {comparedCareers.length > 0 && (
        <section className="tc-compare-section">
          <div className="tc-section-title">
            <div>
              <span className="tc-kicker">
                CAREER COMPARISON
              </span>
              <h2>Compare market signals side by side</h2>
            </div>

            <button
              className="tc-clear"
              onClick={() =>
                setCompareNames([])
              }
            >
              Clear
            </button>
          </div>

          <div className="tc-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Career</th>
                  <th>Market Demand</th>
                  <th>Skill Demand</th>
                  <th>Opportunity</th>
                  <th>Entry Salary*</th>
                  <th>Mid Salary*</th>
                  <th>Senior Salary*</th>
                  <th>Experience</th>
                </tr>
              </thead>

              <tbody>
                {comparedCareers.map(
                  (career) => (
                    <tr key={career.name}>
                      <td>
                        <strong>
                          {career.icon} {career.name}
                        </strong>
                      </td>
                      <td>{career.marketDemand}/100</td>
                      <td>{career.skillDemand}/100</td>
                      <td>{career.opportunityScore}/100</td>
                      <td>{career.salary.entry}</td>
                      <td>{career.salary.mid}</td>
                      <td>{career.salary.senior}</td>
                      <td>{career.experience}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {selectedCareer && (
        <section
          className="tc-details"
          id="tc-details"
        >
          <div className="tc-details-header">
            <div>
              <span className="tc-kicker">
                SELECTED TARGET CAREER
              </span>

              <h2>
                {selectedCareer.icon} {selectedCareer.name}
              </h2>

              <p>
                {selectedCareer.description}
              </p>
            </div>

            <div className="tc-opportunity-badge">
              <span>Opportunity Score</span>
              <strong>
                {selectedCareer.opportunityScore}
              </strong>
              <small>/100</small>
            </div>
          </div>

          <div className="tc-detail-tabs">
            <button
              className={
                detailsTab === "overview"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setDetailsTab("overview")
              }
            >
              Overview
            </button>

            <button
              className={
                detailsTab === "skills"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setDetailsTab("skills")
              }
            >
              Skill Demand
            </button>

            <button
              className={
                detailsTab === "market"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setDetailsTab("market")
              }
            >
              Market & Salary
            </button>

            <button
              className={
                detailsTab === "method"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setDetailsTab("method")
              }
            >
              How NEXTPATH Uses It
            </button>
          </div>

          {detailsTab === "overview" && (
            <div className="tc-overview-tab">
              <section className="tc-overview-grid">
                <article>
                  <h3>Market Demand</h3>
                  <ScoreMeter
                    label="Demand Score"
                    value={selectedCareer.marketDemand}
                    accent={selectedCareer.accent}
                    helper="Prototype fallback unless backend overrides"
                  />
                </article>

                <article>
                  <h3>Skill Demand</h3>
                  <ScoreMeter
                    label="Skill Demand"
                    value={selectedCareer.skillDemand}
                    accent="#16a34a"
                    helper="Aggregate skill-market indicator"
                  />
                </article>

                <article>
                  <h3>Opportunity</h3>
                  <ScoreMeter
                    label="Opportunity"
                    value={selectedCareer.opportunityScore}
                    accent="#f59e0b"
                    helper="Prototype composite indicator"
                  />
                </article>
              </section>

              <section className="tc-opportunity-summary">
                <span>
                  WHERE OPPORTUNITIES EXIST
                </span>

                <p>
                  {selectedCareer.opportunitySummary}
                </p>
              </section>
            </div>
          )}

          {detailsTab === "skills" && (
            <div className="tc-skills-tab">
              <div className="tc-section-title">
                <div>
                  <span className="tc-kicker">
                    REQUIRED SKILLS
                  </span>

                  <h2>
                    Skill requirement and demand
                  </h2>
                </div>

                <div className="tc-skill-count">
                  {selectedCareer.skills.length} skills
                </div>
              </div>

              <div className="tc-skill-demand-grid">
                {[...selectedCareer.skills]
                  .sort(
                    (a, b) =>
                      toNumber(
                        b.demand_score,
                        75
                      ) -
                      toNumber(
                        a.demand_score,
                        75
                      )
                  )
                  .map(
                    (skill, index) => (
                      <SkillDemandCard
                        key={skill.name}
                        skill={skill}
                        accent={selectedCareer.accent}
                        index={index}
                      />
                    )
                  )}
              </div>
            </div>
          )}

          {detailsTab === "market" && (
            <div className="tc-market-tab">
              <section className="tc-market-detail-grid">
                <article>
                  <span className="tc-kicker">
                    SALARY SNAPSHOT*
                  </span>

                  <h3>
                    Typical salary bands
                  </h3>

                  <div className="tc-salary-detail-grid">
                    <SalaryBox
                      label="Entry / Junior"
                      value={selectedCareer.salary.entry}
                    />

                    <SalaryBox
                      label="Mid Level"
                      value={selectedCareer.salary.mid}
                    />

                    <SalaryBox
                      label="Senior"
                      value={selectedCareer.salary.senior}
                    />
                  </div>
                </article>

                <article>
                  <span className="tc-kicker">
                    EXPERIENCE
                  </span>

                  <h3>
                    Experience typically needed
                  </h3>

                  <p>
                    {selectedCareer.experience}
                  </p>
                </article>

                <article>
                  <span className="tc-kicker">
                    OUTLOOK
                  </span>

                  <h3>
                    Career outlook
                  </h3>

                  <div className="tc-outlook">
                    {selectedCareer.outlook}
                  </div>

                  <p>
                    {selectedCareer.marketSourceNote}
                  </p>
                </article>
              </section>
            </div>
          )}

          {detailsTab === "method" && (
            <div className="tc-method-tab">
              <article>
                <span>STEP 01</span>
                <h3>Career target</h3>
                <p>
                  NEXTPATH stores this career and its required skill scores as your target profile.
                </p>
              </article>

              <article>
                <span>STEP 02</span>
                <h3>Skill self-inventory</h3>
                <p>
                  You select only skills that you already know. Confidence is not your demonstrated score.
                </p>
              </article>

              <article>
                <span>STEP 03</span>
                <h3>Assessment</h3>
                <p>
                  Quiz, problem solving and practical/code evidence produce the demonstrated skill score.
                </p>
              </article>

              <article>
                <span>STEP 04</span>
                <h3>Gap calculation</h3>
                <p>
                  Required score is compared with demonstrated score for every required skill.
                </p>
              </article>

              <article>
                <span>STEP 05</span>
                <h3>Personalized roadmap</h3>
                <p>
                  Largest gaps are prioritized with learning topics, resources, practice and projects.
                </p>
              </article>

              <article>
                <span>STEP 06</span>
                <h3>Re-assessment</h3>
                <p>
                  Once roadmap topics reach 100%, new assessment evidence can verify the skill.
                </p>
              </article>
            </div>
          )}

          <div className="tc-method-note">
            <strong>Important:</strong>
            <p>
              Fallback market metrics are for the hackathon prototype.
              Before presenting them as current market statistics, connect
              a validated labour-market data source or maintain verified
              backend records with source and update date.
            </p>
          </div>

          <button
            className="tc-continue"
            onClick={continueNext}
          >
            Continue to Required Skills →
          </button>
        </section>
      )}

      <footer className="tc-footer">
        *Salary bands and market scores in fallback mode are illustrative
        hackathon estimates. They may not reflect current compensation or
        hiring conditions in a specific city, company or industry.
      </footer>

      <style>{`
        .tc-page {
          max-width: 1360px;
          margin: 0 auto;
          padding: 24px;
          color: #0f172a;
        }

        .tc-hero {
          display: grid;
          grid-template-columns:
            minmax(0, 1.35fr)
            minmax(320px, .65fr);
          gap: 24px;
          padding: 36px;
          border: 1px solid #e2e8f0;
          border-radius: 28px;
          background:
            radial-gradient(
              circle at top right,
              rgba(220,38,38,.10),
              transparent 34%
            ),
            linear-gradient(
              135deg,
              #ffffff,
              #f8fafc
            );
          box-shadow:
            0 20px 55px
            rgba(15,23,42,.06);
        }

        .tc-kicker {
          display: inline-block;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.5px;
          color: #dc2626;
        }

        .tc-hero h1 {
          margin: 11px 0 16px;
          max-width: 900px;
          font-size: clamp(38px, 4vw, 58px);
          line-height: 1.03;
          letter-spacing: -1.5px;
        }

        .tc-hero p {
          max-width: 850px;
          margin: 0;
          color: #64748b;
          font-size: 15px;
          line-height: 1.75;
        }

        .tc-api {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-wrap: wrap;
          margin-top: 22px;
          font-size: 11px;
          color: #166534;
        }

        .tc-api i {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 4px #dcfce7;
        }

        .tc-api code {
          color: #64748b;
          font-weight: 500;
        }

        .tc-hero-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 10px;
          align-content: start;
        }

        .tc-mini-stat {
          display: flex;
          flex-direction: column;
          min-height: 95px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: #ffffff;
        }

        .tc-mini-stat span {
          color: #64748b;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .7px;
        }

        .tc-mini-stat strong {
          margin: 5px 0;
          font-size: 21px;
        }

        .tc-mini-stat small {
          color: #94a3b8;
          line-height: 1.4;
        }

        .tc-data-warning {
          margin: 17px 0;
          padding: 14px 16px;
          border: 1px solid #fde68a;
          border-radius: 13px;
          background: #fffbeb;
          color: #92400e;
          font-size: 11px;
          line-height: 1.6;
        }

        .tc-insight-row {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 17px;
        }

        .tc-insight-row article {
          padding: 17px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: #ffffff;
        }

        .tc-insight-row article > span {
          color: #64748b;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: .8px;
        }

        .tc-insight-row p {
          display: grid;
          grid-template-columns:
            28px
            minmax(0,1fr)
            auto;
          gap: 8px;
          align-items: center;
          margin: 10px 0 0;
          padding-top: 10px;
          border-top: 1px solid #f1f5f9;
          color: #334155;
          font-size: 12px;
        }

        .tc-insight-row p b {
          color: #dc2626;
        }

        .tc-insight-row p strong {
          color: #0f172a;
        }

        .tc-controls {
          margin-bottom: 19px;
          padding: 21px;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          background: #ffffff;
        }

        .tc-search > span {
          display: block;
          margin-bottom: 7px;
          color: #334155;
          font-size: 11px;
          font-weight: 900;
        }

        .tc-search input {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 11px;
          outline: none;
          font-size: 13px;
        }

        .tc-search input:focus {
          border-color: #dc2626;
          box-shadow:
            0 0 0 3px
            rgba(220,38,38,.08);
        }

        .tc-control-row {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 14px;
          margin-top: 15px;
        }

        .tc-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tc-filters button {
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          background: #ffffff;
          color: #334155;
          font-weight: 800;
          cursor: pointer;
        }

        .tc-filters button.active {
          border-color: #dc2626;
          background: #dc2626;
          color: #ffffff;
        }

        .tc-sort {
          min-width: 210px;
        }

        .tc-sort span {
          display: block;
          margin-bottom: 5px;
          color: #64748b;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .tc-sort select {
          width: 100%;
          padding: 9px 10px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          background: #ffffff;
        }

        .tc-result-count {
          margin-top: 12px;
          color: #64748b;
          font-size: 10px;
        }

        .tc-career-grid {
          display: grid;
          grid-template-columns:
            repeat(
              auto-fit,
              minmax(305px,1fr)
            );
          gap: 16px;
        }

        .tc-career-card {
          display: flex;
          flex-direction: column;
          min-height: 580px;
          padding: 21px;
          border: 1px solid #e2e8f0;
          border-radius: 19px;
          background: #ffffff;
          box-shadow:
            0 10px 28px
            rgba(15,23,42,.04);
          transition:
            transform .18s ease,
            box-shadow .18s ease,
            border-color .18s ease;
        }

        .tc-career-card:hover {
          transform: translateY(-2px);
          box-shadow:
            0 18px 38px
            rgba(15,23,42,.08);
        }

        .tc-career-card.selected {
          border:
            2px solid
            var(--career-accent);
          box-shadow:
            0 18px 42px
            rgba(15,23,42,.10);
        }

        .tc-card-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .tc-career-icon {
          font-size: 30px;
        }

        .tc-card-badges {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .tc-card-badges span {
          height: fit-content;
          padding: 5px 8px;
          border-radius: 999px;
          background: #f1f5f9;
          color: #475569;
          font-size: 9px;
          font-weight: 900;
        }

        .tc-card-badges .green {
          background: #ecfdf5;
          color: #047857;
        }

        .tc-career-card h2 {
          margin: 15px 0 6px;
          font-size: 23px;
        }

        .tc-career-description {
          min-height: 66px;
          margin: 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.58;
        }

        .tc-card-market {
          display: grid;
          gap: 8px;
          margin-top: 13px;
        }

        .tc-meter {
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
        }

        .tc-meter-head {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          color: #475569;
          font-size: 10px;
        }

        .tc-meter-head strong {
          color: #0f172a;
        }

        .tc-meter-track {
          height: 6px;
          margin-top: 7px;
          overflow: hidden;
          border-radius: 999px;
          background: #e2e8f0;
        }

        .tc-meter-fill {
          height: 100%;
          border-radius: 999px;
        }

        .tc-meter small {
          display: block;
          margin-top: 5px;
          color: #94a3b8;
          font-size: 8px;
        }

        .tc-card-info-grid {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 8px;
          margin-top: 11px;
        }

        .tc-card-info-grid > div {
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #fafafa;
        }

        .tc-card-info-grid small {
          display: block;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .tc-card-info-grid strong {
          display: block;
          margin-top: 4px;
          color: #334155;
          font-size: 10px;
          line-height: 1.4;
        }

        .tc-card-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin: 12px 0;
          flex: 1;
          align-content: start;
        }

        .tc-card-skills span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          height: fit-content;
          padding: 5px 7px;
          border: 1px solid #e2e8f0;
          border-radius: 7px;
          background: #f8fafc;
          color: #475569;
          font-size: 9px;
        }

        .tc-card-skills b {
          color: #0f172a;
        }

        .tc-card-actions {
          display: grid;
          grid-template-columns:
            minmax(0,1fr)
            auto;
          gap: 8px;
        }

        .tc-card-actions button {
          padding: 10px 12px;
          border-radius: 9px;
          font-weight: 900;
          cursor: pointer;
        }

        .tc-card-actions .primary {
          border: 0;
          background: #111827;
          color: #ffffff;
        }

        .compare-button {
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
        }

        .compare-button.active {
          border-color: #a7f3d0;
          background: #ecfdf5;
          color: #047857;
        }

        .tc-empty {
          margin-top: 15px;
          padding: 42px;
          border: 1px dashed #cbd5e1;
          border-radius: 16px;
          text-align: center;
        }

        .tc-empty > div {
          font-size: 35px;
        }

        .tc-empty p {
          color: #64748b;
        }

        .tc-empty button {
          padding: 10px 13px;
          border: 0;
          border-radius: 8px;
          background: #111827;
          color: #ffffff;
          font-weight: 800;
        }

        .tc-compare-section {
          margin-top: 24px;
          padding: 24px;
          border-radius: 20px;
          background: #0f172a;
          color: #ffffff;
        }

        .tc-section-title {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          align-items: flex-start;
        }

        .tc-section-title h2 {
          margin: 6px 0;
        }

        .tc-clear {
          padding: 8px 11px;
          border: 1px solid #334155;
          border-radius: 8px;
          background: #111827;
          color: #cbd5e1;
          cursor: pointer;
        }

        .tc-table-wrap {
          margin-top: 14px;
          overflow: auto;
          border: 1px solid #334155;
          border-radius: 11px;
        }

        .tc-table-wrap table {
          width: 100%;
          min-width: 1040px;
          border-collapse: collapse;
        }

        .tc-table-wrap th,
        .tc-table-wrap td {
          padding: 11px;
          border-bottom: 1px solid #334155;
          text-align: left;
          font-size: 10px;
          vertical-align: top;
        }

        .tc-table-wrap th {
          background: #111827;
          color: #94a3b8;
        }

        .tc-details {
          margin-top: 24px;
          padding: 28px;
          border: 1px solid #e2e8f0;
          border-radius: 21px;
          background: #ffffff;
          box-shadow:
            0 14px 35px
            rgba(15,23,42,.04);
        }

        .tc-details-header {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-start;
        }

        .tc-details-header h2 {
          margin: 7px 0;
          font-size: 33px;
        }

        .tc-details-header p {
          max-width: 760px;
          margin: 0;
          color: #64748b;
          line-height: 1.65;
        }

        .tc-opportunity-badge {
          display: flex;
          align-items: baseline;
          gap: 3px;
          min-width: 160px;
          padding: 13px;
          border: 1px solid #fde68a;
          border-radius: 13px;
          background: #fffbeb;
        }

        .tc-opportunity-badge span {
          margin-right: 6px;
          color: #92400e;
          font-size: 9px;
          font-weight: 900;
        }

        .tc-opportunity-badge strong {
          color: #d97706;
          font-size: 31px;
        }

        .tc-opportunity-badge small {
          color: #92400e;
        }

        .tc-detail-tabs {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          margin: 22px 0 17px;
          padding-bottom: 13px;
          border-bottom: 1px solid #e2e8f0;
        }

        .tc-detail-tabs button {
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          background: #ffffff;
          color: #475569;
          font-weight: 800;
          cursor: pointer;
        }

        .tc-detail-tabs button.active {
          border-color: #111827;
          background: #111827;
          color: #ffffff;
        }

        .tc-overview-grid {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 11px;
        }

        .tc-overview-grid article {
          padding: 15px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #f8fafc;
        }

        .tc-overview-grid h3 {
          margin: 0 0 9px;
        }

        .tc-opportunity-summary {
          margin-top: 12px;
          padding: 16px;
          border: 1px solid #bbf7d0;
          border-radius: 12px;
          background: #f0fdf4;
        }

        .tc-opportunity-summary span {
          color: #15803d;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .tc-opportunity-summary p {
          margin: 6px 0 0;
          color: #4d7c0f;
        }

        .tc-skill-count {
          padding: 7px 10px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          color: #64748b;
          font-size: 10px;
          font-weight: 900;
        }

        .tc-skill-demand-grid {
          display: grid;
          grid-template-columns:
            repeat(2,minmax(0,1fr));
          gap: 10px;
          margin-top: 12px;
        }

        .tc-skill-demand-card {
          padding: 15px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #f8fafc;
        }

        .tc-skill-demand-head {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
        }

        .tc-skill-demand-head small {
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
        }

        .tc-skill-demand-head h3 {
          margin: 3px 0;
          font-size: 17px;
        }

        .tc-skill-demand-score {
          display: flex;
          align-items: baseline;
          gap: 3px;
        }

        .tc-skill-demand-score strong {
          color: #16a34a;
          font-size: 22px;
        }

        .tc-skill-demand-score span {
          color: #64748b;
          font-size: 8px;
        }

        .tc-bar-label {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin-top: 12px;
          color: #64748b;
          font-size: 9px;
        }

        .tc-bar-label.second {
          margin-top: 9px;
        }

        .tc-skill-bar {
          height: 6px;
          margin-top: 5px;
          overflow: hidden;
          border-radius: 999px;
          background: #e2e8f0;
        }

        .tc-skill-bar > div {
          height: 100%;
          border-radius: 999px;
        }

        .tc-skill-bar.demand > div {
          background:
            linear-gradient(
              90deg,
              #16a34a,
              #22c55e
            );
        }

        .tc-market-detail-grid {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 11px;
        }

        .tc-market-detail-grid > article {
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 13px;
          background: #f8fafc;
        }

        .tc-market-detail-grid h3 {
          margin: 6px 0 12px;
        }

        .tc-market-detail-grid p {
          color: #64748b;
          font-size: 11px;
          line-height: 1.55;
        }

        .tc-salary-detail-grid {
          display: grid;
          gap: 7px;
        }

        .tc-salary-box {
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          background: #ffffff;
        }

        .tc-salary-box span {
          display: block;
          color: #64748b;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
        }

        .tc-salary-box strong {
          display: block;
          margin-top: 4px;
        }

        .tc-outlook {
          display: inline-flex;
          padding: 8px 11px;
          border-radius: 999px;
          background: #ecfdf5;
          color: #047857;
          font-weight: 900;
        }

        .tc-method-tab {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 10px;
        }

        .tc-method-tab article {
          padding: 15px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #f8fafc;
        }

        .tc-method-tab span {
          color: #2563eb;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .7px;
        }

        .tc-method-tab h3 {
          margin: 5px 0;
        }

        .tc-method-tab p {
          margin: 0;
          color: #64748b;
          font-size: 11px;
          line-height: 1.55;
        }

        .tc-method-note {
          margin-top: 18px;
          padding: 15px;
          border: 1px solid #bfdbfe;
          border-radius: 12px;
          background: #eff6ff;
        }

        .tc-method-note p {
          margin: 6px 0 0;
          color: #475569;
          font-size: 11px;
          line-height: 1.55;
        }

        .tc-continue {
          width: 100%;
          margin-top: 18px;
          padding: 14px;
          border: 0;
          border-radius: 10px;
          background:
            linear-gradient(
              135deg,
              #dc2626,
              #b91c1c
            );
          color: #ffffff;
          font-weight: 900;
          cursor: pointer;
        }

        .tc-footer {
          padding: 18px 2px 0;
          color: #94a3b8;
          font-size: 9px;
          line-height: 1.5;
        }

        @media(max-width: 980px) {
          .tc-hero {
            grid-template-columns: 1fr;
          }

          .tc-overview-grid,
          .tc-market-detail-grid {
            grid-template-columns: 1fr;
          }

          .tc-method-tab {
            grid-template-columns:
              repeat(2,1fr);
          }
        }

        @media(max-width: 760px) {
          .tc-page {
            padding: 14px;
          }

          .tc-hero {
            padding: 24px;
          }

          .tc-hero-grid {
            grid-template-columns: 1fr;
          }

          .tc-insight-row {
            grid-template-columns: 1fr;
          }

          .tc-control-row {
            align-items: stretch;
            flex-direction: column;
          }

          .tc-sort {
            min-width: 0;
          }

          .tc-card-actions {
            grid-template-columns: 1fr;
          }

          .tc-details-header {
            flex-direction: column;
          }

          .tc-skill-demand-grid {
            grid-template-columns: 1fr;
          }

          .tc-method-tab {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width: 480px) {
          .tc-hero h1 {
            font-size: 35px;
          }

          .tc-card-info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

const STATE_CSS = `
  .tc-state {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 30px;
    text-align: center;
    color: #0f172a;
  }

  .tc-state p {
    max-width: 650px;
    color: #64748b;
  }

  .tc-state code {
    padding: 7px 10px;
    border-radius: 8px;
    background: #f1f5f9;
    color: #475569;
  }

  .tc-loader {
    width: 46px;
    height: 46px;
    border: 4px solid #fee2e2;
    border-top-color: #dc2626;
    border-radius: 50%;
    animation: tc-spin 1s linear infinite;
  }

  @keyframes tc-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .tc-error-icon {
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #fee2e2;
    color: #b91c1c;
    font-size: 25px;
    font-weight: 900;
  }

  .tc-state-actions {
    display: flex;
    gap: 9px;
  }

  .tc-state-actions button,
  .tc-state-actions a {
    padding: 10px 13px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 800;
    cursor: pointer;
  }

  .tc-state-actions button {
    border: 0;
    background: #dc2626;
    color: #ffffff;
  }

  .tc-state-actions a {
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #2563eb;
  }
`;

/*
TARGET CAREER IMPLEMENTATION / QA DOCUMENTATION
*/
